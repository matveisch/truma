import Header from '@/components/Header';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Header />
      <Tabs defaultValue="need-help" className="w-[250px]">
        <TabsList className="w-full">
          <TabsTrigger value="offer-help" className="w-full">
            מציע עזרה
          </TabsTrigger>
          <TabsTrigger value="need-help" className="w-full">
            צריך עזרה
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </main>
  );
}
