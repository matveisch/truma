import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Context, ContextType } from '@/components/MainPage';

interface PropsType {
  setNeedHelp: Dispatch<SetStateAction<boolean>>;
}

export default function TabSwitcher({ setNeedHelp }: PropsType) {
  const { dict } = useContext(Context) as ContextType;

  return (
    <Tabs defaultValue="need-help" className="min-w[250px] my-10 w-full md:w-[50%]">
      <TabsList className="w-full py-8 px-2">
        <TabsTrigger value="offer-help" className="w-full" onClick={() => setNeedHelp(false)}>
          {dict.switcher.dontNeed}{' '}
        </TabsTrigger>
        <TabsTrigger value="need-help" className="w-full" onClick={() => setNeedHelp(true)}>
          {dict.switcher.need}{' '}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
