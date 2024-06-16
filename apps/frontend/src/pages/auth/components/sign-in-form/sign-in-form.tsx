import { Button, Card, Input, Link } from '~/libs/components/components.js';
import { useCallback } from '~/libs/hooks/hooks.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { type BaseSyntheticEvent } from 'react';

const SignInForm: React.FC = () => {
  const handleSubmit = useCallback((event: BaseSyntheticEvent) => {
    event.preventDefault();
  }, []);

  return (
    <Card className="w-[600px] rounded-xl px-10">
      <div className="flex flex-col items-center gap-2 mb-4">
        <h2 className="text-4xl font-semibold">Sign In</h2>
        <p className="text-gray-500">
          Don't have an account? Go to{' '}
          <Link to={AppRoute.SIGN_UP} className="text-blue-500 hover:underline">
            Create an account
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
        <Input label="Email" type="email" placeholder="john_doe@gmail.com" />
        <Input label="Password" type="password" placeholder="•••••••••" />

        <Button label="Log In" type="submit" className="w-full text-center" />
      </form>
    </Card>
  );
};

export { SignInForm };
