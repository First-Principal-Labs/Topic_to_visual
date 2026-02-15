import OpenAI from 'openai';
import {
  CONTENT_SYSTEM_PROMPT,
  CONTENT_USER_PROMPT,
  CONTENT_JSON_SCHEMA,
  PLAYGROUND_SYSTEM_PROMPT,
  PLAYGROUND_USER_PROMPT,
} from './prompts';

function createClient(apiKey: string): OpenAI {
  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });
}

export async function generateTopicContent(apiKey: string, topic: string) {
  const client = createClient(apiKey);

  const response = await client.chat.completions.create({
    model: 'gpt-5.2',
    messages: [
      { role: 'system', content: CONTENT_SYSTEM_PROMPT },
      { role: 'user', content: CONTENT_USER_PROMPT(topic) },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: CONTENT_JSON_SCHEMA,
    },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error('No content returned from OpenAI');
  return JSON.parse(content);
}

export async function generatePlayground(apiKey: string, topic: string): Promise<string> {
  const client = createClient(apiKey);

  const response = await client.chat.completions.create({
    model: 'gpt-5.2',
    messages: [
      { role: 'system', content: PLAYGROUND_SYSTEM_PROMPT },
      { role: 'user', content: PLAYGROUND_USER_PROMPT(topic) },
    ],
  });

  const html = response.choices[0]?.message?.content;
  if (!html) throw new Error('No playground content returned from OpenAI');

  // Strip markdown code fences if the LLM wraps the HTML
  return html.replace(/^```html?\n?/i, '').replace(/\n?```$/i, '').trim();
}
