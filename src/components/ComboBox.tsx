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
import { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import * as z from 'zod';
import { formSchema } from '@/components/NewPostForm';

const areas = [
  {
    value: 'North',
    label: 'צפון',
  },
  {
    value: 'Haifa',
    label: 'חיפה',
  },
  {
    value: 'Center',
    label: 'מרכז',
  },
  {
    value: 'Tel Aviv',
    label: 'תל אביב',
  },
  {
    value: 'Jerusalem',
    label: 'ירושלים',
  },
  {
    value: 'South',
    label: 'דרום',
  },
  {
    value: 'Judea and Samaria',
    label: 'יהודה ושומרון',
  },
];

export function ComboBox({
  setOuterValue,
}: {
  setOuterValue: UseFormSetValue<z.infer<typeof formSchema>>;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    setOuterValue('city', value);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? value : 'בחר אזור'}
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
