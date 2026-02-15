import { AlertCircle, X } from 'lucide-react';
import useTopicStore from '@/store/useTopicStore';

export default function ErrorDisplay() {
  const error = useTopicStore((s) => s.error);
  const clearError = useTopicStore((s) => s.clearError);

  if (!error) return null;

  return (
    <div className="mx-auto max-w-2xl mt-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-red-800 text-sm font-medium">Something went wrong</p>
        <p className="text-red-600 text-sm mt-1">{error}</p>
      </div>
      <button onClick={clearError} className="text-red-400 hover:text-red-600 transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
