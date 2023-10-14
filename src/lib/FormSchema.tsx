import { useContext } from 'react';
import { Context, ContextType } from '@/components/MainPage';
import * as z from 'zod';

export default function FormSchema() {
  const { dict } = useContext(Context) as ContextType;

  return z.object({
    name: z
      .string()
      .min(1, {
        message: dict.form.mustBeFilled,
      })
      .max(20, {
        message: dict.form.tooLong,
      }),
    area: z.string().min(1, {
      message: dict.form.mustBeFilled,
    }),
    phone: z
      .string()
      .min(1, {
        message: dict.form.mustBeFilled,
      })
      .max(13, {
        message: dict.form.tooLong,
      }),
    description: z.string().min(1, {
      message: dict.form.mustBeFilled,
    }),
    urgency: z.number(),
    military: z.boolean(),
  });
}
