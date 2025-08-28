"use client";

import { Fragment, useEffect, useState } from "react";
import { useProductUser } from "@/context/ProductUserContext";
import axios from "axios";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [pending, setPending] = useState(true);
    const [existingProducts, setExistingProducts] = useState([]);

    const { productUser, setProductUser } = useProductUser();

    useEffect(() => {
        if (Array.isArray(productUser) && Array.isArray(products)) {
            products.forEach((product) => {
                if (productUser.some((p) => p.id === product.id)) {
                    setExistingProducts((prev) => [...prev, product.id]);
                }
            });
        }
    }, [productUser, products]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/products/")
            .then((result) => {
                setProducts(result.data);
                setPending(false);
            })
            .catch((error) => {
                console.error(error);
                setPending(false);
            });
    }, []);

    useEffect(() => {
        const scrollPosition = localStorage.getItem("scrollPosition");
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition));
            localStorage.removeItem("scrollPosition");
        }
    }, []);

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

    const handleClick = (e) => {
        e.preventDefault();
        const productID = e.target.parentNode.id;
        const userID = localStorage.getItem("userID");
        axios
            .post(
                "http://localhost:8000/api/addProduct/",
                { userID, productID },
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                }
            )
            .then((res) => {
                localStorage.setItem("scrollPosition", window.scrollY);
                window.location.reload();
            });
    };

    return (
        <Fragment>
            <article className="products">
                <section className="part1">
                    <nav>
                        <ul>
                            <li>
                                <a href="/">home</a>
                            </li>
                            <span>/</span>
                            <li>
                                <a className="active" href="/products">
                                    products
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <h1>products</h1>
                </section>

                <section className="part2">
                    <div>
                        <h2>Showing all {products.length} results</h2>
                        <select name="sortProducts" id="sortProducts">
                            <option value="Default sorting">
                                Default sorting
                            </option>
                            <option value="Sort by popularity">
                                Sort by popularity
                            </option>
                            <option value="Sort by average rating">
                                Sort by average rating
                            </option>
                            <option value="Sort by latest">
                                Sort by latest
                            </option>
                            <option value="Sort by price: low to high">
                                Sort by price: low to high
                            </option>
                            <option value="Sort by price: high to low">
                                Sort by price: high to low
                            </option>
                        </select>
                    </div>
                    <div>
                        {pending ? (
                            <p>Loading...</p>
                        ) : (
                            products.map((product) => (
                                <aside key={product.id} id={product.id}>
                                    <img
                                        src={`/assets/${product.img}`}
                                        alt={product.name}
                                    />
                                    <h3>{product.name}</h3>
                                    <p>${product.price}</p>
                                    <span>{product.category}</span>

                                    <button
                                        className="productBtn"
                                        onClick={handleClick}
                                        disabled={existingProducts.includes(
                                            product.id
                                        )}
                                    >
                                        {existingProducts.includes(product.id)
                                            ? "Added"
                                            : "Add to cart"}
                                    </button>
                                </aside>
                            ))
                        )}
                    </div>
                </section>
            </article>
        </Fragment>
    );
}
