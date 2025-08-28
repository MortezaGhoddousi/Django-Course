"use client";

import { Fragment, useState } from "react";
import axios from "axios";

export default function Products() {
    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState(null); // null = untouched, true = wrong creds, false = success

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Get CSRF token from cookie
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:8000/accounts/signup/",
                data,
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                }
            );

            console.log(res);

            if (res.data.success) {
                setError(false);
                localStorage.setItem("userID", res.data.userID);
                window.location.href = "/";
            } else {
                setError(true);
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(true);
        }
    };

    return (
        <Fragment>
            <div className="signupLogin">
                <form onSubmit={handleSubmit}>
                    <h1>SignUp</h1>

                    <label htmlFor="username">Username or Email Address</label>
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={data.username}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={data.password}
                    />

                    <label htmlFor="remember">
                        Remember Me <input type="checkbox" name="remember" />
                    </label>

                    <input type="submit" name="submit" value="Signup" />
                </form>
            </div>
        </Fragment>
    );
}
