import { Compass } from 'lucide-react';
import SectionCard from '@/components/shared/SectionCard';
import useTopicStore from '@/store/useTopicStore';
import type { RelatedTopic } from '@/types';

interface Props {
  relatedTopics: RelatedTopic[];
}

export default function RelatedTopicsSection({ relatedTopics }: Props) {
  const generateTopic = useTopicStore((s) => s.generateTopic);
  const isLoading = useTopicStore((s) => s.isLoading);

  const handleClick = (topicName: string) => {
    if (isLoading) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    generateTopic(topicName);
  };

  return (
    <SectionCard title="Explore Related Topics" icon={<Compass className="w-5 h-5" />}>
      <div className="flex flex-wrap gap-3">
        {relatedTopics.map((rt) => (
          <button
            key={rt.name}
            onClick={() => handleClick(rt.name)}
            disabled={isLoading}
            className="group px-4 py-2.5 bg-primary-50 hover:bg-primary-100 border border-primary-100 hover:border-primary-200 rounded-xl transition-all disabled:opacity-50 text-left cursor-pointer"
          >
            <span className="block text-sm font-medium text-primary-700 group-hover:text-primary-800">
              {rt.name}
            </span>
            <span className="block text-xs text-primary-400 mt-0.5">{rt.relationship}</span>
          </button>
        ))}
      </div>
    </SectionCard>
  );
}
