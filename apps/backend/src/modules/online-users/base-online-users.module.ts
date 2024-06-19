import { type OnlineUsers } from './libs/types/types.js';

class BaseOnlineUsers implements OnlineUsers {
  public onlineUsers: Record<string, string> = {};

  public addUser(socketId: string, userId: string): void {
    const existingSocketId = Object.keys(this.onlineUsers).find(
      (key) => this.onlineUsers[key] === userId
    );

    if (existingSocketId) {
      delete this.onlineUsers[existingSocketId];
    }

    this.onlineUsers[socketId] = userId;
  }

  public removeUser(socketId: string): void {
    delete this.onlineUsers[socketId];
  }

  public getOnlineUsers(): string[] {
    return Object.values(this.onlineUsers);
  }

  public getUser(socketId: string): string | undefined {
    return this.onlineUsers[socketId];
  }

  public getSocketId(userId: string): string | undefined {
    return Object.keys(this.onlineUsers).find(
      (key) => this.onlineUsers[key] === userId
    );
  }
}

export { BaseOnlineUsers };
