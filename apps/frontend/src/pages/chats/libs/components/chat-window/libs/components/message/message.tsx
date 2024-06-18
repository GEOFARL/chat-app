import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useUser } from '~/libs/hooks/hooks.js';

type Properties = {
  isMine?: boolean;
  author?: string;
  time: string;
  message: string;
};

const Message: React.FC<Properties> = ({ isMine, author, time, message }) => {
  const { user } = useUser();

  return (
    <div
      className={getValidClassNames(
        'flex flex-col w-3/4 shadow-2xl relative rounded-lg z-10',
        isMine && 'self-end'
      )}
    >
      <div
        className={getValidClassNames(
          'flex w-full justify-between px-5 py-2 rounded-t-lg',
          isMine ? 'bg-orange-100' : 'bg-grey-100'
        )}
      >
        <p
          className={getValidClassNames(
            'text-sm',
            isMine ? 'text-orange-200' : 'text-text-fourth'
          )}
        >
          {isMine ? user?.fullName : author}
        </p>
        <p
          className={getValidClassNames(
            'text-sm',
            isMine ? 'text-orange-300' : 'text-text-third'
          )}
        >
          {time}
        </p>
      </div>

      <div className="rounded-b-lg px-5 pt-2 pb-3 bg-white">
        <p className="text-sm text-text-fifth">{message}</p>
      </div>

      <div
        className={getValidClassNames(
          'absolute text-white bottom-[10px]',
          isMine ? 'triangle-right -right-[8px]' : 'triangle-left -left-[8px]'
        )}
      />
    </div>
  );
};

export { Message };
