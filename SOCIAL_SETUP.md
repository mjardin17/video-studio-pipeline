# Empire OS Social Machine - Setup Guide

This guide details exactly which API keys and IDs you need to configure in your `.env` file to enable posting across YouTube, TikTok, Instagram, and Facebook for all active channels.

---

## 📂 Required `.env` Variable Declarations

Add these to your `.env` file at the root of the project. Do not share or commit this file.

```env
# ==========================================
# 🌌 EMPIRE OS SOCIAL MACHINE CREDENTIALS
# ==========================================

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

# --- 4. IRON LEGENDS AI (@ironlegendsai) ---
YT_CHANNEL_IL="UC_your_iron_legends_youtube_channel_id"
# TikTok, Instagram, and Facebook are not yet active for Iron Legends.
# You can leave these blank or omit them:
IG_ACCOUNT_IL=""
TIKTOK_OPENID_IL=""
FB_PAGE_IL=""
```

---

## 🔑 How to Get the Credentials

### 1. YouTube Channel IDs (`YT_CHANNEL_GG`, `YT_CHANNEL_LO`, `YT_CHANNEL_IL`)
* **What it is**: The unique 24-character identifier for your YouTube channels (starts with `UC`).
* **How to find it**:
  1. Go to the YouTube channel's homepage.
  2. Right-click, select **View Page Source**, and search for `channelId`.
  3. Or go to your **YouTube Studio** ➡️ **Settings** ➡️ **Customization** ➡️ **Basic Info** or **Advanced Settings** (`https://www.youtube.com/account_advanced`) while logged in to the channel's account.

---

### 2. Meta API: Facebook and Instagram (`INSTAGRAM_ACCESS_TOKEN`, `FACEBOOK_ACCESS_TOKEN`, `IG_ACCOUNT_*`, `FB_PAGE_*`)
Meta handles both Instagram and Facebook under the same developer graph.

* **Developer Signup Portal**: [Meta for Developers](https://developers.facebook.com/)
* **Direct Registration URL**: `https://developers.facebook.com/`

#### Steps to Setup:
1. Log in to Facebook and register as a developer.
2. **Create an App**: Choose **Other** ➡️ **Business** app type.
3. **Get Page IDs (`FB_PAGE_GG`, `FB_PAGE_LO`)**:
   * Go to your Facebook Page ➡️ **About** ➡️ **Page Transparency** or **Page Info** to retrieve the numeric Page ID.
4. **Get Instagram Account IDs (`IG_ACCOUNT_GG`, `IG_ACCOUNT_LO`)**:
   * Ensure each Instagram account is a **Professional / Business Account** and linked to its respective Facebook Page.
   * Go to the Graph API Explorer and run a query: `GET v19.0/{page_id}?fields=instagram_business_account`. The returned ID is your Instagram Business Account ID.
5. **Get Access Tokens (`INSTAGRAM_ACCESS_TOKEN`, `FACEBOOK_ACCESS_TOKEN`)**:
   * Use the **Graph API Explorer** to generate a **Page Access Token** or a **User Access Token** with permissions: `pages_show_list`, `pages_read_engagement`, `pages_manage_posts`, `instagram_basic`, `instagram_content_publish`.
   * Exchange this short-lived token for a **Long-Lived (60 days) or Never-Expiring System User Token** using the Access Token Tool.

---

### 3. TikTok API (`TIKTOK_ACCESS_TOKEN`, `TIKTOK_OPENID_GG`, `TIKTOK_OPENID_LO`)
TikTok requires their Content Posting API to publish Reels/videos on behalf of creators.

* **Developer Signup Portal**: [TikTok for Developers](https://developers.tiktok.com/)
* **Direct Registration URL**: `https://developers.tiktok.com/`

#### Steps to Setup:
1. Register for a TikTok Developer account.
2. Create an App with the **Video Kit / Content Posting API** product active.
3. Authenticate the channel accounts (e.g., `@godsgloryai` and `@little.olympusai`) using OAuth 2.0 to fetch:
   * **OpenID**: A unique, secure user identifier returned upon login. Set this as `TIKTOK_OPENID_GG` or `TIKTOK_OPENID_LO`.
   * **Access Token**: Set this as `TIKTOK_ACCESS_TOKEN` (refresh tokens must be managed by the application to generate active access tokens).

---

## 🧪 Testing the Configuration

To check if your keys are successfully loaded, run:
```bash
CHECK_SOCIAL.bat
```
This runs the internal config checker and will list `✅ CONFIGURED` next to all successfully populated environment variables.

---

## 🎬 Generating & Publishing Short Videos (< 60s)

The system includes a dedicated vertical video generator (`social_machine/generate_shorts.py`) and quick runner (`RUN_SHORTS.bat`):

* **Aspect Ratio**: 9:16 Vertical (1080x1920) for YouTube Shorts, TikTok, and Instagram Reels.
* **Auto-Framing**: Supports `blur_padding` (smooth blurred top/bottom filler from source footage) and `crop` (dynamic center crop).
* **Presets & Prefixes**:
  - `GG_SHORT_*` — Gods and Glory AI (epic battle clips, tactical turning points)
  - `LO_SHORT_*` — Little Olympus AI (bite-sized Greek mythology lessons)
  - `IL_SHORT_*` — Iron Legends AI (anime mech transformations and action clips)

### Quick Run:
```bash
RUN_SHORTS.bat
```
Or with custom arguments via Python:
```bash
python social_machine/generate_shorts.py --channel gods_and_glory --input renders/GG_EP_01.mp4 --start 15 --duration 45 --mode blur_padding --post
```
Adding `--post` will automatically invoke `social_machine/master.py` to distribute the short to TikTok, Instagram Reels, and Facebook once generated!
