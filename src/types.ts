/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Handles {
  YouTube: string;
  TikTok?: string | null;
  Instagram?: string | null;
  Facebook?: string | null;
}

export interface ShortsConfig {
  aspect_ratio: string;
  resolution: [number, number];
  max_duration_sec: number;
  style: string;
  hook_templates: string[];
  shorts_hashtags: string[];
}

export interface Channel {
  id: string;
  name: string;
  handles: Handles;
  niche: string;
  tone: string;
  audience: string;
  renders_prefix: string;
  shorts_prefix?: string;
  shorts_config?: ShortsConfig;
  hashtags: string[];
}

export type PlatformType = "YouTube" | "TikTok" | "Instagram" | "Facebook";

export interface CredentialStatus {
  key: string;
  label: string;
  envVar: string;
  isConfigured: boolean;
  value?: string;
}

export interface PlatformCredentials {
  platform: PlatformType;
  sharedToken?: CredentialStatus | null;
  channelCreds: {
    [channelId: string]: CredentialStatus;
  };
}
