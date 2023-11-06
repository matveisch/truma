'use client';

import { createContext, useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/supabase';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { HomeIcon, Plus } from 'lucide-react';
import TabSwitcher from '@/components/TabSwitcher';
import Filters from '@/components/Filters';
import Posts from '@/components/Posts';
import { Toaster } from '@/components/ui/toaster';
import NewPostForm from '@/components/NewPostForm';
import Image from 'next/image';
import heroImage from '@/public/hero_img.svg';
export interface ContextType {
  dict: any;
  lang: 'en' | 'ru' | 'he';
}

export const Context = createContext<ContextType | null>(null);

export default function MainPage({ dict, lang }: { dict: any; lang: 'en' | 'ru' | 'he' }) {
  const [activeToggle, setActiveToggle] = useState<string | null>(null);
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [createMode, setCreateMode] = useState(false);
  const [needHelp, setNeedHelp] = useState(true);
  const [selectedArea, setSelectedArea] = useState('');
  // const topRef = useRef<HTMLDivElement>(null);
  // const [marginTop, setMarginTop] = useState<number>();
  const supabaseUrl = 'https://eszdtlbcthjrkryjrlaa.supabase.co';
  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient<Database>(supabaseUrl, supabaseKey || '');
  // useEffect(() => {
  //   let margin =
  //     topRef.current?.offsetHeight != undefined ? topRef.current?.offsetHeight + 20 : 100;
  //   setMarginTop(margin);
  //   console.log(marginTop);
  // }, [topRef.current?.offsetHeight]);

  useEffect(() => {
    document.documentElement.lang = lang;

    if (lang === 'he') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [lang]);

  useEffect(() => {
    setActiveToggle(null);
  }, [createMode, needHelp]);

  return (
    <main
      className="max-w-[1280px] m-auto"
      style={lang === 'he' ? { direction: 'rtl' } : undefined}
    >
      <div className="bg-white z-10 relative flex flex-col items-center sm:p-10 p-3 m-auto min-h-screen ">
        <Context.Provider value={{ dict, lang }}>
          <Header>
            <Button
              className="flex gap-1 items-center rtl:flex-row-reverse"
              onClick={() => setCreateMode(!createMode)}
            >
              {!createMode && (
                <>
                  <Plus />
                  {dict.header.newAd}
                </>
              )}
              {createMode && (
                <>
                  <HomeIcon />
                </>
              )}
            </Button>
          </Header>
          <div className="mt-6 flex border-8 p-4 border-blue-50 rounded-md flex-col md:flex-row">
            <div className="bg-blue-50 rounded-md p-6  flex items-center justify-center flex-col gap-4 w-full">
              <p className=" text-center text-lg md:text-start">{dict.seo.text1}</p>
              {/* <p>
                Наш ресурс предоставляет платформу для тех, кто готов оказать поддержку и для тех,
                кто ищет содействие в различных сферах жизни. Независимо от того, нужна вам
                поддержка с жильем, транспортом, питанием, одеждой или чем-либо еще, у нас вы
                найдете ответы на свои потребности
              </p> */}
              {/* <p>
                Что делает нашу платформу особенной - это возможность создать объявление абсолютно
                бесплатно. Вы можете разместить свою просьбу или предложение о содействии, чтобы
                найти тех, кто готов прийти на помощь в трудную минуту.
              </p>
              <p>
                Присоединяйтесь к מיד ליד и используйте нашу платформу для того, чтобы делать добро
                и находить поддержку в своем сообществе. Вместе мы можем сделать мир лучше.
              </p> */}
            </div>
            <div className="w-full flex items-center justify-center">
              <Image src={heroImage} alt="support help" className="h-60 w-auto" />
            </div>
          </div>

          <TabSwitcher setNeedHelp={setNeedHelp} />
          {!createMode && (
            <>
              <Filters
                setSelectedArea={setSelectedArea}
                activeToggle={activeToggle}
                setActiveToggle={setActiveToggle}
                activeOption={activeOption}
                setActiveOption={setActiveOption}
              />
              <Posts
                selectedArea={selectedArea}
                supabase={supabase}
                needHelp={needHelp}
                activeOption={activeOption}
                activeToggle={activeToggle}
              />
            </>
          )}

          {createMode && (
            <>
              <div className="flex justify-start w-full">
                <p className="text-3xl">{needHelp ? dict.form.title : dict.form.toHelpTitle}</p>
              </div>
              <Filters
                createMode={createMode}
                activeToggle={activeToggle}
                setActiveToggle={setActiveToggle}
                activeOption={activeOption}
                setActiveOption={setActiveOption}
              />
              <NewPostForm
                setCreateMode={setCreateMode}
                needHelp={needHelp}
                activeOption={activeOption}
                activeFilter={activeToggle}
                supabase={supabase}
              />
            </>
          )}
          <Toaster />
        </Context.Provider>
        <div className="p-6 flex flex-col gap-4 bg-blue-50 rounded-md">
          <p>{dict.seo.text2}</p>
          <p>{dict.seo.text3}</p>
          <p>{dict.seo.text4}</p>
        </div>
      </div>
    </main>
  );
}
