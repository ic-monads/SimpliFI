import { ReactElement } from "react";

export default function EmptyCollection({ message, action }: { message: string, action?: ReactElement }) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <p className="text-gray-500 my-6">{message}</p>
      {action}
    </div>
  );
}