import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Globe, Menu } from 'lucide-react';

export default function Header({ children }: { children: ReactNode }) {
  return (
    <header className="w-full">
      <div className="invisible sm:visible flex justify-between items-center w-full relative rtl:flex-row-reverse">
        <div className="flex gap-1 ">
          <Globe />
          עברית
        </div>
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          מיד ליד
        </h1>
        <div className="flex gap-6">
          {children}
          <Button variant="ghost">ארגוני מתנדבים</Button>
          <Button variant="ghost">מידע</Button>
        </div>
      </div>
      <div className="flex justify-between w-full items-center sm:invisible">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <Menu />
            </MenubarTrigger>
            {/*todo: make direction dynamic*/}
            <MenubarContent style={{ direction: 'rtl' }}>
              <MenubarItem>
                <Button variant="ghost">ארגוני מתנדבים</Button>
              </MenubarItem>
              <MenubarItem>
                <Button variant="ghost">מידע</Button>
              </MenubarItem>
              <MenubarItem>
                <Button variant="ghost" className="flex gap-1">
                  <Globe />
                  עברית
                </Button>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <h1 className="">מיד ליד</h1>
      </div>
    </header>
  );
}
