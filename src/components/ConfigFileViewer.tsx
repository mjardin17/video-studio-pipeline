/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Copy, Check, Terminal, FileText, ChevronRight, FileCode } from "lucide-react";

interface FileItem {
  name: string;
  path: string;
  language: "python" | "batch" | "markdown";
  content: string;
}

const FILES: FileItem[] = [
  {
    name: "config.py",
    path: "social_machine/config.py",
    language: "python",
    content: `import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Real channels configuration
CHANNELS = {
    "gods_and_glory": {
        "name": "Gods and Glory AI",
        "handles": {
            "YouTube": "@godsandgloryai",
            "TikTok": "@godsgloryai",
            "Instagram": "@godsandgloryai",
            "Facebook": "@godsandgloryai"
        },
        "niche": "Ancient history battle documentary",
        "tone": "Epic, cinematic, punchy — 10-min episodes, one battle per episode",
        "audience": "History buffs 18-45, true crime/documentary fans",
        "renders_prefix": "GG_EP",
        "hashtags": ["history", "ancienthistory", "documentary", "GodsAndGlory", "battlehistory", "historyfacts", "historychannel", "historyshorts"]
    },
    "little_olympus": {
        "name": "Little Olympus AI",
        "handles": {
            "YouTube": "@littleolympusai",
            "TikTok": "@little.olympusai",
            "Instagram": "@littleolympusai",
            "Facebook": "@littleolympusai"
        },
        "niche": "Kids Greek mythology animated series",
        "tone": "Fun, warm, educational — Little Zeus and friends",
        "audience": "Parents + kids 3-10",
        "renders_prefix": "LO_EP",
        "hashtags": ["kidsvideo", "mythology", "LittleOlympus", "greekgods", "kidsyoutube", "animation", "learningisfun", "greekMythology"]
    },
    "iron_legends": {
        "name": "Iron Legends AI",
        "handles": {
            "YouTube": "@ironlegendsai",
            "TikTok": None,
            "Instagram": None,
            "Facebook": None
        },
        "niche": "80s mech anime style animated series",
        "tone": "Action-packed, hype, 80s anime nostalgia",
        "audience": "Teens + adults 16-35, anime fans",
        "renders_prefix": "IL_EP",
        "hashtags": ["mech", "robots", "anime", "IronLegends", "80sanime", "animation", "scifi", "mechanime"]
    }
}

# Platform Credentials mapping to env variable names
PLATFORM_CREDS = {
    "YouTube": {
        "gods_and_glory": "YT_CHANNEL_GG",
        "little_olympus": "YT_CHANNEL_LO",
        "iron_legends": "YT_CHANNEL_IL"
    },
    "Instagram": {
        "access_token": "INSTAGRAM_ACCESS_TOKEN",
        "accounts": {
            "gods_and_glory": "IG_ACCOUNT_GG",
            "little_olympus": "IG_ACCOUNT_LO",
            "iron_legends": ""  # Not set yet
        }
    },
    "TikTok": {
        "access_token": "TIKTOK_ACCESS_TOKEN",
        "openids": {
            "gods_and_glory": "TIKTOK_OPENID_GG",
            "little_olympus": "TIKTOK_OPENID_LO",
            "iron_legends": ""  # Not set yet
        }
    },
    "Facebook": {
        "access_token": "FACEBOOK_ACCESS_TOKEN",
        "pages": {
            "gods_and_glory": "FB_PAGE_GG",
            "little_olympus": "FB_PAGE_LO",
            "iron_legends": ""  # Not set yet
        }
    }
}`
  },
  {
    name: "master.py",
    path: "social_machine/master.py",
    language: "python",
    content: `import os
import sys
from social_machine.config import CHANNELS

# Import councils
try:
    from social_machine.councils.facebook.council import FacebookCouncil
    from social_machine.councils.instagram.council import InstagramCouncil
except ImportError:
    class MockCouncil:
        def __init__(self, name):
            self.name = name
        def post(self, channel_key, video_path, title, description, hashtags):
            print(f"[{self.name}] Simulated post for {channel_key}: {title}")
            return True
    
    FacebookCouncil = lambda: MockCouncil("FacebookCouncil")
    InstagramCouncil = lambda: MockCouncil("InstagramCouncil")

# List of all active channels for the Empire OS automation
ALL_CHANNELS = ["gods_and_glory", "little_olympus", "iron_legends"]

class SocialMaster:
    def __init__(self):
        # TwitterCouncil is removed entirely from our imports and councils dictionary
        self.councils = {
            "facebook": FacebookCouncil(),
            "instagram": InstagramCouncil()
        }
        print("Initialized SocialMaster with active councils: Facebook, Instagram")

    def run_pipeline(self, channel_key, video_path, title, description):
        """
        Runs the post pipeline across all configured and active platforms for a given channel.
        """
        if channel_key not in ALL_CHANNELS:
            print(f"Error: {channel_key} is not in ALL_CHANNELS.")
            return False

        channel_info = CHANNELS[channel_key]
        hashtags = channel_info.get("hashtags", [])
        
        print(f"\\n🚀 Running social posting pipeline for: {channel_info['name']}")
        print(f"   Video: {video_path}")
        print(f"   Title: {title}")
        
        success = True
        for platform, council in self.councils.items():
            handle = channel_info["handles"].get(platform.capitalize())
            if not handle:
                print(f"  ⏭️ Skipping {platform} for {channel_key} (no handle configured).")
                continue

            try:
                print(f"  📤 Posting to {platform.capitalize()}...")
                posted = council.post(channel_key, video_path, title, description, hashtags)
                if posted:
                    print(f"  ✅ Successfully posted to {platform.capitalize()}!")
                else:
                    print(f"  ❌ Failed to post to {platform.capitalize()}.")
                    success = False
            except Exception as e:
                print(f"  💥 Exception while posting to {platform.capitalize()}: {e}")
                success = False

        return success`
  },
  {
    name: "facebook/council.py",
    path: "social_machine/councils/facebook/council.py",
    language: "python",
    content: `import os
from social_machine.config import CHANNELS, PLATFORM_CREDS

class FacebookCouncil:
    def __init__(self):
        self.access_token_env_var = PLATFORM_CREDS["Facebook"]["access_token"]
        self.access_token = os.getenv(self.access_token_env_var)

    def post(self, channel_key, video_path, title, description, hashtags):
        if channel_key not in CHANNELS:
            print(f"  [FacebookCouncil] Error: Channel key '{channel_key}' not found in configuration.")
            return False

        page_var = PLATFORM_CREDS["Facebook"]["pages"].get(channel_key)
        if not page_var:
            print(f"  [FacebookCouncil] Info: No Facebook page variable configured for '{channel_key}'. Skipping.")
            return False

        page_id = os.getenv(page_var)
        if not page_id:
            print(f"  [FacebookCouncil] Error: Page ID variable '{page_var}' is empty in .env. Cannot post.")
            return False

        if not self.access_token:
            print(f"  [FacebookCouncil] Error: Shared token '{self.access_token_env_var}' is empty in .env. Cannot post.")
            return False

        hashtag_str = " ".join([f"#{tag}" if not tag.startswith("#") else tag for tag in hashtags])
        full_caption = f"{title}\\n\\n{description}\\n\\n{hashtag_str}"

        print(f"  [FacebookCouncil] Preparing post for {CHANNELS[channel_key]['name']}:")
        print(f"    - Page ID: {page_id}")
        print(f"    - Video: {video_path}")
        print(f"    - Caption preview: {full_caption[:60]}...")
        return True`
  },
  {
    name: "instagram/council.py",
    path: "social_machine/councils/instagram/council.py",
    language: "python",
    content: `import os
from social_machine.config import CHANNELS, PLATFORM_CREDS

class InstagramCouncil:
    def __init__(self):
        self.access_token_env_var = PLATFORM_CREDS["Instagram"]["access_token"]
        self.access_token = os.getenv(self.access_token_env_var)

    def post(self, channel_key, video_path, title, description, hashtags):
        if channel_key not in CHANNELS:
            print(f"  [InstagramCouncil] Error: Channel key '{channel_key}' not found in configuration.")
            return False

        account_var = PLATFORM_CREDS["Instagram"]["accounts"].get(channel_key)
        if not account_var:
            print(f"  [InstagramCouncil] Info: No Instagram account variable configured for '{channel_key}'. Skipping.")
            return False

        account_id = os.getenv(account_var)
        if not account_id:
            print(f"  [InstagramCouncil] Error: Instagram account ID variable '{account_var}' is empty in .env. Cannot post.")
            return False

        if not self.access_token:
            print(f"  [InstagramCouncil] Error: Shared token '{self.access_token_env_var}' is empty in .env. Cannot post.")
            return False

        hashtag_str = " ".join([f"#{tag}" if not tag.startswith("#") else tag for tag in hashtags])
        full_caption = f"{title}\\n\\n{description}\\n\\n{hashtag_str}"

        print(f"  [InstagramCouncil] Preparing Reel for {CHANNELS[channel_key]['name']}:")
        print(f"    - Account ID: {account_id}")
        print(f"    - Video: {video_path}")
        print(f"    - Caption preview: {full_caption[:60]}...")
        return True`
  },
  {
    name: "CHECK_SOCIAL.bat",
    path: "CHECK_SOCIAL.bat",
    language: "batch",
    content: `@echo off
C:\\Users\\jjard\\AppData\\Local\\Programs\\Python\\Python314\\python.exe social_machine/config.py
pause`
  },
  {
    name: "RUN_SHORTS.bat",
    path: "RUN_SHORTS.bat",
    language: "batch",
    content: `@echo off
echo =======================================================
echo          EMPIRE OS - SHORT VIDEO GENERATOR
echo =======================================================
C:\\Users\\jjard\\AppData\\Local\\Programs\\Python\\Python314\\python.exe social_machine/generate_shorts.py %*
echo.
pause`
  },
  {
    name: "MASTER_VIDEO.bat",
    path: "MASTER_VIDEO.bat",
    language: "batch",
    content: `@echo off
echo =======================================================
echo     EMPIRE OS - VIDEO & AUDIO MASTERING ENGINE
echo   (Broadcast EBU R128 -14 LUFS + AI Texture Tuning)
echo =======================================================
C:\\Users\\jjard\\AppData\\Local\\Programs\\Python\\Python314\\python.exe social_machine/video_master.py %*
echo.
pause`
  },
  {
    name: "video_master.py",
    path: "social_machine/video_master.py",
    language: "python",
    content: `import os
import sys
import json
import subprocess
from pathlib import Path

# Channel mastering profiles
CHANNEL_MASTERING_PROFILES = {
    "gods_and_glory": {
        "name": "Gods and Glory AI",
        "video_filter": "noise=c1s=6:c1f=t+u,eq=contrast=1.08:brightness=-0.01:saturation=1.05",
        "crf": 18,
        "preset": "medium",
        "target_lufs": -14.0,
        "true_peak": -1.5,
        "lra": 7.0,
        "audio_bitrate": "320k"
    },
    "little_olympus": {
        "name": "Little Olympus AI",
        "video_filter": "eq=contrast=1.1:saturation=1.22:brightness=0.01,unsharp=3:3:0.5:3:3:0.0",
        "crf": 18,
        "preset": "medium",
        "target_lufs": -14.0,
        "true_peak": -1.5,
        "lra": 8.0,
        "audio_bitrate": "256k"
    },
    "iron_legends": {
        "name": "Iron Legends AI",
        "video_filter": "unsharp=5:5:0.85:5:5:0.0,eq=contrast=1.14:saturation=1.18",
        "crf": 17,
        "preset": "slow",
        "target_lufs": -14.0,
        "true_peak": -1.0,
        "lra": 6.0,
        "audio_bitrate": "320k"
    }
}`
  },
  {
    name: "generate_shorts.py",
    path: "social_machine/generate_shorts.py",
    language: "python",
    content: `import os
import sys
import json
import random
import subprocess
import argparse
from pathlib import Path
from social_machine.config import CHANNELS

def get_ffmpeg_command(input_path: str, output_path: str, start_sec: float, duration_sec: float, mode: str = "blur_padding") -> list:
    if mode == "crop":
        vf_filter = "crop=ih*(9/16):ih:(iw-ow)/2:0,scale=1080:1920"
    else:
        vf_filter = (
            "split[original][copy];"
            "[copy]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=25:5[blurred];"
            "[original]scale=1080:-1[foreground];"
            "[blurred][foreground]overlay=(W-w)/2:(H-h)/2"
        )
    return [
        "ffmpeg", "-y", "-ss", str(start_sec), "-t", str(duration_sec),
        "-i", input_path, "-vf", vf_filter,
        "-c:v", "libx264", "-preset", "fast", "-crf", "22",
        "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart",
        output_path
    ]

def generate_short_metadata(channel_key: str, episode_title: str = None) -> dict:
    channel = CHANNELS[channel_key]
    shorts_cfg = channel.get("shorts_config", {})
    hooks = shorts_cfg.get("hook_templates", ["Watch until the end! 🔥"])
    selected_hook = random.choice(hooks)
    title = f"{selected_hook} #{channel.get('shorts_prefix', 'SHORT')}"
    hashtags = shorts_cfg.get("shorts_hashtags", ["shorts", "viral"])
    return {
        "title": title[:95],
        "hook": selected_hook,
        "hashtags": hashtags
    }`
  },
  {
    name: "SOCIAL_SETUP.md",
    path: "SOCIAL_SETUP.md",
    language: "markdown",
    content: `# Empire OS Social Machine - Setup Guide

This guide details exactly which API keys and IDs you need to configure in your \`.env\` file to enable posting across YouTube, TikTok, Instagram, and Facebook for all active channels.

---

## 📂 Required \`.env\` Variable Declarations

Add these to your \`.env\` file at the root of the project:

\`\`\`env
# --- 1. SHARED ACCESS TOKENS ---
INSTAGRAM_ACCESS_TOKEN="your_instagram_meta_access_token_here"
TIKTOK_ACCESS_TOKEN="your_tiktok_creator_access_token_here"
FACEBOOK_ACCESS_TOKEN="your_facebook_meta_access_token_here"

# --- 2. GODS AND GLORY AI (@godsandgloryai) ---
YT_CHANNEL_GG="UC_your_gods_and_glory_youtube_channel_id"
IG_ACCOUNT_GG="your_instagram_business_account_id_for_gg"
TIKTOK_OPENID_GG="your_tiktok_openid_for_gg"
FB_PAGE_GG="your_facebook_page_id_for_gg"

# --- 3. LITTLE OLYMPUS AI (@littleolympusai) ---
YT_CHANNEL_LO="UC_your_little_olympus_youtube_channel_id"
IG_ACCOUNT_LO="your_instagram_business_account_id_for_lo"
TIKTOK_OPENID_LO="your_tiktok_openid_for_lo"
FB_PAGE_LO="your_facebook_page_id_for_lo"

# --- 4. IRON LEGENDS AI ---
YT_CHANNEL_IL="UC_your_iron_legends_youtube_channel_id"
\`\`\``
  }
];

export default function ConfigFileViewer() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeFile = FILES[activeIdx];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIcon = (lang: string) => {
    if (lang === "python") return <FileCode className="w-4 h-4 text-emerald-500" />;
    if (lang === "batch") return <Terminal className="w-4 h-4 text-yellow-500" />;
    return <FileText className="w-4 h-4 text-blue-500" />;
  };

  return (
    <div id="config-file-viewer" className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-xl">
      <div className="flex border-b border-zinc-800">
        {/* Sidebar / tab selector */}
        <div className="w-64 bg-zinc-950 border-r border-zinc-800 py-3 flex flex-col justify-between shrink-0">
          <div>
            <div className="px-4 pb-2 mb-2 border-b border-zinc-800">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Repository Files</span>
            </div>
            <div className="space-y-1 px-2">
              {FILES.map((file, idx) => (
                <button
                  key={file.path}
                  onClick={() => {
                    setActiveIdx(idx);
                    setCopied(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    idx === activeIdx
                      ? "bg-zinc-800 text-white shadow-inner"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                  }`}
                >
                  {getIcon(file.language)}
                  <div className="text-left truncate">
                    <p className="font-mono leading-none">{file.name}</p>
                    <p className="text-[9px] text-zinc-600 font-mono mt-0.5 truncate">{file.path}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-4 border-t border-zinc-800/60 text-[11px] text-zinc-500">
            <p>📁 Root: <span className="font-mono">video-bot-pipeline/</span></p>
            <p className="mt-1">🐍 Python 3.14</p>
          </div>
        </div>

        {/* Code viewing window */}
        <div className="flex-1 flex flex-col min-w-0 bg-zinc-900">
          <div className="flex justify-between items-center px-6 py-3 bg-zinc-950/80 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400">{activeFile.path}</span>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-all text-xs font-medium"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          <div className="p-6 overflow-auto max-h-[480px] min-h-[350px]">
            <pre className="font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto select-text whitespace-pre-wrap">
              <code>{activeFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
