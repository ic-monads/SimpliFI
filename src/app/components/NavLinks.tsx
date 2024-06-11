'use client';

import {
  HomeIcon,
  RectangleStackIcon,
  WrenchIcon,
  GiftTopIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function NavLinks({ sbi }: { sbi: string }) {
  const links = [
    { name: 'My Actions', href: `/${sbi}/actions`, icon: WrenchIcon },
    { name: 'Tasks', href: `/${sbi}/tasks`, icon: RectangleStackIcon },
    { name: 'Parcels', href: `/${sbi}/parcels`, icon: GiftTopIcon },
  ];

  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-50 hover:text-green-700 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-green-50 text-green-600': pathname === link.href,
              },
            )}          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
