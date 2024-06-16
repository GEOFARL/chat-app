import { RouterOutlet } from '~/libs/components/components.ts';

const App: React.FC = () => {
  return (
    <>
      <h1 className="text-3xl text-red-500">Hello World</h1>
      <RouterOutlet />
    </>
  );
};

export { App };
