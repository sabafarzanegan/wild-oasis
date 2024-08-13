import Link from "next/link";
import { auth } from "../_lib/auth";

async function Navigation() {
  const session = await auth();

  return (
    <>
      <nav className="z-10 text-xl">
        <ul className="flex gap-16 items-center">
          <li>
            <Link
              href="/cabins"
              className="hover:text-accent-400 transition-colors">
              Cabins
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-accent-400 transition-colors">
              About
            </Link>
          </li>
          <li className="flex items-center justify-center gap-x-4">
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors">
              Guest area
            </Link>
            {session ? <p className="text-sm">{session.user.name}</p> : ""}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
