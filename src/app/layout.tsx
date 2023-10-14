import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'מיד ליד',
  description:
    'אתר הפרסום המוביל למציאת עזרה והצפת מודעות. זקוק לעזרה? רוצה לסייע? הצטרף אלינו ותרום לקהילה. מודעות עזרה, פרסום בחינם',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={inter.className}>
        {children}
        <footer className="w-full bg-slate-100 py-3">
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
