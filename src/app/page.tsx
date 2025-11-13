"use client";

import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { WalletConnectModal } from "@/app/components/onboarding/WalletConnectModal"; // Optional: Swap inline connect for this
import { OSSScanProgress } from "@/app/components/onboarding/OSSScanProgress";
import { PreferencesPanel } from "@/app/components/onboarding/PreferencesPanel";
import { WelcomeComplete } from "@/app/components/onboarding/WelcomeComplete";
import { Zap, Check, RadioTower, Github } from "lucide-react"; // Icon mappings

type Phase = "splash" | "connect" | "scan" | "preferences" | "welcome";

export default function Onboarding() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("splash");
  const [walletMethod, setWalletMethod] = useState<string | null>(null);
  const [scanResults, setScanResults] = useState<any>(null);
  const [preferences, setPreferences] = useState<any>(null);
  const [isReturning, setIsReturning] = useState(false);
  const [connecting, setConnecting] = useState<string | null>(null);

  // Check for returning user
  useEffect(() => {
    const savedPrefs = localStorage.getItem("bgrant_preferences");
    if (savedPrefs) {
      setIsReturning(true);
    }
  }, []);

  const phases = [
    {
      id: "splash",
      label: "Welcome",
      completed: ["connect", "scan", "preferences", "welcome"].includes(phase),
    },
    {
      id: "connect",
      label: "Connect",
      completed: ["scan", "preferences", "welcome"].includes(phase),
    },
    {
      id: "scan",
      label: "Scan",
      completed: ["preferences", "welcome"].includes(phase),
    },
    {
      id: "preferences",
      label: "Setup",
      completed: phase === "welcome",
    },
    {
      id: "welcome",
      label: "Launch",
      completed: false,
    },
  ];

  const handleConnect = async (method: string) => {
    setConnecting(method);
    // Simulate connection
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setWalletMethod(method);
    setConnecting(null);
    setPhase("scan");
  };

  const handleScanComplete = (results: any) => {
    setScanResults(results);
    setPhase("preferences");
  };

  const handlePreferencesComplete = (prefs: any) => {
    setPreferences(prefs);
    setPhase("welcome");
  };

  const handleContinueToDashboard = () => {
    router.push("/dashboard");
  };

  if (phase === "splash") {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] flex items-center justify-center p-6">
        <div className="text-center max-w-3xl">
          {/* Rune Fade Animation */}
          <div className="mb-8 relative">
            <div className="w-32 h-32 bg-orange-500/20 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
              <Zap size={64} className="text-orange-500" />
            </div>
            {/* Adire Swirl */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg
                className="w-48 h-48 animate-spin"
                style={{ animationDuration: "8s" }}
              >
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  fill="none"
                  stroke="#F7931A"
                  strokeWidth="2"
                  strokeDasharray="20 10"
                  opacity="0.3"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Unlock Bitcoin Dreams
          </h1>
          <p className="text-xl md:text-2xl text-orange-500 mb-4">
            Naija Builder? 🇳🇬
          </p>
          <p className="text-lg text-gray-400 mb-8">
            Grants in minutes • No KYC • zk-proofed
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-sm text-gray-400">Lightning Fast</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-3xl mb-2">🔒</div>
              <div className="text-sm text-gray-400">Privacy First</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-3xl mb-2">🌍</div>
              <div className="text-sm text-gray-400">Africa Focused</div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={() => setPhase("connect")}
              className="text-lg px-8 py-4"
            >
              Connect Now
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-6 italic">
            Bukatar ku? (Hausa: "What do you need?")
          </p>
          {isReturning && (
            <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
              <p className="text-orange-500">
                Welcome back! New vouches available 🎉
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Progress Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {phases.map((p, index) => (
              <Fragment key={p.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      p.completed
                        ? "bg-orange-500 border-orange-500"
                        : phase === p.id
                        ? "border-orange-500 text-orange-500 bg-orange-500/10"
                        : "border-gray-600 text-gray-400"
                    }`}
                  >
                    {p.completed ? (
                      <Check size={24} className="text-white" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={`text-sm mt-2 ${
                      phase === p.id
                        ? "text-white font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    {p.label}
                  </span>
                </div>
                {index < phases.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      p.completed ? "bg-orange-500" : "bg-gray-600"
                    }`}
                  />
                )}
              </Fragment>
            ))}
          </div>
        </div>
        {/* Phase Content */}
        {phase === "connect" && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Connect Your Wallet
              </h2>
              <p className="text-gray-400">
                Choose your preferred connection method to get started
              </p>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => handleConnect("webln")}
                disabled={connecting !== null}
                className="w-full p-6 bg-gray-800 border-2 border-gray-600 rounded-lg hover:border-orange-500 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap size={32} className="text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      WebLN
                    </h3>
                    <p className="text-sm text-gray-400">
                      Lightning wallet connection
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Send 1 sat to verify
                    </p>
                  </div>
                  {connecting === "webln" && (
                    <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
              </button>
              <button
                onClick={() => handleConnect("nostr")}
                disabled={connecting !== null}
                className="w-full p-6 bg-gray-800 border-2 border-gray-600 rounded-lg hover:border-orange-500 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <RadioTower size={32} className="text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Nostr
                    </h3>
                    <p className="text-sm text-gray-400">
                      Decentralized identity
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Relay scan for pubkey
                    </p>
                  </div>
                  {connecting === "nostr" && (
                    <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
              </button>
              <button
                onClick={() => handleConnect("github")}
                disabled={connecting !== null}
                className="w-full p-6 bg-gray-800 border-2 border-gray-600 rounded-lg hover:border-orange-500 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Github size={32} className="text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      GitHub OAuth
                    </h3>
                    <p className="text-sm text-gray-400">Connect with GitHub</p>
                    <p className="text-xs text-gray-500 mt-1">OSS-only mode</p>
                  </div>
                  {connecting === "github" && (
                    <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
              </button>
              <div className="pt-4 border-t border-gray-600">
                <button
                  onClick={() => handleConnect("guest")}
                  disabled={connecting !== null}
                  className="w-full text-gray-400 hover:text-white transition-colors text-sm disabled:opacity-50"
                >
                  Continue as guest (limited features)
                </button>
              </div>
              <Card className="bg-gray-900 border-gray-600">
                <p className="text-sm text-gray-400">
                  <span className="text-orange-500 font-medium">Privacy:</span>{" "}
                  All connections are zk-sealed. Your data stays local until you
                  choose to share.
                </p>
              </Card>
            </div>
          </div>
        )}
        {phase === "scan" && (
          <OSSScanProgress onComplete={handleScanComplete} />
        )}
        {phase === "preferences" && (
          <PreferencesPanel onComplete={handlePreferencesComplete} />
        )}
        {phase === "welcome" && scanResults && preferences && (
          <WelcomeComplete
            eligibility={scanResults.eligibility}
            hasEndorsements={preferences.endorsements}
            hasXBadge={preferences.xFollows}
            onContinue={handleContinueToDashboard}
          />
        )}
      </div>
    </div>
  );
}
