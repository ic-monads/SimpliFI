import { Card } from "@/app/ui/tasks/cards";
import { fetchAllTasks } from "../lib/data";
import Link from "next/link";


export default async function Page() {
  const tasks = await fetchAllTasks();
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">My Tasks</h1>
        <Link href="/tasks/add">
          <button className="btn btn-primary">Add Task</button>
        </Link>
      </div>
      <div className="pt-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {tasks.map((t) => (
          <Card key={t.id} title={t.title} id={t.id} actCode={t.actCode} parcelId={t.parcelId} />
        ))}
      </div>
    </div>
  );
}