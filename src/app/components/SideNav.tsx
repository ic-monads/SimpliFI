import NavLinks from '@/app/components/NavLinks';
import { fetchFarm } from '@/app/server-actions/farm';
import Moment from 'moment';

export default async function SideNav({ sbi }: { sbi: string }) {
  const farm = await fetchFarm(sbi);
  return (
    <div className="flex items-center md:items-stretch md:flex-col border-b h-full px-3 py-4 md:border-r shadow-sm">
      <h1 className='text-center font-semibold mr-10 md:mr-0 md:py-10 text-2xl'><span className="text-green-600">S</span>impli<span className="text-green-600">FI</span></h1>

      <div className="flex flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks sbi={sbi} />
      </div>

      <div className="flex flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <h2 className='text-left font-semibold mr-10 md:mr-0 pt-4 pb-2 text-xl'>Your Dates</h2>
        { farm.startAg && (
          <>
            <h3 className="text-lg">Agreement Start</h3>
            <p className="text-sm">{Moment(farm.startAg).format('DD/MM/YYYY')}</p>
            </>
          )}
        { farm.endAg && (
          <>
            <h3 className="text-lg">Agreement End</h3>
            <p className="text-sm">{Moment(farm.endAg).format('DD/MM/YYYY')}</p>
            </>
          )}
        { farm.renewAg && (
        <>
          <h3 className="text-lg">Agreement Renewal</h3>
          <p className="text-sm">{Moment(farm.renewAg).format('DD/MM/YYYY')}</p>
          </>
        )}
      </div>
    </div>
  );
}
