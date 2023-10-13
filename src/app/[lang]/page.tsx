import { getDictionary } from '@/app/[lang]/dictionaries';
import MainPage from '@/components/MainPage';

async function Home({ params: { lang } }: { params: { lang: 'en' | 'ru' | 'he' } }) {
  const dict: any = await getDictionary(lang);

  return (
    <main style={lang === 'he' ? { direction: 'rtl' } : undefined}>
      <MainPage dict={dict} />
    </main>
  );
}

export default Home;
