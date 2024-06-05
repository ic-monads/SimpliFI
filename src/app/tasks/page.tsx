import { fetchAllTasks } from "../lib/data";
import Link from "next/link";
import UpcomingTasks from "../ui/tasks/upcoming-tasks";
import AllTasks from "../ui/tasks/all-tasks";

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
      <UpcomingTasks tasks={tasks}></UpcomingTasks>
      <AllTasks tasks={tasks}></AllTasks>
    </div>
  );
}