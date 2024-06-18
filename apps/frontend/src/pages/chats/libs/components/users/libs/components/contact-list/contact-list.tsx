import echo from '~/assets/images/echo.png';
import reverse from '~/assets/images/reverse.png';
import spam from '~/assets/images/spam.png';
import ignore from '~/assets/images/ignore.png';

import { Contact } from '../contact/contact.tsx';

const ContactList: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col overflow-y-scroll scrollbar scrollbar-thumb-grey-300 scrollbar-track-white">
      <Contact
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ullam laboriosam iusto repudiandae ratione doloribus adipisci earum nemo corrupti consequatur placeat modi nobis ea, aut culpa? Modi quos iusto impedit!"
        name="Echo bot"
        imageUrl={echo}
      />
      <Contact
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ullam laboriosam iusto repudiandae ratione doloribus adipisci earum nemo corrupti consequatur placeat modi nobis ea, aut culpa? Modi quos iusto impedit!"
        name="Reverse bot"
        imageUrl={reverse}
      />
      <Contact
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ullam laboriosam iusto repudiandae ratione doloribus adipisci earum nemo corrupti consequatur placeat modi nobis ea, aut culpa? Modi quos iusto impedit!"
        name="Spam bot"
        imageUrl={spam}
      />
      <Contact
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ullam laboriosam iusto repudiandae ratione doloribus adipisci earum nemo corrupti consequatur placeat modi nobis ea, aut culpa? Modi quos iusto impedit!"
        name="Ignore bot"
        imageUrl={ignore}
      />
    </div>
  );
};

export { ContactList };
