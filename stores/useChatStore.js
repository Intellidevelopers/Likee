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
      isUser: false,
      repliedTo: null,
      type: 'text',
      timestamp: Date.now() - 10000,
    },
    {
      id: '2',
      time: '05:30 PM',
      status: 'online',
      name: 'Roseline Mercy',
      message: 'How was your night?',
      imageUrl: 'https://randomuser.me/api/portraits/women/10.jpg',
      isUser: false,
      repliedTo: null,
      type: 'text',
      timestamp: Date.now() - 5000,
    },
    {
      id: '3',
      time: '05:30 PM',
      status: 'online',
      name: 'Adenike Taiwo',
      message: 'Ok',
      imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
      isUser: false,
      repliedTo: null,
      type: 'text',
      timestamp: Date.now(),
    },
    // More messages can be added here
  ],
  selectedMessage: null,
  selectedUser: null,

  setSelectedMessage: (message) => set({ selectedMessage: message }),
  setSelectedUser: (user) => set({ selectedUser: user }),

  addMessage: (newMessage) => {
    const existingUserMessage = get().messages.find(msg => msg.name === newMessage.name);

    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...newMessage,
          imageUrl: existingUserMessage ? existingUserMessage.imageUrl : newMessage.imageUrl,
          timestamp: Date.now(),
        },
      ],
    }));
  },

  // Updated function to get the latest message per user, sorted by timestamp
  getChatListMessages: () => {
    const state = get();
    const userMessagesMap = {};

    // Keep the most recent message for each user
    state.messages.forEach((message) => {
      if (!userMessagesMap[message.name] || userMessagesMap[message.name].timestamp < message.timestamp) {
        userMessagesMap[message.name] = message;
      }
    });

    // Sort messages by timestamp (descending)
    return Object.values(userMessagesMap).sort((a, b) => b.timestamp - a.timestamp);
  },

  getUserMessages: (userName) => {
    const state = get();
    return state.messages.filter(msg => msg.name === userName);
  },
}));

export default useChatStore;
