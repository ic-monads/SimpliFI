import Link from "next/link"

export default function Page() {

  return (
    <div className="flex flex-col h-screen">
      <h1 className='text-center font-semibold mt-52 mb-12 text-2xl'><span className="text-green-600">S</span>impli<span className="text-green-600">FI</span></h1>
      <div className="w-full flex justify-center items-center gap-6">
        <Link href={{ pathname: "/login" }}>
          <button className="btn btn-primary">Login</button>
        </Link>
        <Link href={{ pathname: "/signup" }}>
          <button className="btn btn-primary">Sign Up</button>
        </Link>
      </div>

    </div>

  )
}
