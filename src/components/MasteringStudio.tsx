/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Sparkles, 
  Volume2, 
  Sliders, 
  ShieldCheck, 
  Check, 
  Copy, 
  Play, 
  RotateCw, 
  Eye, 
  Activity, 
  Layers, 
  Wand2, 
  Film, 
  Tv, 
  FileCheck2, 
  AlertCircle 
} from "lucide-react";
import { REAL_CHANNELS } from "../data";

interface MasteringProfile {
  name: string;
  niche: string;
  description: string;
  filterFormula: string;
  lufs: number;
  crf: number;
  preset: string;
  accentColor: string;
  highlights: string[];
}

const MASTERING_PROFILES: Record<string, MasteringProfile> = {
  gods_and_glory: {
    name: "Gods and Glory AI",
    niche: "Ancient Battle Documentary",
    description: "Cinematic 35mm film grain infusion to eliminate AI gloss + warm bronze contrast curves for dramatic historical realism.",
    filterFormula: "noise=c1s=6:c1f=t+u,eq=contrast=1.08:brightness=-0.01:saturation=1.05",
    lufs: -14.0,
    crf: 18,
    preset: "medium",
    accentColor: "amber",
    highlights: ["Subtle 35mm organic film grain", "Bronze shadow depth curve", "EBU R128 -14 LUFS broadcast audio", "True Peak limited to -1.5 dBTP"]
  },
  little_olympus: {
    name: "Little Olympus AI",
    niche: "Kids Greek Mythology Animation",
    description: "Ultra-vibrant saturation tuning and edge sharpening optimized for mobile retina screens and young audiences.",
    filterFormula: "eq=contrast=1.1:saturation=1.22:brightness=0.01,unsharp=3:3:0.5:3:3:0.0",
    lufs: -14.0,
    crf: 18,
    preset: "medium",
    accentColor: "sky",
    highlights: ["+22% color vibrancy enhancement", "Mobile screen contrast pop", "Clean high-frequency speech clarity", "Balanced highlight protection"]
  },
  iron_legends: {
    name: "Iron Legends AI",
    niche: "80s Action Mech Anime",
    description: "Retro cel-shaded edge enhancement via unsharp masking + neon gradient contrast for authentic 80s anime action.",
    filterFormula: "unsharp=5:5:0.85:5:5:0.0,eq=contrast=1.14:saturation=1.18",
    lufs: -14.0,
    crf: 17,
    preset: "slow",
    accentColor: "purple",
    highlights: ["Unsharp cel-shaded edge enhancer", "Punchy mech explosion audio tuning", "CRF 17 slow preset for zero compression artifacts", "Sub-bass headroom preservation"]
  }
};

export default function MasteringStudio() {
  const [selectedChannel, setSelectedChannel] = useState<string>("gods_and_glory");
  const [targetPlatform, setTargetPlatform] = useState<"longform" | "shorts">("longform");
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);
  const [isInspecting, setIsInspecting] = useState<boolean>(false);
  const [inspectionResult, setInspectionResult] = useState<any>(null);
  const [isMastering, setIsMastering] = useState<boolean>(false);
  const [masterProgress, setMasterProgress] = useState<number>(0);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  const profile = MASTERING_PROFILES[selectedChannel];
  const channelData = REAL_CHANNELS.find(c => c.id === selectedChannel) || REAL_CHANNELS[0];
  const targetLUFS = targetPlatform === "longform" ? profile.lufs : -16.0;

  const cliCommand = `MASTER_VIDEO.bat --input renders/${channelData.renders_prefix}_01.mp4 --channel ${selectedChannel}`;
  const inspectCommand = `MASTER_VIDEO.bat --input renders/${channelData.renders_prefix}_01.mp4 --channel ${selectedChannel} --inspect`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handleRunInspection = () => {
    setIsInspecting(true);
    setTimeout(() => {
      setInspectionResult({
        file: `${channelData.renders_prefix}_01.mp4`,
        resolution: "1920x1080 (16:9)",
        fps: "30.0 fps (CFR)",
        videoCodec: "H.264 (High Profile, Level 4.1)",
        audioCodec: "AAC-LC (48,000 Hz, Stereo)",
        duration: "9m 42s (582.4s)",
        avDrift: "0.012s (Well within 0.35s tolerance)",
        blackFrames: "0 detected (Passed)",
        lufsBefore: "-21.4 LUFS (Quiet, Needs +7.4dB normalization)"
      });
      setIsInspecting(false);
    }, 900);
  };

  const handleSimulateMastering = () => {
    setIsMastering(true);
    setMasterProgress(15);
    setConsoleLogs([
      `[PRE-FLIGHT] Checking stream integrity for renders/${channelData.renders_prefix}_01.mp4...`,
      `[PASS] Stream integrity OK. Resolution: 1920x1080, Audio: 48kHz Stereo.`
    ]);

    setTimeout(() => {
      setMasterProgress(45);
      setConsoleLogs(prev => [
        ...prev,
        `[FILTER_GRAPH] Injecting visual profile: ${profile.filterFormula}`,
        `[EBU_R128] Analyzing audio loudness: loudnorm=I=${targetLUFS}:LRA=7.0:TP=-1.5`
      ]);
    }, 800);

    setTimeout(() => {
      setMasterProgress(80);
      setConsoleLogs(prev => [
        ...prev,
        `[ENCODER] Compressing with libx264 (CRF ${profile.crf}, preset: ${profile.preset})...`,
        `[PIX_FMT] Standardized to yuv420p broadcast profile with +faststart flags.`
      ]);
    }, 1600);

    setTimeout(() => {
      setMasterProgress(100);
      setConsoleLogs(prev => [
        ...prev,
        `[SUCCESS] Output created: renders/mastered/${channelData.renders_prefix}_01_MASTERED.mp4`,
        `✨ Mastered file is ready for flawless broadcast and algorithm boost!`
      ]);
      setIsMastering(false);
    }, 2400);
  };

  return (
    <div id="mastering-studio" className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Step 1: Video & Audio Mastering Engine</span>
          </div>
          <h2 className="text-2xl font-display font-semibold text-zinc-900 tracking-tight">
            Quality Mastering & Pre-Flight Inspector
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Broadcast-grade EBU R128 loudness normalization, custom AI texture & film grain grading, and A/V sync validation.
          </p>
        </div>

        {/* Channel Selector */}
        <div className="flex bg-zinc-100 p-1 rounded-xl gap-1">
          {Object.keys(MASTERING_PROFILES).map(key => (
            <button
              key={key}
              onClick={() => {
                setSelectedChannel(key);
                setInspectionResult(null);
                setConsoleLogs([]);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedChannel === key
                  ? "bg-white text-zinc-900 shadow-xs font-semibold"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              {MASTERING_PROFILES[key].name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Mastering Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Channel Grading Profile & Audio Standard */}
        <div className="lg:col-span-7 space-y-6">
          {/* Profile Overview Card */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                  {profile.niche}
                </span>
                <h3 className="text-lg font-display font-bold text-zinc-900 mt-0.5">
                  {profile.name} Quality Profile
                </h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  {profile.description}
                </p>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200 text-right">
                <span className="text-[10px] font-mono text-zinc-400 block">Encoding Target</span>
                <span className="text-xs font-mono font-bold text-zinc-900">CRF {profile.crf} ({profile.preset})</span>
              </div>
            </div>

            {/* Platform Loudness Target Switch */}
            <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-zinc-600" />
                  <span className="text-xs font-semibold text-zinc-800">
                    Audio Loudness Normalization (EBU R128)
                  </span>
                </div>
                <div className="flex gap-1 bg-zinc-200/70 p-0.5 rounded-lg text-[11px]">
                  <button
                    type="button"
                    onClick={() => setTargetPlatform("longform")}
                    className={`px-2.5 py-1 rounded-md transition-all font-mono ${
                      targetPlatform === "longform"
                        ? "bg-white text-zinc-900 font-bold shadow-xs"
                        : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    -14 LUFS (YouTube)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetPlatform("shorts")}
                    className={`px-2.5 py-1 rounded-md transition-all font-mono ${
                      targetPlatform === "shorts"
                        ? "bg-white text-zinc-900 font-bold shadow-xs"
                        : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    -16 LUFS (Shorts/TikTok)
                  </button>
                </div>
              </div>

              {/* Loudness Bar Visualizer */}
              <div>
                <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-1">
                  <span>-24 dB (Too Quiet)</span>
                  <span className="font-bold text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded">
                    Target: {targetLUFS} LUFS
                  </span>
                  <span>-6 dB (Distortion Limit)</span>
                </div>
                <div className="h-2.5 w-full bg-zinc-200 rounded-full overflow-hidden relative">
                  <div 
                    className="h-full bg-linear-to-r from-emerald-500 via-amber-500 to-rose-500 rounded-full transition-all duration-500"
                    style={{ width: targetPlatform === "longform" ? "74%" : "68%" }}
                  />
                </div>
              </div>
            </div>

            {/* Highlights Breakdown */}
            <div>
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2.5">
                Mastering Pipeline Enhancements
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {profile.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 bg-zinc-50/70 border border-zinc-200 rounded-xl text-xs text-zinc-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Filter Details */}
            <div className="pt-3 border-t border-zinc-100">
              <span className="text-[11px] font-mono text-zinc-400 block mb-1">
                Active FFmpeg Filter Graph:
              </span>
              <code className="text-xs font-mono bg-zinc-900 text-zinc-100 p-2.5 rounded-xl block overflow-x-auto">
                -vf "{profile.filterFormula}" -af "loudnorm=I={targetLUFS}:LRA=7:TP=-1.5"
              </code>
            </div>
          </div>

          {/* Action Trigger Box */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleSimulateMastering}
                disabled={isMastering}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold shadow-md transition-all disabled:opacity-50 cursor-pointer"
              >
                {isMastering ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin text-amber-400" />
                    <span>Mastering Video ({masterProgress}%)...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 text-amber-400" />
                    <span>Execute High-Fidelity Master</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleCopy(cliCommand)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-xs font-mono text-zinc-700 transition-colors cursor-pointer"
              >
                {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                <span>Copy MASTER_VIDEO.bat</span>
              </button>
            </div>

            {/* Console Log */}
            {consoleLogs.length > 0 && (
              <div className="bg-zinc-950 text-zinc-100 font-mono text-[11px] p-4 rounded-xl border border-zinc-800 space-y-1 overflow-x-auto max-h-48">
                {consoleLogs.map((log, i) => (
                  <p key={i} className={log.includes("SUCCESS") ? "text-emerald-400 font-bold" : log.includes("EBU_R128") ? "text-amber-400" : "text-zinc-300"}>
                    {log}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Pre-Flight Video Integrity Inspector */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-sm text-zinc-900">
                  Pre-Flight Video Inspector
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                Automated QA
              </span>
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed">
              Validates stream integrity, detects audio/video sync drift, and confirms zero dropped frames before videos enter the upload queue.
            </p>

            <button
              type="button"
              onClick={handleRunInspection}
              disabled={isInspecting}
              className="w-full py-2.5 px-4 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {isInspecting ? (
                <>
                  <RotateCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Inspecting Stream Container...</span>
                </>
              ) : (
                <>
                  <Activity className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Run Pre-Flight Integrity Check</span>
                </>
              )}
            </button>

            {/* Inspection Output Panel */}
            {inspectionResult ? (
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-4 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-200 text-zinc-600">
                  <span className="font-bold text-zinc-900">{inspectionResult.file}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                    100% HEALTHY
                  </span>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Dimensions:</span>
                    <span className="text-zinc-800 font-semibold">{inspectionResult.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Framerate:</span>
                    <span className="text-zinc-800">{inspectionResult.fps}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">A/V Sync Drift:</span>
                    <span className="text-emerald-700 font-semibold">{inspectionResult.avDrift}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Black Frames:</span>
                    <span className="text-emerald-700 font-semibold">{inspectionResult.blackFrames}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Loudness Check:</span>
                    <span className="text-amber-700 font-semibold">{inspectionResult.lufsBefore}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-zinc-200 rounded-xl p-6 text-center text-zinc-400">
                <FileCheck2 className="w-8 h-8 mx-auto mb-2 text-zinc-300" />
                <p className="text-xs">Click above to analyze stream headers, audio sync, and bitstream integrity.</p>
              </div>
            )}

            {/* CLI Command Box */}
            <div className="pt-2 border-t border-zinc-100">
              <span className="text-[10px] font-mono text-zinc-400 block mb-1">
                Windows Batch Script Command:
              </span>
              <div className="flex items-center justify-between p-2.5 bg-zinc-100 rounded-xl text-xs font-mono text-zinc-700">
                <span className="truncate pr-2">{inspectCommand}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(inspectCommand)}
                  className="text-zinc-500 hover:text-zinc-900 cursor-pointer shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
