"use client";

import { useState } from "react";
import axios from "axios";

export default function Footer() {
    const [data, setData] = useState({
        email: "",
    });

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

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:8000/api/subscribe/",
                data,
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                }
            );

            if (res.data.success) {
                setData({
                    email: "",
                });
            }
        } catch {
            console.log(error);
        }
    };

    return (
        <footer>
            <div>
                <h1>Don’t Miss Our News</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Your email address *"
                        name="email"
                        required
                        value={data.email}
                        onChange={handleChange}
                    />
                    <input type="submit" name="submit" value="subscribe" />
                </form>
            </div>
            <div>
                <aside>
                    <img src="/assets/logo-light.svg" alt="" />
                    <p>
                        Cras gravida bibendum dolor eu varius morbi fermentum
                        velit eget vehicula lorem sodales donec quis volutpat
                        orci.
                    </p>

                    <ul>
                        <li>
                            <a href="">
                                <i className="bx bxl-facebook-square"></i>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i className="bx bxl-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i className="bx bxl-linkedin"></i>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i className="bx bxl-gmail"></i>
                            </a>
                        </li>
                    </ul>
                </aside>
                <aside>
                    <h1>USEFUL LINKS</h1>
                    <ul>
                        <li>
                            <a href="./about-us.html">About Us</a>
                        </li>
                        <li>
                            <a href="#">Contact Us</a>
                        </li>
                        <li>
                            <a href="./products.html">Products</a>
                        </li>
                        <li>
                            <a href="#">Login</a>
                        </li>
                        <li>
                            <a href="#">Sign Up</a>
                        </li>
                    </ul>
                </aside>
                <aside>
                    <h1>CUSTOM AREA</h1>
                    <ul>
                        <li>
                            <a href="">My Account</a>
                        </li>
                        <li>
                            <a href="">Tracking List</a>
                        </li>
                        <li>
                            <a href="">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="">Orders</a>
                        </li>
                        <li>
                            <a href="">My Cart</a>
                        </li>
                    </ul>
                </aside>
                <aside>
                    <h1>MORE INFORMATION</h1>
                    <p>
                        Aliquam faucibus, odio nec commodo aliquam, neque felis
                        placerat dui, a porta ante lectus
                    </p>
                </aside>
                <p>Copyright © 2025 - Designed by Web 27's class</p>
            </div>
        </footer>
    );
}
