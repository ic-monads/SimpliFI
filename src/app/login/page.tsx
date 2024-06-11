
import { LoginForm } from "../components/LoginForm";


export default function Page() {
  return (
    <div className="w-full p-x">
      <div className="flex flex-col py-52 w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Login</h1>
        <LoginForm></LoginForm>
      </div>
    </div>
  )
}