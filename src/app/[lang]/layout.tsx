import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'מיד ליד',
//   description:
//     'אתר הפרסום המוביל למציאת עזרה והצפת מודעות. זקוק לעזרה? רוצה לסייע? הצטרף אלינו ותרום לקהילה. מודעות עזרה, פרסום בחינם',
// };

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'he' }, { lang: 'ru' }];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const russianMetadata: Metadata = {
    title: 'Платформа помощи и волонтерства מיד ליד: объявления о помощи бесплатно',
    description:
      'Присоединяйтесь к платформе מיד ליד для размещения и поиска объявлений о помощи и волонтерской деятельности. У нас вы найдете волонтерские возможности и поддержку бесплатно.',
  };

  const englishMetadata: Metadata = {
    title:
      'מיד ליד - Volunteering and Assistance Platform in Israel | Post and Offer Help for Free',
    description:
      'מיד ליד is a volunteering and assistance platform in Israel. Post or join to find help within our community. Everything is free and in the spirit of volunteering.',
  };

  const hebrewMetadata: Metadata = {
    title: 'מיד ליד - פלטפורמת התנדבות ועזרה בישראל | פרסום ומציעים עזרה חינם',
    description:
      'מיד ליד היא פלטפורמת התנדבות ועזרה בישראל. פרסמו או הצטרפו למציאת עזרה במדינה שלנו. הכל בחינם וברוח התנדבותית.',
  };

  if (params.lang === 'en') {
    return englishMetadata;
  } else if (params.lang === 'ru') {
    return russianMetadata;
  } else {
    return hebrewMetadata;
  }
}
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <body className={`relative min-h-[calc(100vh-48px)] ${inter.className}`}>
        {children}
        <footer className="w-full bg-slate-100 py-3 absolute bottom-[-48px]">
          <a
            href="mailto:support@desight.co"
            className="w-fit text-center mx-auto block hover:text-blue-600"
          >
            support@desight.co
          </a>
        </footer>
      </body>
    </html>
  );
}
