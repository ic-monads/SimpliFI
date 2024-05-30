import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';

export function Card({id} : {id: string}) {
  return (
    <Link 
      key={id}
      href={'/options/option'}
      >
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
          <div className="flex p-4">
            <h3 className="ml-2 text-sm font-medium">{"AHL1 - Pollinator Mix"}</h3>
          </div>
          <p
            className={`${lusitana.className}
              truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
          >
            {"Gunthorpe, Buildings 1"}
          </p>
        </div>
      </Link>
  )
}