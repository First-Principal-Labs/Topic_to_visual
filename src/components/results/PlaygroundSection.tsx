import { useState, useCallback } from 'react';
import { Play, Maximize2, Minimize2, ExternalLink, RefreshCw } from 'lucide-react';
import SectionCard from '@/components/shared/SectionCard';
import useTopicStore from '@/store/useTopicStore';
import type { Playground } from '@/types';

interface Props {
  playground: Playground;
}

export default function PlaygroundSection({ playground }: Props) {
  const [expanded, setExpanded] = useState(false);
  const generateTopic = useTopicStore((s) => s.generateTopic);
  const currentTopic = useTopicStore((s) => s.currentTopic);
  const isLoading = useTopicStore((s) => s.isLoading);

  const openInNewTab = useCallback(() => {
    const blob = new Blob([playground.htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }, [playground.htmlContent]);

  const regenerate = useCallback(() => {
    if (currentTopic && !isLoading) {
      generateTopic(currentTopic);
    }
  }, [currentTopic, isLoading, generateTopic]);

  return (
    <SectionCard
      title="Interactive Playground"
      icon={<Play className="w-5 h-5" />}
      className="overflow-visible"
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">{playground.description}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={regenerate}
            disabled={isLoading}
            className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
            title="Regenerate playground"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors cursor-pointer"
            title={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={openInNewTab}
            className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors cursor-pointer"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      <iframe
        srcDoc={playground.htmlContent}
        sandbox="allow-scripts"
        title={playground.title}
        className="playground-iframe border border-gray-200 rounded-xl"
        style={{ height: expanded ? '800px' : '600px' }}
      />
    </SectionCard>
  );
}
