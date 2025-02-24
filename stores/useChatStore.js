import { create } from 'zustand';

const useChatStore = create((set, get) => ({
	selectedChat: {},
	setSelectedChat: (user) => set({ selectedChat: user }),
	selectedMessage: {},
	setSelectedMessage: (chat) => set({ selectedMessage: chat }),
}));

export default useChatStore;
