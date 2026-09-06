import os
from social_machine.config import CHANNELS, PLATFORM_CREDS

class FacebookCouncil:
    def __init__(self):
        # Retrieve shared meta token
        self.access_token_env_var = PLATFORM_CREDS["Facebook"]["access_token"]
        self.access_token = os.getenv(self.access_token_env_var)

    def post(self, channel_key, video_path, title, description, hashtags):
        """
        Posts a video to the channel's Facebook page using Meta's Graph API.
        """
        if channel_key not in CHANNELS:
            print(f"  [FacebookCouncil] Error: Channel key '{channel_key}' not found in configuration.")
            return False

        # Ensure page variable is configured
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

        # Combine title, description, and hashtags
        hashtag_str = " ".join([f"#{tag}" if not tag.startswith("#") else tag for tag in hashtags])
        full_caption = f"{title}\n\n{description}\n\n{hashtag_str}"

        print(f"  [FacebookCouncil] Preparing post for {CHANNELS[channel_key]['name']}:")
        print(f"    - Page ID: {page_id}")
        print(f"    - Video: {video_path}")
        print(f"    - Caption preview: {full_caption[:60]}...")

        # In a real environment, this would call Meta's Graph API for video uploads.
        # Example API call structure:
        # url = f"https://graph.facebook.com/v19.0/{page_id}/videos"
        # payload = {
        #     "description": full_caption,
        #     "access_token": self.access_token
        # }
        # files = {"source": open(video_path, "rb")}
        # response = requests.post(url, data=payload, files=files)
        
        print("  [FacebookCouncil] Posting is simulated in test mode.")
        return True
