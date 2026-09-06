import os
import sys
import json
import random
import subprocess
import argparse
from pathlib import Path
from social_machine.config import CHANNELS

def get_ffmpeg_command(input_path: str, output_path: str, start_sec: float, duration_sec: float, mode: str = "blur_padding", channel_key: str = None, master: bool = True) -> list:
    """
    Constructs an FFmpeg command to transform 16:9 landscape video into 9:16 vertical short format.
    - 'blur_padding': Scales video to fit 1080 width, centers it, and fills vertical 1920 space with blurred source.
    - 'crop': Zooms and center-crops into 1080x1920.
    - 'master': Applies broadcast-grade EBU R128 loudness normalization and channel-specific visual grading.
    """
    # Channel-specific video grading filter
    channel_vf = ""
    if channel_key == "gods_and_glory":
        channel_vf = ",noise=c1s=5:c1f=t+u,eq=contrast=1.06:saturation=1.05"
    elif channel_key == "little_olympus":
        channel_vf = ",eq=contrast=1.08:saturation=1.2"
    elif channel_key == "iron_legends":
        channel_vf = ",unsharp=5:5:0.8:5:5:0.0,eq=contrast=1.12:saturation=1.15"

    if mode == "crop":
        # Center crop 9:16
        vf_filter = f"crop=ih*(9/16):ih:(iw-ow)/2:0,scale=1080:1920{channel_vf if master else ''}"
    else:
        # Standard high-production blur padding (split original, blur background, overlay foreground)
        vf_filter = (
            "split[original][copy];"
            "[copy]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=25:5[blurred];"
            f"[original]scale=1080:-1{channel_vf if master else ''}[foreground];"
            "[blurred][foreground]overlay=(W-w)/2:(H-h)/2"
        )

    # Audio normalization filter (EBU R128 target -16 LUFS for Shorts/TikTok/Reels)
    af_filter = "loudnorm=I=-16:LRA=7:TP=-1.5" if master else None

    cmd = [
        "ffmpeg",
        "-y",
        "-ss", str(start_sec),
        "-t", str(duration_sec),
        "-i", input_path,
        "-vf", vf_filter,
    ]

    if af_filter:
        cmd.extend(["-af", af_filter])

    cmd.extend([
        "-c:v", "libx264",
        "-preset", "medium" if master else "fast",
        "-crf", "18" if master else "22",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "256k",
        "-ar", "48000",
        "-movflags", "+faststart",
        output_path
    ])
    return cmd

def generate_short_metadata(channel_key: str, episode_title: str = None) -> dict:
    """
    Generates viral short title, description, and hashtags tailored for Shorts/TikTok/Reels.
    """
    channel = CHANNELS[channel_key]
    shorts_cfg = channel.get("shorts_config", {})
    hooks = shorts_cfg.get("hook_templates", ["Watch until the end! 🔥"])
    selected_hook = random.choice(hooks)
    
    title = f"{selected_hook} #{channel.get('shorts_prefix', 'SHORT')}"
    if len(title) > 95:
        title = title[:92] + "..."

    hashtags = shorts_cfg.get("shorts_hashtags", ["shorts", "viral"])
    hashtag_str = " ".join([f"#{t}" if not t.startswith("#") else t for t in hashtags])
    
    desc = (
        f"{selected_hook}\n\n"
        f"From the full episode of {channel['name']}.\n"
        f"Subscribe for more daily {channel['niche'].lower()}!\n\n"
        f"{hashtag_str}"
    )

    return {
        "title": title,
        "description": desc,
        "hook": selected_hook,
        "hashtags": hashtags
    }

def process_short(channel_key: str, input_video: str, start_sec: float = 0, duration: float = 50, mode: str = "blur_padding", auto_post: bool = False, master: bool = True):
    """
    Renders the short video and optionally triggers social_machine to publish it.
    """
    if channel_key not in CHANNELS:
        print(f"❌ Error: Unknown channel '{channel_key}'. Valid channels: {list(CHANNELS.keys())}")
        return False

    channel = CHANNELS[channel_key]
    shorts_prefix = channel.get("shorts_prefix", "SHORT")

    # Output directory inside renders/shorts
    output_dir = Path("renders") / "shorts"
    output_dir.mkdir(parents=True, exist_ok=True)

    # Unique output filename
    base_name = Path(input_video).stem if input_video else f"{shorts_prefix}_EP"
    output_video = output_dir / f"{shorts_prefix}_{base_name}_9x16.mp4"
    output_meta = output_dir / f"{shorts_prefix}_{base_name}_9x16.json"

    print("=" * 60)
    print(f"🎬 EMPIRE OS SHORTS GENERATOR - {channel['name'].upper()}")
    print("=" * 60)
    print(f"  • Source Video : {input_video}")
    print(f"  • Output Short : {output_video}")
    print(f"  • Format       : 9:16 Vertical (1080x1920)")
    print(f"  • Duration     : {duration}s (Start: {start_sec}s)")
    print(f"  • Style Mode   : {mode}")
    print(f"  • Mastering    : {'Enabled (EBU R128 -16 LUFS + Video Grading)' if master else 'Standard'}")

    # Generate metadata
    metadata = generate_short_metadata(channel_key, base_name)
    with open(output_meta, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)

    print(f"\n📝 Generated Short Metadata:")
    print(f"  • Hook Title: {metadata['title']}")
    print(f"  • Hashtags  : {' '.join(metadata['hashtags'])}")

    # Execute FFmpeg command if input file exists
    if input_video and os.path.exists(input_video):
        cmd = get_ffmpeg_command(input_video, str(output_video), start_sec, duration, mode, channel_key=channel_key, master=master)
        print(f"\n⚙️ Running FFmpeg conversion...")
        try:
            subprocess.run(cmd, check=True)
            print(f"✅ Successfully rendered short to: {output_video}")
        except FileNotFoundError:
            print("⚠️ FFmpeg was not found in system PATH. Saved metadata and command template:")
            print("   Command: " + " ".join(cmd))
        except subprocess.CalledProcessError as e:
            print(f"❌ FFmpeg processing error: {e}")
            return False
    else:
        print(f"\nℹ️ Note: Input video '{input_video}' not found on disk.")
        print(f"   Metadata JSON created at: {output_meta}")
        print("   Ready for batch rendering when episode is placed in renders/ folder.")

    # Auto-post to Social Machine if requested
    if auto_post:
        print("\n🚀 Handing off to Social Machine for distribution...")
        try:
            from social_machine.master import SocialMaster
            master_pipeline = SocialMaster()
            master_pipeline.run_pipeline(
                channel_key=channel_key,
                video_path=str(output_video),
                title=metadata["title"],
                description=metadata["description"]
            )
        except Exception as err:
            print(f"⚠️ Auto-post failed: {err}")

    print("\n" + "=" * 60)
    print("Short generation routine completed.")
    print("=" * 60)
    return True

def auto_scan_and_generate():
    """
    Scans renders/ directory for any full episode renders and generates shorts for them.
    """
    renders_dir = Path("renders")
    if not renders_dir.exists():
        print("Creating 'renders/' directory...")
        renders_dir.mkdir(parents=True, exist_ok=True)

    found_videos = False
    for channel_key, info in CHANNELS.items():
        prefix = info.get("renders_prefix")
        matching = list(renders_dir.glob(f"{prefix}*.mp4"))
        for vid in matching:
            found_videos = True
            print(f"Found episode render for {info['name']}: {vid}")
            process_short(channel_key, str(vid), start_sec=15, duration=48, mode="blur_padding", master=True)

    if not found_videos:
        print("No unprocessed episode files found in renders/. Creating demo presets for all 3 channels...")
        for channel_key in CHANNELS:
            meta = generate_short_metadata(channel_key)
            print(f"\nChannel: {CHANNELS[channel_key]['name']}")
            print(f"  Sample Short Hook: {meta['title']}")
            print(f"  Target Spec: 1080x1920 (9:16), <60s, EBU R128 (-16 LUFS), CRF 18")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Empire OS Short Video Generator")
    parser.add_argument("--channel", choices=list(CHANNELS.keys()), help="Target channel key")
    parser.add_argument("--input", type=str, help="Path to input 16:9 episode render")
    parser.add_argument("--start", type=float, default=10.0, help="Start time in seconds")
    parser.add_argument("--duration", type=float, default=45.0, help="Duration in seconds (default 45s)")
    parser.add_argument("--mode", choices=["blur_padding", "crop"], default="blur_padding", help="Reframing style")
    parser.add_argument("--post", action="store_true", help="Automatically trigger social_machine posting")
    parser.add_argument("--no-master", action="store_true", help="Disable EBU R128 loudness and texture grading")

    args = parser.parse_args()

    if args.channel and args.input:
        process_short(args.channel, args.input, args.start, args.duration, args.mode, args.post, master=not args.no_master)
    else:
        auto_scan_and_generate()
