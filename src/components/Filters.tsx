import { Toggle } from '@/components/ui/toggle';
import { Dispatch, SetStateAction } from 'react';
import { ComboBox } from '@/components/ComboBox';
import FiltersData from '@/lib/FiltersData';

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
  const filters = FiltersData();
  const selectedFilter = filters.find((key) => key.value === activeToggle);

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
            pressed={activeToggle === filter.value}
            key={`${filter.value}-${index}`}
            variant="outline"
            onClick={() => {
              if (filter.value === activeToggle) {
                setActiveToggle(null);
              } else {
                setActiveToggle(filter.value);
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
                  if (option.value === activeOption) {
                    setActiveOption(null);
                  } else {
                    setActiveOption(option.value);
                  }
                }}
                className={
                  'py-2 px-2 rounded-md cursor-pointer ' +
                  (option.value === activeOption ? 'bg-blue-100' : 'hover:bg-slate-100')
                }
              >
                {option.label}
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
