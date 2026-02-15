import { create } from 'zustand';
import { generateTopicContent, generatePlayground } from '@/services/openai';
import type { TopicResponse, TopicState } from '@/types';

const useTopicStore = create<TopicState>((set, get) => ({
  apiKey: '',
  currentTopic: '',
  topicResponse: null,
  isLoading: false,
  error: null,
  history: [],

  setApiKey: (key) => set({ apiKey: key }),
  setCurrentTopic: (topic) => set({ currentTopic: topic }),

  generateTopic: async (topic: string) => {
    const { apiKey, history } = get();
    if (!apiKey.trim() || !topic.trim()) return;

    set({ isLoading: true, error: null, currentTopic: topic, topicResponse: null });

    try {
      const [content, playgroundHtml] = await Promise.all([
        generateTopicContent(apiKey, topic),
        generatePlayground(apiKey, topic),
      ]);

      const response: TopicResponse = {
        topic,
        explanation: content.explanation,
        useCases: content.useCases,
        playground: {
          title: `${topic} - Interactive Playground`,
          description: `Explore ${topic} through hands-on interaction`,
          htmlContent: playgroundHtml,
        },
        relatedTopics: content.relatedTopics,
      };

      set({
        topicResponse: response,
        isLoading: false,
        history: [...history.filter((h) => h !== topic), topic],
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      set({ error: message, isLoading: false });
    }
  },

  clearResults: () => set({ topicResponse: null, currentTopic: '' }),
  clearError: () => set({ error: null }),
}));

export default useTopicStore;
