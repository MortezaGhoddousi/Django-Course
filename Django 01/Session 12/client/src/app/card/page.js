"use client";

import { Fragment, useState, useEffect } from "react";
import axios from "axios";

export default function Cart() {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);
    const [sum, setSum] = useState(0);
    const [final, setFinal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userAllProducts, setUserAllProducts] = useState([]);
    const [coupon, setCoupon] = useState('');


    // Function to get the CSRF cookie
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.startsWith(name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Fetch user-related products
    useEffect(() => {
        const userID = localStorage.getItem("userID");
        axios
            .post("http://localhost:8000/api/userallproducts/", { userID })
            .then((result) => {
                setUserAllProducts(result.data);
            });
    }, []);

    // Check if user is logged in
    useEffect(() => {
        const loggedIn = localStorage.getItem("userID");
        if (!loggedIn) {
            window.location.href = "/";
        }
    }, []);

    // Fetch user cards from API
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

                    setProducts(res.data.products || []);  // Set products data
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
    }, []);  // Ensure to load user cards only once when the component mounts

    // Update total sum whenever products or userAllProducts change
    useEffect(() => {
        let total = 0;  // Local variable to accumulate the sum

        // Loop over products and calculate total sum
        if (products.length > 0){
            products.forEach((product) => {
                const p = userAllProducts.ups.filter(item => item.productID == product.id);
                if (p.length > 0) {
                    total += p[0].number * product.price;  // Accumulate the total sum
                }
            });
    
            setSum(total);  // Update the total sum in the state
            setFinal(total);
        }
    }, [products, userAllProducts]);  // Recalculate when products or userAllProducts change

    // Show loading state if data is being fetched
    if (loading) {
        return (
            <Fragment>
                <div className="loading">Loading cart...</div>
            </Fragment>
        );
    }

    // Show error message if there's an error
    if (error) {
        return (
            <Fragment>
                <div className="error">Error: {error}</div>
            </Fragment>
        );
    }

    // Handle product quantity increase or decrease
    const handleClick = (e) => {
        const userID = localStorage.getItem("userID");
        const productID = e.target.parentNode.parentNode.id;
        const action = e.target.innerHTML === "+" ? "increase" : "decrease";

        // Define the API endpoint based on the action
        const endpoint = action === "increase" ? "increaseProduct/" : "decreaseProduct/";
        const data = { userID, productID };

        axios
            .post(`http://localhost:8000/api/${endpoint}`, data)
            .then((result) => {
                if (result.data.success) {
                    window.location.reload();
                } else {
                    console.error("Error with the operation:", result.data.message);
                }
            })
            .catch((error) => {
                console.error("API call failed:", error);
            });
    };

    // Handle delete product from the cart
    const deleteHandleClick = (e) => {
        const userID = localStorage.getItem("userID");
        const productID = e.target.parentNode.parentNode.id;
        const data = { userID, productID };

        axios.post(`http://localhost:8000/api/deleteProduct/`, data).then((result) => {
            if (result.data.success) {
                window.location.reload();
            }
        });
    };



    const handleChange = (e) => {
        setCoupon(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (coupon == '1234') {
            setFinal(prev => prev * 0.9);
            setCoupon('');
        }
        else {
            setCoupon('');
        }
    }

    // Render the cart UI
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
                        <h1>Cart</h1>
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
                                        const p = userAllProducts.ups.filter(item => item.productID == product.id);
                                        return (
                                            <tr id={product.id} key={product.id}>
                                                <td>
                                                    <a href="#">
                                                        <img src={`/assets/${product.img}`} alt={product.name} />
                                                    </a>
                                                    <a href="#">
                                                        <h3>{product.title}</h3>
                                                    </a>
                                                    <p>${product.price}</p>
                                                </td>
                                                <td>
                                                    <button className="decreaseProductBtn" onClick={handleClick}>
                                                        -
                                                    </button>
                                                    {/* Handle the case where p is empty */}
                                                    <span className="numberOfProduct">{p.length > 0 ? p[0].number : 0}</span>
                                                    <button className="increaseProductBtn" onClick={handleClick}>
                                                        +
                                                    </button>
                                                </td>
                                                <td className="delete">
                                                    <span>${p[0].number * product.price}</span>
                                                    <i
                                                        className="bx bxs-trash-alt"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={deleteHandleClick}
                                                    ></i>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="couponCode"
                                    placeholder="Coupon code"
                                    onChange={handleChange}
                                    value={coupon}
                                />
                                <input type="submit" value="Apply coupon" />
                            </form>
                        </div>
                        <aside>
                            <h1>Cart totals</h1>
                            <h2>Subtotal</h2>
                            <span>${sum}</span>
                            <h2>Total</h2>
                            <span>${final}</span>
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
