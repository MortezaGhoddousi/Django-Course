"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Fragment, useState } from "react";
import axios from "axios";
import { api } from "../api";

function Page() {
    const router = useRouter();

    const [data, setData] = useState({
        phone: "",
        confirmPassword: "",
        password: "",
    });

    const [state, setState] = useState(true);

    const handleClick = () => {
        router.push("/");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (state) {
            setState(false);
        } else {
            console.log(data);
            axios
                .post(`${api}/api/register/client/`, data)
                .then((result) => {
                    console.log(result);
                    router.push("/");
                })
                .catch((err) => {
                    console.log(err);
                });

            setData({
                phone: "",
                confirmPassword: "",
                password: "",
            });
        }
    };

    return (
        <main className="login-container">
            <p>
                کارفرما هستید؟{" "}
                <Link href="/emp-login">ورود به بخش کارفرمایی</Link>
            </p>
            <section className="login">
                <h1 className="logo" onClick={handleClick}>
                    جاب بورد
                </h1>
                <p>ورود | ثبت نام کارجو</p>

                <form onSubmit={handleSubmit}>
                    {state ? (
                        <label htmlFor="phone">
                            شماره موبایل یا ایمیل خود را وارد کنید
                            <input
                                type="text"
                                name="phone"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                                value={data.phone}
                            />
                        </label>
                    ) : (
                        <Fragment>
                            <label htmlFor="password">
                                کلمه عبور خود را وارد کنید
                                <input
                                    type="password"
                                    name="password"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    value={data.password}
                                />
                            </label>
                            <label htmlFor="confirmPassword">
                                کلمه عبور خود را تایید کنید
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    value={data.confirmPassword}
                                />
                            </label>
                        </Fragment>
                    )}

                    <label htmlFor="submit">
                        <input
                            type="submit"
                            name="submit"
                            value={state ? "ادامه" : "ثبت نام"}
                        />
                    </label>

                    <div>
                        <hr />
                        <span>یا</span>
                        <hr />
                    </div>

                    <button>
                        <div>
                            <img src="/[CITYPNG.COM]Google Logo Icon Gsuite HD - 3000x3000.png" />
                            <span>ادامه با گوگل</span>
                        </div>
                    </button>
                    <button>
                        <div>
                            <img src="/[CITYPNG.COM]HD Vector Flat Linkedin IN Round Icon PNG - 2000x2000.png" />
                            <span>ادامه با لینکدین</span>
                        </div>
                    </button>
                </form>
            </section>
        </main>
    );
}

export default Page;
