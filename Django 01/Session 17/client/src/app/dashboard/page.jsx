"use client";
import { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { api } from "../api";

function Page() {
  const [data, setData] = useState({
    title: "",
    price: "",
    city: "",
    userID: "",
  });

  useEffect(() => {
    const userID = localStorage.getItem("userID-emp");
    setData({ ...data, userID: userID });
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${api}/api/jobs/`, data)
      .then((result) => {
        setData({
          ...data,
          title: "",
          price: "",
          city: "",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <Header />
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          <input
            type="text"
            placeholder="عنوان شفل را وارد نمائید"
            name="title"
            onChange={handleChange}
            value={data.title}
          />
        </label>
        <label htmlFor="price">
          <input
            type="text"
            placeholder="رنج مبلغ حقوق را وارد نمائید"
            name="price"
            onChange={handleChange}
            value={data.price}
          />
        </label>
        <label htmlFor="city">
          <input
            type="text"
            placeholder="شهر"
            name="city"
            onChange={handleChange}
            value={data.city}
          />
        </label>
        <label htmlFor="submit">
          <input type="submit" name="submit" value="تایید" />
        </label>
      </form>
      <Footer />
    </Fragment>
  );
}

export default Page;
