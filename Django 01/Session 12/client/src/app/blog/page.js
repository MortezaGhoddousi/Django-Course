import { Fragment } from "react";

export default function AboutUs() {
    return (
        <Fragment>
            <article className="blog">
                <section className="part1">
                    <nav>
                        <ul>
                            <li>
                                <a href="/">home</a>
                            </li>
                            <span>/</span>
                            <li>
                                <a className="active" href="/blog">
                                    blog
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <h1>Blog</h1>
                </section>

                <section className="part2">
                    <aside>
                        <img src="/assets/article-image-5.webp" alt="" />
                        <div>
                            <span>USEFUL</span>
                            <h3>Amet Commodo Nulla Facilisi Vehicula Ipsum</h3>
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
                            <h3>Urnaneque Viverra Justo Ultrices Sapieneget</h3>
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
                                Tristique Magna Amet Purus Gravida Quisblandit
                            </h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do…
                            </p>
                            <button>Read more</button>
                        </div>
                    </aside>
                    <aside>
                        <img src="/assets/article-image-3.webp" alt="" />
                        <div>
                            <span>USEFUL</span>
                            <h3>Massa Ultricies Hendrerit Dolor Magna</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do…
                            </p>
                            <button>Read more</button>
                        </div>
                    </aside>
                    <aside>
                        <img
                            src="/assets/article-image-2-600x498.webp"
                            alt=""
                        />
                        <div>
                            <span>Expirience</span>
                            <h3>Consequat Mauris Nunc Congue Suscipit</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do…
                            </p>
                            <button>Read more</button>
                        </div>
                    </aside>
                    <aside>
                        <img
                            src="/assets/article-image-1-600x498.webp"
                            alt=""
                        />
                        <div>
                            <span>Gadgets</span>
                            <h3>Fermentum Faucibus Ornare Quam Viverra</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do…
                            </p>
                            <button>Read more</button>
                        </div>
                    </aside>
                </section>
            </article>
        </Fragment>
    );
}
