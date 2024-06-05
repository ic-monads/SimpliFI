import { Card } from "@/app/ui/tasks/cards";
import { fetchAllTasks } from "../lib/data";
import Link from "next/link";


export default async function Page() {
  const tasks = await fetchAllTasks();
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Upcoming Tasks</h1>
        <Link href="/tasks/add">
          <button className="btn btn-primary">Add Task</button>
        </Link>
      </div>
      <p className="pb-4">
        Due within the next 28 days
      </p>
      <div className="pt-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {tasks
          .filter((task) => task.completed === false && task.deadline < new Date(Date.now() + 28 * 24 * 60 * 60 * 1000))
          .map((task) => (
            <Card key={task.id} task={task} />
          ))}
      </div>
      <hr className="my-8" />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">All Tasks</h1>
      </div>
      <div className="pt-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {tasks.map((task) => (
          <Card key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}