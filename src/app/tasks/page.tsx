import { fetchAllTasks } from "@/app/server-actions/task";
import Link from "next/link";
import UpcomingTasks from "./UpcomingTasks";
import AllTasks from "../components/tasks/AllTasks";

export default async function Page() {
  const tasks = await fetchAllTasks();
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Upcoming Tasks</h1>
        <Link href="/tasks/add">
          <button className="btn btn-primary">Add Task</button>
        </Link>
      </div>
      <UpcomingTasks tasks={tasks}></UpcomingTasks>

      <h1 className="mt-12 text-2xl font-semibold">All Tasks</h1>
      <AllTasks tasks={tasks}></AllTasks>
    </div>
  );
}
