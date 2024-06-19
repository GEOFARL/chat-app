type OnlineUsers = {
  addUser: (socketId: string, user: string) => void;
  removeUser: (socketId: string) => void;
  getOnlineUsers: () => string[];
  getUser: (socketId: string) => string | undefined;
  getSocketId: (userId: string) => string | undefined;
};

export { type OnlineUsers };
