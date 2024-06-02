import Link from 'next/link';

export function Card({action, parcel}: {action: String, parcel: String}) {
  return (
    <Link 
      href={'/options/option'}
      >
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
          <div className="flex p-4">
            <h3 className="text-sm font-medium">{action}</h3>
          </div>
          <p
            className={`
              truncate rounded-xl bg-white px-4 py-2 text-md`}
          >
            {parcel}
          </p>
        </div>
      </Link>
  )
}