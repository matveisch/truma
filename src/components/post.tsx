'use client';

import { Card, CardContent, CardDescription, CardTitle, CardHeader } from './ui/card';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { useState } from 'react';

interface postProps {
  name: string;
  city: string;
  message: string;
  phones: string[];
  urgency?: string;
}
export default function Post({ name, city, message, phones, urgency }: postProps) {
  const [open, setOpen] = useState<boolean>(false);
  const card = (
    <Card
      className={
        urgency == '1'
          ? 'border-red-600 bg-red-100'
          : urgency == '2'
          ? 'border-orange-600 bg-orange-100'
          : urgency == '3'
          ? 'border-blue-600 bg-blue-100'
          : ''
      }
    >
      <CardHeader>
        <div className="flex flex-row-reverse justify-between align-middle">
          {urgency && (
            <div>
              <small className="text-gray-600 font-bold">דחפות:</small>
              {urgency == '1' ? (
                <p className="text-red-600">שעה 1</p>
              ) : urgency == '2' ? (
                <p className="text-orange-600">12 שעות</p>
              ) : urgency == '3' ? (
                <p className="text-blue-600">24 שעות</p>
              ) : (
                <p>לא דחוף</p>
              )}
            </div>
          )}

          <CardTitle className="ml-auto">{name}</CardTitle>
        </div>
        <CardDescription className="flex items-center gap-1">
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
          {city}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{message}</p>
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
    </Card>
  );

  return (
    <AlertDialog onOpenChange={() => setOpen(!open)}>
      <AlertDialogTrigger>
        <Card
          className={
            urgency == '1'
              ? 'border-red-600 bg-red-100'
              : urgency == '2'
              ? 'border-orange-600 bg-orange-100'
              : urgency == '3'
              ? 'border-blue-600 bg-blue-100'
              : ''
          }
        >
          <CardHeader>
            <div className="flex flex-row-reverse justify-between align-middle">
              {urgency && (
                <div>
                  <small className="text-gray-600 font-bold">דחפות:</small>
                  {urgency == '1' ? (
                    <p className="text-red-600">שעה 1</p>
                  ) : urgency == '2' ? (
                    <p className="text-orange-600">12 שעות</p>
                  ) : urgency == '3' ? (
                    <p className="text-blue-600">24 שעות</p>
                  ) : (
                    <p>לא דחוף</p>
                  )}
                </div>
              )}

              <CardTitle className="ml-auto">{name}</CardTitle>
            </div>
            <CardDescription className="flex items-center gap-1">
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
              {city}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{message}</p>
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
        </Card>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {card}
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
