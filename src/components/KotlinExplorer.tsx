import React, { useState } from "react";
import { kotlinCodebase, KotlinFile } from "../data/kotlinCodebase";
import { FolderCode, FileCode, Copy, Check, Terminal, ExternalLink, RefreshCw, Smartphone, Landmark } from "lucide-react";

export default function KotlinExplorer() {
  const [selectedFile, setSelectedFile] = useState<KotlinFile>(kotlinCodebase[0]);
  const [copiedMap, setCopiedMap] = useState<Record<string, boolean>>({});
  const [currentTab, setCurrentTab] = useState<"code" | "guide">("code");

  const handleCopy = (content: string, filename: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMap((prev) => ({ ...prev, [filename]: true }));
    setTimeout(() => {
      setCopiedMap((prev) => ({ ...prev, [filename]: false }));
    }, 2000);
  };

  return (
    <div id="kotlin_blueprint_explorer" className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-3xl overflow-hidden shadow-md flex flex-col h-[700px]">
      
      {/* Title block */}
      <div className="p-6 md:px-8 bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-150 dark:border-zinc-850 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
            <FolderCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              Android Jetpack Compose Codebase Explorer
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 uppercase tracking-widest">
                Kotlin 1.9+
              </span>
            </h3>
            <p className="text-xs text-zinc-400">Complete, copy-pasteable architecture files for Creation Interiors Android application</p>
          </div>
        </div>

        {/* Tab triggers */}
        <div className="flex gap-1.5 p-1 bg-zinc-200/50 dark:bg-zinc-900 rounded-xl border border-zinc-250 dark:border-zinc-800">
          <button
            onClick={() => setCurrentTab("code")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentTab === "code"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm"
                : "text-zinc-550 dark:text-zinc-400 hover:text-zinc-900"
            }`}
          >
            Project files
          </button>
          <button
            onClick={() => setCurrentTab("guide")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentTab === "guide"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm"
                : "text-zinc-550 dark:text-zinc-400 hover:text-zinc-900"
            }`}
          >
            Firebase & Setup Guide
          </button>
        </div>
      </div>

      {currentTab === "code" ? (
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* File sidebar selection list */}
          <div className="md:col-span-4 border-r border-zinc-150 dark:border-zinc-850 overflow-y-auto p-4 space-y-3.5 bg-zinc-50/50 dark:bg-zinc-905/30">
            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pl-2">
              Project Workspace Tree
            </span>
            <div className="space-y-1">
              {kotlinCodebase.map((file) => (
                <button
                  key={file.name}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-medium transition-all ${
                    selectedFile.name === file.name
                      ? "bg-amber-500/10 border-l-4 border-amber-500 text-amber-600 dark:text-amber-400 font-bold"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex items-center gap-2 text-left truncate max-w-[85%]">
                    <FileCode className="w-4 h-4 flex-shrink-0" />
                    <div className="truncate">
                      <p className="font-semibold">{file.name}</p>
                      <p className="text-[9px] text-zinc-400 truncate mt-0.5">{file.path}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Code Viewer pane right */}
          <div className="md:col-span-8 flex flex-col justify-between overflow-hidden bg-zinc-950 text-zinc-300">
            
            {/* File info bar toolbar */}
            <div className="p-4 px-6 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-zinc-200">{selectedFile.path}</p>
                <p className="text-[10.5px] text-zinc-450 mt-0.5">{selectedFile.description}</p>
              </div>
              <button
                _id={`copy_btn_${selectedFile.name}`}
                onClick={() => handleCopy(selectedFile.content, selectedFile.name)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-black transition-colors"
              >
                {copiedMap[selectedFile.name] ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Syntax preview window */}
            <div className="flex-1 overflow-auto p-6 font-mono text-[11px] leading-relaxed select-text select-all scrollbar-thin">
              <pre className="text-left text-zinc-300 whitespace-pre">
                {selectedFile.content}
              </pre>
            </div>

            {/* Prompt footer */}
            <div className="p-3 bg-zinc-900 text-[10px] text-zinc-500 dark:text-zinc-400 text-center flex items-center justify-center gap-2 border-t border-zinc-800">
              <Terminal className="w-3.5 h-3.5 text-orange-500" />
              <span>Paste these structures directly into Android Studio under the package paths listed above.</span>
            </div>

          </div>

        </div>
      ) : (
        /* Setup Guides tab layout */
        <div className="flex-1 overflow-y-auto p-6 md:p-9 space-y-6 text-sm text-zinc-700 dark:text-zinc-300">
          <div className="max-w-4xl mx-auto space-y-6">
            
            <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex gap-3.5">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 font-bold flex-shrink-0">
                ⭐
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Step-by-Step Android integration Guide</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  These guides describe integrating Google Firebase systems and Jetpack Compose. Creation Interiors works offline Fallback but connects natively to Cloud when setup.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center text-xs font-black">1</span>
                Create Project in Firebase Console
              </h3>
              <div className="pl-8 space-y-2 text-xs">
                <p>1. Open the <a href="https://console.firebase.google.com" target="_blank" className="text-amber-600 hover:underline font-bold inline-flex items-center gap-0.5">Firebase Console <ExternalLink className="w-3 h-3" /></a>.</p>
                <p>2. Select <b>Add Project</b>, input name as <code>Creation Interiors</code>, and finish project setup flows.</p>
                <p>3. Choose <b>Add App (Android logo)</b>:
                  <ul className="list-disc pl-5 py-1 space-y-1">
                    <li>Package Name: <code>com.creationinteriors.app</code></li>
                    <li>App Slang Nickname: <code>Creation Interiors Mobile App</code></li>
                    <li>SHA-1 Handshake Cert: (Optional - Obtain via Gradle <code>signingReport</code> task inside Android Studio)</li>
                  </ul>
                </p>
                <p>4. Download the resulting <code>google-services.json</code> configuration file and place it in your local app project folder path: <code>app/src/main/google-services.json</code>.</p>
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-zinc-105 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center text-xs font-black">2</span>
                Enable Database & Credentials In Cloud Console
              </h3>
              <div className="pl-8 space-y-2.5 text-xs">
                <div>
                  <p className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider text-[10px]">A. Cloud Firestore Database</p>
                  <p className="text-zinc-500 mt-0.5">Go to build, select Cloud Firestore, click create database, select Test Mode default or configure strict rule locks utilizing our custom-made secure <code>firestore.rules</code> file.</p>
                </div>
                <div>
                  <p className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider text-[10px]">B. Authentication Engines</p>
                  <p className="text-zinc-500 mt-0.5">Go to build, choose Authentication, click get-started, select <b>Email and Password</b> standard credentials engine and toggle Enable and Save.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-zinc-105 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center text-xs font-black">3</span>
                Bootstrap initial catalog inside Cloud
              </h3>
              <div className="pl-8 text-xs text-zinc-500 leading-relaxed">
                <p>When running the local Kotlin App on a smartphone first-time inside Android Studio, our background <code>seedSampleDataIfEmpty()</code> script inside <code>FurnitureViewModel.kt</code> will detect if Firestore collections exist.</p>
                <p className="mt-1">If the database contains no products, the script will automatically write the 6 primary luxurious sample beds, sectional sofas, and live-edge walnut tables with the exact specs, price values, and high-res Unsplash covers, giving your Android application a fully populated storefront instantly!</p>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
