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
                query: { id : id}
            }
            }
        >
            <div className="rounded-xl bg-gray-50 px-4 py-2 shadow-sm hover:bg-gray-100 transition-all">
                <div className="flex p-4">
                    <h3 className="text-md font-bold">{title}</h3>
                </div>
                <p
                    className={`truncate rounded-xl bg-white px-4 py-2 text-sm`}>
                    {parcelId}, {actCode}
                </p>
            </div>
        </Link>
    )
}