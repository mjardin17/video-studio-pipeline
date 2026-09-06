/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, 
  Play, 
  RotateCw, 
  Share2, 
  Copy, 
  Check, 
  Scissors, 
  Sliders, 
  Smartphone, 
  Layers, 
  Volume2, 
  Heart, 
  MessageCircle, 
  Bookmark,
  Terminal,
  Film
} from "lucide-react";
import { REAL_CHANNELS } from "../data";
import { Channel } from "../types";

export default function ShortsStudio() {
  const [selectedChannelId, setSelectedChannelId] = useState<string>("gods_and_glory");
  const [framingMode, setFramingMode] = useState<"blur_padding" | "crop">("blur_padding");
  const [duration, setDuration] = useState<number>(45);
  const [selectedHookIndex, setSelectedHookIndex] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [renderProgress, setRenderProgress] = useState<number>(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);
  const [autoPost, setAutoPost] = useState<boolean>(true);

  const channel: Channel = REAL_CHANNELS.find(c => c.id === selectedChannelId) || REAL_CHANNELS[0];
  const shortsConfig = channel.shorts_config;
  const currentHook = shortsConfig?.hook_templates[selectedHookIndex] || "Watch until the end! 🔥";

  const pythonCmd = `python social_machine/generate_shorts.py --channel ${channel.id} --input renders/${channel.renders_prefix}_01.mp4 --start 12 --duration ${duration} --mode ${framingMode}${autoPost ? " --post" : ""}`;

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(pythonCmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handleGenerateShort = () => {
    setIsGenerating(true);
    setRenderProgress(10);
    setTerminalLogs([
      `[SHORTS] Starting short generation for ${channel.name}...`,
      `[INPUT] renders/${channel.renders_prefix}_01.mp4`,
      `[CONFIG] Resolution: 1080x1920 (9:16) | Duration: ${duration}s | Mode: ${framingMode}`
    ]);

    setTimeout(() => {
      setRenderProgress(40);
      setTerminalLogs(prev => [
        ...prev,
        `[FILTER] Applying ${framingMode === "blur_padding" ? "split+boxblur=25:5+overlay" : "crop=ih*(9/16):ih"}...`,
        `[METADATA] Hook: "${currentHook}"`
      ]);
    }, 800);

    setTimeout(() => {
      setRenderProgress(75);
      setTerminalLogs(prev => [
        ...prev,
        `[ENCODER] libx264 CRF=22 AAC=192k -> renders/shorts/${channel.shorts_prefix}_01_9x16.mp4`,
        `[METADATA] Generated tags: ${shortsConfig?.shorts_hashtags.map(t => '#' + t).join(' ')}`
      ]);
    }, 1600);

    setTimeout(() => {
      setRenderProgress(100);
      const postMsg = autoPost 
        ? `[SOCIAL_MACHINE] Handing off to TikTok & Instagram Reels councils... ✅ Posted!`
        : `[OUTPUT] Ready at renders/shorts/${channel.shorts_prefix}_01_9x16.mp4`;
      setTerminalLogs(prev => [
        ...prev,
        postMsg,
        `[STATUS] Generation finished with exit code 0.`
      ]);
      setIsGenerating(false);
    }, 2400);
  };

  return (
    <div id="shorts-studio" className="space-y-8">
      {/* Header Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold mb-2">
            <Smartphone className="w-3.5 h-3.5" />
            <span>9:16 Vertical Video Engine</span>
          </div>
          <h2 className="text-2xl font-display font-semibold text-zinc-900 tracking-tight">
            Shorts & Reels Studio
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Turn full 16:9 episodes into high-retention YouTube Shorts, TikToks, and Instagram Reels under 60 seconds.
          </p>
        </div>

        {/* Channel Selector Pills */}
        <div className="flex bg-zinc-100 p-1 rounded-xl gap-1">
          {REAL_CHANNELS.map(c => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedChannelId(c.id);
                setSelectedHookIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedChannelId === c.id
                  ? "bg-white text-zinc-900 shadow-xs font-semibold"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Workspace: Left Controls, Right Smartphone Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Generator Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Settings Card */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-5">
            <h3 className="font-semibold text-sm text-zinc-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-zinc-500" />
              Short Video Configuration
            </h3>

            {/* Framing Mode Selection */}
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">
                Re-Framing Strategy (16:9 ➔ 9:16)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFramingMode("blur_padding")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    framingMode === "blur_padding"
                      ? "border-zinc-900 bg-zinc-900 text-white shadow-xs"
                      : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100/70 text-zinc-800"
                  }`}
                >
                  <div className="font-medium text-xs flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Blur Background Padding</span>
                  </div>
                  <p className={`text-[11px] mt-1 leading-normal ${framingMode === "blur_padding" ? "text-zinc-300" : "text-zinc-500"}`}>
                    Keeps 100% of the documentary/anime action centered with aesthetic blurred margins.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFramingMode("crop")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    framingMode === "crop"
                      ? "border-zinc-900 bg-zinc-900 text-white shadow-xs"
                      : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100/70 text-zinc-800"
                  }`}
                >
                  <div className="font-medium text-xs flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5" />
                    <span>Dynamic Center Crop</span>
                  </div>
                  <p className={`text-[11px] mt-1 leading-normal ${framingMode === "crop" ? "text-zinc-300" : "text-zinc-500"}`}>
                    Zooms in to fill the full vertical 1080x1920 canvas for maximum immersion.
                  </p>
                </button>
              </div>
            </div>

            {/* Target Duration (< 60s rule) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  Target Duration
                </label>
                <span className="text-xs font-mono font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  {duration} seconds (Under 60s YouTube Shorts Limit)
                </span>
              </div>
              <div className="flex gap-2">
                {[30, 45, 55].map(sec => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setDuration(sec)}
                    className={`flex-1 py-2 text-xs font-mono rounded-lg border transition-all ${
                      duration === sec
                        ? "bg-zinc-900 text-white border-zinc-900 font-semibold"
                        : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    {sec}s Cut
                  </button>
                ))}
              </div>
            </div>

            {/* Hook Selector */}
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">
                High-Retention Hook (First 3 Seconds)
              </label>
              <div className="space-y-2">
                {shortsConfig?.hook_templates.map((hook, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedHookIndex(index)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                      selectedHookIndex === index
                        ? "border-amber-500/80 bg-amber-50/50 text-zinc-900 font-medium ring-1 ring-amber-500/40"
                        : "border-zinc-200 bg-zinc-50/50 hover:bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    <span className="text-amber-600 mr-2 font-bold font-mono">#{index + 1}</span>
                    {hook}
                  </button>
                ))}
              </div>
            </div>

            {/* Auto-Post Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-zinc-500" />
                <span className="text-xs font-medium text-zinc-800">Auto-post to Social Machine after render</span>
              </div>
              <input
                type="checkbox"
                checked={autoPost}
                onChange={(e) => setAutoPost(e.target.checked)}
                className="w-4 h-4 rounded text-zinc-900 accent-zinc-900 cursor-pointer"
              />
            </div>
          </div>

          {/* Action Trigger & Terminal Output */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleGenerateShort}
                disabled={isGenerating}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold shadow-md transition-all disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Rendering Short ({renderProgress}%)...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Generate Short Video Now</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCopyCmd}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-xs font-mono text-zinc-700 transition-colors"
              >
                {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                <span>Copy Python CLI</span>
              </button>
            </div>

            {/* Quick batch runner hint */}
            <div className="p-3 bg-zinc-50 border border-zinc-200/80 rounded-xl text-[11px] text-zinc-600 flex items-center justify-between">
              <span>Quick Windows batch file: <code className="font-mono font-semibold text-zinc-900">RUN_SHORTS.bat</code></span>
              <span className="font-mono text-zinc-400">renders/shorts/{channel.shorts_prefix}_*.mp4</span>
            </div>

            {/* Console Log */}
            {terminalLogs.length > 0 && (
              <div className="bg-zinc-950 text-zinc-100 font-mono text-[11px] p-4 rounded-xl border border-zinc-800 space-y-1 overflow-x-auto max-h-48">
                <div className="flex items-center gap-1.5 pb-2 border-b border-zinc-800 text-zinc-400 text-[10px]">
                  <Terminal className="w-3 h-3" />
                  <span>Pipeline Execution Output</span>
                </div>
                {terminalLogs.map((line, idx) => (
                  <p key={idx} className={line.includes("✅") ? "text-emerald-400" : line.includes("FILTER") ? "text-cyan-400" : line.includes("METADATA") ? "text-amber-400" : "text-zinc-300"}>
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Smartphone 9:16 Interactive Mockup */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="text-center mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Live 9:16 Phone Preview</span>
            <p className="text-[11px] text-zinc-500">1080 × 1920 Vertical Feed Layout</p>
          </div>

          {/* Smartphone Frame */}
          <div className="w-[320px] h-[640px] bg-zinc-950 rounded-[40px] p-3 shadow-2xl border-4 border-zinc-800 relative flex flex-col justify-between overflow-hidden select-none">
            {/* Camera notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-900 rounded-full z-30" />

            {/* Video Stage Inside Phone */}
            <div className="w-full h-full rounded-[28px] overflow-hidden relative flex flex-col justify-between bg-zinc-900 text-white">
              {/* Background Video Simulation */}
              {framingMode === "blur_padding" ? (
                <>
                  {/* Blurred background layer */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-60 scale-125"
                    style={{
                      backgroundImage: selectedChannelId === "gods_and_glory"
                        ? "radial-gradient(circle, #78350f 0%, #1c1917 100%)"
                        : selectedChannelId === "little_olympus"
                        ? "radial-gradient(circle, #0284c7 0%, #0f172a 100%)"
                        : "radial-gradient(circle, #7c3aed 0%, #09090b 100%)"
                    }}
                  />
                  {/* Centered 16:9 landscape video frame */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[180px] bg-zinc-950/90 border-y border-white/10 flex items-center justify-center overflow-hidden z-10 shadow-2xl">
                    <div className="text-center p-4">
                      <Film className="w-8 h-8 mx-auto text-white/40 mb-2 animate-pulse" />
                      <span className="text-xs font-display font-semibold block tracking-wide">{channel.name}</span>
                      <span className="text-[10px] text-zinc-400 font-mono">16:9 Source Episode Cut</span>
                    </div>
                  </div>
                </>
              ) : (
                /* Cropped 9:16 Fullscreen Canvas */
                <div 
                  className="absolute inset-0 flex items-center justify-center p-6 text-center"
                  style={{
                    background: selectedChannelId === "gods_and_glory"
                      ? "linear-gradient(to bottom, #9a3412, #451a03, #0c0a09)"
                      : selectedChannelId === "little_olympus"
                      ? "linear-gradient(to bottom, #0284c7, #1e3a8a, #030712)"
                      : "linear-gradient(to bottom, #9333ea, #3b0764, #09090b)"
                  }}
                >
                  <div>
                    <Film className="w-10 h-10 mx-auto text-white/50 mb-3" />
                    <span className="text-sm font-display font-bold block">{channel.name}</span>
                    <span className="text-xs text-white/60 font-mono">9:16 Cropped Dynamic Stage</span>
                  </div>
                </div>
              )}

              {/* Top Bar: Progress Indicator & Audio */}
              <div className="relative z-20 p-5 pt-8 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px]">
                  <Volume2 className="w-3 h-3 text-amber-400" />
                  <span className="font-mono">Original Audio ({duration}s)</span>
                </div>
                <span className="text-[10px] font-mono bg-rose-600/80 backdrop-blur-xs px-2 py-0.5 rounded-full font-bold">
                  SHORTS
                </span>
              </div>

              {/* Center Hook Overlay */}
              <div className="relative z-20 px-4 text-center my-auto">
                <div className="bg-black/75 backdrop-blur-md border border-amber-400/40 rounded-2xl p-3.5 shadow-xl">
                  <span className="text-[9px] font-bold font-mono tracking-widest text-amber-400 uppercase block mb-1">
                    ⚡ HOOK REVEAL
                  </span>
                  <p className="text-xs font-display font-bold text-white leading-snug">
                    {currentHook}
                  </p>
                </div>
              </div>

              {/* Right Side Social Actions (Like, Comment, Share) */}
              <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-4 text-white">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-rose-600 transition-colors">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-mono mt-1">42.8K</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-mono mt-1">1.2K</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                    <Bookmark className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-mono mt-1">8.5K</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                    <Share2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-mono mt-1">Share</span>
                </div>
              </div>

              {/* Bottom Metadata & Feed Details */}
              <div className="relative z-20 p-4 pb-6 bg-linear-to-t from-black via-black/80 to-transparent pr-16">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-[10px] font-bold text-black font-display">
                    {channel.renders_prefix.substring(0, 2)}
                  </div>
                  <span className="text-xs font-semibold text-white tracking-tight">
                    {channel.name}
                  </span>
                  <span className="text-[9px] text-zinc-400 font-mono">
                    {channel.handles.TikTok || channel.handles.YouTube}
                  </span>
                </div>

                <p className="text-[11px] text-zinc-200 line-clamp-2 leading-relaxed">
                  {currentHook} Full episode link in bio!
                </p>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {shortsConfig?.shorts_hashtags.slice(0, 4).map(tag => (
                    <span key={tag} className="text-[10px] font-mono text-cyan-300">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
