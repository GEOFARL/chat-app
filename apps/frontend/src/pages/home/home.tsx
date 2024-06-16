import { AuthWrapper, Container } from '~/libs/components/components.js';
import { Button } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';

const Home: React.FC = () => {
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
              label="Go to chats"
              iconName="arrow-right"
              href={AppRoute.CHATS}
              buttonStyle="secondary"
            />
          </div>
        </div>
      </Container>
    </AuthWrapper>
  );
};

export { Home };
