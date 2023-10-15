import { Button } from '@/components/ui/button';
import { ReactNode, useContext } from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Globe, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Context, ContextType } from '@/components/MainPage';

function DropdownLanguage({ isMobile }: { isMobile: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex gap-1 items-center">
          {!isMobile && 'Language'}
          <Globe size={22} />
        </Button>
      </DropdownMenuTrigger>
      {/*todo: make direction dynamic*/}
      <DropdownMenuContent style={{ direction: 'rtl' }}>
        <DropdownMenuItem>
          <Link href="/he" className="w-full">
            עברית
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/en" className="w-full">
            English
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/ru" className="w-full">
            Русский
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Header({ children }: { children: ReactNode }) {
  const { dict } = useContext(Context) as ContextType;

  return (
    <header className="w-full">
      <h1 className="w-full text-center sm:hidden text-[#0054F6] text-lg font-semibold mb-5 mt-2">
        מיד ליד
      </h1>
      <div className="sm:flex hidden justify-between items-center w-full relative flex-row-reverse">
        <h1 className="text-[#0054F6] text-lg font-semibold">מיד ליד</h1>
        <div className="flex gap-6 items-center">
          {children}
          <Link href="https://am-1.org.il/" target="_blank">
            <Button variant="ghost">{dict.header.amEhad}</Button>
          </Link>
          {/* <Button variant="ghost">ארגוני מתנדבים</Button> */}
          {/* <Button variant="ghost">מידע</Button> */}
          <DropdownLanguage isMobile={false} />
        </div>
      </div>
      <div className="flex justify-between w-full items-center sm:hidden">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <Menu />
            </MenubarTrigger>
            {/*todo: make direction dynamic*/}
            <MenubarContent style={{ direction: 'rtl' }}>
              <MenubarItem>
                <Link href="https://am-1.org.il/" target="_blank">
                  <Button variant="ghost">{dict.header.amEhad}</Button>
                </Link>
              </MenubarItem>
              {/*<MenubarItem>*/}
              {/*  <Button variant="ghost">ארגוני מתנדבים</Button>*/}
              {/*</MenubarItem>*/}
              {/*<MenubarItem>*/}
              {/*  <Button variant="ghost">מידע</Button>*/}
              {/*</MenubarItem>*/}
              {/*<MenubarItem>*/}
              {/*  <DropdownLanguage isMobile={false} />*/}
              {/*</MenubarItem>*/}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        {children}
        <DropdownLanguage isMobile />
      </div>
    </header>
  );
}
