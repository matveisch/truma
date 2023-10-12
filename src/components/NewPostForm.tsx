'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ComboBox } from '@/components/ComboBox';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database, PostInsert, PostRow } from '@/lib/supabase';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface ImportanceType {
  name: string;
  urgency: number;
}

interface PropsType {
  needHelp: boolean;
  activeFilter: string | null;
  activeOption: string | null;
  supabase: SupabaseClient<Database>;
  setBackendPosts: Dispatch<SetStateAction<PostRow[] | null>>;
  backendPosts: PostRow[] | null;
}

export const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Must be filled',
  }),
  area: z.string().min(1, {
    message: 'Must be filled',
  }),
  phone: z.string().min(1, {
    message: 'Must be filled',
  }),
  description: z.string().min(1, {
    message: 'Must be filled',
  }),
  urgency: z.number(),
  military: z.boolean(),
});

export default function NewPostForm({
  needHelp,
  activeFilter,
  activeOption,
  supabase,
  setBackendPosts,
  backendPosts,
}: PropsType) {
  const { getValues, setValue, ...form } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      area: '',
      phone: '',
      description: '',
      urgency: 0,
      military: false,
    },
  });
  const timeOptions = [
    { name: 'שעה 1', urgency: 1 },
    { name: '12 שעות', urgency: 2 },
    { name: '24 שעות', urgency: 3 },
    { name: 'לא דחוף', urgency: 0 },
  ];
  const [activeToggle, setActiveToggle] = useState<ImportanceType>({
    name: 'לא דחוף',
    urgency: 0,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { phone, ...restValues } = values;
    const dataToPost: PostInsert = {
      category: activeFilter || '',
      subcategory: activeOption || '',
      time: new Date().toISOString(),
      need_help: needHelp,
      phones: [phone],
      ...restValues,
    };

    const { data, error } = await supabase.from('posts').insert([dataToPost]).select();
    let p: PostRow[] | null = null;
    if (backendPosts && data) {
      p = data.concat(backendPosts);
    }
    setBackendPosts(p);
    console.log(error?.message); //todo: deal with errors
  }

  useEffect(() => {
    setValue('urgency', activeToggle.urgency);
  }, [activeToggle]);

  return (
    <Form {...form} setValue={setValue} getValues={getValues}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full justify-between sm:gap-20 flex-wrap sm:flex-nowrap"
      >
        <div className="w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>שם מלא</FormLabel>
                <FormControl>
                  <Input placeholder="שם מלא" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>אזור</FormLabel>
                <FormControl>
                  <ComboBox setOuterValue={setValue} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-end gap-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>טלפון</FormLabel>
                  <FormControl>
                    <Input placeholder="טלפון" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {needHelp && (
            <FormField
              control={form.control}
              name="military"
              render={({ field }) => (
                <FormItem className="w-full flex mt-2">
                  <div className="flex items-center space-x-2" style={{ direction: 'ltr' }}>
                    <Label htmlFor="military">אזרחי</Label>
                    <Switch id="military" onCheckedChange={field.onChange} checked={field.value} />
                    <Label htmlFor="military">צבאי</Label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <div className="flex flex-col items-start justify-start w-full">
          {needHelp && (
            <div className="flex flex-col gap-3 w-full">
              <FormLabel>דחפות</FormLabel>
              <div className="flex gap-2">
                {timeOptions.map((option, index) => (
                  <Toggle
                    pressed={activeToggle.name === option.name}
                    className={
                      index == 0
                        ? 'border-red-600'
                        : index == 1
                        ? 'border-orange-600'
                        : index == 2
                        ? 'border-blue-600'
                        : ''
                    }
                    key={`${option}-${index}`}
                    variant="outline"
                    onClick={() => setActiveToggle(option)}
                  >
                    {option.name}
                  </Toggle>
                ))}
              </div>
            </div>
          )}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>תיאור</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="עם מה אתם יכולים לעזור"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="mt-1 mb-3 text-sm text-muted-foreground">
            כתוב בקצרה וברורה במה אתם יכולים לעזור
          </p>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
