"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
function Header() {
    const router = useRouter();

    const handleClick = () => {
        router.push("/login");
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
                <button onClick={handleClick}>ورود | ثبت نام</button>
                <Link href="/emp-login">بخش کارفرایان | ثبت آگهی</Link>
            </div>
        </header>
    );
}

export default Header;
