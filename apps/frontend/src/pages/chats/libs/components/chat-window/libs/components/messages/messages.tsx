import { Message } from '../message/message';

const Messages: React.FC = () => {
  return (
    <div className="scrollbar scrollbar-thumb-grey-300 scrollbar-track-grey-light flex-1 flex flex-col gap-6 overflow-y-scroll px-6 pb-3">
      <Message author="Reverse bot" time="4:20 PM" message="Hello World!" />
      <Message isMine time="4:22 PM" message="Hello Robot" />
      <Message
        author="Reverse bot"
        time="4:20 PM"
        message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum vero blanditiis accusantium fuga, eius ex repudiandae nobis dolorem dignissimos est quia recusandae tempore error adipisci illo aliquam! Tempora, voluptas libero ex quas quia voluptatum unde iste facilis molestiae blanditiis pariatur earum fugiat voluptatibus magnam, culpa, neque optio error veritatis? Praesentium minus voluptates quod molestias, dignissimos voluptatibus asperiores dolorum eum illum expedita nobis maiores deserunt possimus! Pariatur commodi laboriosam numquam ea modi provident recusandae aut distinctio dolorem ad natus aspernatur itaque reprehenderit, ex iusto vel nam! Exercitationem perferendis nam cum pariatur, sint harum inventore hic nisi quos maxime quas commodi delectus."
      />
      <Message
        author="Reverse bot"
        time="4:20 PM"
        message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum vero blanditiis accusantium fuga, eius ex repudiandae nobis dolorem dignissimos est quia recusandae tempore error adipisci illo aliquam! Tempora, voluptas libero ex quas quia voluptatum unde iste facilis molestiae blanditiis pariatur earum fugiat voluptatibus magnam, culpa, neque optio error veritatis? Praesentium minus voluptates quod molestias, dignissimos voluptatibus asperiores dolorum eum illum expedita nobis maiores deserunt possimus! Pariatur commodi laboriosam numquam ea modi provident recusandae aut distinctio dolorem ad natus aspernatur itaque reprehenderit, ex iusto vel nam! Exercitationem perferendis nam cum pariatur, sint harum inventore hic nisi quos maxime quas commodi delectus."
      />
    </div>
  );
};

export { Messages };
