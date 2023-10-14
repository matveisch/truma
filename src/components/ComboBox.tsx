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
import * as z from 'zod';
import { formSchema } from '@/components/NewPostForm';
import { Context, ContextType } from '@/components/MainPage';

interface PropsType {
  setOuterValue?: UseFormSetValue<z.infer<typeof formSchema>>;
  setArea?: Dispatch<SetStateAction<string>>;
}

export function ComboBox({ setOuterValue, setArea }: PropsType) {
  const { dict } = useContext(Context) as ContextType;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const areas = [
    {
      value: 'North',
      label: dict.misc.north,
    },
    {
      value: 'Haifa',
      label: dict.misc.haifa,
    },
    {
      value: 'Center',
      label: dict.misc.center,
    },
    {
      value: 'Tel Aviv',
      label: dict.misc.telAviv,
    },
    {
      value: 'Jerusalem',
      label: dict.misc.jerusalem,
    },
    {
      value: 'South',
      label: dict.misc.south,
    },
    {
      value: 'Judea and Samaria',
      label: dict.misc.yehuda,
    },
  ];

  useEffect(() => {
    if (value && setOuterValue) setOuterValue('area', value, { shouldValidate: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (value && setArea) {
      setArea(value);
    } else {
      setArea && setArea('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-slate-400"
        >
          {value ? value : dict.misc.choose}
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="חיפוש" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {areas.map((area) => (
              <CommandItem
                key={area.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn('h-4 w-4', value === area.value ? 'opacity-100' : 'opacity-0')}
                />
                {area.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
