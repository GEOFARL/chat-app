import { useCallback, useMemo } from '~/libs/hooks/hooks.js';
import { Image } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

import { useStore } from '~/pages/chats/libs/hooks/hooks.js';
import { type User } from '~/pages/chats/libs/types/types.js';

type Properties = {
  contact: User;
  onClick: () => void;
};

const Contact: React.FC<Properties> = ({ contact, onClick }) => {
  const { name, description, imageUrl, id } = contact;

  const { activeChat, setActiveChat, onlineUserIds } = useStore((state) => ({
    activeChat: state.activeChat,
    setActiveChat: state.setActiveChat,
    onlineUserIds: state.onlineUserIds,
  }));

  const isOnline = useMemo<boolean>(() => {
    return onlineUserIds.includes(id);
  }, [onlineUserIds, id]);

  const handleClick = useCallback(() => {
    setActiveChat(contact);
    onClick();
  }, [setActiveChat, contact, onClick]);

  return (
    <button
      className={getValidClassNames(
        'flex gap-4 items-center px-4 py-1.5',
        activeChat === contact && 'bg-grey-200'
      )}
      onClick={handleClick}
    >
      <div className="w-16 h-16 flex-shrink-0 relative">
        <Image
          src={imageUrl}
          alt="profile picture"
          className="w-full h-full object-center"
        />

        {isOnline && (
          <div className="absolute w-4 h-4 -bottom-[4px] -right-[4px] bg-green-500 rounded-full" />
        )}
      </div>

      <div className="flex flex-col items-start text-left">
        <p className="text-md text-text-first font-bold leading-5">{name}</p>
        <p className="text-sm line-clamp-2 text-text-ninth leading-4">
          {description}
        </p>
      </div>
    </button>
  );
};

export { Contact };
