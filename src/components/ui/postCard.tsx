import { Card, CardContent, CardDescription, CardTitle, CardHeader, CardFooter } from './card';
import { Button } from './button';
import { Separator } from './separator';
import { ScrollArea } from './scroll-area';
import { AlertDialogTrigger } from './alert-dialog';
import { Files } from 'lucide-react';
interface postProps {
  name: string;
  city: string;
  message: string;
  phones: string[];
  date?: string;
  time?: string;
  military?: boolean;
  urgency?: string;
  open: boolean;
}

export default function PostCard({
  name,
  city,
  message,
  phones,
  date,
  time,
  military,
  urgency,
  open,
}: postProps) {
  return (
    <Card
      className={
        'h-full p-1 border-2 ' +
        (urgency == '1'
          ? ' border-red-600 h-full'
          : urgency == '2'
          ? ' border-orange-600 h-full'
          : urgency == '3'
          ? ' border-blue-600 h-full'
          : '')
      }
    >
      {military != undefined && (
        <div className={'w-full rounded-md ' + (military ? 'bg-green-200' : 'bg-blue-200')}>
          <p className=" text-center">{military ? 'צבאי' : 'אזרחי'}</p>
        </div>
      )}

      <CardHeader>
        <div className="flex flex-row-reverse justify-between align-middle">
          <CardTitle className="ml-auto">{name}</CardTitle>
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
            <p>{city}</p>
            {time && date && (
              <div className="flex gap-2 align-middle">
                <Separator orientation="vertical" className="h-5" />
                <p>{time}</p>
                <Separator orientation="vertical" className="h-5" />
                <p>{date}</p>
              </div>
            )}
          </div>
          {urgency && (
            <div>
              <small className="text-gray-600 font-bold inline text-right">
                <span>
                  דחפות:{'     '}
                  {urgency == '1' ? (
                    <p className="text-red-600 inline">שעה 1</p>
                  ) : urgency == '2' ? (
                    <p className="text-orange-600 inline">12 שעות</p>
                  ) : urgency == '3' ? (
                    <p className="text-blue-600 inline">24 שעות</p>
                  ) : (
                    <p>לא דחוף</p>
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
              {message}
            </p>
          </ScrollArea>
        </div>
      </CardContent>
      <CardContent className="flex flex-col gap-1">
        {phones.map((item, index) => {
          return (
            <p key={index} className="flex items-center gap-1">
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

              {item}
            </p>
          );
        })}
      </CardContent>
      <CardFooter className="flex gap-[20px] mt-auto">
        <Button
          variant={open ? 'default' : 'secondary'}
          className="w-full"
          onClick={() => {
            navigator.clipboard.writeText(
              name +
                '\n \n' +
                message +
                '\n \n' +
                phones.map((phone) => {
                  return 'טל: ' + phone + ' \n';
                })
            );
            // toast({
            //   description: 'Your message has been sent.',
            // });
          }}
        >
          <Files className="ml-3" />
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 ml-1"
          >
            <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
            <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
          </svg> */}
          עותק
        </Button>
        {!open && (
          <AlertDialogTrigger className="w-full" asChild>
            <Button className="w-full">לפתוח</Button>
          </AlertDialogTrigger>
        )}
      </CardFooter>
    </Card>
  );
}
