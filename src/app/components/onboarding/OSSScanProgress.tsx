'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Badge } from '@/app/components/ui/Badge';
import { AdireLoader } from '@/app/components/ui/AdireLoader';
import { Github, Radio, Zap, TrendingUp } from 'lucide-react'; // Icon mappings: GithubIcon → GitHub, etc.

interface OSSScanProgressProps {
  onComplete: (data: any) => void;
}

export function OSSScanProgress({
  onComplete,
}: OSSScanProgressProps) {
  const [progress, setProgress] = useState(0);
  const [currentScan, setCurrentScan] = useState<'github' | 'nostr' | 'zaps'>('github');
  const [results, setResults] = useState({
    github: 0,
    nostr: 0,
    zaps: 0,
    eligibility: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete(results);
          }, 1000);
          return 100;
        }
        // Update scan phase
        if (prev < 33) {
          setCurrentScan('github');
          setResults((r) => ({
            ...r,
            github: Math.min(5, Math.floor(prev / 7)),
          }));
        } else if (prev < 66) {
          setCurrentScan('nostr');
          setResults((r) => ({
            ...r,
            nostr: Math.min(8, Math.floor((prev - 33) / 4)),
          }));
        } else {
          setCurrentScan('zaps');
          setResults((r) => ({
            ...r,
            zaps: Math.min(12, Math.floor((prev - 66) / 3)),
            eligibility: Math.min(92, Math.floor(prev * 0.92)),
          }));
        }
        return prev + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete, results]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="text-center">
        <AdireLoader message="Weaving your chain..." progress={Math.floor(progress / 10)} />
        <div className="mt-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            {currentScan === 'github' && <Github size={20} className="text-orange-500 animate-pulse" />}
            {currentScan === 'nostr' && <Radio size={20} className="text-orange-500 animate-pulse" />}
            {currentScan === 'zaps' && <Zap size={20} className="text-orange-500 animate-pulse" />}
            <span className="text-white font-medium">
              {currentScan === 'github' && 'Scanning GitHub PRs...'}
              {currentScan === 'nostr' && 'Pulling Nostr events...'}
              {currentScan === 'zaps' && 'Calculating eligibility...'}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
            <div
              className="h-2 rounded-full bg-linear-to-r from-orange-500 to-orange-400 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </Card>
      {progress > 20 && (
        <Card className="bg-linear-to-r from-orange-500/10 to-transparent border-orange-500/30">
          <h3 className="text-white font-semibold mb-4">Detected Contributions</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-700 rounded-lg p-4 text-center">
                      <Github size={24} className="text-orange-500 mx-auto mb-2" />
                      <span className="text-white">GitHub PRs: {results.github}</span>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4 text-center">
                      <Radio size={24} className="text-orange-500 mx-auto mb-2" />
                      <span className="text-white">Nostr Events: {results.nostr}</span>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4 text-center">
                      <Zap size={24} className="text-orange-500 mx-auto mb-2" />
                      <span className="text-white">Zaps: {results.zaps}</span>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4 text-center">
                      <TrendingUp size={24} className="text-orange-500 mx-auto mb-2" />
                      <span className="text-white">Eligibility: {results.eligibility}%</span>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          );
        }