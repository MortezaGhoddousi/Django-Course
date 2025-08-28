"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useProductUser } from "@/context/ProductUserContext";

function Header() {
    const { productUser, setProductUser } = useProductUser();

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.startsWith(name + "=")) {
                    cookieValue = decodeURIComponent(
                        cookie.substring(name.length + 1)
                    );
                    break;
                }
            }
        }
        return cookieValue;
    }

    const [user, setUser] = useState({
        userID: "",
        isLoggedIn: false,
    });

    useEffect(() => {
        const fetchUserCards = async () => {
            const userID = localStorage.getItem("userID");
            if (userID) {
                setUser({ userID, isLoggedIn: true });

                try {
                    const res = await axios.post(
                        "http://localhost:8000/card/",
                        { userID },
                        {
                            withCredentials: true,
                            headers: {
                                "X-CSRFToken": getCookie("csrftoken"),
                            },
                        }
                    );
                    setProductUser(res.data.products);
                } catch (err) {
                    console.error("API error:", err);
                    if (err.response?.status === 401) {
                        localStorage.removeItem("userID");
                        window.location.href = "/login";
                    }
                }
            }
        };

        fetchUserCards();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.removeItem("userID");
        window.location.reload();
    };

    const handleClick = () => {
        window.location.href = "/";
    };

    return (
        <header>
            <img
                src="/assets/logo-light.svg"
                alt="logo"
                onClick={handleClick}
            />
            <nav>
                <ul>
                    <li className="">
                        <a href="/">home</a>
                    </li>
                    <li className="">
                        <a href="/products">products</a>
                    </li>
                    <li className="">
                        <a href="/about">about us</a>
                    </li>
                    <li className="">
                        <a href="/blog">blog</a>
                    </li>
                    <li className="">
                        <a href="/contact">contact us</a>
                    </li>
                </ul>
            </nav>
            <ul>
                <li>
                    <a href="#">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            style={{ fill: "rgba(255, 255, 255, 1)" }}
                        >
                            <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                        </svg>
                    </a>
                </li>
                {user.isLoggedIn ? (
                    <Fragment>
                        {/* Cart */}
                        <li id="bag">
                            <span className="badge">{productUser.length}</span>
                            <Link href="/card">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    style={{ fill: "rgba(255, 255, 255, 1)" }}
                                >
                                    <path d="M5 22h14c1.103 0 2-.897 2-2V9a1 1 0 0 0-1-1h-3V7c0-2.757-2.243-5-5-5S7 4.243 7 7v1H4a1 1 0 0 0-1 1v11c0 1.103.897 2 2 2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-4 3h2v2h2v-2h6v2h2v-2h2l.002 10H5V10z"></path>
                                </svg>
                            </Link>
                        </li>

                        {/* Sign out */}
                        <form onSubmit={handleSubmit}>
                            <input
                                type="submit"
                                name="signout"
                                id="signout"
                                value="Sign out"
                            />
                        </form>
                    </Fragment>
                ) : (
                    <li id="login">
                        <Link href="/login" id="user">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                style={{ fill: "rgba(255, 255, 255, 1)" }}
                            >
                                <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
                            </svg>
                        </Link>
                    </li>
                )}
            </ul>

            <div className="modal">
                <form method="POST">
                    <label htmlFor="username">Username or Email Address</label>
                    <input type="text" name="username" />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />

                    <label htmlFor="remember">
                        Remember Me <input type="checkbox" name="remember" />
                    </label>

                    <input type="submit" name="submitLogin" value="Login" />
                    <input type="submit" name="submitSignUp" value="Signup" />

                    <a href="">Forget Password?</a>
                </form>
            </div>
        </header>
    );
}

export default Header;
