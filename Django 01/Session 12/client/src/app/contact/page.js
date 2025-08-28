import { Fragment } from "react";

export default function AboutUs() {
    return (
        <Fragment>
            <article className="contactUs">
                <section className="part1">
                    <nav>
                        <ul>
                            <li>
                                <a href="/">home</a>
                            </li>
                            <span>/</span>
                            <li>
                                <a className="active" href="/contact">
                                    contact us
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <h1>Contact Us</h1>
                </section>

                <section className="part2">
                    <div>
                        <i className="bx bxs-location-plus"></i>
                        <h2>Physical Address​</h2>
                        <p>304 North Cardinal St.</p>
                        <p>Dorchester Center, MA 02124</p>
                    </div>
                    <div>
                        <i className="bx bxs-phone-call"></i>
                        <h2>Phone Numbers​</h2>
                        <p>1-555-123-4567</p>
                        <p>1-800-123-4567</p>
                    </div>
                    <div>
                        <i className="bx bxs-envelope"></i>
                        <h2>Email Address​</h2>
                        <p>info@company.com</p>
                        <p>contact@company.com</p>
                    </div>
                </section>

                <section className="part3">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d123504.85313178896!2d121.060546!3d14.682783000000002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ba0942ef7375%3A0x4a9a32d9fe083d40!2sQuezon%20City%2C%20Metro%20Manila%2C%20Philippines!5e0!3m2!1sen!2sus!4v1748451806004!5m2!1sen!2sus"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <form>
                        <h2>Send us a message</h2>
                        <p>
                            Massa tincidunt nunc pulvinar sapien et ligula
                            ullamcorper. Id eu nisl nunc mi ipsum faucibus vitae
                            aliquet. Magna sit amet purus gravida quis blandit
                            turpis cursus in.
                        </p>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name*"
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name*"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email*"
                            required
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Your Phone Number"
                        />
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject*"
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Message"
                            rows="10"
                            required
                        ></textarea>
                        <input
                            type="submit"
                            name="submit"
                            value="Send Message"
                        />
                    </form>
                </section>

                <section className="part4"></section>
            </article>
        </Fragment>
    );
}
