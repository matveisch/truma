import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dispatch, SetStateAction } from 'react';

interface PropsType {
  setNeedHelp: Dispatch<SetStateAction<boolean>>;
}

export default function TabSwitcher({ setNeedHelp }: PropsType) {
  return (
    <Tabs defaultValue="need-help" className="min-w[250px] my-10 w-full md:w-[50%]">
      <TabsList className="w-full py-8 px-2">
        <TabsTrigger value="offer-help" className="w-full" onClick={() => setNeedHelp(false)}>
          מציע עזרה
        </TabsTrigger>
        <TabsTrigger value="need-help" className="w-full" onClick={() => setNeedHelp(true)}>
          צריך עזרה
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
