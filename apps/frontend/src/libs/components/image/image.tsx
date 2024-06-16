import { getValidClassNames } from '~/libs/helpers/helpers.js';

type Properties = {
  alt: string;
  className?: string | undefined;
  src: string;
};

const Image: React.FC<Properties> = ({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={getValidClassNames('object-cover bg-transparent', className)}
    />
  );
};

export { Image };
