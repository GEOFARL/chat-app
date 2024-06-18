import { AuthWrapper, Container } from '~/libs/components/components.js';
import { ChatWindow, Users } from './libs/components/components.js';

const Chats: React.FC = () => {
  return (
    <AuthWrapper>
      <Container className="w-full">
        <div className="w-full max-h-screen-minus-header h-full flex flex-row px-10 py-6">
          <ChatWindow />
          <Users />
        </div>
      </Container>
    </AuthWrapper>
  );
};

export { Chats };
