'use client';

import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardTitle, CardHeader, CardFooter } from './ui/card';
import { useToast } from './ui/use-toast';
import { Separator } from './ui/separator';

import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';

import { useState } from 'react';
import { ScrollArea } from './ui/scroll-area';

import PostCard from './ui/postCard';
import { X } from 'lucide-react';

interface postProps {
  name: string;
  area: string;
  description: string;
  phones: string[];
  date?: Date;
  military?: boolean;
  urgency?: number;
  category: string;
  subCategory: string;
  helping: boolean;
}
export default function Post({
  name,
  area,
  description,
  phones,
  date,
  military,
  urgency,
}: postProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <AlertDialog onOpenChange={() => setOpen(!open)}>
        <PostCard
          area={area}
          description={description}
          name={name}
          phones={phones}
          date={date}
          military={military}
          urgency={urgency}
          open={open}
        />
        <AlertDialogContent className="pt-11">
          <AlertDialogTrigger className="absolute top-[10px] right-[24px] gap-2 flex rounded-md bg-gray-200 px-2 hover:bg-gray-300">
            <X />
            <p>לסגור</p>
            {/* <svg
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
            </svg> */}
          </AlertDialogTrigger>
          <PostCard
            area={area}
            description={description}
            name={name}
            phones={phones}
            date={date}
            military={military}
            urgency={urgency}
            open={open}
          />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
