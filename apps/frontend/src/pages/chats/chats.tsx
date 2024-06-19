import { AuthWrapper, Container } from '~/libs/components/components.js';
import { ChatWindow, Users } from './libs/components/components.js';
import { useSocketListeners, useStore } from './libs/hooks/hooks.js';

const Chats: React.FC = () => {
  const { activeChat } = useStore((state) => ({
    activeChat: state.activeChat,
  }));

  useSocketListeners();

  return (
    <AuthWrapper>
      <Container className="w-full">
        <div className="w-full max-h-screen-minus-header h-full flex flex-row px-10 py-6">
          {activeChat ? (
            <ChatWindow />
          ) : (
            <div className="flex-1 bg-grey-light flex flex-col max-h-full overflow-auto rounded-s-md" />
          )}
          <Users />
        </div>
      </Container>
    </AuthWrapper>
  );
};

export { Chats };
