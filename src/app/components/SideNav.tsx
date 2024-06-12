import NavLinks from '@/app/components/NavLinks';

export default function SideNav({ sbi }: { sbi: string }) {
  return (
    <div className="flex items-center md:items-stretch md:flex-col border-b h-full px-3 py-4 md:border-r shadow-sm">
      <h1 className='text-center font-semibold mr-10 md:mr-0 md:py-10 text-2xl'><span className="text-green-600">S</span>impli<span className="text-green-600">FI</span></h1>
      <div className="flex flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks sbi={sbi} />
      </div>
    </div>
  );
}
