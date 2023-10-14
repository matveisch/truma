import { Toggle } from '@/components/ui/toggle';
import { Dispatch, SetStateAction, useContext } from 'react';
import { ComboBox } from '@/components/ComboBox';
import { Context, ContextType } from '@/components/MainPage';

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
  const { dict } = useContext(Context) as ContextType;
  const filters: FilterType[] = [
    {
      name: dict.filters.housing,
      options: [
        dict.subFilters.onePerson,
        dict.subFilters.twoPeople,
        dict.subFilters.threePeople,
        dict.subFilters.fourPeople,
      ],
      description: dict.filtersText.housingText,
    },
    {
      name: dict.filters.food,
      options: [],
      description: dict.filtersText.foodText,
    },
    {
      name: dict.filters.animals,
      options: [
        dict.subFilters.oneAnimal,
        dict.subFilters.twoAnimals,
        dict.subFilters.threeAnimals,
      ],
      description: dict.filtersText.animalsText,
    },
    { name: dict.filters.children, options: [], description: dict.filtersText.childrenText },
    { name: dict.filters.mental, options: [], description: dict.filtersText.mentalText },
    {
      name: dict.filters.tramps,
      options: [],
      description: dict.filtersText.trampsText,
    },
    {
      name: dict.filters.transportation,
      options: [],
      description: dict.filtersText.transportationText,
    },
    { name: dict.filters.clothing, options: [], description: dict.filtersText.clothingText },
    { name: dict.filters.other, options: [], description: dict.filtersText.otherText },
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
