'use client';

import Header from '@/components/Header';
import Post from '@/components/post';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toggle } from '@/components/ui/toggle';
import { useState } from 'react';
import NewPostForm from '@/components/NewPostForm';
import { Button } from '@/components/ui/button';
import { HomeIcon, Plus } from 'lucide-react';

export default function Home() {
  const filters = [
    { name: 'דיור', options: ['בן אדם 1', '1-3 אנשים', '3-10 אנשים', 'יותר מ-10 אנשים'] },
    { name: 'אוכל', options: [] },
    { name: 'בעלי חיים', options: [] },
    { name: 'ילדים', options: [] },
    { name: 'עזרה רוחנית', options: [] },
    { name: 'תובלה', options: [] },
    { name: 'בגדים', options: [] },
    { name: 'אחר', options: [] },
  ];
  const posts = [
    {
      name: 'יוסי פהפדג',
      city: 'חיפה',
      message:
        'המחבלים החלו לזרוק רימונים לתוך חדר האוכל, ואוריאל תפס את הרימונים לפני שהתפוצצו, וזרק אותם חזרה לכיוון המחבלים. ככה פעם אחר פעם, רימון אחר רימון, עד שהמחבל האחרון שנותר עומד ירה בו והרג אותו. שני חבריו, שנפצעו במהלך הקרב, הצליחו לחסל את המחבל.  המחבלים החלו לזרוק רימונים לתוך חדר האוכל, ואוריאל תפס את הרימונים לפני שהתפוצצו, וזרק אותם חזרה לכיוון המחבלים. ככה פעם אחר פעם, רימון אחר רימון, עד שהמחבל האחרון שנותר עומד ירה בו והרג אותו. שני חבריו, שנפצעו במהלך הקרב, הצליחו לחסל את המחבל. ',
      phones: ['52952642985', '654815651', '+616162161'],
      date: '11.10.2023',
      time: '12:30',
      military: true,
    },
    {
      name: 'יוסי פהפדג',
      city: 'חיפה',
      message:
        'המחבלים החלו לזרוק רימונים לתוך חדר האוכל, ואוריאל תפס את הרימונים לפני שהתפוצצו, וזרק אותם חזרה לכיוון המחבלים. ככה פעם אחר פעם, רימון אחר רימון, עד שהמחבל האחרון שנותר עומד ירה בו והרג אותו. שני חבריו, שנפצעו במהלך הקרב, הצליחו לחסל את המחבל.  המחבלים החלו לזרוק רימונים לתוך חדר האוכל, ואוריאל תפס את הרימונים לפני שהתפוצצו, וזרק אותם חזרה לכיוון המחבלים. ככה פעם אחר פעם, רימון אחר רימון, עד שהמחבל האחרון שנותר עומד ירה בו והרג אותו. שני חבריו, שנפצעו במהלך הקרב, הצליחו לחסל את המחבל. ',
      phones: ['52952642985', '654815651', '+616162161'],
      urgency: '3',
      date: '11.10.2023',
      time: '12:30',
      military: true,
    },
    {
      name: 'יוסי פהפדג',
      city: 'חיפה',
      message:
        'המחבלים החלו לזרוק רימונים לתוך חדר האוכל, ואוריאל תפס את הרימונים לפני שהתפוצצו, וזרק אותם חזרה לכיוון המחבלים. ככה פעם אחר פעם, רימון אחר רימון, עד שהמחבל האחרון שנותר עומד ירה בו והרג אותו. שני חבריו, שנפצעו במהלך הקרב, הצליחו לחסל את המחבל.  המחבלים החלו לזרוק רימונים לתוך חדר האוכל, ואוריאל תפס את הרימונים לפני שהתפוצצו, וזרק אותם חזרה לכיוון המחבלים. ככה פעם אחר פעם, רימון אחר רימון, עד שהמחבל האחרון שנותר עומד ירה בו והרג אותו. שני חבריו, שנפצעו במהלך הקרב, הצליחו לחסל את המחבל. ',
      phones: ['52952642985', '654815651', '+616162161'],
      urgency: '2',
      date: '11.10.2023',
      time: '12:30',
      military: false,
    },
    {
      name: 'יוסי פהפדג',
      city: 'חיפה',
      message:
        'המחבלים החלו לזרוק רימונים לתוך חדר האוכל, ואוריאל תפס את הרימונים לפני שהתפוצצו, וזרק אותם חזרה לכיוון המחבלים. ככה פעם אחר פעם, רימון אחר רימון, עד שהמחבל האחרון שנותר עומד ירה בו והרג אותו. שני חבריו, שנפצעו במהלך הקרב, הצליחו לחסל את המחבל.  המחבלים החלו לזרוק רימונים לתוך חדר האוכל, ואוריאל תפס את הרימונים לפני שהתפוצצו, וזרק אותם חזרה לכיוון המחבלים. ככה פעם אחר פעם, רימון אחר רימון, עד שהמחבל האחרון שנותר עומד ירה בו והרג אותו. שני חבריו, שנפצעו במהלך הקרב, הצליחו לחסל את המחבל. ',
      phones: ['52952642985', '654815651', '+616162161'],
      urgency: '1',
      date: '11.10.2023',
      time: '12:30',
      military: true,
    },
  ];
  const [activeToggle, setActiveToggle] = useState<string | null>(null);
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const selectedFilter = filters.find((key) => key.name === activeToggle);
  const [createMode, setCreateMode] = useState(false);
  const [needHelp, setNeedHelp] = useState(true);

  return (
    <main className="flex min-h-screen flex-col items-center sm:p-10 p-3">
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
      <Tabs defaultValue="need-help" className="w-[50%] min-w[250px] mt-10">
        <TabsList className="w-full py-6 px-2">
          <TabsTrigger value="offer-help" className="w-full" onClick={() => setNeedHelp(false)}>
            מציע עזרה
          </TabsTrigger>
          <TabsTrigger value="need-help" className="w-full" onClick={() => setNeedHelp(true)}>
            צריך עזרה
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex gap-5 w-full mt-[60px] overflow-scroll">
        {filters.map((filter, index) => (
          <Toggle
            pressed={activeToggle === filter.name}
            key={`${filter.name}-${index}`}
            variant="outline"
            onClick={() => {
              if (filter.name === activeToggle) {
                setActiveToggle(null);
              } else {
                setActiveToggle(filter.name);
              }
              setActiveOption(null);
            }}
          >
            {filter.name}
          </Toggle>
        ))}
      </div>
      <div className="w-full mt-5">
        <div className="flex gap-5 w-full">
          {selectedFilter?.options.map((option, index) => (
            <Toggle
              pressed={activeOption === option}
              key={`${option}-${index}`}
              variant="outline"
              onClick={() => {
                if (option === activeOption) {
                  setActiveOption(null);
                } else {
                  setActiveOption(option);
                }
              }}
            >
              {option}
            </Toggle>
          ))}
        </div>
      </div>
      {!createMode && (
        <div className="grid grid-cols-1 items-stretch gap-[20px] md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => {
            return (
              <Post
                key={post.name + index}
                city={post.city}
                message={post.message}
                name={post.name}
                phones={post.phones}
                time={post.time}
                date={post.date}
                military={post.military}
                urgency={post.urgency}
              />
            );
          })}
        </div>
      )}
      {createMode && <NewPostForm needHelp={needHelp} />}
    </main>
  );
}
