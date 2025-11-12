'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Badge } from '@/app/components/ui/Badge';
import { Zap, TrendingUp, Users, Twitter } from 'lucide-react'; // ZapIcon → Zap, etc.

interface WelcomeCompleteProps {
  eligibility: number;
  hasEndorsements: boolean;
  hasXBadge: boolean;
  onContinue: () => void;
}

export function WelcomeComplete({
  eligibility,
  hasEndorsements,
  hasXBadge,
  onContinue,
}: WelcomeCompleteProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="text-center py-12 relative overflow-hidden">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-ping"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: i % 2 === 0 ? '#F7931A' : '#FFA940',
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${1 + Math.random()}s`,
                }}
              />
            ))}
          </div>
        )}
        {/* Rune Fireworks */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-orange-500/20 rounded-full mx-auto flex items-center justify-center animate-pulse">
            <Zap size={48} className="text-orange-500" />
          </div>
          {/* Radiating circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-2 border-orange-500/30 rounded-full animate-ping" />
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ animationDelay: '0.5s' }}
          >
            <div className="w-40 h-40 border-2 border-orange-500/20 rounded-full animate-ping" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Bgrant! 🎉</h1>
        <p className="text-xl text-gray-400 mb-8">
          Your profile is ready. Let's find your first grant!
        </p>
        {/* Stats Recap */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-700 rounded-lg p-4">
            <TrendingUp size={24} className="text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">{eligibility}%</div>
            <div className="text-xs text-gray-400">Eligibility</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <Zap size={24} className="text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">5</div>
            <div className="text-xs text-gray-400">OSS Items</div>
          </div>
          {hasEndorsements && (
            <div className="bg-gray-700 rounded-lg p-4">
              <Users size={24} className="text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">+12%</div>
              <div className="text-xs text-gray-400">Vouches</div>
            </div>
          )}
          {hasXBadge && (
            <div className="bg-gray-700 rounded-lg p-4">
              <Twitter size={24} className="text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">+15%</div>
              <div className="text-xs text-gray-400">X Badge</div>
            </div>
          )}
        </div>
        {/* Quick Actions */}
        <div className="bg-linear-to-r from-orange-500/10 to-transparent border border-orange-500/30 rounded-lg p-6 mb-6">
          <h3 className="text-white font-semibold mb-3">Ready to Get Started?</h3>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Badge variant="orange">
              🎯 3 matching grants found
            </Badge>
            <Badge variant="orange">
              ⚡ 92% HRF eligibility
            </Badge>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <Button size="lg" onClick={onContinue}>
            Explore Grants
          </Button>
        </div>
        <p className="text-sm text-gray-400">Hausa: "Barka da zuwa!" (Welcome!)</p>
      </Card>
      {/* Optional Tip Jar */}
      <Card className="mt-6 bg-gray-900 border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap size={20} className="text-orange-500" />
            <div>
              <p className="text-white text-sm font-medium">Enjoying Bgrant?</p>
              <p className="text-xs text-gray-400">Support the project with a zap</p>
            </div>
          </div>
          <Button size="sm" variant="secondary">
            Zap Thanks
          </Button>
        </div>
      </Card>
    </div>
  );
}