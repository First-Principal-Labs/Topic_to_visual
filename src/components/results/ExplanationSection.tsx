import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BookOpen } from 'lucide-react';
import SectionCard from '@/components/shared/SectionCard';
import type { Explanation } from '@/types';

interface Props {
  explanation: Explanation;
  topic: string;
}

export default function ExplanationSection({ explanation, topic }: Props) {
  return (
    <SectionCard title={`Understanding "${topic}"`} icon={<BookOpen className="w-5 h-5" />}>
      {/* Summary callout */}
      <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 mb-6">
        <p className="text-primary-900 text-base leading-relaxed">{explanation.summary}</p>
      </div>

      {/* Detailed markdown */}
      <div className="prose prose-gray prose-sm max-w-none mb-8 prose-headings:text-gray-900 prose-a:text-primary-600 prose-code:text-primary-700 prose-code:bg-primary-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{explanation.detailed}</ReactMarkdown>
      </div>

      {/* Key concepts grid */}
      {explanation.keyConceptsList.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Key Concepts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {explanation.keyConceptsList.map((concept) => (
              <div key={concept.term} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <dt className="text-sm font-semibold text-gray-900">{concept.term}</dt>
                <dd className="text-sm text-gray-600 mt-1">{concept.definition}</dd>
              </div>
            ))}
          </div>
        </div>
      )}
    </SectionCard>
  );
}
