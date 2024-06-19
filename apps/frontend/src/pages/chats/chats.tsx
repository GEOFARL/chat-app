import { AuthWrapper, Container, Icon } from '~/libs/components/components.js';
import {
  useCallback,
  useOutside,
  useRef,
  useState,
} from '~/libs/hooks/hooks.js';

import { ChatWindow, Users } from './libs/components/components.js';
import { useSocketListeners, useStore } from './libs/hooks/hooks.js';

const Chats: React.FC = () => {
  const { activeChat } = useStore((state) => ({
    activeChat: state.activeChat,
  }));

  const [isUsersOpened, setIsUsersOpened] = useState<boolean>(true);

  const handleOnClick = useCallback(() => setIsUsersOpened((p) => !p), []);

  useSocketListeners();

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const usersRef = useOutside({
    isOpen: isUsersOpened,
    onClose: handleOnClick,
    notTriggerElements: [],
  });

  return (
    <AuthWrapper>
      <Container className="w-full">
        <div className="w-full max-h-screen-minus-header h-full flex flex-row md:px-10 md:py-6 relative min-h-screen-minus-header md:min-h-0">
          {activeChat ? (
            <ChatWindow />
          ) : (
            <div className="flex-1 bg-grey-light flex flex-col max-h-full overflow-auto rounded-s-md" />
          )}
          <Users
            ref={usersRef}
            isOpened={isUsersOpened}
            onClick={handleOnClick}
          />
          <button
            className="md:hidden absolute top-[8px] right-[14px] bg-grey-300 p-0.5 rounded-md"
            onClick={handleOnClick}
            ref={buttonRef}
          >
            <Icon name="menu" className="w-8 h-8" />
          </button>
        </div>
      </Container>
    </AuthWrapper>
  );
};

export { Chats };
