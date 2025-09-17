"use client";

import { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { api, toPersianNumber } from "../api";
import axios from "axios";

function Page() {
  const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    axios.get(`${api}/api/jobs/`).then((result) => {
      console.log(result);
      setAllJobs(result.data);
    });
  }, []);

  return (
    <Fragment>
      <Header />
      <article className="jobs">
        <div>
          {allJobs.map((el, ind) => {
            return <Box data={el} key={ind} />;
          })}
        </div>
      </article>
      <Footer />
    </Fragment>
  );
}

export default Page;

function Box(props) {
  const [data, setData] = useState({
    userID: "",
    title: "",
    id: "",
  });

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setData({ ...data, userID });
  }, []);

  const handleClick = (e) => {
    console.log(props.data);

    setData({ ...data, title: props.data.company, id: props.data.id });

    axios
      .post(`${api}/api/send-cv/`, data)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <img src={props.data.image} alt="company-image" />
      <h1>{props.data.title}</h1>
      <p>{props.data.company}</p>
      <aside>
        <span>{props.data.city}</span>
        <span>{toPersianNumber(props.data.price)}</span>
      </aside>

      <span>{toPersianNumber(props.data.date)}</span>
      <button onClick={handleClick}>ارسال رزومه</button>

      <span>فوری</span>
      <span>
        <i className="bx bx-heart"></i>
      </span>
    </div>
  );
}
