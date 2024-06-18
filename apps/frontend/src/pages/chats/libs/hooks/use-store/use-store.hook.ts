import { create } from 'zustand';
import { type Tab, type Message, type User } from '../../types/types.js';
import { DEFAULT_MESSAGES, DEFAULT_USERS } from '../../constants/constants.js';

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
  users: DEFAULT_USERS,
  onlineUserIds: ['1', '2', '3', '4'],
  activeChat: DEFAULT_USERS[0] ?? null,
  messages: DEFAULT_MESSAGES,
  activeTab: 'Online' as Tab,
  activeUsers: DEFAULT_USERS,
  searchedUsers: DEFAULT_USERS,
  userSearch: '',
  setUsers: (users: User[]) => {
    set(() => ({ users }));
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
