import Link from 'next/link';

export function Card({ title, id, actCode, parcelId }: { 
    title: string,
    id: string
    actCode: string, 
    parcelId: string
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
                    {parcelId}, {actCode}
                </p>
            </div>
        </Link>
    )
}