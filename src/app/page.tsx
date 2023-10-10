import Header from '@/components/Header';
import Post from '@/components/post';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Header />
      <Tabs defaultValue="need-help" className="w-[50%] min-w[250px]">
        <TabsList className="w-full py-6 px-2">
          <TabsTrigger value="offer-help" className="w-full">
            מציע עזרה
          </TabsTrigger>
          <TabsTrigger value="need-help" className="w-full">
            צריך עזרה
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Post
        name="יוסי פהפדג"
        city="חיפה"
        message="The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax."
        phones={['52952642985', '654815651', '+616162161']}
      />
    </main>
  );
}
