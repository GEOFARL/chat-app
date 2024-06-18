import { useStore } from '~/pages/chats/libs/hooks/hooks.js';
import { Message } from '../message/message.js';
import { useScrollIntoView } from '~/libs/hooks/hooks.js';

const Messages: React.FC = () => {
  const messages = useStore((store) => store.messages);

  const lastMessageRef = useScrollIntoView(messages);

  return (
    <div className="scrollbar scrollbar-thumb-grey-300 scrollbar-track-grey-light flex-1 flex flex-col gap-6 overflow-y-scroll px-6 pb-3">
      {messages.map(({ message, time, author }, idx) => (
        <Message
          key={idx}
          author={author}
          time={time}
          message={message}
          ref={idx === messages.length - 1 ? lastMessageRef : null}
        />
      ))}
    </div>
  );
};

export { Messages };
