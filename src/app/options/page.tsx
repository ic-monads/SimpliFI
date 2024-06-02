import { Card } from '@/app/ui/options/cards';

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">My Options</h1>
      </div>
      <div className="pt-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card id='1'/>
      </div>
    </div>
  );
}