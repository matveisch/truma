import { Skeleton } from './ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';

interface skelProps {
  amount: number;
}

export default function Skeletons({ amount }: skelProps) {
  const cards = [];
  for (let i = 0; i < amount; i++) {
    cards.push(
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-2 rounded-md w-20" />
          <Skeleton className="h-3 rounded-md w-[80%]" />
          <Skeleton className="h-2 rounded-md w-20" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-28 rounded-md w-full" />
        </CardContent>
        <CardFooter className="flex gap-8">
          <Skeleton className="h-10 rounded-md w-full" />
          <Skeleton className="h-10 rounded-md w-full" />
        </CardFooter>
      </Card>
    );
  }
  return (
    <div className="mt-12 grid grid-cols-1 items-stretch gap-[20px] md:grid-cols-2 lg:grid-cols-3 w-full">
      {cards.map((item, index) => {
        return <div key={`${item}-${index}`}>{item}</div>;
      })}
    </div>
  );
}
