'use client';

import React from 'react';

interface AdireLoaderProps {
  message?: string;
  progress?: number;
}

export function AdireLoader({
  message = 'Weaving your story...',
  progress,
}: AdireLoaderProps) {
  const progressPercent = progress !== undefined ? Math.min(100, progress * 8) : 0;

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-32 h-32 mb-6">
        {/* Adire-inspired swirl pattern */}
        <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="adire-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F7931A" />
              <stop offset="50%" stopColor="#FFA940" />
              <stop offset="100%" stopColor="#F7931A" />
            </linearGradient>
          </defs>
          {/* Outer circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#adire-gradient)"
            strokeWidth="3"
            strokeDasharray="10 5"
            opacity="0.3"
          />
          {/* Inner swirl pattern */}
          <path
            d="M 50 10 Q 70 30 50 50 Q 30 70 50 90"
            fill="none"
            stroke="url(#adire-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 10 50 Q 30 30 50 50 Q 70 70 90 50"
            fill="none"
            stroke="url(#adire-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Center dot with pulse */}
          <circle cx="50" cy="50" r="5" fill="#F7931A">
            <animate
              attributeName="r"
              values="5;8;5"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
        {/* Pulsing glow effect */}
        <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl animate-pulse"></div>
      </div>
      <p className="text-white font-medium mb-2">{message}</p>
      {progress !== undefined && (
        <div className="w-64">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>Found: {progress} contributions</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-linear-to-r from-orange-500 to-orange-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      )}
      <p className="text-sm text-gray-400 mt-4 italic">
        Amsoshin Ku? (Hausa: "Your contributions?")
      </p>
    </div>
  );
}