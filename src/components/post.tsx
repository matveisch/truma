'use client';

import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardTitle, CardHeader, CardFooter } from './ui/card';
import { useToast } from './ui/use-toast';
import { Separator } from './ui/separator';

import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';

import { useState } from 'react';
import { ScrollArea } from './ui/scroll-area';

interface postProps {
  name: string;
  city: string;
  message: string;
  phones: string[];
  date: string;
  time: string;
  military: boolean;
  urgency?: string;
}
export default function Post({
  name,
  city,
  message,
  phones,
  date,
  time,
  military,
  urgency,
}: postProps) {
  const [open, setOpen] = useState<boolean>(false);
  // const { toast } = useToast();
  const card = (
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
      <div className={'w-full rounded-md ' + (military ? 'bg-green-800' : 'bg-blue-800')}>
        <p className="text-white text-center">{military ? 'צבאי' : 'אזרחי'}</p>
      </div>
      <CardHeader>
        <div className="flex flex-row-reverse justify-between align-middle">
          <CardTitle className="ml-auto">{name}</CardTitle>
        </div>
        <CardDescription>
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
            <Separator orientation="vertical" className="h-5" />
            <p>{time}</p>
            <Separator orientation="vertical" className="h-5" />
            <p>{date}</p>
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
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea dir="rtl" className={'border-gray-950 pl-6 ' + (open ? 'h-52' : 'h-[150px]')}>
          <p
            className={
              'text-right ' + (open ? 'max-h-full' : 'max-h-[150px] overflow-hidden text-ellipsis')
            }
          >
            {message}
          </p>
        </ScrollArea>
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
      <CardFooter className="flex gap-[20px]">
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 ml-1"
          >
            <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
            <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
          </svg>
          עותק
        </Button>
        {!open && (
          <AlertDialogTrigger className="w-full">
            <Button className="w-full">לפתוח</Button>
          </AlertDialogTrigger>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <>
      <AlertDialog onOpenChange={() => setOpen(!open)}>
        {card}
        <AlertDialogContent>
          <AlertDialogTrigger className="absolute top-1 right-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                clipRule="evenodd"
              />
            </svg>
          </AlertDialogTrigger>
          {card}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
