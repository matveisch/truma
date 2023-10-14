import { useContext } from 'react';
import { Context, ContextType } from '@/components/MainPage';

export default function AreasData(): { value: string; label: string }[] {
  const { dict } = useContext(Context) as ContextType;

  return [
    {
      value: 'all',
      label: dict.misc.all,
    },
    {
      value: 'north',
      label: dict.misc.north,
    },
    {
      value: 'haifa',
      label: dict.misc.haifa,
    },
    {
      value: 'center',
      label: dict.misc.center,
    },
    {
      value: 'telAviv',
      label: dict.misc.telAviv,
    },
    {
      value: 'jerusalem',
      label: dict.misc.jerusalem,
    },
    {
      value: 'south',
      label: dict.misc.south,
    },
    {
      value: 'judeaAndSamaria',
      label: dict.misc.yehuda,
    },
  ];
}
