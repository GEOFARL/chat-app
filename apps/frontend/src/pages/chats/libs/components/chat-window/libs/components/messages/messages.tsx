import { useStore } from '~/pages/chats/libs/hooks/hooks.js';
import { Message } from '../message/message.js';
import {
  useEffect,
  useQuery,
  useScrollIntoView,
  useUser,
} from '~/libs/hooks/hooks.js';
import { QueryKey } from '~/libs/enums/enums.js';
import { chatMessagesApi } from '~/modules/chat-messages/chat-messages.js';
import { Loader } from '~/libs/components/components.js';
import { transformMessage } from '~/pages/chats/libs/helpers/helpers.js';

const Messages: React.FC = () => {
  const { user } = useUser();
  const { messages, activeChat, setMessages } = useStore((store) => ({
    messages: store.messages,
    activeChat: store.activeChat,
    setMessages: store.setMessages,
  }));

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.MESSAGES, user?.id, activeChat?.id],
    queryFn: () => chatMessagesApi.getMessages(activeChat!.id),
  });

  const lastMessageRef = useScrollIntoView(messages);

  useEffect(() => {
    if (data) {
      setMessages(
        data.map((message) =>
          transformMessage({
            message,
            anotherUser: activeChat!,
            currentUser: user!,
          })
        )
      );
    }
  }, [data, setMessages, user, activeChat]);

  if (isLoading) {
    return (
      <div className="flex-1 grid place-content-center">
        <div>
          <Loader />
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

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
