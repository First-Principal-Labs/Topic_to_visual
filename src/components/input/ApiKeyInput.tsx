import { useState } from 'react';
import { Eye, EyeOff, Key } from 'lucide-react';
import useTopicStore from '@/store/useTopicStore';

export default function ApiKeyInput() {
  const apiKey = useTopicStore((s) => s.apiKey);
  const setApiKey = useTopicStore((s) => s.setApiKey);
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Key className="w-4 h-4 text-gray-400" />
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="OpenAI API Key"
          className="w-52 px-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 pr-8 transition-colors"
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {visible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        </button>
      </div>
      {apiKey && (
        <span className="w-2 h-2 bg-emerald-400 rounded-full" title="API key set" />
      )}
    </div>
  );
}
