import os
import sys
from social_machine.config import CHANNELS

# Import councils
# In a real environment, these would be custom classes that handle API posting.
try:
    from social_machine.councils.facebook.council import FacebookCouncil
    from social_machine.councils.instagram.council import InstagramCouncil
    # Adding mock/placeholder classes in case imports aren't fully established locally
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
        
        print(f"\n🚀 Running social posting pipeline for: {channel_info['name']}")
        print(f"   Video: {video_path}")
        print(f"   Title: {title}")
        
        success = True
        for platform, council in self.councils.items():
            # Check if this channel supports this platform
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

        return success

if __name__ == "__main__":
    # Standard CLI invocation for testing
    master = SocialMaster()
    print("ALL_CHANNELS configured:", ALL_CHANNELS)
    if len(sys.argv) > 2:
        channel = sys.argv[1]
        video = sys.argv[2]
        title = sys.argv[3] if len(sys.argv) > 3 else "My Epic Short Video"
        desc = sys.argv[4] if len(sys.argv) > 4 else "Check out this new episode!"
        master.run_pipeline(channel, video, title, desc)
    else:
        print("\nUsage: python social_machine/master.py <channel_key> <video_path> [title] [description]")
        print("Example: python social_machine/master.py gods_and_glory /renders/GG_EP_01.mp4 'The Battle of Marathon' 'Epic breakdown of Marathon'")
