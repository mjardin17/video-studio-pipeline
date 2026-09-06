import os
from social_machine.config import CHANNELS, PLATFORM_CREDS

class InstagramCouncil:
    def __init__(self):
        # Retrieve shared meta token
        self.access_token_env_var = PLATFORM_CREDS["Instagram"]["access_token"]
        self.access_token = os.getenv(self.access_token_env_var)

    def post(self, channel_key, video_path, title, description, hashtags):
        """
        Posts a video container (Reel) to the channel's Instagram business account.
        """
        if channel_key not in CHANNELS:
            print(f"  [InstagramCouncil] Error: Channel key '{channel_key}' not found in configuration.")
            return False

        # Ensure account variable is configured
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

        # Combine title, description, and hashtags
        hashtag_str = " ".join([f"#{tag}" if not tag.startswith("#") else tag for tag in hashtags])
        full_caption = f"{title}\n\n{description}\n\n{hashtag_str}"

        print(f"  [InstagramCouncil] Preparing Reel for {CHANNELS[channel_key]['name']}:")
        print(f"    - Account ID: {account_id}")
        print(f"    - Video: {video_path}")
        print(f"    - Caption preview: {full_caption[:60]}...")

        # In a real environment, this would call Instagram's Graph API:
        # 1. Create a container: POST graph.facebook.com/v19.0/{account_id}/media (media_type=REELS, video_url)
        # 2. Check container status until finished/ready
        # 3. Publish container: POST graph.facebook.com/v19.0/{account_id}/media_publish (creation_id)
        
        print("  [InstagramCouncil] Reels posting is simulated in test mode.")
        return True
