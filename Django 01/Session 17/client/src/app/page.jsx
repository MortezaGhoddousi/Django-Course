"use client";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { api, toPersianNumber } from "./api";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Latest from "./components/Latest";

export default function Home() {
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
    // setAllJobs(mockData);
    axios.get(`${api}/api/jobs/`).then((result) => {
      console.log(result);
      setAllJobs(result.data);
    });
  }, []);

  return (
    <Fragment>
      <Header />
      <section className="search">
        <aside>
          <h1>
            <span>{toPersianNumber(allJobs.length)}</span> آگهی استخدام در
            <span>{toPersianNumber(346)}</span> شهر
          </h1>
          <img src="/photo_5906810407442566311_x.jpg" />
        </aside>
        <h3>دنبال چه شغلی میگردید؟</h3>
        <form>
          <label htmlFor="title">
            <input
              type="text"
              name="title"
              placeholder="عنوان شغلی یا شرکت ..."
            />
          </label>

          <label htmlFor="group">
            <input type="text" name="group" placeholder="گروه شغلی" />
          </label>

          <label htmlFor="city">
            <input type="text" name="city" placeholder="شهر" />
          </label>

          <label htmlFor="submit">
            <input type="submit" name="submit" value="جستجو در مشاغل" />
          </label>
        </form>
      </section>

      <Latest mockData={allJobs} />

      <section className="help">
        <h2>جاب بورد دستیار استخدامی شما</h2>
        <ul>
          <li>
            <i className="bx bxs-user-account"></i>
            <p>{toPersianNumber(4540000)} +</p>
            <p>کارجوی همراه</p>
          </li>
          <li>
            <i className="bx bx-building-house"></i>
            <p>{toPersianNumber(121600)} +</p>
            <p>سازمان‌ همراه</p>
          </li>
          <li>
            <i className="bx bxs-shopping-bags"></i>
            <p>{toPersianNumber(40000)} +</p>
            <p>موقعیت‌ شغلی فعال</p>
          </li>
          <li>
            <i className="bx bxs-calendar-check"></i>
            <p>{toPersianNumber(312000)} +</p>
            <p>استخدام موفق</p>
          </li>
        </ul>
      </section>

      <section className="adg">
        <h1>چرا جاب بورد؟</h1>
        <ul>
          <li>
            <p>مورد اعتماد بهترین سازمان‌های ایران</p>
            <i className="bx bx-chevron-down"></i>
          </li>
          <li>
            <p>هوشمندترین سیستم پیشنهاد و اطلاع‌رسانی شغل</p>
            <i className="bx bx-chevron-down"></i>
          </li>
          <li>
            <p>رزومه ساز دوزبانه و استاندارد</p>
            <i className="bx bx-chevron-down"></i>
          </li>
          <li>
            <p>سیستم هوشمند انطباق</p>
            <i className="bx bx-chevron-down"></i>
          </li>
          <li>
            <p>خودشناسی با کمک تست های استاندارد</p>
            <i className="bx bx-chevron-down"></i>
          </li>
          <li>
            <p>بستری برای ملاقات با مدیران شرکت ها در نمایشگاه کار</p>
            <i className="bx bx-chevron-down"></i>
          </li>
          <li>
            <p>امکان معرفی کامل خود به کارفرما</p>
            <i className="bx bx-chevron-down"></i>
          </li>
          <li>
            <p>قوی‌ترین شبکه‌های اجتماعی در بین سایت‌های کاریابی ایرانی</p>
            <i className="bx bx-chevron-down"></i>
          </li>
        </ul>
      </section>

      <section className="register">
        <h1>زندگی شغلی رویایی خود را با جاب ویژن بسازید</h1>
        <p>
          از آخرین فرصت‌های شغلی معتبرترین شرکت‌های ایران باخبر شده و در آنها
          استخدام شوید.
        </p>
        <button>ثبت نام کنید</button>
      </section>
      <Footer />
    </Fragment>
  );
}
