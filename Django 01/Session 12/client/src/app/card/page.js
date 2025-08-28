"use client";

import { Fragment, useState, useEffect } from "react";
import axios from "axios";

export default function Cart() {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        const loggedIn = localStorage.getItem("userID");
        if (!loggedIn) {
            window.location.href = "/";
        }
    }, []);

    useEffect(() => {
        const fetchUserCards = async () => {
            const userID = localStorage.getItem("userID");
            if (userID) {
                setUser({ userID, isLoggedIn: true });

                try {
                    setLoading(true);
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

                    setProducts(res.data.products || []);
                } catch (err) {
                    console.error("API error:", err);
                    setError("Failed to load cart items");
                    if (err.response?.status === 401) {
                        localStorage.removeItem("userID");
                        window.location.href = "/login";
                    }
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchUserCards();
    }, []);

    if (loading) {
        return (
            <Fragment>
                <div className="loading">Loading card...</div>
            </Fragment>
        );
    }

    if (error) {
        return (
            <Fragment>
                <div className="error">Error: {error}</div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <article className="cart">
                {products.length === 0 ? (
                    <section className="part1">
                        <h1>Cart</h1>
                        <div>
                            <i className="bx bx-bell"></i>
                            <span>Your cart is currently empty.</span>
                        </div>
                        <a href="/products" className="returnToShop">
                            Return to shop
                        </a>
                    </section>
                ) : (
                    <section className="part2">
                        <h1>Card</h1>
                        <div>
                            <table className="cart">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => {
                                        return (
                                            <tr key={product.id}>
                                                <td>
                                                    <a href="#">
                                                        <img
                                                            src={`/assets/${product.img}`}
                                                            alt={product.name}
                                                        />
                                                    </a>
                                                    <a href="#">
                                                        <h3>{product.title}</h3>
                                                    </a>
                                                    <p>${product.price}</p>
                                                </td>
                                                <td>
                                                    <button className="decreaseProductBtn">
                                                        -
                                                    </button>
                                                    <span className="numberOfProduct"></span>
                                                    <button className="increaseProductBtn">
                                                        +
                                                    </button>
                                                </td>
                                                <td className="delete">
                                                    <span>$</span>
                                                    <i
                                                        className="bx bxs-trash-alt"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    ></i>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <form>
                                <input
                                    type="text"
                                    name="couponCode"
                                    placeholder="Coupon code"
                                />
                                <input type="submit" value="Apply coupon" />
                            </form>
                        </div>
                        <aside>
                            <h1>Card totals</h1>
                            <h2>Subtotal</h2>
                            <span>$</span>
                            <h2>Total</h2>
                            <span>$</span>
                            <input
                                type="submit"
                                name="ProceedToCheckout"
                                value="Proceed to checkout"
                            />
                        </aside>
                    </section>
                )}
            </article>
        </Fragment>
    );
}
