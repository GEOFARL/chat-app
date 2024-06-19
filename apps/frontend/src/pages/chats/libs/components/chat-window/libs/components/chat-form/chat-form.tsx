import { debounce, formatTime } from '~/libs/helpers/helpers.js';
import { Button, Input } from '~/libs/components/components.js';
import {
  useCallback,
  useForm,
  useMutation,
  useState,
  useUser,
} from '~/libs/hooks/hooks.js';
import { useStore } from '~/pages/chats/libs/hooks/hooks.js';
import { QueryKey, SocketEvent } from '~/libs/enums/enums.js';
import { chatMessagesApi } from '~/modules/chat-messages/chat-messages.js';
import { socket } from '~/libs/modules/socket/socket.js';

const ChatForm: React.FC = () => {
  const { user } = useUser();
  const { handleSubmit, control, setValue } = useForm<{
    message: string;
  }>({
    defaultValues: {
      message: '',
    },
  });

  const { addMessage, activeChat } = useStore((state) => ({
    addMessage: state.addMessage,
    activeChat: state.activeChat,
  }));

  const { mutate: sendMessage } = useMutation({
    mutationKey: [QueryKey.MESSAGE, user?.id, activeChat?.id],
    mutationFn: (message: string) =>
      chatMessagesApi.sendMessage({
        message,
        receiverUserId: activeChat!.id,
        senderUserId: user!.id,
      }),
    onSuccess: (data) => {
      addMessage({
        author: user?.fullName as string,
        message: data.content,
        time: formatTime(new Date()),
      });
    },
  });

  const onSubmit = useCallback(
    (data: { message: string }) => {
      if (!data.message.trim()) {
        return;
      }
      sendMessage(data.message);
      setValue('message', '');
    },
    [setValue, sendMessage]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLFormElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSubmit(onSubmit)();
      }
    },
    [handleSubmit, onSubmit]
  );

  const [isTyping, setIsTyping] = useState<boolean>(false);

  // eslint-disable-next-line
  const debouncedSetTyping = useCallback(
    debounce(() => {
      setIsTyping(false);
      socket.emit(SocketEvent.STOP_TYPING, activeChat!.id);
    }, 2000),
    []
  );

  const handleInputChange = useCallback(() => {
    if (!isTyping) {
      setIsTyping(true);
      socket.emit(SocketEvent.START_TYPING, activeChat!.id);
    }
    debouncedSetTyping();
  }, [isTyping, debouncedSetTyping, activeChat]);

  return (
    <form
      className="pl-2 pb-4 pr-6 pt-6 flex gap-3"
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={handleKeyDown}
      onChange={handleInputChange}
    >
      <Input
        control={control}
        name="message"
        label="Message"
        placeholder="Start chatting!"
        isVisuallyHiddenLabel
        className="text-sm"
      />

      <Button
        label="Send message"
        size="sm"
        className="text-nowrap text-[13px] px-14 py-2 rounded-md"
        type="submit"
      />
    </form>
  );
};

export { ChatForm };
