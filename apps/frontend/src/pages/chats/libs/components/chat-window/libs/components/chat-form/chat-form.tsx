import { formatTime } from '~/libs/helpers/helpers.js';
import { Button, Input } from '~/libs/components/components.js';
import { useCallback, useForm, useUser } from '~/libs/hooks/hooks.js';
import { useStore } from '~/pages/chats/libs/hooks/hooks.js';

const ChatForm: React.FC = () => {
  const { user } = useUser();
  const { handleSubmit, control, setValue } = useForm<{
    message: string;
  }>({
    defaultValues: {
      message: '',
    },
  });

  const addMessage = useStore((state) => state.addMessage);

  const onSubmit = useCallback(
    (data: { message: string }) => {
      addMessage({
        author: user?.fullName as string,
        message: data.message,
        time: formatTime(new Date()),
      });
      setValue('message', '');
    },
    [setValue, addMessage, user?.fullName]
  );

  return (
    <form
      className="pl-2 pb-4 pr-6 pt-6 flex gap-3"
      onSubmit={handleSubmit(onSubmit)}
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
