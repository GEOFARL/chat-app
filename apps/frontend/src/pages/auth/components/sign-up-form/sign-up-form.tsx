import { PasswordInput } from '../password-input/password-input.js';

import { Button, Card, Input, Link } from '~/libs/components/components.js';
import {
  useCallback,
  useCookies,
  useForm,
  useMutation,
  useNavigate,
  useQueryClient,
} from '~/libs/hooks/hooks.js';
import { AppRoute, CookieName, QueryKey } from '~/libs/enums/enums.js';
import { UserSignUpRequestDto } from '~/modules/user/user.js';
import { authApi } from '~/modules/auth/auth.js';
import {
  NotificationMessage,
  notification,
} from '~/libs/modules/notification/notification.js';
import { SubmitHandler } from 'react-hook-form';

const SignUpForm: React.FC = () => {
  const queryClient = useQueryClient();
  const setCookie = useCookies([CookieName.TOKEN])[1];
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<UserSignUpRequestDto>({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
  });

  const { mutate: signUp, isPending } = useMutation({
    mutationFn: (user: UserSignUpRequestDto) => authApi.signUp(user),
    onSuccess: (data) => {
      queryClient.setQueryData([QueryKey.USER], data.user);
      setCookie(CookieName.TOKEN, data.token);
      notification.success(NotificationMessage.SIGNED_UP_SUCCESSFULLY);
      navigate(AppRoute.ROOT);
    },
    onError: (error) => {
      console.log(error);
      notification.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<UserSignUpRequestDto> = useCallback(
    (data: UserSignUpRequestDto) => {
      signUp(data);
    },
    [signUp]
  );

  return (
    <Card className="w-[600px] rounded-xl px-10">
      <p className="flex flex-row items-center gap-1.5 text-sm">
        <span>Go Back</span>
        <Link
          to={AppRoute.ROOT}
          className="text-blue-500 hover:underline flex flex-row items-center"
        >
          Home &rarr;
        </Link>
      </p>
      <div className="flex flex-col items-center gap-2 mb-4">
        <h2 className="text-4xl font-semibold">Sign Up</h2>
        <p className="text-gray-500">
          Already have an account? Go to{' '}
          <Link to={AppRoute.SIGN_IN} className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col space-y-4"
      >
        <Input
          label="Full Name"
          placeholder="John Doe"
          control={control}
          name="fullName"
        />
        <Input
          label="Email"
          type="email"
          placeholder="john_doe@gmail.com"
          control={control}
          name="email"
        />
        <PasswordInput control={control} />

        <Button
          label={isPending ? 'Creating an account...' : 'Create an account'}
          type="submit"
          className="w-full text-center"
          disabled={isPending}
        />
      </form>
    </Card>
  );
};

export { SignUpForm };
