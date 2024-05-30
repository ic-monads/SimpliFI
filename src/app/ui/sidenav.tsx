import Link from 'next/link';
import NavLinks from '@/app/ui/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <h1 className='text-center font-semibold py-10 text-2xl'><span className="text-green-600">S</span>impli<span className="text-green-600">FI</span></h1>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}
