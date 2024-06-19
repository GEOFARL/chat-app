import { type Socket } from 'socket.io-client';
import { create } from 'zustand';

import { SocketEvent } from '~/libs/enums/enums.js';

import { type AuthResponseDto } from '~/modules/auth/auth.js';

import { DEFAULT_MESSAGES } from '../../constants/constants.js';
import { type Message, type Tab, type User } from '../../types/types.js';
import { transformUser } from '../../helpers/helpers.js';

import {
  checkIsUserAlreadyIncluded,
  removeOnlineUserId,
  setOnlineUserIds,
} from './libs/helpers/helpers.js';

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

  updateUsers: () => void;

  setListeners: (socket: Socket, currentUser: AuthResponseDto['user']) => void;
  removeListeners: (
    socket: Socket,
    currentUser: AuthResponseDto['user']
  ) => void;

  addMessage: (newMessage: Message) => void;
};

const useStore = create<State & Actions>((set, get) => {
  const handleUserLogin = (user: AuthResponseDto['user']) => {
    if (!checkIsUserAlreadyIncluded(get().users, user)) {
      set((state) => ({
        users: [...state.users, transformUser(user)],
        onlineUserIds: setOnlineUserIds(state.onlineUserIds, user.id),
      }));
      get().setActiveTab(get().activeTab);
      return get().setUserSearch(get().userSearch);
    }

    set((state) => ({
      onlineUserIds: setOnlineUserIds(state.onlineUserIds, user.id),
    }));
    get().updateUsers();
  };

  const handleUsersOnline = (userIds: string[]) => {
    const notIncludedOnlineIds = userIds.filter(
      (userId) => !get().onlineUserIds.includes(userId)
    );

    set((state) => ({
      onlineUserIds: [...state.onlineUserIds, ...notIncludedOnlineIds],
    }));
    get().updateUsers();
  };

  const handleLogout = (userId: string) => {
    if (userId) {
      set((state) => ({
        onlineUserIds: removeOnlineUserId(state.onlineUserIds, userId),
      }));
      get().setActiveTab(get().activeTab);
    }
  };

  return {
    users: [],
    onlineUserIds: [],
    activeChat: null,
    messages: DEFAULT_MESSAGES,
    activeTab: 'Online' as Tab,
    activeUsers: [],
    searchedUsers: [],
    userSearch: '',

    updateUsers: () => {
      get().setActiveTab(get().activeTab);
      get().setUserSearch(get().userSearch);
    },

    setUsers: (users: User[]) => {
      set((state) => ({
        users,
        onlineUserIds: [
          ...state.onlineUserIds,
          ...users
            .filter(
              (user) => user.isBot && !get().onlineUserIds.includes(user.id)
            )
            .map((user) => user.id),
        ],
      }));
      get().updateUsers();
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

    setListeners: (socket) => {
      socket.on(SocketEvent.LOGIN, handleUserLogin);
      socket.on(SocketEvent.USERS_ONLINE, handleUsersOnline);
      socket.on(SocketEvent.LOGOUT, handleLogout);
    },

    removeListeners: (socket) => {
      socket.off(SocketEvent.LOGIN, handleUserLogin);
      socket.off(SocketEvent.USERS_ONLINE, handleUsersOnline);
      socket.off(SocketEvent.LOGOUT, handleLogout);
    },
  };
});

export { useStore };
