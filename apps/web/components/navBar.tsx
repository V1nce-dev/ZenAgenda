import React, { useEffect } from "react";
import Link from "next/link";
import useCheck from "../hooks/useCheck";

const NavBar: React.FC = () => {
  const { statusCheck, username } = useCheck();

  useEffect(() => {
    statusCheck();
  }, [username]);

  return (
    <nav>
      <ul className="list">
        <li id="header">
          <Link href="/" id="header">
            {username ? <p>{username}</p> : <p>ZenAgenda</p>}
          </Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/regsiter">
            <button>Regsiter</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
