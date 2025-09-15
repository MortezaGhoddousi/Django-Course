"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Fragment, useState } from "react";
import axios from "axios";
import { api } from "../api";

function Page() {
    const router = useRouter();

    const [data, setData] = useState({
        email: "",
        confirmPassword: "",
        password: "",
    });

    const [state, setState] = useState(true); 
    const [isExistingUser, setIsExistingUser] = useState(false);

    const handleClick = () => {
        router.push("/");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (state) {
            setState(false);
            axios
                .post(`${api}/api/check-login/`, { email: data.email })
                .then((result) => {
                    if (result.data.exists) {
                        setIsExistingUser(true);
                    } else {
                        setIsExistingUser(false);
                    }
                })
                .catch((err) => {
                    console.log("Error checking email:", err);
                    setIsExistingUser(false);
                });
        } else {
            if (isExistingUser) {
                axios
                    .post(`${api}/api/login/`, {
                        email: data.email,
                        password: data.password
                    })
                    .then((result) => {
                        if (result.data.success) {
                            localStorage.setItem("userID", result.data.userID);
                            router.push("/");
                        } else {
                            alert(result.data.message);
                        }
                    })
                    .catch((err) => {
                        console.log("Login error:", err);
                        alert("Login failed. Please check your credentials.");
                    });
            } else {
                if (data.password && data.password === data.confirmPassword) {
                    axios
                        .post(`${api}/api/register/`, {
                            email: data.email,
                            password: data.password
                        })
                        .then((result) => {
                            if (result.data.success) {
                                localStorage.setItem("userID", result.data.userID);
                                router.push("/");
                            } else {
                                alert(result.data.message);
                            }
                        })
                        .catch((err) => {
                            console.log("Registration error:", err);
                            alert("Registration failed. Please try again.");
                        });
                } else {
                    alert("Passwords don't match!");
                    setData({
                        ...data,
                        confirmPassword: "",
                        password: "",
                    });
                }
            }
        }
    };

    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
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
                        <label htmlFor="email">
                            شماره موبایل یا ایمیل خود را وارد کنید
                            <input
                                type="email"
                                name="email"
                                onChange={handleInputChange}
                                value={data.email}
                                required
                            />
                        </label>
                    ) : (
                        <Fragment>
                            <label htmlFor="password">
                                کلمه عبور خود را وارد کنید
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleInputChange}
                                    value={data.password}
                                    required
                                />
                            </label>
                            {!isExistingUser && (
                                <label htmlFor="confirmPassword">
                                    کلمه عبور خود را تایید کنید
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        onChange={handleInputChange}
                                        value={data.confirmPassword}
                                        required
                                    />
                                </label>
                            )}
                        </Fragment>
                    )}

                    <label htmlFor="submit">
                        <input
                            type="submit"
                            name="submit"
                            value={
                                state 
                                    ? "ادامه" 
                                    : isExistingUser 
                                        ? "ورود" 
                                        : "ثبت نام"
                            }
                        />
                    </label>

                    <div>
                        <hr />
                        <span>یا</span>
                        <hr />
                    </div>

                    <button type="button">
                        <div>
                            <img src="/[CITYPNG.COM]Google Logo Icon Gsuite HD - 3000x3000.png" alt="Google" />
                            <span>ادامه با گوگل</span>
                        </div>
                    </button>
                    <button type="button">
                        <div>
                            <img src="/[CITYPNG.COM]HD Vector Flat Linkedin IN Round Icon PNG - 2000x2000.png" alt="LinkedIn" />
                            <span>ادامه با لینکدین</span>
                        </div>
                    </button>
                </form>
            </section>
        </main>
    );
}

export default Page;