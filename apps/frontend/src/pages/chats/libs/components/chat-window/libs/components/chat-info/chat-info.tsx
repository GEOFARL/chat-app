import { Image } from '~/libs/components/components.js';

type Properties = {
  title: string;
  imageUrl: string;
  description: string;
};

const ChatInfo: React.FC<Properties> = ({ title, imageUrl, description }) => {
  return (
    <div className="flex flex-row bg-grey-100">
      <div className="w-44 h-44 flex-shrink-0">
        <Image src={imageUrl} alt="chat character" className="w-full h-full" />
      </div>

      <div className="flex flex-col p-6 max-h-44">
        <h2 className="text-2xl font-semibold text-text-first">{title}</h2>

        <p className="text-text-second text-sm line-clamp-5">{description}</p>
      </div>
    </div>
  );
};

export { ChatInfo };
