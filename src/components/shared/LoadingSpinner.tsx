import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const messages = [
  'Analyzing topic...',
  'Generating explanation...',
  'Building interactive playground...',
  'Crafting use cases...',
  'Almost there...',
];

export default function LoadingSpinner() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
      <p className="text-gray-500 text-sm animate-pulse">{messages[messageIndex]}</p>
    </div>
  );
}
