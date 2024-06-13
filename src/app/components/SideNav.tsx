import NavLinks from '@/app/components/NavLinks';
import { fetchFarm } from '@/app/server-actions/farm';
import Moment from 'moment';

export default async function SideNav({ sbi }: { sbi: string }) {
  
  const farm = await fetchFarm(sbi);
  
  let renewalDate = Moment();
  const agreementYears = [1, 2, 3];
  const remindOfRenewal = agreementYears.some((year) => {
    const yearsFromStart = Moment(farm.agreementStart).add(year, 'year');
    const renewalSoon = Moment().isBetween(yearsFromStart.subtract(1, 'month'), yearsFromStart);
    if (renewalSoon) {
      renewalDate = yearsFromStart;
    }
    return renewalSoon;
  })

  return (
    <div className="flex items-center md:items-stretch md:flex-col border-b h-full px-3 py-4 md:border-r shadow-sm">
      <h1 className='text-center font-semibold mr-10 md:mr-0 md:py-10 text-2xl'><span className="text-green-600">S</span>impli<span className="text-green-600">FI</span></h1>

      <div className="flex flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks sbi={sbi} />
      </div>

      {remindOfRenewal && (
        <div className="border border-yellow-300 bg-yellow-100 rounded-xl p-3 mt-10">
          <h3 className="font-semibold text-base">Renewal</h3>
          <p className="text-sm">Your agreement is due for renewal on {renewalDate.format("DD/MM/YYYY")}</p>
        </div>
      )}
    </div>
  );
}
