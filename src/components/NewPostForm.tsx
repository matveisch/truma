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
import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database, PostInsert } from '@/lib/supabase';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Context, ContextType } from '@/components/MainPage';
import FormSchema from '@/lib/FormSchema';
import { verifyCaptcha } from '../../ServerActions';
import ReCAPTCHA from 'react-google-recaptcha';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import AreasData from '@/lib/AreasData';
import FiltersData from '@/lib/FiltersData';

interface ImportanceType {
  name: string;
  urgency: number;
}

interface PropsType {
  needHelp: boolean;
  activeFilter: string | null;
  activeOption: string | null;
  supabase: SupabaseClient<Database>;
  setCreateMode: Dispatch<SetStateAction<boolean>>;
}

export default function NewPostForm(props: PropsType) {
  const { needHelp, activeFilter, activeOption, supabase, setCreateMode } = props;
  const { dict, lang } = useContext(Context) as ContextType;
  const formSchema = FormSchema();
  const { getValues, reset, setValue, ...form } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      area: '',
      phone: '',
      description: '',
      urgency: 0,
      military: false,
      category: '',
      subcategory: '',
    },
  });
  const timeOptions = [
    { name: dict.form.oneUrgent, urgency: 1 },
    { name: dict.form.twoUrgent, urgency: 2 },
    { name: dict.form.threeUrgent, urgency: 3 },
    { name: dict.form.fourUrgent, urgency: 0 },
  ];
  const [activeToggle, setActiveToggle] = useState<ImportanceType>(timeOptions[3]);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsverified] = useState<boolean>(false);
  const [allowPublication, setAllowPublication] = useState(false);
  const areas = AreasData();
  const filters = FiltersData();
  const [currentOptions, setCurrentOptions] = useState(
    filters.find((filter) => filter.value === getValues('category'))?.options
  );

  async function handleCaptchaSubmission(token: string | null) {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false));
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { phone, ...restValues } = values;
    const dataToPost: PostInsert = {
      time: new Date().toISOString(),
      need_help: needHelp,
      phones: [phone.toString()],
      ...restValues,
    };

    const { data, error } = await supabase.from('posts').insert([dataToPost]).select();
    error && console.log(error?.message); //todo: deal with errors
    if (data) setCreateMode(false);
  }

  useEffect(() => {
    setValue('urgency', activeToggle.urgency);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeToggle]);

  useEffect(() => {
    setCurrentOptions(filters.find((filter) => filter.value === getValues('category'))?.options);
  }, [getValues('category')]);

  return (
    <Form {...form} setValue={setValue} getValues={getValues} reset={reset}>
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
                <FormLabel>{dict.form.fName}</FormLabel>
                <FormControl>
                  <Input placeholder={dict.form.fName} {...field} />
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
                <FormLabel>{dict.form.area}</FormLabel>
                <FormControl>
                  <ComboBox
                    setOuterValue={setValue}
                    formValueToChange="area"
                    startingValue={dict.misc.choose}
                    sectionInDictionary={dict.misc}
                    options={areas}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{'הקטגוריה'}</FormLabel>
                <FormControl>
                  <ComboBox
                    setOuterValue={setValue}
                    formValueToChange="category"
                    startingValue="בחר את הקטגוריה"
                    sectionInDictionary={dict.filters}
                    options={filters}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {currentOptions && currentOptions.length && getValues('category') && (
            <FormField
              control={form.control}
              name="subcategory"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{'sub הקטגוריה'}</FormLabel>
                  <FormControl>
                    <ComboBox
                      setOuterValue={setValue}
                      formValueToChange="subcategory"
                      startingValue="בחר את הקטגוריה"
                      sectionInDictionary={dict.subFilters}
                      options={currentOptions}
                      parentCategory={getValues('category')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className="flex items-end gap-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{dict.form.phone}</FormLabel>
                  <FormControl>
                    <Input placeholder={dict.form.phone} {...field} type="phone" />
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
                  <div
                    className="flex items-center space-x-2 align-middle"
                    style={{ direction: 'ltr' }}
                  >
                    <Label htmlFor="military" className="m-0">
                      {dict.form.civil}
                    </Label>
                    <Switch id="military" onCheckedChange={field.onChange} checked={field.value} />
                    <Label htmlFor="military" className="m-0">
                      {dict.form.military}
                    </Label>
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
              <FormLabel className="mt-0">דחפות</FormLabel>
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
                <FormLabel>{dict.form.textArea}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={
                      needHelp ? dict.form.textPlaceholderNeed : dict.form.textPlaceholder
                    }
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="mt-1 mb-3 text-sm text-muted-foreground">
            {needHelp ? dict.form.textFooterNeed : dict.form.textFooter}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <ReCAPTCHA
              sitekey={process.env.RECAPTCHA_SITE_KEY || ''}
              ref={recaptchaRef}
              onChange={handleCaptchaSubmission}
            />
            <div className="items-top flex space-x-2 w-full">
              <Checkbox
                id="terms1"
                className="mt-1"
                checked={allowPublication}
                onCheckedChange={() => setAllowPublication(!allowPublication)}
              />
              <div>
                <label
                  htmlFor="terms1"
                  className="mr-2 text-sm mt-0 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {dict.form.allowPublication1 + ' '}
                  <Link
                    href={`/${lang}/terms`}
                    target="_blank"
                    className="underline text-blue-800 hover:text-blue-400"
                  >
                    {dict.form.allowPublication2}
                  </Link>
                  {' ' + dict.form.allowPublication3 + ' '}
                  <Link
                    href={`/${lang}/privacy`}
                    target="_blank"
                    className="underline text-blue-800 hover:text-blue-400"
                  >
                    {dict.form.allowPublication4}
                  </Link>
                </label>
              </div>
            </div>
            <Button
              type="submit"
              disabled={
                // !isVerified ||
                !allowPublication
              }
            >
              {dict.form.submit}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
