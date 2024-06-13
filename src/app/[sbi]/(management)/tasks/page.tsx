"use client"

import Link from "next/link";
import UpcomingTasks from "./UpcomingTasks";
import AllTasks from "@/app/components/tasks/AllTasks";
import useSWR from 'swr'

export default function Page({ params }: { params: { sbi: string } }) {
  const { sbi } = params;

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR(`/api/${sbi}/tasks`, fetcher);

  if (!data) return <></>;

  const tasks = data.tasks;
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Upcoming Tasks</h1>
        <Link href={`/${sbi}/tasks/add`}>
          <button className="btn btn-primary">Add Task</button>
        </Link>
      </div>
      <UpcomingTasks sbi={sbi} tasks={tasks}></UpcomingTasks>

      <h1 className="mt-12 text-2xl font-semibold">All Tasks</h1>
      <AllTasks sbi={sbi} tasks={tasks}></AllTasks>
    </div>
  );
}
