import { useStore } from '../../hooks/hooks.js';
import { ChatForm, ChatInfo, Messages } from './libs/components/components.js';

const ChatWindow: React.FC = () => {
  const { isTyping, activeChat } = useStore((state) => ({
    isTyping: state.isTyping,
    activeChat: state.activeChat,
  }));

  return (
    <div className="flex-1 bg-grey-light flex flex-col max-h-full overflow-auto rounded-s-md">
      <ChatInfo />
      <div className="flex-1 flex flex-col overflow-auto pt-6 gap-2 relative">
        <Messages />
        <ChatForm />
        {isTyping && (
          <p className="absolute text-sm text-text-sixth bottom-[63px] right-[50%] translate-x-[50%]">
            {activeChat?.name} is writing...
          </p>
        )}
      </div>
    </div>
  );
};

export { ChatWindow };
