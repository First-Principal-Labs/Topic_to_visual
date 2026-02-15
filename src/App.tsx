import { Toaster } from 'react-hot-toast';
import Header from '@/components/layout/Header';
import TopicInput from '@/components/input/TopicInput';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import ResultsContainer from '@/components/results/ResultsContainer';
import useTopicStore from '@/store/useTopicStore';

export default function App() {
  const isLoading = useTopicStore((s) => s.isLoading);
  const topicResponse = useTopicStore((s) => s.topicResponse);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20">
        <div className="text-center mt-4 mb-2">
          <p className="text-gray-500 text-sm">
            Turn any concept into an interactive learning experience
          </p>
        </div>
        <TopicInput />
        <ErrorDisplay />
        {isLoading && <LoadingSpinner />}
        {!isLoading && topicResponse && <ResultsContainer />}
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}
