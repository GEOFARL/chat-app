import { Navigation, Profile } from './libs/components/components.js';

const Header: React.FC = () => {
  return (
    <header className="h-16 border-b border-black flex items-center">
      <div className="mx-auto max-w-7xl flex justify-between w-full px-10">
        <Navigation />
        <Profile />
      </div>
    </header>
  );
};

export { Header };
