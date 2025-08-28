"use client";

import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useProductUser } from "@/context/ProductUserContext";

export default function Home() {
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
            <article className="homePage">
                {/* SECTION 1 */}
                <section className="part1">
                    <aside>
                        <p>From $999</p>
                        <h1>iPhone 12 Pro</h1>
                        <button>buy now</button>
                        <a href="#">
                            <i className="bx bx-play-circle"></i>watch video
                        </a>
                    </aside>
                    <img src="/assets/home-hero-image.jpg" alt="home-hero" />
                    <aside>
                        <ul>
                            <li>
                                <i className="bx bx-play-circle"></i>
                                <h4>Free Shipping</h4>
                                <p>Free shipping on all US orders</p>
                            </li>
                            <li>
                                <i className="bx bxl-bitcoin"></i>
                                <h4>100% Money Back</h4>
                                <p>You have 10 days to return</p>
                            </li>
                            <li>
                                <i className="bx bx-timer"></i>
                                <h4>Support 24/7</h4>
                                <p>Contact us 24 hours a day</p>
                            </li>
                            <li>
                                <i className="bx bx-lock-open-alt"></i>
                                <h4>100% Payment Secure</h4>
                                <p>Your payment are safe with us</p>
                            </li>
                        </ul>
                    </aside>
                </section>

                {/* SECTION 2 */}
                <section className="part2">
                    <div>
                        <h4>Laptops</h4>
                        <p>245</p>
                        <img
                            src="/assets/category-laptops.webp"
                            alt="category"
                        />
                    </div>
                    <div>
                        <h4>Drones</h4>
                        <p>28</p>
                        <img
                            src="/assets/category-drones-2.webp"
                            alt="category"
                        />
                    </div>
                    <div>
                        <h4>Smartphones</h4>
                        <p>273</p>
                        <img
                            src="/assets/category-phones.webp"
                            alt="category"
                        />
                    </div>
                    <div>
                        <h4>Gaming</h4>
                        <p>25</p>
                        <img
                            src="/assets/category-gaming.webp"
                            alt="category"
                        />
                    </div>
                </section>

                {/* SECTION 3 */}
                <section className="part3">
                    <div>
                        <h3>#1 Hacus Habitasse</h3>
                        <hr />
                        <p>Neque egestas odio nisi congue quisque.</p>
                    </div>
                    <div>
                        <h3>#2 Natoque Penatibus</h3>
                        <hr />
                        <p>Ultrices tincidunt arcu non sodales vestibulum.</p>
                    </div>
                    <div>
                        <h3>#3 Tincidunt Ornare</h3>
                        <hr />
                        <p>Dignissim diam quis enim lobortis scelerisque.</p>
                    </div>
                    <div>
                        <h3>#4 Aliquam Sagittis</h3>
                        <hr />
                        <p>Venenatis cras sed felis eget aliquet commodo.</p>
                    </div>
                    <div>
                        <aside>
                            <h1>Oculus VR</h1>
                            <p>
                                Ullamcorper malesuada proin libero nunc
                                consequat interdum varius consequat mauris nunc
                                congue nisi vitae.
                            </p>
                            <button>view offer</button>
                            <a href="#">
                                <i className="bx bx-play-circle"></i>watch video
                            </a>
                        </aside>
                        <img src="/assets/oculus-img-768x495.webp" alt="" />
                    </div>
                </section>

                {/* SECTION 4 - Featured Products */}
                <section className="part4">
                    <div>
                        <div>
                            <h1>Featured Products</h1>
                            <p>Feugiat pretium nibh ipsum consequat commodo.</p>
                        </div>
                        <button>View all</button>
                    </div>

                    <div>
                        {pending ? (
                            <p>Loading...</p>
                        ) : (
                            products.slice(0, 3).map((product) => (
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

                {/* SECTION 5 */}
                <section className="part5">
                    <img src="/assets/home-page-cta-ipad-768x614.webp" alt="" />
                    <aside>
                        <p>From $1099</p>
                        <h1>iPad Pro</h1>
                        <h4>
                            Libero nunc consequat interdum Varius sitamet mattis
                            vulputate Ultricies mieget mauris pharetra
                        </h4>
                        <button>Buy now</button>
                    </aside>
                    <aside>
                        <h3>Super Powerful Chip</h3>
                        <p>
                            Pellentesque pulvinar habitant morbi tristique
                            maecenas.
                        </p>
                    </aside>
                </section>

                {/* SECTION 6 */}
                <section className="part6">
                    <div>
                        <aside>
                            <i className="bx bx-star"></i>
                        </aside>
                        <h2>Special Offers</h2>
                        <p>
                            Lorem ipsum consectetur adipiscing eiusmod tempor
                            incididunt labore dolore magna aliqua.
                        </p>
                        <button>learn more</button>
                    </div>
                    <div>
                        <aside>
                            <i className="bx bx-ghost"></i>
                        </aside>
                        <h2>Amazing Events</h2>
                        <p>
                            Massa tincidunt nunc pulvinar sapien et ligula
                            ullamcorper blandit turpis cursus commodo sed
                            egestas egestas.
                        </p>
                        <button>learn more</button>
                    </div>
                    <div>
                        <aside>
                            <i className="bx bxs-star"></i>
                        </aside>
                        <h2>Human Reviews</h2>
                        <p>
                            Ullamcorper malesuada proin libero nunc consequat
                            interdum varius consequat mauris nunc congue nisi
                            vitae.
                        </p>
                        <button>learn more</button>
                    </div>
                </section>

                {/* SECTION 7 */}
                <section className="part7">
                    <div>
                        <div>
                            <h1>Latest News</h1>
                            <p>Feugiat pretium nibh ipsum consequat commodo.</p>
                        </div>
                        <button>View all</button>
                    </div>
                    <div>
                        <aside>
                            <img src="/assets/article-image-5.webp" alt="" />
                            <div>
                                <span>USEFUL</span>
                                <h3>
                                    Amet Commodo Nulla Facilisi Vehicula Ipsum
                                </h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do…
                                </p>
                                <button>Read more</button>
                            </div>
                        </aside>
                        <aside>
                            <img
                                src="/assets/article-image-4-768x637.webp"
                                alt=""
                            />
                            <div>
                                <span>GADGETS</span>
                                <h3>
                                    Urnaneque Viverra Justo Ultrices Sapieneget
                                </h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do…
                                </p>
                                <button>Read more</button>
                            </div>
                        </aside>
                        <aside>
                            <img src="/assets/article-image-6.webp" alt="" />
                            <div>
                                <span>EXPIRIENCE</span>
                                <h3>
                                    Tristique Magna Amet Purus Gravida
                                    Quisblandit
                                </h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do…
                                </p>
                                <button>Read more</button>
                            </div>
                        </aside>
                    </div>
                </section>
            </article>
        </Fragment>
    );
}
