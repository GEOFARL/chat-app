import { useStore } from '~/pages/chats/libs/hooks/hooks.ts';
import { Contact } from '../contact/contact.tsx';

const ContactList: React.FC = () => {
  const users = useStore((state) => state.searchedUsers);

  return (
    <div className="flex-1 flex flex-col overflow-y-scroll scrollbar scrollbar-thumb-grey-300 scrollbar-track-white">
      {users.map((user) => (
        <Contact key={user.id} contact={user} />
      ))}
    </div>
  );
};

export { ContactList };
