import os
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
        "shorts_prefix": "GG_SHORT",
        "shorts_config": {
            "aspect_ratio": "9:16",
            "resolution": [1080, 1920],
            "max_duration_sec": 55,
            "style": "cinematic_center_crop_blur",
            "hook_templates": [
                "The most brutal ancient battle you never learned in school... ⚔️",
                "How 300 warriors defied an entire empire in 480 BC... 🔥",
                "History's greatest tactical genius made ONE fatal mistake..."
            ],
            "shorts_hashtags": ["historyshorts", "ancienthistory", "shorts", "reels", "tiktokhistory", "GodsAndGlory", "warhistory"]
        },
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
        "shorts_prefix": "LO_SHORT",
        "shorts_config": {
            "aspect_ratio": "9:16",
            "resolution": [1080, 1920],
            "max_duration_sec": 45,
            "style": "vibrant_character_focus",
            "hook_templates": [
                "Did you know Zeus had a secret pet eagle named Aetos? 🦅⚡",
                "Why was Poseidon always grumpy with the waves? 🌊",
                "Meet Little Hercules: The strongest toddler in Olympus! 💪"
            ],
            "shorts_hashtags": ["kidsvideo", "LittleOlympus", "mythologykids", "shorts", "kidsanimation", "learningisfun", "reelsforkids"]
        },
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
        "shorts_prefix": "IL_SHORT",
        "shorts_config": {
            "aspect_ratio": "9:16",
            "resolution": [1080, 1920],
            "max_duration_sec": 50,
            "style": "action_speedlines_vertical",
            "hook_templates": [
                "When the core temperature exceeds 10,000 degrees... MECH OVERDRIVE! 🤖🔥",
                "Top 3 80s anime mech transformations that give you instant chills ⚡",
                "They told pilot Kaito he had a 2% chance of survival... watch this!"
            ],
            "shorts_hashtags": ["mecha", "80sanime", "IronLegends", "animeshorts", "shorts", "scifi", "actionanime", "gundamvibes"]
        },
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
}

def check_credentials():
    """
    Checks the local environment for required credentials and prints a status report.
    This helps the user quickly see which platform integrations are configured vs. missing keys.
    """
    print("=" * 60)
    print("           EMPIRE OS SOCIAL MACHINE - CREDENTIAL CHECK          ")
    print("=" * 60)
    
    # 1. Check shared tokens
    shared_tokens = {
        "Instagram (Meta) Token": "INSTAGRAM_ACCESS_TOKEN",
        "TikTok Access Token": "TIKTOK_ACCESS_TOKEN",
        "Facebook Access Token": "FACEBOOK_ACCESS_TOKEN"
    }
    
    print("\n[SHARED ACCESS TOKENS]")
    for label, env_var in shared_tokens.items():
        val = os.getenv(env_var)
        status = "✅ CONFIGURED" if val else "❌ MISSING"
        print(f"  {label:<25} ({env_var}): {status}")
        
    # 2. Check channel-specific keys
    print("\n[CHANNEL-SPECIFIC CREDENTIALS]")
    for channel_key, info in CHANNELS.items():
        print(f"\n• {info['name']} ({channel_key}):")
        
        # YouTube
        yt_var = PLATFORM_CREDS["YouTube"][channel_key]
        yt_val = os.getenv(yt_var) if yt_var else None
        yt_status = "✅ CONFIGURED" if yt_val else "❌ MISSING"
        print(f"  - YouTube Channel ID : {yt_status} ({yt_var})")
        
        # Instagram
        ig_var = PLATFORM_CREDS["Instagram"]["accounts"][channel_key]
        if ig_var:
            ig_val = os.getenv(ig_var)
            ig_status = "✅ CONFIGURED" if ig_val else "❌ MISSING"
            print(f"  - Instagram Account ID: {ig_status} ({ig_var})")
        else:
            print("  - Instagram Account ID: ⚠️ NOT SET (Leave blank)")
            
        # TikTok
        tt_var = PLATFORM_CREDS["TikTok"]["openids"][channel_key]
        if tt_var:
            tt_val = os.getenv(tt_var)
            tt_status = "✅ CONFIGURED" if tt_val else "❌ MISSING"
            print(f"  - TikTok Open ID     : {tt_status} ({tt_var})")
        else:
            print("  - TikTok Open ID     : ⚠️ NOT SET (Leave blank)")
            
        # Facebook
        fb_var = PLATFORM_CREDS["Facebook"]["pages"][channel_key]
        if fb_var:
            fb_val = os.getenv(fb_var)
            fb_status = "✅ CONFIGURED" if fb_val else "❌ MISSING"
            print(f"  - Facebook Page ID   : {fb_status} ({fb_var})")
        else:
            print("  - Facebook Page ID   : ⚠️ NOT SET (Leave blank)")
            
    print("\n" + "=" * 60)
    print(" To configure credentials, add them to your .env file at the root.")
    print(" See SOCIAL_SETUP.md for detailed instructions on getting these keys.")
    print("=" * 60)

if __name__ == "__main__":
    check_credentials()
