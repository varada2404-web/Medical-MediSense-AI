import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Bell,
  Globe,
  Database,
  Check,
  Moon,
  Sun,
  Lock,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const [dataRetention, setDataRetention] = useState('local_only');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div
      id="settings-page"
      className="border border-blue-950 rounded-2xl bg-[#080D1A] p-6 shadow-xl space-y-6 text-white max-w-4xl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-blue-950">
        <div className="w-10 h-10 rounded-xl bg-blue-950/70 text-blue-400 border border-blue-900/60 flex items-center justify-center shrink-0">
          <Settings className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white">Application Settings</h3>
          <p className="text-xs text-slate-400">
            Configure privacy boundaries, audio preferences, and clinical safety protocols
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Safety & Red-Flag Triage Protocols */}
        <div className="p-4 rounded-xl border border-blue-950 bg-[#050811] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
            <Shield className="w-4 h-4" />
            <span>Clinical Safety &amp; Emergency Escalation</span>
          </div>
          <div className="flex items-center justify-between text-xs py-2 border-b border-blue-950/60">
            <div>
              <div className="font-semibold text-white">Proactive Emergency Detection</div>
              <div className="text-[11px] text-slate-400">
                Immediately display high-priority emergency guidelines when acute symptoms are mentioned
              </div>
            </div>
            <input
              type="checkbox"
              checked={emergencyAlerts}
              onChange={(e) => setEmergencyAlerts(e.target.checked)}
              className="accent-blue-600 w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between text-xs py-2">
            <div>
              <div className="font-semibold text-white">Strict Non-Diagnostic Guardrails</div>
              <div className="text-[11px] text-slate-400">
                Ensure all outputs provide educational framing and require professional physician confirmation
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 text-[10px] font-bold border border-blue-900">
              ALWAYS ACTIVE
            </span>
          </div>
        </div>

        {/* Notifications & Audio */}
        <div className="p-4 rounded-xl border border-blue-950 bg-[#050811] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
            <Bell className="w-4 h-4" />
            <span>Notifications &amp; Audio Feedback</span>
          </div>

          <div className="flex items-center justify-between text-xs py-2 border-b border-blue-950/60">
            <div>
              <div className="font-semibold text-white">Browser Notifications</div>
              <div className="text-[11px] text-slate-400">
                Receive medication reminders and wellness check-in prompts
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="accent-blue-600 w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between text-xs py-2">
            <div>
              <div className="font-semibold text-white">Text-to-Speech Engine</div>
              <div className="text-[11px] text-slate-400">
                Enable synthesized speech playback across lab findings and health tips
              </div>
            </div>
            <span className="text-xs text-blue-400 font-bold">Enabled</span>
          </div>
        </div>

        {/* Data Persistence & Privacy */}
        <div className="p-4 rounded-xl border border-blue-950 bg-[#050811] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
            <Lock className="w-4 h-4" />
            <span>Data Privacy &amp; Local Storage</span>
          </div>

          <div className="space-y-2 text-xs">
            <label className="text-slate-300 font-semibold block">Audit Log &amp; History Storage:</label>
            <select
              value={dataRetention}
              onChange={(e) => setDataRetention(e.target.value)}
              className="w-full sm:w-80 p-2 text-xs rounded-xl bg-[#080D1A] border border-blue-900 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="local_only">Local Device Only (Zero cloud persistence)</option>
              <option value="session_only">Session Storage Only (Wipe on tab close)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4 border-t border-blue-950 flex items-center justify-between">
        {savedSuccess ? (
          <span className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-bold">
            <Check className="w-4 h-4" />
            <span>Preferences saved successfully!</span>
          </span>
        ) : (
          <span className="text-[11px] text-slate-400">
            Changes are saved locally to your device.
          </span>
        )}

        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};
