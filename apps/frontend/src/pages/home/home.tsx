import { AuthWrapper, Container } from '~/libs/components/components.js';
import { Button } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { useUser } from '~/libs/hooks/hooks.js';

const Home: React.FC = () => {
  const { user } = useUser();

  const isLoggedIn = Boolean(user);

  return (
    <AuthWrapper>
      <Container>
        <div className="flex flex-col items-center space-y-8">
          <div className="flex flex-col pt-12 items-center space-y-2">
            <h1 className="text-white text-7xl font-bold uppercase drop-shadow-2xl">
              Chat bots
            </h1>
            <p className="text-xl text-zinc-100 opacity-60">
              Never be bored again
            </p>
          </div>
          <div>
            <Button
              label={isLoggedIn ? 'Go to chats' : 'Sign up'}
              iconName="arrow-right"
              href={isLoggedIn ? AppRoute.CHATS : AppRoute.SIGN_UP}
              buttonStyle="secondary"
            />
          </div>
        </div>
      </Container>
    </AuthWrapper>
  );
};

export { Home };
