import { db } from './db';

async function main() {
  await db.user.createMany({
    data: [
      {
        email: 'echo-bot@gmail.com',
        password: 'S1plBEt9F0GfXyg',
        fullName: 'Echo Bot',
        imageName: 'echo.png',
        isBot: true,
      },
      {
        email: 'ignore-bot@gmail.com',
        password: 'fY7raotSlTSW0Q6',
        fullName: 'Ignore Bot',
        imageName: 'ignore.png',
        isBot: true,
      },
      {
        email: 'reverse-bot@gmail.com',
        password: 'fX2bJW1XHNVGCl4',
        fullName: 'Reverse Bot',
        imageName: 'reverse.png',
        isBot: true,
      },
      {
        email: 'spam-bot@gmail.com',
        password: '2odNvT4dPPPp5DD',
        fullName: 'Spam Bot',
        imageName: 'spam.png',
        isBot: true,
      },
    ],
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
