'use client';

import { useEffect, useState } from 'react';
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

export default function MainPage({ dict }: { dict: any }) {
  const [activeToggle, setActiveToggle] = useState<string | null>(null);
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [createMode, setCreateMode] = useState(false);
  const [needHelp, setNeedHelp] = useState(true);
  const [selectedArea, setSelectedArea] = useState('');

  const supabaseUrl = 'https://eszdtlbcthjrkryjrlaa.supabase.co';
  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient<Database>(supabaseUrl, supabaseKey || '');

  useEffect(() => {
    setActiveToggle(null);
  }, [createMode, needHelp]);

  console.log({ dict });

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
              פרסום מודעה
            </>
          )}
          {createMode && (
            <>
              <HomeIcon />
            </>
          )}
        </Button>
      </Header>
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
          <p className="text-3xl ml-auto">בחר את הקטגוריה שבה {needHelp ? 'צריך' : 'מציע'} עזרה</p>
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
    </main>
  );
}