import Link from "next/link";
import Login from "./auth/login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Logged from "./auth/logged";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  // console.log(session);

  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={"/"} className="font-bold text-lg">
        cool
      </Link>
      from nav
      <ul className="flex items-center gap-6">
        {!session?.user && <Login />}
        {session?.user && <Logged image={session.user?.image || ""} />}
      </ul>
    </nav>
  );
}
