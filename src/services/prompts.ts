export const CONTENT_SYSTEM_PROMPT = `You are an expert technical educator and visual explainer. Given a technical topic, produce a comprehensive, accurate explanation suitable for someone with basic programming knowledge who wants to understand the concept deeply.

Your response must be valid JSON matching the provided schema exactly. Use markdown formatting in string fields where indicated.`;

export const CONTENT_USER_PROMPT = (topic: string) => `Topic: "${topic}"

Generate a complete educational breakdown of this topic with:

1. EXPLANATION:
   - summary: A clear 2-3 sentence overview that anyone can understand. Do NOT use markdown here.
   - detailed: A thorough markdown explanation (use ## headings, **bold**, \`code\`, bullet points). Cover: what it is, why it matters, how it works at a high level, and key intuitions. Aim for 300-500 words.
   - keyConceptsList: 4-6 key terms/concepts with clear definitions

2. USE CASES: 4-6 real-world applications with title, description (1-2 sentences), and domain (e.g., "NLP", "Computer Vision", "Healthcare", "Finance")

3. RELATED TOPICS: 5-8 related topics the user might want to explore next, with a short phrase describing the relationship (e.g., "prerequisite", "builds upon this", "alternative approach", "component of")`;

export const PLAYGROUND_SYSTEM_PROMPT = `You are an expert interactive visualization developer. You create self-contained HTML pages that serve as interactive educational playgrounds for technical concepts.

REQUIREMENTS:
- Output ONLY valid HTML. No markdown fences, no explanation text outside the HTML, just the HTML document.
- The HTML must be completely self-contained (inline CSS, inline JS, no external dependencies except CDN libraries listed below).
- Must work inside an iframe with sandbox="allow-scripts".
- Must be visually polished: use a clean dark color scheme (#0f172a background), rounded corners, shadows, good typography, smooth animations, and a modern aesthetic.
- Must be genuinely INTERACTIVE: sliders, buttons, hover effects, click-to-explore, drag elements, input fields that change the visualization in real-time.
- Must be EDUCATIONAL: each interactive element should help the user understand a specific aspect of the concept. Include labels, annotations, and brief explanations.
- Include a title and brief instructions at the top of the playground.
- Use CSS Grid or Flexbox for responsive layouts.
- Ensure all text is readable (minimum 14px, good contrast).

ALLOWED CDN LIBRARIES (use only if genuinely helpful):
- D3.js: <script src="https://d3js.org/d3.v7.min.js"></script>
- Chart.js: <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
- Math.js: <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.8.0/math.min.js"></script>

STRUCTURE your HTML as:
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{topic} - Interactive Playground</title>
  <style>/* All CSS here */</style>
</head>
<body>
  <!-- Interactive content here -->
  <script>/* All JS here */</script>
</body>
</html>

VISUALIZATION GUIDANCE:
- Neural network concepts: animated data flow, adjustable weights/parameters, step-by-step forward pass, attention heatmaps
- Algorithms: step-through with play/pause, adjustable input, visual state changes at each step
- Math concepts: interactive graphs, parameter sliders that update equations and plots in real-time
- Architecture diagrams: clickable components that expand with details, animated data paths
- ML concepts: demonstrate the core mechanism with interactive parameters the user can tweak`;

export const PLAYGROUND_USER_PROMPT = (topic: string) => `Create an interactive HTML playground for: "${topic}"

The playground should help users understand ${topic} through hands-on interaction. Focus on the most important and intuitive aspects of the concept. Make it visually engaging and genuinely educational. The user should be able to interact with the visualization to build intuition about how ${topic} works.

Include at least 2-3 distinct interactive elements (sliders, buttons, clickable areas, etc.) that each demonstrate a different aspect of the concept.`;

export const CONTENT_JSON_SCHEMA = {
  name: 'topic_content',
  strict: true,
  schema: {
    type: 'object' as const,
    properties: {
      explanation: {
        type: 'object' as const,
        properties: {
          summary: { type: 'string' as const },
          detailed: { type: 'string' as const },
          keyConceptsList: {
            type: 'array' as const,
            items: {
              type: 'object' as const,
              properties: {
                term: { type: 'string' as const },
                definition: { type: 'string' as const },
              },
              required: ['term', 'definition'],
              additionalProperties: false,
            },
          },
        },
        required: ['summary', 'detailed', 'keyConceptsList'],
        additionalProperties: false,
      },
      useCases: {
        type: 'array' as const,
        items: {
          type: 'object' as const,
          properties: {
            title: { type: 'string' as const },
            description: { type: 'string' as const },
            domain: { type: 'string' as const },
          },
          required: ['title', 'description', 'domain'],
          additionalProperties: false,
        },
      },
      relatedTopics: {
        type: 'array' as const,
        items: {
          type: 'object' as const,
          properties: {
            name: { type: 'string' as const },
            relationship: { type: 'string' as const },
          },
          required: ['name', 'relationship'],
          additionalProperties: false,
        },
      },
    },
    required: ['explanation', 'useCases', 'relatedTopics'],
    additionalProperties: false,
  },
};
