import { Button, Card, Input, Link } from '~/libs/components/components.js';
import { useCallback } from '~/libs/hooks/hooks.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { type BaseSyntheticEvent } from 'react';

const SignUpForm: React.FC = () => {
  const handleSubmit = useCallback((event: BaseSyntheticEvent) => {
    event.preventDefault();
  }, []);

  return (
    <Card className="w-[600px] rounded-xl px-10">
      <div className="flex flex-col items-center gap-2 mb-4">
        <h2 className="text-4xl font-semibold">Sign Up</h2>
        <p className="text-gray-500">
          Already have an account? Go to{' '}
          <Link to={AppRoute.SIGN_IN} className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
        <Input label="Full Name" placeholder="John Doe" />
        <Input label="Email" type="email" placeholder="john_doe@gmail.com" />
        <Input label="Password" type="password" placeholder="•••••••••" />

        <Button
          label="Create an account"
          type="submit"
          className="w-full text-center"
        />
      </form>
    </Card>
  );
};

export { SignUpForm };
