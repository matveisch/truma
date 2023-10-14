import { Card, CardContent, CardTitle, CardHeader, CardFooter } from './card';
import { Button } from './button';
import { Separator } from './separator';
import { ScrollArea } from './scroll-area';
import { AlertDialogTrigger } from './alert-dialog';
import { Files } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useContext } from 'react';
import { Context, ContextType } from '@/components/MainPage';
import AreasData from '@/lib/AreasData';
import FiltersData from '@/lib/FiltersData';
interface postProps {
  name: string;
  area: string;
  description: string;
  phones: string[];
  date: Date;
  military: boolean;
  urgency: number;
  need_help: boolean;
  open: boolean;
  category: string;
  subCategory: string;
}

function toTwoDigits(num: number) {
  return String(num).padStart(2, '0');
}

export default function PostCard({
  name,
  area,
  description,
  phones,
  date,
  military,
  urgency,
  need_help,
  category,
  subCategory,
  open,
}: postProps) {
  const { toast } = useToast();
  const { dict } = useContext(Context) as ContextType;
  const areas = AreasData();
  const postArea = areas.find((areaItem) => areaItem.value === area);
  const filters = FiltersData();

  function getFilterName(value: string) {
    const foundFilter = filters.find((filter) => filter.value === value);
    return foundFilter ? foundFilter.name : '';
  }

  function getSubFilterName(value: string, subValue: string) {
    const foundFilter = filters.find((filter) => filter.value === value);
    const foundSubFilter = foundFilter?.options.find((option) => option.value === subValue);
    return foundSubFilter ? foundSubFilter.label : '';
  }

  return (
    <Card
      className={
        'h-full p-1 border-2 flex flex-col justify-between overflow-hidden' +
        (urgency == 1
          ? ' border-red-600 h-full'
          : urgency == 2
          ? ' border-orange-600 h-full'
          : urgency == 3
          ? ' border-blue-600 h-full'
          : '')
      }
    >
      <div>
        {need_help && (
          <div className={'w-full rounded-md ' + (military ? 'bg-green-200' : 'bg-blue-200')}>
            <p className=" text-center">{military ? dict.post.military : dict.post.civil}</p>
          </div>
        )}
        <CardHeader>
          <p className="text-xs text-slate-500">
            {getFilterName(category) + ', ' + getSubFilterName(category, subCategory)}
          </p>
          <CardTitle className="ml-auto">{name}</CardTitle>
          <CardContent className="p-0 text-slate-500">
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                  clipRule="evenodd"
                />
              </svg>
              <p>{postArea?.label}</p>
              {date && (
                <div className="flex gap-2 align-middle">
                  <Separator orientation="vertical" className="h-5" />
                  <p>
                    {toTwoDigits(date.getHours())}:{toTwoDigits(date.getMinutes())}
                  </p>
                  <Separator orientation="vertical" className="h-5" />
                  <p>
                    {toTwoDigits(date.getDate())}.{toTwoDigits(date.getMonth() + 1)}.
                    {toTwoDigits(date.getFullYear())}
                  </p>
                </div>
              )}
            </div>
            {urgency !== 0 && (
              <div>
                <small className="text-gray-600 font-bold inline text-right">
                  <span>
                    {dict.post.urgency}:{'     '}
                    {urgency == 1 ? (
                      <p className="text-red-600 inline">{dict.post.oneUrgent}</p>
                    ) : urgency == 2 ? (
                      <p className="text-orange-600 inline">{dict.post.twoUrgent}</p>
                    ) : urgency == 3 ? (
                      <p className="text-blue-600 inline">{dict.post.threeUrgent}</p>
                    ) : (
                      <p>{dict.post.fourUrgent}</p>
                    )}
                  </span>
                </small>
              </div>
            )}
          </CardContent>
        </CardHeader>
        <CardContent>
          <div className={'' + (open ? 'border-gray-300 border-2 rounded-md p-2' : '')}>
            <ScrollArea type="always" dir="rtl" className={'pl-6 ' + (open ? 'h-52' : 'h-fit')}>
              <p
                className={
                  'text-right ' + (open ? 'max-h-full' : 'h-fit overflow-hidden text-ellipsis')
                }
                style={{ display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical' }}
              >
                {description}
              </p>
            </ScrollArea>
          </div>
        </CardContent>
        <CardContent className="flex flex-col gap-1">
          {phones.map((phone, index) => {
            return (
              <a
                href={'tel:' + phone}
                key={index}
                className="flex items-center gap-1 border-2 w-fit p-2 rounded-md hover:bg-slate-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                    clipRule="evenodd"
                  />
                </svg>
                {phone}
              </a>
            );
          })}
        </CardContent>
      </div>
      <CardFooter className="flex gap-[20px] mt-auto">
        <Button
          variant={open ? 'default' : 'secondary'}
          className="w-full"
          onClick={() => {
            navigator.clipboard.writeText(
              name +
                '\n \n' +
                description +
                '\n \n' +
                phones.map((phone) => {
                  return 'טל: ' + phone + ' \n';
                })
            );
            toast({
              title: dict.post.copied,
            });
          }}
        >
          <Files className="ml-3" />
          {dict.post.copy}
        </Button>
        {!open && (
          <AlertDialogTrigger className="w-full" asChild>
            <Button className="w-full">{dict.post.open}</Button>
          </AlertDialogTrigger>
        )}
      </CardFooter>
    </Card>
  );
}
