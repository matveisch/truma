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
  description: z.string(),
});

export default function NewPostForm() {
  const { setValue, ...form } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      city: '',
      phone: '',
      description: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form} setValue={setValue}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-20 flex-wrap">
        <div>
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
        <div className="flex flex-col items-start justify-start">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
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
