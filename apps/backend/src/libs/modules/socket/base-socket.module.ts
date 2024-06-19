import { type Server as HTTPServer } from 'http';
import { Server, Socket, type Server as SocketServer } from 'socket.io';
import { SocketEvent } from './libs/enums/enums.js';
import { type Socket as SocketT } from './libs/types/types.js';
import { type OnlineUsers } from '~/modules/online-users/online-users.js';
import { type MessageDto } from '~/modules/chat-messages/chat-messages.js';

class BaseSocket implements SocketT {
  private io!: SocketServer;

  private onlineUsers: OnlineUsers;

  public constructor({ onlineUsers }: { onlineUsers: OnlineUsers }) {
    this.onlineUsers = onlineUsers;
  }

  public init({ httpServer }: { httpServer: HTTPServer }) {
    this.io = new Server(httpServer, {
      cors: {
        origin: '*',
      },
    });

    this.io.on(SocketEvent.CONNECTION, this.handleConnection.bind(this));
  }

  private handleConnection(socket: Socket) {
    socket.on(SocketEvent.LOGIN, (user) => {
      this.onlineUsers.addUser(socket.id, user.id);

      socket.broadcast.emit(SocketEvent.LOGIN, user);
      this.io
        .to(socket.id)
        .emit(SocketEvent.USERS_ONLINE, this.onlineUsers.getOnlineUsers());
    });

    socket.on(SocketEvent.DISCONNECT, () => {
      socket.broadcast.emit(
        SocketEvent.LOGOUT,
        this.onlineUsers.getUser(socket.id)
      );
      this.onlineUsers.removeUser(socket.id);
    });

    socket.on(SocketEvent.START_TYPING, (receiverId: string) => {
      const socketId = this.onlineUsers.getSocketId(receiverId);

      if (!socketId) {
        return;
      }

      this.io.to(socketId).emit(SocketEvent.START_TYPING);
    });

    socket.on(SocketEvent.STOP_TYPING, (receiverId: string) => {
      const socketId = this.onlineUsers.getSocketId(receiverId);

      if (!socketId) {
        return;
      }

      this.io.to(socketId).emit(SocketEvent.STOP_TYPING);
    });
  }

  public emit({ to, message }: { to: string; message: MessageDto }): void {
    const socketId = this.onlineUsers.getSocketId(to);

    if (!socketId) {
      return;
    }

    this.io.to(socketId).emit(SocketEvent.MESSAGE_NEW, message);
  }
}

export { BaseSocket };
