import { createStore } from 'zustand/vanilla';
import type { ChatMessage, UserId } from '@shared/types';

interface SessionState {
  sessions: Map<UserId, ChatMessage[]>;
  addMessage: (userId: UserId, message: ChatMessage) => void;
  getHistory: (userId: UserId) => ChatMessage[];
  clearSession: (userId: UserId) => void;
  clearAllSessions: () => void;
}

export const sessionStore = createStore<SessionState>((set, get) => ({
  sessions: new Map(),

  addMessage: (userId, message) => {
    set((state) => {
      const history = state.sessions.get(userId) ?? [];
      const updated = new Map(state.sessions);
      updated.set(userId, [...history, message]);
      return { sessions: updated };
    });
  },

  getHistory: (userId) => {
    return get().sessions.get(userId) ?? [];
  },

  clearSession: (userId) => {
    set((state) => {
      const updated = new Map(state.sessions);
      updated.delete(userId);
      return { sessions: updated };
    });
  },

  clearAllSessions: () => {
    set({ sessions: new Map() });
  },
}));
