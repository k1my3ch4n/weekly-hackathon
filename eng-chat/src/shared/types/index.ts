export type UserId = string;

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface UserProfile {
  id: UserId;
  username: string;
}

export interface TranscriptionResult {
  text: string;
  userId: UserId;
  timestamp: number;
  detectedLanguage?: string;
}

export interface TTSResult {
  audioBuffer: Buffer;
  text: string;
}
