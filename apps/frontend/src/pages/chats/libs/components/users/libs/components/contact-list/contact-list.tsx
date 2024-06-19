import { useStore } from '~/pages/chats/libs/hooks/hooks.ts';
import { Contact } from '../contact/contact.tsx';

type Properties = {
  onClick: () => void;
}

const ContactList: React.FC<Properties> = ({ onClick }) => {
  const users = useStore((state) => state.searchedUsers);

  return (
    <div className="flex-1 flex flex-col overflow-y-scroll scrollbar scrollbar-thumb-grey-300 scrollbar-track-white">
      {users.map((user) => (
        <Contact key={user.id} contact={user} onClick={onClick} />
      ))}
    </div>
  );
};

export { ContactList };
