'use client';

import Header from '@/components/Header';
import Post from '@/components/post';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toggle } from '@/components/ui/toggle';
import { useEffect, useState } from 'react';
import NewPostForm from '@/components/NewPostForm';
import { Button } from '@/components/ui/button';
import { HomeIcon, Plus } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { Database, PostRow } from '@/lib/supabase';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FilterType {
  name: string;
  options: string[];
  description: string;
}
export default function Home() {
  const filters: FilterType[] = [
    {
      name: 'דיור',
      options: ['בן אדם 1', '1-3 אנשים', '3-10 אנשים', 'יותר מ-10 אנשים'],
      description: 'מציאת דירה, חדר או מיטה למי שמוצא את עצמו ללא קורת גג.',
    },
    { name: 'אוכל', options: [], description: 'עזרה במציאת מזון, משלוח מזון' },
    {
      name: 'בעלי חיים',
      options: [],
      description: 'מציאת מקלט לחיות מחמד חסרות בית. חפש גם תרופות לבעלי חיים.',
    },
    { name: 'ילדים', options: [], description: 'עזרה במציאת מזון לתינוקות וחלב אם' },
    { name: 'עזרה רוחנית', options: [], description: 'תמיכה פסיכולוגית לנפגעים' },
    { name: 'תובלה', options: [], description: 'סיוע בהסעות, חיפוש מכוניות ונהגים' },
    { name: 'בגדים', options: [], description: 'תרומת חפצים' },
    { name: 'אחר', options: [], description: '' },
  ];
  const [activeToggle, setActiveToggle] = useState<string | null>(null);
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const selectedFilter = filters.find((key) => key.name === activeToggle);
  const [createMode, setCreateMode] = useState(false);
  const [needHelp, setNeedHelp] = useState(true);
  const [backendPosts, setBackendPosts] = useState<PostRow[] | null>(null);
  const [noOptionsPosts, setNoOptionPosts] = useState<PostRow[] | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<PostRow[] | null>(null);

  const supabaseUrl = 'https://eszdtlbcthjrkryjrlaa.supabase.co';
  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient<Database>(supabaseUrl, supabaseKey || '');

  useEffect(() => {
    async function getData() {
      const { data: posts, error } = await supabase
        .from('posts')
        .select()
        .order('id', { ascending: false });
      console.log(error?.message); //todo: deal with errors
      return posts;
    }
    getData().then((posts) => {
      setFilteredPosts(posts);
      setBackendPosts(posts);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFilterClick(filter: FilterType) {
    if (filter.name === activeToggle) {
      setActiveToggle(null);
    } else {
      setActiveToggle(filter.name);
    }
    setActiveOption(null);
  }

  useEffect(() => {
    let filteredInnerPosts: PostRow[] | null = null;
    if (backendPosts) {
      filteredInnerPosts = backendPosts.filter((post) => post.category === activeToggle);
    }
    setNoOptionPosts(filteredInnerPosts);
    setFilteredPosts(filteredInnerPosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeToggle]);

  useEffect(() => {
    if (activeToggle === null) {
      setFilteredPosts(backendPosts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeToggle]);

  useEffect(() => {
    if (activeOption === null) {
      setFilteredPosts(noOptionsPosts);
    } else {
      let filteredInnerOptions: PostRow[] | null = null;
      if (filteredPosts) {
        filteredInnerOptions = filteredPosts.filter((post) => post.subcategory === activeOption);
      }
      setFilteredPosts(filteredInnerOptions);
    }
  }, [activeOption]);

  return (
    <main className="flex min-h-screen flex-col items-center max-w-[1280px] m-auto sm:p-10 p-3">
      <Header>
        <Button
          className="flex gap-1 items-center rtl:flex-row-reverse"
          onClick={() => setCreateMode(!createMode)}
        >
          {!createMode && (
            <>
              <Plus />
              פירסום מודעה
            </>
          )}
          {createMode && (
            <>
              <HomeIcon />
            </>
          )}
        </Button>
      </Header>
      <Tabs defaultValue="need-help" className="min-w[250px] mt-10 sm:w-[50%] w-full">
        <TabsList className="w-full py-7 px-2">
          <TabsTrigger value="offer-help" className="w-full" onClick={() => setNeedHelp(false)}>
            מציע עזרה
          </TabsTrigger>
          <TabsTrigger value="need-help" className="w-full" onClick={() => setNeedHelp(true)}>
            צריך עזרה
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <h2 className="mt-[50px] text-right w-full text-xl">{selectedFilter?.description}</h2>
      <ScrollArea dir="rtl" aria-orientation="horizontal" className="w-full">
        <div
          //  className="flex gap-5 w-full mt-[10px] overflow-x-scroll"
          className="flex gap-5 w-full mt-[10px]"
        >
          {filters.map((filter, index) => (
            <Toggle
              pressed={activeToggle === filter.name}
              key={`${filter.name}-${index}`}
              variant="outline"
              onClick={() => handleFilterClick(filter)}
            >
              {filter.name}
            </Toggle>
          ))}
        </div>
      </ScrollArea>
      <div className="w-full mt-5">
        <div className="flex gap-2 w-full">
          {selectedFilter?.options.map((option, index) => (
            <div className=" flex justify-between align-middle gap-2" key={`${option}-${index}`}>
              <p
                onClick={() => {
                  setFilteredPosts(noOptionsPosts);
                  if (option === activeOption) {
                    setActiveOption(null);
                  } else {
                    setActiveOption(option);
                  }
                }}
                className={
                  'py-2 px-2 rounded-md cursor-pointer ' +
                  (option === activeOption ? 'bg-slate-200' : 'hover:bg-slate-100')
                }
              >
                {option}
              </p>
              {selectedFilter.options.length !== index && (
                <div className="w-[1px] h-6 m-auto bg-slate-300"></div>
              )}
            </div>
            // <Toggle
            //   pressed={activeOption === option}
            //   key={`${option}-${index}`}
            //   variant="outline"
            //   onClick={() => {
            //     if (option === activeOption) {
            //       setActiveOption(null);
            //     } else {
            //       setActiveOption(option);
            //     }
            //   }}
            // >
            //   {option}
            // </Toggle>
          ))}
        </div>
      </div>
      {!createMode && (
        <div className="mt-10 grid grid-cols-1 items-stretch gap-[20px] md:grid-cols-2 lg:grid-cols-3 w-full">
          {filteredPosts &&
            filteredPosts.map((post, index) => {
              return (
                <Post
                  key={post.name + index}
                  id={1}
                  area={post.area}
                  description={post.description}
                  name={post.name}
                  phones={post.phones}
                  date={new Date(post.time)}
                  military={post.military}
                  urgency={post.urgency}
                  subCategory={post.subcategory}
                  category={post.category}
                  need_help={post.need_help}
                />
              );
            })}
        </div>
      )}
      {createMode && (
        <NewPostForm
          backendPosts={backendPosts}
          needHelp={needHelp}
          activeOption={activeOption}
          activeFilter={activeToggle}
          supabase={supabase}
          setBackendPosts={setBackendPosts}
        />
      )}
    </main>
  );
}
