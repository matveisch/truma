import { getDictionary } from '@/app/[lang]/dictionaries';

export default async function Home({ params: { lang } }: { params: { lang: 'en' | 'ru' | 'he' } }) {
  const dict: any = await getDictionary(lang);

  return (
    <div className="p-4 max-w-lg mx-auto text-left">
      <h1 className="font-bold text-2xl mb-4">{dict.terms_of_use.title}</h1>
      {dict.terms_of_use.sections.map((section: any, index: number) => (
        <div className="mb-2" key={index}>
          <p>
            <strong className="font-semibold">{section.section_title}</strong>
          </p>
          {Array.isArray(section.content) ? (
            <ul>
              {section.content.map((item: any, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <span>{section.content}</span>
          )}
        </div>
      ))}
    </div>
  );
}
