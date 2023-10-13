import { getDictionary } from '@/app/[lang]/dictionaries';
import MainPage from '@/components/MainPage';

async function Home({ params: { lang } }: { params: { lang: 'en' | 'ru' | 'he' } }) {
  const dict: any = await getDictionary(lang);

  return <MainPage dict={dict} lang={lang} />;
}

export default Home;
