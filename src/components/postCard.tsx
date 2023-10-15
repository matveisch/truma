import { Card, CardContent, CardTitle, CardHeader, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { AlertDialogTrigger } from './ui/alert-dialog';
import { Files, Phone } from 'lucide-react';
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
  const { dict, lang } = useContext(Context) as ContextType;
  const areas = AreasData();
  const postArea = areas.find((areaItem) => areaItem.value === area);
  const filters = FiltersData();

  function getFilterName(value: string) {
    const foundFilter = filters.find((filter) => filter.value === value);
    return foundFilter ? foundFilter.label : '';
  }

  function getSubFilterName(value: string, subValue: string) {
    const foundFilter = filters.find((filter) => filter.value === value);
    const foundSubFilter = foundFilter?.options.find((option) => option.value === subValue);
    return foundSubFilter ? ', ' + foundSubFilter.label : '';
  }

  return (
    <Card
      className={
        'h-full p-1 border-2 flex flex-col justify-between gap-2 overflow-hidden' +
        (urgency == 1
          ? ' border-red-600'
          : urgency == 2
          ? ' border-orange-600'
          : urgency == 3
          ? ' border-blue-600'
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
            {getFilterName(category) + getSubFilterName(category, subCategory)}
          </p>
          <div>
            <CardTitle>{name}</CardTitle>
          </div>
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
            <ScrollArea type="always" className={'' + (open ? 'h-52' : 'h-fit')}>
              <p
                className={'' + (open ? 'max-h-full' : 'h-fit overflow-hidden text-ellipsis')}
                style={
                  lang === 'he'
                    ? {
                        textAlign: 'end',
                        display: '-webkit-box',
                        WebkitLineClamp: 5,
                        WebkitBoxOrient: 'vertical',
                      }
                    : { display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical' }
                }
              >
                {description}
              </p>
            </ScrollArea>
          </div>
        </CardContent>
        <CardContent className="flex flex-col gap-1">
          {phones.map((phone, index) => {
            let phoneLink =
              phone.slice(0, 4) == '+972' || phone.slice(0, 3) == '972' ? phone : '972' + phone;

            return (
              <div className="flex gap-2" key={index}>
                <a
                  href={'tel:' + phone}
                  className="flex items-center gap-1 border-2 w-fit p-2 rounded-md hover:bg-slate-100"
                >
                  <Phone className="w-4 h-4" />
                  {phone}
                </a>
                <a
                  target="_blank"
                  href={'https://api.whatsapp.com/send?phone=' + phoneLink}
                  className="flex items-center gap-1 border-2 w-fit p-2 color-slate-400 rounded-md hover:bg-slate-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#3C3C3C"
                      d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28z"
                    />
                  </svg>
                </a>
              </div>
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
