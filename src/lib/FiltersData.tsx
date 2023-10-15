import { useContext } from 'react';
import { Context, ContextType } from '@/components/MainPage';

interface FilterType {
  value: string;
  label: string;
  options: { value: string; label: string }[];
  description: string;
}

export default function FiltersData(): FilterType[] {
  const { dict } = useContext(Context) as ContextType;

  return [
    {
      value: 'housing',
      label: dict.filters.housing,
      options: [
        { value: 'onePerson', label: dict.subFilters.onePerson },
        { value: 'twoPeople', label: dict.subFilters.twoPeople },
        { value: 'threePeople', label: dict.subFilters.threePeople },
        { value: 'fourPeople', label: dict.subFilters.fourPeople },
      ],
      description: dict.filtersText.housingText,
    },
    {
      value: 'food',
      label: dict.filters.food,
      options: [],
      description: dict.filtersText.foodText,
    },
    {
      value: 'animals',
      label: dict.filters.animals,
      options: [
        { value: 'oneAnimal', label: dict.subFilters.oneAnimal },
        { value: 'twoAnimals', label: dict.subFilters.twoAnimals },
        { value: 'threeAnimals', label: dict.subFilters.threeAnimals },
      ],
      description: dict.filtersText.animalsText,
    },
    {
      value: 'children',
      label: dict.filters.children,
      options: [],
      description: dict.filtersText.childrenText,
    },
    {
      value: 'mental',
      label: dict.filters.mental,
      options: [],
      description: dict.filtersText.mentalText,
    },
    {
      value: 'tramps',
      label: dict.filters.tramps,
      options: [],
      description: dict.filtersText.trampsText,
    },
    {
      value: 'transportation',
      label: dict.filters.transportation,
      options: [],
      description: dict.filtersText.transportationText,
    },
    {
      value: 'clothing',
      label: dict.filters.clothing,
      options: [],
      description: dict.filtersText.clothingText,
    },
    {
      value: 'other',
      label: dict.filters.other,
      options: [],
      description: dict.filtersText.otherText,
    },
  ];
}
