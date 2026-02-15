import useTopicStore from '@/store/useTopicStore';
import ExplanationSection from './ExplanationSection';
import UseCasesSection from './UseCasesSection';
import PlaygroundSection from './PlaygroundSection';
import RelatedTopicsSection from './RelatedTopicsSection';

export default function ResultsContainer() {
  const topicResponse = useTopicStore((s) => s.topicResponse);

  if (!topicResponse) return null;

  return (
    <div className="space-y-8 mt-10 max-w-5xl mx-auto">
      <ExplanationSection
        explanation={topicResponse.explanation}
        topic={topicResponse.topic}
      />
      <UseCasesSection useCases={topicResponse.useCases} />
      <PlaygroundSection playground={topicResponse.playground} />
      <RelatedTopicsSection relatedTopics={topicResponse.relatedTopics} />
    </div>
  );
}
