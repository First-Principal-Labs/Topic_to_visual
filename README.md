# Topic to Visual

Turn any technical concept into an interactive learning experience using AI. Enter a topic, and the app generates a comprehensive explanation, real-world use cases, an interactive playground, and related topics to explore — all powered by GPT-5.2.

![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-blue) ![Vite](https://img.shields.io/badge/Vite-7-purple)

## Features

- **AI-Powered Explanations** — Clear summaries, detailed breakdowns, and key concept definitions
- **Use Cases & Applications** — Real-world applications organized by domain
- **Interactive Playground** — Self-contained HTML/CSS/JS visualizations rendered in a sandboxed iframe with sliders, buttons, and animations
- **Topic Exploration** — Click related topics to navigate a graph of concepts
- **Client-Side Only** — No backend required; uses your own OpenAI API key

## Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key with GPT-5.2 access

### Installation

```bash
git clone https://github.com/FirstPrincipleLabs/Topic_to_visual.git
cd Topic_to_visual
npm install
npm run dev
```

### Usage

1. Open `http://localhost:5173` in your browser
2. Enter your OpenAI API key in the top-right header
3. Type a topic (e.g., "Attention Block", "Diffusion") and click **Generate**
4. Explore the explanation, use cases, interactive playground, and related topics

## Architecture

The app makes **two parallel GPT-4o API calls** per topic:

| Call | Output | Format |
|------|--------|--------|
| Content | Explanation, use cases, related topics | JSON (structured output) |
| Playground | Interactive visualization | Self-contained HTML |

The playground runs inside an `<iframe sandbox="allow-scripts">` — JavaScript is enabled for interactivity, but the iframe cannot access the parent page, API key, or DOM.

## Tech Stack

- **Vite** — Build tool
- **React 19 + TypeScript** — UI framework
- **Tailwind CSS v4** — Styling
- **Zustand** — State management
- **OpenAI SDK** — LLM integration (client-side)
- **react-markdown** — Markdown rendering

## Example Topics

- Attention Block
- Transformer Architecture
- Transformer for Vision Model
- Diffusion
- Backpropagation
- Convolutional Neural Networks
- Reinforcement Learning

## Project Structure

```
src/
├── types/index.ts              # TypeScript interfaces
├── store/useTopicStore.ts      # Zustand store with parallel API calls
├── services/
│   ├── openai.ts               # OpenAI API integration
│   └── prompts.ts              # Prompt templates
└── components/
    ├── layout/Header.tsx       # Logo + title + API key input
    ├── input/                  # Topic input + generate button
    ├── results/                # Explanation, use cases, playground, related topics
    └── shared/                 # Reusable UI components
```

## License

MIT
