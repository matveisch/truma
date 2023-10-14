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
import AreasData from '@/lib/AreasData';

interface PropsType {
  setOuterValue?: UseFormSetValue<{
    name: string;
    area: string;
    phone: string;
    description: string;
    urgency: number;
    military: boolean;
  }>;
  setArea?: Dispatch<SetStateAction<string>>;
}

export function ComboBox({ setOuterValue, setArea }: PropsType) {
  const { dict } = useContext(Context) as ContextType;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<{ value: string; label: string } | null>(null);
  const areas = AreasData();

  useEffect(() => {
    if (value && setOuterValue) {
      setOuterValue('area', value.value, { shouldValidate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (value && setArea) {
      setArea(value.value === 'all' ? '' : value.value);
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
          {value ? value.label : dict.misc.choose}
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={dict.misc.search} />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {areas.map((area) => (
              <CommandItem
                key={area.value}
                onSelect={() => {
                  setValue(area?.value === value?.value ? null : area);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'h-4 w-4',
                    value?.value === area.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {dict.misc[area.value]}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
