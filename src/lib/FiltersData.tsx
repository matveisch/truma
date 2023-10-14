import { useContext } from 'react';
import { Context, ContextType } from '@/components/MainPage';

interface FilterType {
  value: string;
  name: string;
  options: { value: string; label: string }[];
  description: string;
}

export default function FiltersData(): FilterType[] {
  const { dict } = useContext(Context) as ContextType;

  return [
    {
      value: 'housing',
      name: dict.filters.housing,
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
      name: dict.filters.food,
      options: [],
      description: dict.filtersText.foodText,
    },
    {
      value: 'animals',
      name: dict.filters.animals,
      options: [
        { value: 'oneAnimal', label: dict.subFilters.oneAnimal },
        { value: 'twoAnimals', label: dict.subFilters.twoAnimals },
        { value: 'threeAnimals', label: dict.subFilters.threeAnimals },
      ],
      description: dict.filtersText.animalsText,
    },
    {
      value: 'children',
      name: dict.filters.children,
      options: [],
      description: dict.filtersText.childrenText,
    },
    {
      value: 'mental',
      name: dict.filters.mental,
      options: [],
      description: dict.filtersText.mentalText,
    },
    {
      value: 'tramps',
      name: dict.filters.tramps,
      options: [],
      description: dict.filtersText.trampsText,
    },
    {
      value: 'transportation',
      name: dict.filters.transportation,
      options: [],
      description: dict.filtersText.transportationText,
    },
    {
      value: 'clothing',
      name: dict.filters.clothing,
      options: [],
      description: dict.filtersText.clothingText,
    },
    {
      value: 'other',
      name: dict.filters.other,
      options: [],
      description: dict.filtersText.otherText,
    },
  ];
}
