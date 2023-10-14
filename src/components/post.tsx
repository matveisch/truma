'use client';

import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useContext, useState } from 'react';
import PostCard from './ui/postCard';
import { X } from 'lucide-react';
import { Context, ContextType } from '@/components/MainPage';

interface postProps {
  id: number;
  name: string;
  area: string;
  description: string;
  phones: string[];
  date: Date;
  military: boolean;
  urgency: number;
  category: string;
  subCategory: string;
  need_help: boolean;
}
export default function Post({
  name,
  area,
  description,
  phones,
  date,
  military,
  category,
  subCategory,
  need_help,
  urgency,
}: postProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { dict } = useContext(Context) as ContextType;

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
          need_help={need_help}
          urgency={urgency}
          open={open}
          category={category}
          subCategory={subCategory}
        />
        <AlertDialogContent className="pt-11">
          <AlertDialogTrigger className="absolute top-[10px] right-[24px] gap-2 flex rounded-md bg-gray-200 px-2 hover:bg-gray-300">
            <X />
            <p>{dict.post.close}</p>
          </AlertDialogTrigger>
          <PostCard
            area={area}
            description={description}
            name={name}
            phones={phones}
            date={date}
            military={military}
            need_help={need_help}
            urgency={urgency}
            open={open}
            category={category}
            subCategory={subCategory}
          />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
