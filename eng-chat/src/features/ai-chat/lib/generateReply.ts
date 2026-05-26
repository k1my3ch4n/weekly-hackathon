import { getGroqClient } from '@shared/api/groqClient';
import { sessionStore } from '@entities/session';
import { SYSTEM_PROMPT } from './systemPrompt';
import { logger } from '@shared/utils/logger';
import type { ChatMessage, UserId } from '@shared/types';

const MODEL = 'llama3-70b-8192';

export async function generateReply(userId: UserId, userText: string): Promise<string> {
  const { addMessage, getHistory } = sessionStore.getState();

  const userMsg: ChatMessage = {
    role: 'user',
    content: userText,
    timestamp: Date.now(),
  };

  addMessage(userId, userMsg);

  const history = getHistory(userId);

  const messages = [SYSTEM_PROMPT, ...history].map(({ role, content }) => ({ role, content }));

  logger.info(`Generating reply for user ${userId} (${history.length} messages in context)`);

  const client = getGroqClient();
  const completion = await client.chat.completions.create({
    model: MODEL,
    messages,
    max_tokens: 300,
    temperature: 0.8,
  });

  const replyText = completion.choices[0]?.message?.content ?? '';

  const assistantMsg: ChatMessage = {
    role: 'assistant',
    content: replyText,
    timestamp: Date.now(),
  };

  addMessage(userId, assistantMsg);

  return replyText;
}
