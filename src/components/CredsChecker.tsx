/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Terminal, Play, CheckCircle, AlertTriangle, Key, Info, HelpCircle } from "lucide-react";
import { INITIAL_ENV_VARS } from "../data";

export default function CredsChecker() {
  const [envVars, setEnvVars] = useState<{ [key: string]: string }>(() => {
    // Try loading from localStorage, otherwise use initial mock data
    const saved = localStorage.getItem("empire_os_env");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_ENV_VARS;
  });

  const [isRunningCheck, setIsRunningCheck] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"edit" | "terminal">("edit");

  const saveEnv = (newVars: typeof envVars) => {
    setEnvVars(newVars);
    localStorage.setItem("empire_os_env", JSON.stringify(newVars));
  };

  const handleInputChange = (key: string, value: string) => {
    const updated = { ...envVars, [key]: value };
    saveEnv(updated);
  };

  const resetToDefault = () => {
    if (window.confirm("Are you sure you want to reset credentials to the baseline defaults?")) {
      saveEnv(INITIAL_ENV_VARS);
    }
  };

  const runMockCheck = () => {
    setIsRunningCheck(true);
    setActiveTab("terminal");
    setTerminalOutput(["Initializing...", "Checking environment variables...", "Running: C:\\Users\\jjard\\AppData\\Local\\Programs\\Python\\Python314\\python.exe social_machine/config.py"]);

    setTimeout(() => {
      const output: string[] = [];
      output.push("============================================================");
      output.push("           EMPIRE OS SOCIAL MACHINE - CREDENTIAL CHECK          ");
      output.push("============================================================");
      output.push("");
      output.push("[SHARED ACCESS TOKENS]");

      const checkToken = (label: string, envVar: string) => {
        const val = envVars[envVar];
        const status = val && val.trim() !== "" ? "✅ CONFIGURED" : "❌ MISSING";
        output.push(`  ${label.padEnd(25)} (${envVar}): ${status}`);
      };

      checkToken("Instagram (Meta) Token", "INSTAGRAM_ACCESS_TOKEN");
      checkToken("TikTok Access Token", "TIKTOK_ACCESS_TOKEN");
      checkToken("Facebook Access Token", "FACEBOOK_ACCESS_TOKEN");

      output.push("");
      output.push("[CHANNEL-SPECIFIC CREDENTIALS]");

      // Gods & Glory
      output.push("\n• Gods and Glory AI (gods_and_glory):");
      const ytGG = envVars["YT_CHANNEL_GG"];
      output.push(`  - YouTube Channel ID : ${ytGG ? "✅ CONFIGURED" : "❌ MISSING"} (YT_CHANNEL_GG)`);
      const igGG = envVars["IG_ACCOUNT_GG"];
      output.push(`  - Instagram Account ID: ${igGG ? "✅ CONFIGURED" : "❌ MISSING"} (IG_ACCOUNT_GG)`);
      const ttGG = envVars["TIKTOK_OPENID_GG"];
      output.push(`  - TikTok Open ID     : ${ttGG ? "✅ CONFIGURED" : "❌ MISSING"} (TIKTOK_OPENID_GG)`);
      const fbGG = envVars["FB_PAGE_GG"];
      output.push(`  - Facebook Page ID   : ${fbGG ? "✅ CONFIGURED" : "❌ MISSING"} (FB_PAGE_GG)`);

      // Little Olympus
      output.push("\n• Little Olympus AI (little_olympus):");
      const ytLO = envVars["YT_CHANNEL_LO"];
      output.push(`  - YouTube Channel ID : ${ytLO ? "✅ CONFIGURED" : "❌ MISSING"} (YT_CHANNEL_LO)`);
      const igLO = envVars["IG_ACCOUNT_LO"];
      output.push(`  - Instagram Account ID: ${igLO ? "✅ CONFIGURED" : "❌ MISSING"} (IG_ACCOUNT_LO)`);
      const ttLO = envVars["TIKTOK_OPENID_LO"];
      output.push(`  - TikTok Open ID     : ${ttLO ? "✅ CONFIGURED" : "❌ MISSING"} (TIKTOK_OPENID_LO)`);
      const fbLO = envVars["FB_PAGE_LO"];
      output.push(`  - Facebook Page ID   : ${fbLO ? "✅ CONFIGURED" : "❌ MISSING"} (FB_PAGE_LO)`);

      // Iron Legends
      output.push("\n• Iron Legends AI (iron_legends):");
      const ytIL = envVars["YT_CHANNEL_IL"];
      output.push(`  - YouTube Channel ID : ${ytIL ? "✅ CONFIGURED" : "❌ MISSING"} (YT_CHANNEL_IL)`);
      output.push("  - Instagram Account ID: ⚠️ NOT SET (Leave blank)");
      output.push("  - TikTok Open ID     : ⚠️ NOT SET (Leave blank)");
      output.push("  - Facebook Page ID   : ⚠️ NOT SET (Leave blank)");

      output.push("");
      output.push("============================================================");
      output.push(" To configure credentials, add them to your .env file at the root.");
      output.push(" See SOCIAL_SETUP.md for detailed instructions on getting these keys.");
      output.push("============================================================");
      output.push("");
      output.push("Process finished with exit code 0.");

      setTerminalOutput(prev => [...prev, ...output]);
      setIsRunningCheck(false);
    }, 1200);
  };

  return (
    <div id="creds-checker" className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[520px]">
      <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 text-zinc-500" />
          <h3 className="font-semibold text-zinc-900 text-sm">Credentials & Environment (.env)</h3>
        </div>

        <div className="flex gap-1 bg-zinc-200/60 p-0.5 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab("edit")}
            className={`px-3 py-1 rounded-md font-medium transition-all ${
              activeTab === "edit"
                ? "bg-white text-zinc-800 shadow-sm"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            Edit Values
          </button>
          <button
            onClick={() => {
              setActiveTab("terminal");
              if (terminalOutput.length === 0) runMockCheck();
            }}
            className={`px-3 py-1 rounded-md font-medium transition-all ${
              activeTab === "terminal"
                ? "bg-white text-zinc-800 shadow-sm"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            Check Console
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 min-h-0">
        {activeTab === "edit" ? (
          <div className="space-y-5">
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
              <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <div className="text-xs text-amber-800">
                <p className="font-semibold">Local Environment Safety</p>
                <p className="mt-0.5 leading-relaxed">
                  These mock credentials are saved inside your browser cache. Real tokens must only be written to your actual local system's secret <span className="font-mono">.env</span> file, never committed to Git.
                </p>
              </div>
            </div>

            {/* Shared tokens section */}
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2.5">Shared Tokens (Meta, TikTok)</span>
              <div className="space-y-3">
                {["INSTAGRAM_ACCESS_TOKEN", "TIKTOK_ACCESS_TOKEN", "FACEBOOK_ACCESS_TOKEN"].map((field) => (
                  <div key={field} className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-zinc-500">{field}</label>
                    <input
                      type="text"
                      value={envVars[field] || ""}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      placeholder={`Enter ${field.replace(/_/g, " ").toLowerCase()}...`}
                      className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs font-mono focus:outline-hidden focus:ring-1 focus:ring-zinc-900"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Gods & Glory specific section */}
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2.5">Gods and Glory AI Credentials</span>
              <div className="grid grid-cols-2 gap-3">
                {["YT_CHANNEL_GG", "IG_ACCOUNT_GG", "TIKTOK_OPENID_GG", "FB_PAGE_GG"].map((field) => (
                  <div key={field} className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-zinc-500">{field}</label>
                    <input
                      type="text"
                      value={envVars[field] || ""}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      placeholder="Not set"
                      className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs font-mono focus:outline-hidden focus:ring-1 focus:ring-zinc-900"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Little Olympus specific section */}
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2.5">Little Olympus AI Credentials</span>
              <div className="grid grid-cols-2 gap-3">
                {["YT_CHANNEL_LO", "IG_ACCOUNT_LO", "TIKTOK_OPENID_LO", "FB_PAGE_LO"].map((field) => (
                  <div key={field} className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-zinc-500">{field}</label>
                    <input
                      type="text"
                      value={envVars[field] || ""}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      placeholder="Not set"
                      className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs font-mono focus:outline-hidden focus:ring-1 focus:ring-zinc-900"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Iron Legends specific section */}
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2.5">Iron Legends AI Credentials</span>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-mono text-zinc-500">YT_CHANNEL_IL</label>
                  <input
                    type="text"
                    value={envVars["YT_CHANNEL_IL"] || ""}
                    onChange={(e) => handleInputChange("YT_CHANNEL_IL", e.target.value)}
                    placeholder="Not set"
                    className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs font-mono focus:outline-hidden focus:ring-1 focus:ring-zinc-900"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-950 text-zinc-100 font-mono text-xs p-4 rounded-xl h-full overflow-y-auto border border-zinc-900 flex flex-col justify-between">
            <div className="space-y-1 select-text">
              {terminalOutput.map((line, idx) => (
                <p 
                  key={idx} 
                  className={
                    line.includes("✅") 
                      ? "text-emerald-400" 
                      : line.includes("❌") 
                      ? "text-rose-400" 
                      : line.includes("⚠️") 
                      ? "text-amber-400" 
                      : line.includes("==") 
                      ? "text-zinc-600" 
                      : ""
                  }
                >
                  {line}
                </p>
              ))}
            </div>
            
            {isRunningCheck && (
              <div className="flex items-center gap-2 mt-2 text-zinc-500 italic">
                <span className="animate-pulse">●</span> Running check...
              </div>
            )}
          </div>
        )}
      </div>

      <div className="px-6 py-4 border-t border-zinc-100 flex justify-between gap-3 bg-zinc-50/50">
        <button
          onClick={resetToDefault}
          className="px-4 py-2 text-xs font-medium border border-zinc-200 hover:border-zinc-300 rounded-xl text-zinc-600 hover:text-zinc-800 transition-colors"
        >
          Reset Baseline
        </button>

        <button
          onClick={runMockCheck}
          disabled={isRunningCheck}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Run CHECK_SOCIAL.bat</span>
        </button>
      </div>
    </div>
  );
}
