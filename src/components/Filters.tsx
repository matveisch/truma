import { Toggle } from '@/components/ui/toggle';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { ComboBox } from '@/components/ComboBox';

interface FilterType {
  name: string;
  options: string[];
  description: string;
}

interface PropsType {
  activeToggle: string | null;
  setActiveToggle: Dispatch<SetStateAction<string | null>>;
  activeOption: string | null;
  setActiveOption: Dispatch<SetStateAction<string | null>>;
  setSelectedArea?: Dispatch<SetStateAction<string>>;
  createMode?: boolean;
}

export default function Filters({
  activeToggle,
  setActiveToggle,
  activeOption,
  setActiveOption,
  setSelectedArea,
  createMode,
}: PropsType) {
  const filters: FilterType[] = [
    {
      name: 'מיגורים',
      options: ['בן אדם 1', '1-3 אנשים', '3-10 אנשים', 'יותר מ-10 אנשים'],
      description: 'מתן פתרונות מגורים',
    },
    {
      name: 'מזון',
      options: [],
      description: 'עזרה במציאת מזון, משלוח מזון',
    },
    {
      name: 'בעלי חיים',
      options: ['חיה 1', '2 חיות', '3+ חיות'],
      description: 'מציאת מקלט לחיות מחמד חסרות בית וחיפוש עבור סיוע תרופת',
    },
    { name: 'ילדים', options: [], description: 'במציאת מזון לתינוקות וחלב אם' },
    { name: 'עזרה נפשית', options: [], description: 'עזרה נפשית למי שצריך' },
    {
      name: 'הסעות',
      options: [],
      description: 'חיפוש טראמף, סיוע במעבר בתוך הארץ',
    },
    {
      name: 'הובלות',
      options: [],
      description: 'סיוע בהובלת סחורות, תרומות',
    },
    { name: 'ביגוד', options: [], description: 'תרומת חפצים' },
    { name: 'אחר', options: [], description: '' },
  ];

  const selectedFilter = filters.find((key) => key.name === activeToggle);
  return (
    <div className="w-full">
      {!createMode && (
        <div className="w-fit">
          <ComboBox setArea={setSelectedArea} />
        </div>
      )}

      <div className=" flex mt-3 gap-5 w-full items-ce overflow-x-auto overflow-y-hidden direction-alternate-reverse">
        {filters.map((filter, index) => (
          <Toggle
            size={'lg'}
            className="text-lg w-fit whitespace-nowrap"
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
        <div className="flex gap-2 w-full">
          {selectedFilter?.options.map((option, index) => (
            <div className=" flex justify-between align-middle gap-2" key={`${option}-${index}`}>
              <p
                onClick={() => {
                  if (option === activeOption) {
                    setActiveOption(null);
                  } else {
                    setActiveOption(option);
                  }
                }}
                className={
                  'py-2 px-2 rounded-md cursor-pointer ' +
                  (option === activeOption ? 'bg-blue-100' : 'hover:bg-slate-100')
                }
              >
                {option}
              </p>
              {selectedFilter.options.length !== index + 1 && (
                <div className="w-[1px] h-6 m-auto bg-slate-300"></div>
              )}
            </div>
          ))}
        </div>
        <h2 className="mt-2 text-right w-full text-xl">{selectedFilter?.description}</h2>
      </div>
    </div>
  );
}
