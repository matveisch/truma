import { Toggle } from '@/components/ui/toggle';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
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

  const subfilterRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);
  useEffect(() => {
    subfilterRef.current != null && textRef.current != null
      ? setHeight(subfilterRef.current.offsetHeight + textRef.current.offsetHeight)
      : undefined;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);
  return (
    <div className="w-full">
      {!createMode && (
        <div className="w-fit">
          <ComboBox setArea={setSelectedArea} />
        </div>
      )}
      <div className=" flex mt-3 pb-3 gap-5 w-full items-ce overflow-x-auto overflow-y-hidden direction-alternate-reverse">
        {filters.map((filter, index) => (
          <Toggle
            size={'sm'}
            className="text-sm sm:text-lg w-fit whitespace-nowrap"
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
      <div
        className={
          'mt-5 relative transition-all duration-200 overflow-hidden'
          // h-[' +
          // (subfilterRef.current ? subfilterRef.current.clientHeight : 0) +
          // 'px]'
        }
        style={{ height: height }}
        //selectedFilter != null
        // ? 'h-fit'
        // : 'h-0')
        //}
      >
        <div ref={subfilterRef} className="flex gap-2 w-full pb-3 overflow-x-auto">
          {selectedFilter?.options.map((option, index) => (
            <div
              className="flex justify-between align-middle gap-2 w-fit"
              key={`${option}-${index}`}
            >
              <p
                onClick={() => {
                  if (option.value === activeOption) {
                    setActiveOption(null);
                  } else {
                    setActiveOption(option.value);
                  }
                }}
                className={
                  'py-2 px-2 rounded-md cursor-pointer whitespace-nowrap w-max ' +
                  (option.value === activeOption
                    ? 'bg-blue-100 hover:bg-blue-200'
                    : 'hover:bg-slate-100')
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
        <h2 ref={textRef} className=" w-full text-xl">
          {selectedFilter?.description}
        </h2>
      </div>
    </div>
  );
}
