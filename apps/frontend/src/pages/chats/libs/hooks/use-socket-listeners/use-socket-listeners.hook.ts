import { useEffect, useUser } from '~/libs/hooks/hooks.js';
import { SocketEvent } from '~/libs/enums/enums.js';

import { socket } from '~/libs/modules/socket/socket.js';

import { useStore } from '../use-store/use-store.hook.js';

const useSocketListeners = () => {
  const { setListeners, removeListeners } = useStore((state) => ({
    setListeners: state.setListeners,
    removeListeners: state.removeListeners,
  }));
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      return;
    }

    socket.connect();
    socket.emit(SocketEvent.LOGIN, user);

    const onConnect = () => {
      setListeners(socket, user!);
    };
    const onDisconnect = () => {
      removeListeners(socket, user!);
    };

    socket.on(SocketEvent.CONNECT, onConnect);
    socket.on(SocketEvent.DISCONNECT, onDisconnect);

    return () => {
      socket.disconnect();
      socket.off(SocketEvent.CONNECT, onConnect);
      socket.off(SocketEvent.DISCONNECT, onDisconnect);
    };
  }, [setListeners, user, removeListeners]);
};

export { useSocketListeners };
