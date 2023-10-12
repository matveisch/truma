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
import { useEffect, useState } from 'react';

interface ImportanceType {
  name: string;
  urgency: number;
}

export const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Must be filled',
  }),
  city: z.string().min(1, {
    message: 'Must be filled',
  }),
  phone: z.string().min(1, {
    message: 'Must be filled',
  }),
  description: z.string().min(1, {
    message: 'Must be filled',
  }),
  importance: z.object({
    name: z.string(),
    urgency: z.number(),
  }),
});

export default function NewPostForm({ needHelp }: { needHelp: boolean }) {
  const { getValues, setValue, ...form } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      city: '',
      phone: '',
      description: '',
      importance: { name: 'לא דחוף', urgency: 0 },
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  useEffect(() => {
    setValue('importance', activeToggle);
  }, [activeToggle]);

  return (
    <Form {...form} setValue={setValue} getValues={getValues}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full justify-between sm:gap-20 "
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
            name="city"
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
        </div>
        <div className="flex flex-col items-start justify-start w-full">
          {needHelp && (
            <div className="flex flex-col gap-3 w-full">
              <FormLabel>דחפות</FormLabel>
              <div className="flex gap-2">
                {timeOptions.map((option, index) => (
                  <Toggle
                    pressed={activeToggle.name === option.name}
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
          <h3 className="mt-1 mb-3">כתוב בקצרה וברורה במה אתם יכולים לעזור</h3>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
