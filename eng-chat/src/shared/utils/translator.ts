import { getGroqClient } from '@shared/api/groqClient';
import { logger } from '@shared/utils/logger';

export async function translateToKorean(text: string): Promise<string> {
  const client = getGroqClient();

  const response = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content:
          '당신은 번역 전문가입니다. 입력된 텍스트를 한국어로 번역하세요. 번역 결과만 출력하고 다른 설명은 추가하지 마세요. 입력이 이미 한국어인 경우 원문 그대로 반환하세요.',
      },
      {
        role: 'user',
        content: text,
      },
    ],
    temperature: 0.1,
  });

  const translated = response.choices[0]?.message?.content?.trim() ?? text;
  logger.info(`Translation: "${text}" → "${translated}"`);
  return translated;
}
