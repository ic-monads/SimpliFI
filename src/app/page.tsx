import Link from "next/link"

export default function Home() {

  return (
    <div className="w-full flex justify-center">
      <Link href={{ pathname: "/login" }}>
        <button className="btn btn-primary">Login</button>
      </Link>
      <Link href={{ pathname: "/signup" }}>
        <button className="btn btn-primary">Sign Up</button>
      </Link>
    </div>
  )
}
