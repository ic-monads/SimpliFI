import Link from 'next/link';

export function Card({action, parcel}: {action: {code: string, name: string}, parcel: {name: string, id: string}}) {
  return (
    <Link 
      href={{
        pathname: `/options/option`,
        query: {actCode: action.code, parcelId: parcel.id}}
      }
      >
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
          <div className="flex p-4">
            <h3 className="text-sm font-medium">{action.name}</h3>
          </div>
          <p
            className={`
              truncate rounded-xl bg-white px-4 py-2 text-md`}
          >
            {parcel.name}
          </p>
        </div>
      </Link>
  )
}