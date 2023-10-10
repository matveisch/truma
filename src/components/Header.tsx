import Image from 'next/image';
import globe from '@/public/Material Symbols Language.svg';
import { Button } from '@/components/ui/button';
import plus from '@/public/plus.svg';

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full relative rtl:flex-row-reverse">
      <div className="flex gap-1 ">
        <Image src={globe} alt={'globe icon'} />
        עברית
      </div>
      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Truma
      </h1>
      <div className="flex gap-6">
        <Button className="flex gap-1 items-center rtl:flex-row-reverse">
          <Image src={plus} alt={'plus-icon'} />
          פירסום מודעה
        </Button>
        <Button variant="ghost">ארגוני מתנדבים</Button>
        <Button variant="ghost">מידע</Button>
      </div>
    </header>
  );
}
