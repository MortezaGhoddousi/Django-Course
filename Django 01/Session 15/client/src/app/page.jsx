"use client";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { api } from "./api";

export default function Home() {
  function toPersianNumber(num) {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num
      .toString()
      .split("")
      .map((c) => {
        if (/\d/.test(c)) {
          return persianDigits[c];
        } else {
          return c;
        }
      })
      .join("");
  }

  const [allJobs, setAllJobs] = useState(0);
  useEffect(() => {
    axios.get(`${api}/jobs`).then((result) => {
      setAllJobs(result.data.length);
    });
  }, []);

  return (
    <Fragment>
      <section className="search">
        <h1>
          <span>{toPersianNumber(allJobs)}</span> آگهی استخدام در{" "}
          <span>{toPersianNumber(346)}</span> شهر
        </h1>
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

      <section className="help">
        <h2>جاب‌ویژن، دستیار استخدامی شما</h2>
        <ul>
          <li>
            <i class="bx bxs-user-account"></i>
            <p>{toPersianNumber(4540000)} +</p>
            <p>کارجوی همراه</p>
          </li>
          <li>
            <i class="bx bx-building-house"></i>
            <p>{toPersianNumber(121600)} +</p>
            <p>سازمان‌ همراه</p>
          </li>
          <li>
            <i class="bx bxs-shopping-bags"></i>
            <p>{toPersianNumber(40000)} +</p>
            <p>موقعیت‌ شغلی فعال</p>
          </li>
          <li>
            <i class="bx bxs-calendar-check"></i>
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
            <i class="bx bx-chevron-down"></i>
          </li>
          <li>
            <p>هوشمندترین سیستم پیشنهاد و اطلاع‌رسانی شغل</p>
            <i class="bx bx-chevron-down"></i>
          </li>
          <li>
            <p>رزومه ساز دوزبانه و استاندارد</p>
            <i class="bx bx-chevron-down"></i>
          </li>
          <li>
            <p>سیستم هوشمند انطباق</p>
            <i class="bx bx-chevron-down"></i>
          </li>
          <li>
            <p>خودشناسی با کمک تست های استاندارد</p>
            <i class="bx bx-chevron-down"></i>
          </li>
          <li>
            <p>بستری برای ملاقات با مدیران شرکت ها در نمایشگاه کار</p>
            <i class="bx bx-chevron-down"></i>
          </li>
          <li>
            <p>امکان معرفی کامل خود به کارفرما</p>
            <i class="bx bx-chevron-down"></i>
          </li>
          <li>
            <p>قوی‌ترین شبکه‌های اجتماعی در بین سایت‌های کاریابی ایرانی</p>
            <i class="bx bx-chevron-down"></i>
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
    </Fragment>
  );
}
