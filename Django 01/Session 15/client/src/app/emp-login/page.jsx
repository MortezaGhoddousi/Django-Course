"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

function Page() {
    const router = useRouter();

    const handleClick = () => {
        router.push("/");
    };

    return (
        <main className="login-container">
            <p>
                کارجو هستید؟ <Link href="/login">ثبت نام به عنوان کارجو</Link>
            </p>
            <section className="login">
                <h1 className="logo" onClick={handleClick}>
                    جاب بورد <span>برای کارفرمایان</span>
                </h1>
                <p>ورود | ایجاد حساب کارفرما</p>

                <form>
                    <label htmlFor="phone">
                        آدرس ایمیل خود را وارد کنید. (ترجیحا ایمیل سازمانی)
                        <input type="text" name="phone" />
                    </label>

                    <label htmlFor="submit">
                        <input type="submit" name="submit" value="ادامه" />
                    </label>
                </form>
            </section>
        </main>
    );
}

export default Page;
