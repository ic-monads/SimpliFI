import SignupForm from "../components/SignupForm";

export default function Page() {

  return (
    <div className="w-full p-x">
      <div className="flex flex-col py-52 w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Sign Up</h1>
        <SignupForm></SignupForm>
      </div>
    </div>
  )
}