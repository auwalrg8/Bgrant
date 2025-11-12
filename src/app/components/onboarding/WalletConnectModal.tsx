'use client';

import React, { useState } from 'react';
import { Modal } from '@/app/components/ui/Modal';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Zap, RadioTower, Github } from 'lucide-react'; // Icon mappings: ZapIcon → Zap, RadioIcon → RadioTower (Nostr vibe), GithubIcon → GitHub

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (method: string) => void;
}

export function WalletConnectModal({
  isOpen,
  onClose,
  onConnect,
}: WalletConnectModalProps) {
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = async (method: string) => {
    setConnecting(method);
    // Simulate connection
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onConnect(method);
    setConnecting(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Connect Your Wallet" size="md">
      <div className="space-y-4">
        <p className="text-gray-400 mb-6">
          Choose your preferred connection method to get started
        </p>
        <button
          onClick={() => handleConnect('webln')}
          disabled={connecting !== null}
          className="w-full p-6 bg-gray-800 border-2 border-gray-700 rounded-lg hover:border-orange-500 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap size={32} className="text-orange-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">WebLN</h3>
              <p className="text-sm text-gray-400">Lightning wallet connection</p>
              <p className="text-xs text-gray-500 mt-1">Send 1 sat to verify</p>
            </div>
            {connecting === 'webln' && (
              <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            )}
          </div>
        </button>
        <button
          onClick={() => handleConnect('nostr')}
          disabled={connecting !== null}
          className="w-full p-6 bg-gray-800 border-2 border-gray-700 rounded-lg hover:border-orange-500 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <RadioTower size={32} className="text-orange-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">Nostr</h3>
              <p className="text-sm text-gray-400">Decentralized identity</p>
              <p className="text-xs text-gray-500 mt-1">Relay scan for pubkey</p>
            </div>
            {connecting === 'nostr' && (
              <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            )}
          </div>
        </button>
        <button
          onClick={() => handleConnect('github')}
          disabled={connecting !== null}
          className="w-full p-6 bg-gray-800 border-2 border-gray-700 rounded-lg hover:border-orange-500 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Github size={32} className="text-orange-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">GitHub OAuth</h3>
              <p className="text-sm text-gray-400">Connect with GitHub</p>
              <p className="text-xs text-gray-500 mt-1">OSS-only mode</p>
            </div>
            {connecting === 'github' && (
              <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            )}
          </div>
        </button>
        <div className="pt-4 border-t border-gray-700">
          <button
            onClick={() => onConnect('guest')}
            disabled={connecting !== null}
            className="w-full text-gray-400 hover:text-white transition-colors text-sm disabled:opacity-50"
          >
            Continue as guest (limited features)
          </button>
        </div>
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-400">
            <span className="text-orange-500 font-medium">Privacy:</span>{' '}
            All connections are zk-sealed. Your data stays local until you
            choose to share.
          </p>
        </div>
      </div>
    </Modal>
  );
}