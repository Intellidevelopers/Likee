import {create} from 'zustand';

// Store for handling sending and getting messages
export const useMessagesStore = create((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  getMessages: (user) => {
    return (get) => get().messages.filter(msg => msg.name === user.name);
  },
}));
