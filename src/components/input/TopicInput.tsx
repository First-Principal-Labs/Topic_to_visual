import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import useTopicStore from '@/store/useTopicStore';

export default function TopicInput() {
  const currentTopic = useTopicStore((s) => s.currentTopic);
  const setCurrentTopic = useTopicStore((s) => s.setCurrentTopic);
  const generateTopic = useTopicStore((s) => s.generateTopic);
  const isLoading = useTopicStore((s) => s.isLoading);
  const apiKey = useTopicStore((s) => s.apiKey);
  const history = useTopicStore((s) => s.history);

  const [input, setInput] = useState(currentTopic);

  const canGenerate = apiKey.trim() && input.trim() && !isLoading;

  const handleGenerate = () => {
    if (!canGenerate) return;
    setCurrentTopic(input);
    generateTopic(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleGenerate();
  };

  const handleHistoryClick = (topic: string) => {
    setInput(topic);
    setCurrentTopic(topic);
    generateTopic(topic);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a topic (e.g., Attention Block, Diffusion)"
          disabled={isLoading}
          className="flex-1 px-5 py-3 text-base bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 disabled:opacity-50 transition-all"
        />
        <button
          onClick={handleGenerate}
          disabled={!canGenerate}
          className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          Generate
        </button>
      </div>

      {!apiKey.trim() && (
        <p className="text-xs text-amber-600 mt-2 text-center">
          Please enter your OpenAI API key in the header to get started
        </p>
      )}

      {history.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {history.map((topic) => (
            <button
              key={topic}
              onClick={() => handleHistoryClick(topic)}
              disabled={isLoading}
              className="px-3 py-1 text-xs bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {topic}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
