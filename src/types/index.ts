export interface KeyConcept {
  term: string;
  definition: string;
}

export interface Explanation {
  summary: string;
  detailed: string;
  keyConceptsList: KeyConcept[];
}

export interface UseCase {
  title: string;
  description: string;
  domain: string;
}

export interface RelatedTopic {
  name: string;
  relationship: string;
}

export interface Playground {
  title: string;
  description: string;
  htmlContent: string;
}

export interface TopicResponse {
  topic: string;
  explanation: Explanation;
  useCases: UseCase[];
  playground: Playground;
  relatedTopics: RelatedTopic[];
}

export interface TopicState {
  apiKey: string;
  currentTopic: string;
  topicResponse: TopicResponse | null;
  isLoading: boolean;
  error: string | null;
  history: string[];

  setApiKey: (key: string) => void;
  setCurrentTopic: (topic: string) => void;
  generateTopic: (topic: string) => Promise<void>;
  clearResults: () => void;
  clearError: () => void;
}
