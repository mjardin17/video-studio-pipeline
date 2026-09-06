/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Youtube, Instagram, Facebook, Tv, Users, Sparkles, Hash, AlertCircle } from "lucide-react";
import { Channel } from "../types";

interface ChannelCardProps {
  key?: string;
  channel: Channel;
}

export default function ChannelCard({ channel }: ChannelCardProps) {
  // TikTok isn't in lucide-react as a standard icon, so we make a nice custom icon or text badge
  const renderPlatformIcon = (platform: string) => {
    switch (platform) {
      case "YouTube":
        return <Youtube className="w-4 h-4 text-rose-500" />;
      case "Instagram":
        return <Instagram className="w-4 h-4 text-pink-500" />;
      case "Facebook":
        return <Facebook className="w-4 h-4 text-blue-600" />;
      case "TikTok":
        return (
          <span className="inline-flex items-center justify-center font-bold text-[10px] w-4 h-4 bg-zinc-950 text-cyan-400 rounded-sm">
            𝅘𝅥𝅮
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      id={`channel-card-${channel.id}`}
      className="bg-white border border-zinc-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      {/* Visual Header Banner based on Render Prefix */}
      <div className={`h-3 w-full bg-linear-to-r ${
        channel.id === "gods_and_glory" 
          ? "from-amber-500 via-orange-600 to-red-600" 
          : channel.id === "little_olympus"
          ? "from-sky-400 via-blue-500 to-indigo-500"
          : "from-zinc-700 via-violet-600 to-fuchsia-600"
      }`} />

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-zinc-900 tracking-tight flex items-center gap-2">
              {channel.name}
              <span className="text-xs font-mono bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-md uppercase">
                {channel.renders_prefix}
              </span>
            </h3>
            <p className="text-sm font-mono text-zinc-500 mt-1">ID: {channel.id}</p>
          </div>
          
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs bg-zinc-100 text-zinc-800 font-medium px-2.5 py-1 rounded-full border border-zinc-200 font-mono">
              {channel.renders_prefix}_*.mp4
            </span>
            {channel.shorts_prefix && (
              <span className="text-[10px] bg-rose-50 text-rose-700 font-semibold px-2 py-0.5 rounded-full border border-rose-200 font-mono">
                ⚡ {channel.shorts_prefix} (9:16)
              </span>
            )}
          </div>
        </div>

        {/* Niche & Audience */}
        <div className="space-y-3 my-4 border-t border-b border-zinc-100 py-4">
          <div className="flex items-start gap-2.5">
            <Tv className="w-4 h-4 text-zinc-400 mt-1 shrink-0" />
            <div>
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block">Niche & Tone</span>
              <p className="text-sm text-zinc-700 mt-0.5 leading-relaxed">{channel.niche}</p>
              <p className="text-xs text-zinc-500 mt-0.5 italic">{channel.tone}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Users className="w-4 h-4 text-zinc-400 mt-1 shrink-0" />
            <div>
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block">Target Audience</span>
              <p className="text-sm text-zinc-700 mt-0.5">{channel.audience}</p>
            </div>
          </div>
        </div>

        {/* Handles */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">Connected Handles</span>
          <div className="grid grid-cols-2 gap-2">
            {(["YouTube", "TikTok", "Instagram", "Facebook"] as const).map((platform) => {
              const handle = channel.handles[platform];
              return (
                <div 
                  key={platform} 
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-colors ${
                    handle 
                      ? "bg-zinc-50 border-zinc-200 text-zinc-800" 
                      : "bg-zinc-50/50 border-dashed border-zinc-200 text-zinc-400"
                  }`}
                >
                  {renderPlatformIcon(platform)}
                  <div className="truncate">
                    <span className="text-[10px] text-zinc-400 block font-normal">{platform}</span>
                    <span className="font-mono">{handle || "Not set yet"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hashtags */}
        <div>
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">Hashtags</span>
          <div className="flex flex-wrap gap-1.5 max-h-[100px] overflow-y-auto pr-1">
            {channel.hashtags.map((tag) => (
              <span 
                key={tag} 
                className="inline-flex items-center text-[11px] font-mono bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border border-zinc-200/60 px-2 py-0.5 rounded-md transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
