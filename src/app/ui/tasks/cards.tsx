import Link from 'next/link';

export function Card({ title, id, action, parcel }: { 
    title: string,
    id: string
    action: { code: string, name: string }, 
    parcel: { name: string, id: string } 
}) {
    return (
        <Link
            href={{
                pathname: `/tasks/task`,
                query: { id: id}
            }
            }
        >
            <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
                <div className="flex p-4">
                    <h3 className="text-sm font-medium">{title}</h3>
                </div>
                <p
                    className={`truncate rounded-xl bg-white px-4 py-2 text-md`}>
                    {parcel.name}, {action.name}
                </p>
                <p>
                    {action.code}
                </p>
            </div>
        </Link>
    )
}