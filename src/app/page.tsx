'use client';

import Header from '@/components/Header';
import Post from '@/components/post';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toggle } from '@/components/ui/toggle';
import { useState } from 'react';

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
  const [activeToggle, setActiveToggle] = useState<string | null>(null);
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const selectedFilter = filters.find((key) => key.name === activeToggle);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Header />
      <Tabs defaultValue="need-help" className="w-[50%] min-w[250px] mt-10">
        <TabsList className="w-full py-6 px-2">
          <TabsTrigger value="offer-help" className="w-full">
            מציע עזרה
          </TabsTrigger>
          <TabsTrigger value="need-help" className="w-full">
            צריך עזרה
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex gap-5 w-full mt-[60px]">
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
      <Post
        name="יוסי פהפדג"
        city="חיפה"
        message="The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax."
        phones={['52952642985', '654815651', '+616162161']}
      />
    </main>
  );
}
