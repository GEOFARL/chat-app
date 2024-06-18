import { create } from 'zustand';
import { DEFAULT_MESSAGES } from '../../constants/constants.js';
import { type Message, type Tab, type User } from '../../types/types.js';

type State = {
  users: User[];
  onlineUserIds: string[];
  activeChat: User | null;
  messages: Message[];
  activeTab: Tab;
  activeUsers: User[];
  searchedUsers: User[];
  userSearch: string;
};

type Actions = {
  setUsers: (users: User[]) => void;
  setOnlineUserIds: (onlineUserIds: string[]) => void;
  setActiveChat: (activeChat: User | null) => void;
  setMessages: (messages: Message[]) => void;
  setActiveTab: (tab: Tab) => void;
  setUserSearch: (userSearch: string) => void;

  addMessage: (newMessage: Message) => void;
};

const useStore = create<State & Actions>((set, get) => ({
  users: [],
  onlineUserIds: [],
  activeChat: null,
  messages: DEFAULT_MESSAGES,
  activeTab: 'Online' as Tab,
  activeUsers: [],
  searchedUsers: [],
  userSearch: '',
  setUsers: (users: User[]) => {
    set(() => ({
      users,
      onlineUserIds: users.filter((user) => user.isBot).map((user) => user.id),
    }));
    get().setActiveTab(get().activeTab);
    get().setUserSearch('');
  },
  setActiveChat: (activeChat: User | null) => {
    set(() => ({ activeChat }));
  },
  setOnlineUserIds: (onlineUserIds: string[]) => {
    set(() => ({ onlineUserIds }));
  },
  setMessages: (messages: Message[]) => {
    set(() => ({ messages }));
  },
  setActiveTab: (tab: Tab) => {
    switch (tab) {
      case 'All': {
        set((state) => ({ activeTab: tab, activeUsers: state.users }));
        return get().setUserSearch(get().userSearch);
      }
      case 'Online': {
        set((state) => ({
          activeTab: tab,
          activeUsers: state.users.filter((user) =>
            state.onlineUserIds.includes(user.id)
          ),
        }));
        return get().setUserSearch(get().userSearch);
      }
    }
  },
  setUserSearch: (userSearch) => {
    set((state) => ({
      userSearch,
      searchedUsers: state.activeUsers.filter(({ name }) =>
        name.toLowerCase().includes(userSearch.toLowerCase())
      ),
    }));
  },
  addMessage: (newMessage: Message) => {
    set((state) => ({ messages: [...state.messages, newMessage] }));
  },
}));

export { useStore };
