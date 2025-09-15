"use client";

import { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { api, toPersianNumber } from "../api";
import axios from "axios";


function Page() {
  const mockData = [
    {
      image: "/images/1.jpg",
      title: "توسعه دهنده بکند",
      company: "اف ایکس پی",
      city: "ترکیه",
      price: "45 - 40 میلیون تومان",
      date: "2 روز پیش",
    },
    {
      image: "/images/2.jpg",
      title: "برنامه نویس پایتون",
      company: "رایان کاوش اطلاعات مدار",
      city: "تهران",
      price: "50 - 35 میلیون تومان",
      date: "2 روز پیش",
    },
    {
      image: "/images/3.jpg",
      title: "توسعه دهنده بکند",
      company: "گروه سرمایه گذاری آرش و آرین",
      city: "شیراز",
      price: "35 - 25 میلیون تومان",
      date: "6 روز پیش",
    },
  ];

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
      <button>ارسال رزومه</button>

      <span>فوری</span>
      <span>
        <i className="bx bx-heart"></i>
      </span>
    </div>
  );
}
