import { create } from 'zustand';

const useChatStore = create((set, get) => ({
  messages: [
    { 
      id: '1', 
      time: '05:30 PM', 
      status: 'online', 
      name: 'Adebukola', 
      message: 'Good morning dear', 
      imageUrl: 'https://randomuser.me/api/portraits/women/9.jpg',
      repliedTo: null, // No reply yet
    },
    { 
      id: '2', 
      time: '05:30 PM', 
      status: 'online', 
      name: 'Roseline Mercy', 
      message: 'How was your night?', 
      imageUrl: 'https://randomuser.me/api/portraits/women/10.jpg',
      repliedTo: null, // No reply yet
    },
    { 
      id: '3', 
      time: '05:30 PM', 
      status: 'online', 
      name: 'Adenike Taiwo', 
      message: 'Ok', 
      imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
      repliedTo: null, // No reply yet
    },
    // More messages...
  ],
  selectedMessage: null, // For the selected message
  selectedUser: null, // For the selected user details

  // Set the selected message
  setSelectedMessage: (message) => set({ selectedMessage: message }),

  // Set the selected user
  setSelectedUser: (user) => set({ selectedUser: user }),

  // Add a new message (including replies)
  addMessage: (newMessage) => set((state) => ({
    messages: [...state.messages, newMessage],
  })),

  // Get all messages that do not have a reply (e.g., only "original" messages)
  getChatListMessages: () => {
    const state = get(); // Access the current store state
    return state.messages.filter(message => message.repliedTo === null);
  },

  // Get messages of a selected user, including replies
  getUserMessages: (userName) => {
    const state = get(); // Access the current store state
    return state.messages.filter(msg => msg.name === userName);
  },

  // Get all messages for a specific user without replies (if you only want to show non-replied messages)
  getUserMessagesWithoutReplies: (userName) => {
    const state = get(); // Access the current store state
    return state.messages.filter(msg => msg.name === userName && msg.repliedTo === null);
  },

}));

export default useChatStore;
