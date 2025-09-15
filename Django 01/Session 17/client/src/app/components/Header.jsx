"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const empUser = localStorage.getItem("userID-emp");
    const normUser = localStorage.getItem("userID");

    setUser(empUser || normUser || null);
  }, []);

  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  const handleLogOutClick = (e) => {
    e.preventDefault();
    localStorage.removeItem("userID");
    localStorage.removeItem("userID-emp");
    window.location.reload();
  };

  return (
    <header>
      <h1 className="logo">
        <Link href="/">جاب بورد</Link>
      </h1>
      <ul>
        <li>
          <Link href="/">خانه</Link>
        </li>
        <li>
          <Link href="/jobs">فرصت های شغلی</Link>
        </li>
        <li>
          <Link href="/resume-builder">رزومه ساز</Link>
        </li>
      </ul>
      <div>
        {user ? (
          <Fragment>
            <Link href="/dashboard">داشبورد</Link>
            <Link href="" onClick={handleLogOutClick}>
              خروج
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <button onClick={handleClick}>ورود | ثبت نام</button>
            <Link href="/emp-login">بخش کارفرایان | ثبت آگهی</Link>
          </Fragment>
        )}
      </div>
    </header>
  );
}

export default Header;
