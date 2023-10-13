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

function DropdownLanguage() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex gap-1 items-center">
          <Globe size={18} />
          עברית
        </Button>
      </DropdownMenuTrigger>
      {/*todo: make direction dynamic*/}
      <DropdownMenuContent style={{ direction: 'rtl' }}>
        <DropdownMenuItem>עברית</DropdownMenuItem>
        <DropdownMenuItem>English</DropdownMenuItem>
        <DropdownMenuItem>Русский</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Header({ children }: { children: ReactNode }) {
  const { dict } = useContext(Context) as ContextType;

  return (
    <header className="w-full">
      <div className="invisible sm:visible flex justify-between items-center w-full relative rtl:flex-row-reverse">
        <h1 className="">מיד ליד</h1>
        <div className="flex gap-6 items-center">
          {children}
          <Link href="https://am-1.org.il/" target="_blank">
            <Button variant="ghost">{dict?.header?.amEhad}</Button>
          </Link>
          {/* <Button variant="ghost">ארגוני מתנדבים</Button> */}
          {/* <Button variant="ghost">מידע</Button> */}
          <DropdownLanguage />
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

              <MenubarItem>
                <DropdownLanguage />
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        {children}
        <h1 className="">מיד ליד</h1>
      </div>
    </header>
  );
}
