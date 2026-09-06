/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Channel } from "./types";

export const REAL_CHANNELS: Channel[] = [
  {
    id: "gods_and_glory",
    name: "Gods and Glory AI",
    handles: {
      YouTube: "@godsandgloryai",
      TikTok: "@godsgloryai",
      Instagram: "@godsandgloryai",
      Facebook: "@godsandgloryai"
    },
    niche: "Ancient history battle documentary",
    tone: "Epic, cinematic, punchy — 10-min episodes, one battle per episode",
    audience: "History buffs 18-45, true crime/documentary fans",
    renders_prefix: "GG_EP",
    shorts_prefix: "GG_SHORT",
    shorts_config: {
      aspect_ratio: "9:16",
      resolution: [1080, 1920],
      max_duration_sec: 55,
      style: "cinematic_center_crop_blur",
      hook_templates: [
        "The most brutal ancient battle you never learned in school... ⚔️",
        "How 300 warriors defied an entire empire in 480 BC... 🔥",
        "History's greatest tactical genius made ONE fatal mistake..."
      ],
      shorts_hashtags: ["historyshorts", "ancienthistory", "shorts", "reels", "tiktokhistory", "GodsAndGlory", "warhistory"]
    },
    hashtags: ["history", "ancienthistory", "documentary", "GodsAndGlory", "battlehistory", "historyfacts", "historychannel", "historyshorts"]
  },
  {
    id: "little_olympus",
    name: "Little Olympus AI",
    handles: {
      YouTube: "@littleolympusai",
      TikTok: "@little.olympusai",
      Instagram: "@littleolympusai",
      Facebook: "@littleolympusai"
    },
    niche: "Kids Greek mythology animated series",
    tone: "Fun, warm, educational — Little Zeus and friends",
    audience: "Parents + kids 3-10",
    renders_prefix: "LO_EP",
    shorts_prefix: "LO_SHORT",
    shorts_config: {
      aspect_ratio: "9:16",
      resolution: [1080, 1920],
      max_duration_sec: 45,
      style: "vibrant_character_focus",
      hook_templates: [
        "Did you know Zeus had a secret pet eagle named Aetos? 🦅⚡",
        "Why was Poseidon always grumpy with the waves? 🌊",
        "Meet Little Hercules: The strongest toddler in Olympus! 💪"
      ],
      shorts_hashtags: ["kidsvideo", "LittleOlympus", "mythologykids", "shorts", "kidsanimation", "learningisfun", "reelsforkids"]
    },
    hashtags: ["kidsvideo", "mythology", "LittleOlympus", "greekgods", "kidsyoutube", "animation", "learningisfun", "greekMythology"]
  },
  {
    id: "iron_legends",
    name: "Iron Legends AI",
    handles: {
      YouTube: "@ironlegendsai",
      TikTok: null,
      Instagram: null,
      Facebook: null
    },
    niche: "80s mech anime style animated series",
    tone: "Action-packed, hype, 80s anime nostalgia",
    audience: "Teens + adults 16-35, anime fans",
    renders_prefix: "IL_EP",
    shorts_prefix: "IL_SHORT",
    shorts_config: {
      aspect_ratio: "9:16",
      resolution: [1080, 1920],
      max_duration_sec: 50,
      style: "action_speedlines_vertical",
      hook_templates: [
        "When the core temperature exceeds 10,000 degrees... MECH OVERDRIVE! 🤖🔥",
        "Top 3 80s anime mech transformations that give you instant chills ⚡",
        "They told pilot Kaito he had a 2% chance of survival... watch this!"
      ],
      shorts_hashtags: ["mecha", "80sanime", "IronLegends", "animeshorts", "shorts", "scifi", "actionanime", "gundamvibes"]
    },
    hashtags: ["mech", "robots", "anime", "IronLegends", "80sanime", "animation", "scifi", "mechanime"]
  }
];

export const INITIAL_ENV_VARS = {
  // Shared tokens
  INSTAGRAM_ACCESS_TOKEN: "",
  TIKTOK_ACCESS_TOKEN: "",
  FACEBOOK_ACCESS_TOKEN: "",
  // Gods & Glory
  YT_CHANNEL_GG: "UC_GG_9876543210ABCDEF",
  IG_ACCOUNT_GG: "17841400000000001",
  TIKTOK_OPENID_GG: "openid_gg_12345",
  FB_PAGE_GG: "1098765432101",
  // Little Olympus
  YT_CHANNEL_LO: "UC_LO_0123456789FEDCBA",
  IG_ACCOUNT_LO: "17841400000000002",
  TIKTOK_OPENID_LO: "openid_lo_67890",
  FB_PAGE_LO: "1098765432102",
  // Iron Legends
  YT_CHANNEL_IL: "UC_IL_1122334455QWERTY"
};
