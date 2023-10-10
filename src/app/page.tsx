'use client';

import Header from '@/components/Header';
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
      <Tabs defaultValue="need-help" className="w-[250px] mt-10">
        <TabsList className="w-full">
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
            onClick={() => setActiveToggle(filter.name)}
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
              onClick={() => setActiveOption(option)}
            >
              {option}
            </Toggle>
          ))}
        </div>
      </div>
    </main>
  );
}
