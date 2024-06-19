import { Image } from '~/libs/components/components.js';
import { useStore } from '~/pages/chats/libs/hooks/hooks.js';

const ChatInfo: React.FC = () => {
  const activeChat = useStore((state) => state.activeChat);

  if (!activeChat) {
    return <div className="flex flex-row bg-grey-100 h-44" />;
  }

  const { name, imageUrl, description } = activeChat;

  return (
    <div className="flex flex-row bg-grey-100">
      <div className="w-44 h-44 flex-shrink-0 hidden sm:block">
        <Image src={imageUrl} alt="chat character" className="w-full h-full" />
      </div>

      <div className="flex flex-col p-6 max-h-44">
        <h2 className="text-2xl font-semibold text-text-first">{name}</h2>

        <p className="text-text-second text-sm line-clamp-5">{description}</p>
      </div>
    </div>
  );
};

export { ChatInfo };
