'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { Context, ContextType } from '@/components/MainPage';

interface FormFieldsType {
  name: string;
  area: string;
  phone: string;
  description: string;
  urgency: number;
  military: boolean;
  category: string;
  subcategory: string;
}

interface PropsType {
  setOuterValue?: UseFormSetValue<FormFieldsType>;
  setArea?: Dispatch<SetStateAction<string>>;
  startingValue: string;
  sectionInDictionary: any;
  options: any[];
  formValueToChange?:
    | 'name'
    | 'area'
    | 'phone'
    | 'description'
    | 'urgency'
    | 'military'
    | 'category'
    | 'subcategory';
  parentCategory?: string;
}

export function ComboBox({
  setOuterValue,
  setArea,
  startingValue,
  options,
  formValueToChange,
  sectionInDictionary,
  parentCategory,
}: PropsType) {
  const { dict } = useContext(Context) as ContextType;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<{ value: string; label: string } | null>(null);

  // for form element (NewPostForm)
  useEffect(() => {
    if (value && setOuterValue && formValueToChange) {
      setOuterValue(formValueToChange, value.value, { shouldValidate: true });
    } else if (setOuterValue && formValueToChange) {
      setOuterValue(formValueToChange, '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // for non-form element (like, in Filters)
  useEffect(() => {
    if (value && setArea) {
      setArea(value.value === 'all' ? '' : value.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    setValue(null);
  }, [parentCategory]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full text-sm md:text-lg justify-between border-slate-400"
        >
          {value ? value.label : startingValue}
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={dict.misc.search} />
          <CommandEmpty>Nothing found</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  setValue(option?.value === value?.value ? null : option);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'h-4 w-4',
                    value?.value === option.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {sectionInDictionary[option.value]}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
