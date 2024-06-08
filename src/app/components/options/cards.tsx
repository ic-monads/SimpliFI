import Link from 'next/link';

export function Card({action, parcel}: {action: {code: string, name: string}, parcel: {name: string, id: string}}) {
  return (
    <Link href={{ pathname: `/options/option`,
                  query: {actCode: action.code, parcelId: parcel.id}}} >
      <div className="card shadow-sm p-3 border hover:bg-gray-100 transition-all">
        <p className="text-xs">{action.code}</p>
        <h2 className="text-md font-medium mb-3">{action.name}</h2>
        <div className="badge badge-outline">{parcel.name}</div>
      </div>
    </Link>
  )
}