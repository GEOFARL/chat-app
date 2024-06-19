import { type SubmitHandler } from 'react-hook-form';

import { Button, Card, Input, Link } from '~/libs/components/components.js';
import { AppRoute, CookieName, QueryKey } from '~/libs/enums/enums.js';
import {
  useCallback,
  useCookies,
  useForm,
  useMutation,
  useNavigate,
  useQueryClient,
} from '~/libs/hooks/hooks.js';
import {
  NotificationMessage,
  notification,
} from '~/libs/modules/notification/notification.js';
import { authApi } from '~/modules/auth/auth.js';
import { UserSignInRequestDto } from '~/modules/user/user.js';

import { PasswordInput } from '../password-input/password-input.js';

const SignInForm: React.FC = () => {
  const queryClient = useQueryClient();
  const setCookie = useCookies([CookieName.TOKEN])[1];
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<UserSignInRequestDto>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: (user: UserSignInRequestDto) => authApi.signIn(user),
    onSuccess: (data) => {
      queryClient.setQueryData([QueryKey.USER], data.user);
      setCookie(CookieName.TOKEN, data.token);
      notification.success(NotificationMessage.SIGNED_IN_SUCCESSFULLY);
      navigate(AppRoute.ROOT);
    },
    onError: (error) => {
      console.log(error);
      notification.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<UserSignInRequestDto> = useCallback(
    (data: UserSignInRequestDto) => {
      signIn(data);
    },
    [signIn]
  );

  return (
    <Card className="w-full md:w-[600px] rounded-xl px-4 md:px-10 bg-transparent md:bg-white">
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
        <h2 className="text-4xl font-semibold">Sign In</h2>
        <p className="text-gray-500 text-center md:text-left">
          Don't have an account? Go to{' '}
          <Link to={AppRoute.SIGN_UP} className="text-blue-500 hover:underline">
            Create an account
          </Link>
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col space-y-4"
      >
        <Input
          label="Email"
          type="email"
          placeholder="john_doe@gmail.com"
          control={control}
          name="email"
        />

        <PasswordInput control={control} />

        <Button
          label={isPending ? 'Logging In...' : 'Log In'}
          type="submit"
          className="w-full text-center"
          disabled={isPending}
        />
      </form>
    </Card>
  );
};

export { SignInForm };
