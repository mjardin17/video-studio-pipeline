/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Tv, 
  Terminal, 
  Settings, 
  CheckCircle, 
  Key, 
  Sparkles, 
  Layers, 
  HelpCircle, 
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  FileText
} from "lucide-react";
import { REAL_CHANNELS } from "./data";
import ChannelCard from "./components/ChannelCard";
import CredsChecker from "./components/CredsChecker";
import ConfigFileViewer from "./components/ConfigFileViewer";
import ShortsStudio from "./components/ShortsStudio";
import MasteringStudio from "./components/MasteringStudio";

export default function App() {
  const [activeTab, setActiveTab] = useState<"channels" | "mastering" | "shorts" | "creds" | "files">("mastering");

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans antialiased pb-16">
      {/* Visual background gradient accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-50/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-amber-50/30 rounded-full blur-3xl pointer-events-none" />

      {/* Persistent App Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-zinc-950 rounded-xl flex items-center justify-center text-white font-display font-bold text-lg shadow-sm">
              👑
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold tracking-tight text-zinc-900">EMPIRE OS</span>
                <span className="text-[10px] font-mono uppercase bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded-sm">
                  Active
                </span>
              </div>
              <p className="text-[11px] font-mono text-zinc-400">social_machine/ v1.2.0</p>
            </div>
          </div>

          <nav className="flex gap-1.5 bg-zinc-100/80 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("channels")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "channels"
                  ? "bg-white text-zinc-900 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              Channels
            </button>
            <button
              onClick={() => setActiveTab("mastering")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === "mastering"
                  ? "bg-white text-zinc-900 shadow-xs font-semibold text-amber-700"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              <span>Mastering Studio</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            </button>
            <button
              onClick={() => setActiveTab("shorts")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === "shorts"
                  ? "bg-white text-zinc-900 shadow-xs font-semibold text-rose-600"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              <span>Shorts Studio</span>
            </button>
            <button
              onClick={() => setActiveTab("creds")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "creds"
                  ? "bg-white text-zinc-900 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              Credentials
            </button>
            <button
              onClick={() => setActiveTab("files")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "files"
                  ? "bg-white text-zinc-900 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              Repo Files
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400 font-mono hidden md:inline">
              C:\Users\jjard\video-bot-pipeline
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-10">
        {/* Banner Hero */}
        <div className="bg-zinc-950 text-white rounded-3xl p-8 md:p-10 shadow-xl overflow-hidden relative mb-10">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-bl from-zinc-800/40 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-zinc-800/80 border border-zinc-700/50 rounded-full px-3 py-1 text-xs text-zinc-300 font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Multi-Platform Social Pipeline Initialized</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight leading-tight text-white">
              Empire OS Social Machine
            </h1>
            <p className="text-zinc-400 text-sm md:text-base mt-4 leading-relaxed">
              Configure and test the social machine posting automation. Replace old mech test channels with real production handles, manage global token mapping, and check credentials with <span className="font-mono text-white">CHECK_SOCIAL.bat</span>.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-zinc-800/60 max-w-lg">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Active Channels</p>
              <p className="text-2xl font-display font-semibold mt-1">3</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Integrations</p>
              <p className="text-2xl font-display font-semibold mt-1">4 Platforms</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Status</p>
              <p className="text-2xl font-display font-semibold text-emerald-400 mt-1">Ready</p>
            </div>
          </div>
        </div>

        {/* Tab Contents */}
        {activeTab === "channels" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-display font-semibold text-zinc-900 tracking-tight">Real Channels & Metadata</h2>
                <p className="text-xs text-zinc-500 mt-1">Configured channels representing active video production loops.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {REAL_CHANNELS.map((channel) => (
                <ChannelCard key={channel.id} channel={channel} />
              ))}
            </div>

            {/* Quick Summary Guidelines */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-zinc-900 text-sm mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Pipeline Rules & Guidelines
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-600 leading-relaxed">
                <div>
                  <h4 className="font-semibold text-zinc-800 mb-1">1. Render Naming Conformance</h4>
                  <p>All compiled episodes must stick to their configured render prefix. For example, Gods & Glory files are named <span className="font-mono bg-zinc-100 text-zinc-800 px-1 py-0.5 rounded">GG_EP_001.mp4</span>. The automation identifies matching tags using this format.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-800 mb-1">2. Single Meta Token Strategy</h4>
                  <p>Both Instagram Business and Facebook Pages leverage Meta's shared system token. You only need to request and refresh <span className="font-mono bg-zinc-100 text-zinc-800 px-1 py-0.5 rounded">INSTAGRAM_ACCESS_TOKEN</span> and <span className="font-mono bg-zinc-100 text-zinc-800 px-1 py-0.5 rounded">FACEBOOK_ACCESS_TOKEN</span>.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-800 mb-1">3. Future Expansions</h4>
                  <p>Iron Legends is presently restricted to YouTube. Leave the corresponding TikTok, Instagram, and Facebook credentials blank inside your <span className="font-mono bg-zinc-100 text-zinc-800 px-1 py-0.5 rounded">.env</span> file, and the poster will safely bypass them.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "mastering" && (
          <MasteringStudio />
        )}

        {activeTab === "shorts" && (
          <ShortsStudio />
        )}

        {activeTab === "creds" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Credentials Editor / Console */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-display font-semibold text-zinc-900 tracking-tight">Platform API Setup</h2>
                <p className="text-xs text-zinc-500 mt-1">Simulate configuration and check environmental variables.</p>
              </div>
              <CredsChecker />
            </div>

            {/* Sidebar Signup Guide */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm h-fit">
              <h3 className="font-semibold text-zinc-900 text-sm mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-zinc-500" />
                Integration Signup Hub
              </h3>
              
              <div className="space-y-4 text-xs text-zinc-600 leading-relaxed">
                <p>Register on the following official portals to retrieve access tokens and account identifiers:</p>
                
                <div className="p-3 border border-zinc-100 rounded-xl bg-zinc-50 hover:bg-zinc-100/50 transition-colors">
                  <span className="font-semibold text-zinc-950 block">TikTok Developers Portal</span>
                  <p className="text-zinc-500 mt-0.5">Use Content Posting API for @godsgloryai and @little.olympusai.</p>
                  <a 
                    href="https://developers.tiktok.com/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-900 hover:text-indigo-600 font-semibold mt-2"
                  >
                    <span>developers.tiktok.com</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="p-3 border border-zinc-100 rounded-xl bg-zinc-50 hover:bg-zinc-100/50 transition-colors">
                  <span className="font-semibold text-zinc-950 block">Meta for Developers (FB/IG)</span>
                  <p className="text-zinc-500 mt-0.5">Generate access tokens, manage Page permissions, and query IG Business IDs.</p>
                  <a 
                    href="https://developers.facebook.com/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-900 hover:text-indigo-600 font-semibold mt-2"
                  >
                    <span>developers.facebook.com</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="p-3 border border-zinc-100 rounded-xl bg-zinc-50 hover:bg-zinc-100/50 transition-colors">
                  <span className="font-semibold text-zinc-950 block">Google Cloud Console (YT)</span>
                  <p className="text-zinc-500 mt-0.5">Identify channel IDs inside your YouTube Advanced Account Settings page.</p>
                  <a 
                    href="https://www.youtube.com/account_advanced" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-900 hover:text-indigo-600 font-semibold mt-2"
                  >
                    <span>YouTube Advanced Settings</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "files" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-display font-semibold text-zinc-900 tracking-tight">Generated Repo Configurations</h2>
              <p className="text-xs text-zinc-500 mt-1">Copy and examine file contents written to your local Python pipeline repository.</p>
            </div>
            
            <ConfigFileViewer />
          </div>
        )}
      </main>
    </div>
  );
}
