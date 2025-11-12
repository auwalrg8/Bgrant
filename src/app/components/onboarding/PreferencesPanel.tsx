'use client';

import React, { useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Badge } from '@/app/components/ui/Badge';
import { Globe, Wifi, Users, Twitter, Bell } from 'lucide-react'; // Icon mappings

interface PreferencesPanelProps {
  onComplete: (prefs: any) => void;
}

export function PreferencesPanel({
  onComplete,
}: PreferencesPanelProps) {
  const [preferences, setPreferences] = useState({
    language: 'english',
    dataMode: 'low-bandwidth',
    endorsements: true,
    xFollows: true,
    notifications: true,
  });

  const handleSubmit = () => {
    // Save to local storage
    localStorage.setItem('bgrant_preferences', JSON.stringify(preferences));
    onComplete(preferences);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Tune Your Experience</h2>
        <p className="text-gray-400">Customize your preferences for the best experience</p>
      </div>
      {/* Language */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Globe size={20} className="text-orange-500" />
          <h3 className="text-lg font-semibold text-white">Language</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {['english', 'hausa', 'yoruba'].map((lang) => (
            <button
              key={lang}
              onClick={() =>
                setPreferences({
                  ...preferences,
                  language: lang,
                })
              }
              className={`p-4 rounded-lg border-2 transition-all ${
                preferences.language === lang
                  ? 'border-orange-500 bg-orange-500/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <span className="text-white capitalize">{lang}</span>
            </button>
          ))}
        </div>
      </Card>
      {/* Data Mode */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Wifi size={20} className="text-orange-500" />
          <h3 className="text-lg font-semibold text-white">Data Mode</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() =>
              setPreferences({
                ...preferences,
                dataMode: 'low-bandwidth',
              })
            }
            className={`p-4 rounded-lg border-2 transition-all ${
              preferences.dataMode === 'low-bandwidth'
                ? 'border-orange-500 bg-orange-500/10'
                : 'border-gray-600 hover:border-gray-500'
            }`}
          >
            <div className="text-white font-medium mb-1">Low Bandwidth</div>
            <div className="text-xs text-gray-400">Optimized for slow connections</div>
          </button>
          <button
            onClick={() =>
              setPreferences({
                ...preferences,
                dataMode: 'standard',
              })
            }
            className={`p-4 rounded-lg border-2 transition-all ${
              preferences.dataMode === 'standard'
                ? 'border-orange-500 bg-orange-500/10'
                : 'border-gray-600 hover:border-gray-500'
            }`}
          >
            <div className="text-white font-medium mb-1">Standard</div>
            <div className="text-xs text-gray-400">Full features enabled</div>
          </button>
        </div>
      </Card>
      {/* Future Boosts */}
      <Card className="bg-linear-to-r from-orange-500/10 to-transparent border-orange-500/30">
        <h3 className="text-lg font-semibold text-white mb-4">Future Boosts</h3>
        <p className="text-sm text-gray-400 mb-4">
          Enable these features to increase your grant eligibility
        </p>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
            <div className="flex items-center gap-3">
              <Users size={24} className="text-orange-500" />
              <div>
                <p className="text-white font-medium">Endorsements</p>
                <p className="text-sm text-gray-400">Enable Nostr vouches from peers</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="orange">+12%</Badge>
              <input
                type="checkbox"
                checked={preferences.endorsements}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    endorsements: e.target.checked,
                  })
                }
                className="w-5 h-5 accent-orange-500"
              />
            </div>
          </label>
          <label className="flex items-center justify-between p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
            <div className="flex items-center gap-3">
              <Twitter size={24} className="text-blue-400" />
              <div>
                <p className="text-white font-medium">X Follows</p>
                <p className="text-sm text-gray-400">Show mutual follows with Bitcoin orgs</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="orange">+15%</Badge>
              <input
                type="checkbox"
                checked={preferences.xFollows}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    xFollows: e.target.checked,
                  })
                }
                className="w-5 h-5 accent-blue-400"
              />
            </div>
          </label>
        </div>
      </Card>
      {/* Notifications */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Bell size={20} className="text-orange-500" />
          <h3 className="text-lg font-semibold text-white">Notifications</h3>
        </div>
        <label className="flex items-center justify-between p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
          <div>
            <p className="text-white font-medium">Nostr Alerts</p>
            <p className="text-sm text-gray-400">Get notified about grant opportunities and updates</p>
          </div>
          <input
            type="checkbox"
            checked={preferences.notifications}
            onChange={(e) =>
              setPreferences({
                ...preferences,
                notifications: e.target.checked,
              })
            }
            className="w-5 h-5 accent-orange-500"
          />
        </label>
      </Card>
      <div className="flex gap-3">
        <Button variant="secondary" fullWidth onClick={() => handleSubmit()}>
          Skip for Now
        </Button>
        <Button fullWidth onClick={handleSubmit}>
          Save Preferences
        </Button>
      </div>
    </div>
  );
}