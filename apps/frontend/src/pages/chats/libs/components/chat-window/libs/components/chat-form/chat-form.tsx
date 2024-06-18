import { Button, Input } from '~/libs/components/components.js';
import { useCallback, useForm } from '~/libs/hooks/hooks';

const ChatForm: React.FC = () => {
  const { handleSubmit, control } = useForm<{
    message: string;
  }>({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = useCallback(() => {}, []);

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
      />
    </form>
  );
};

export { ChatForm };
