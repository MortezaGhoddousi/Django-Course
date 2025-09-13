"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Fragment, useState } from "react";
import axios from "axios";

function Page() {
  const router = useRouter();

  const [state, setState] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const [data, setData] = useState({
    email: "",
    confirmPassword: "",
    password: "",
    title: "",
    image: "", // URL from backend
  });

  const handleClick = () => {
    router.push("/");
  };

  const [imageSrc, setImageSrc] = useState(null);

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      setImageSrc(e.target.result); // base64 image data
    };
    reader.readAsDataURL(file);
    console.log(reader.readAsDataURL(file));
  }

  const handleInputChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state) {
      if (!data.email) {
        alert("لطفا ایمیل خود را وارد کنید");
        return;
      }
      setState(false);
    } else {
      if (data.password !== data.confirmPassword) {
        alert("کلمه‌های عبور مطابقت ندارند");
        setData((prev) => ({
          ...prev,
          password: "",
          confirmPassword: "",
        }));
        return;
      }

      // Submit to Django backend
      axios
        .post("http://localhost:8000/api/register-emp/", data)
        .then((result) => {
          console.log(result.data);
          localStorage.setItem("userID-emp", result.data.userID);
          router.push("/");
        })
        .catch((err) => {
          console.error(err);
          alert("ثبت نام موفق نبود. دوباره تلاش کنید.");
        });
    }
  };

  return (
    <main className="login-container">
      <p>
        کارجو هستید؟ <Link href="/login">ثبت نام به عنوان کارجو</Link>
      </p>
      <section className="login">
        <h1 className="logo" onClick={handleClick}>
          جاب بورد <span>برای کارفرمایان</span>
        </h1>
        <p>ورود | ایجاد حساب کارفرما</p>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {state ? (
            <label htmlFor="email">
              آدرس ایمیل خود را وارد کنید. (ترجیحا ایمیل سازمانی)
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleInputChange}
                required
              />
            </label>
          ) : (
            <Fragment>
              <label htmlFor="title">
                اسم سازمان را وارد نمائید
                <input
                  type="text"
                  name="title"
                  value={data.title}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label htmlFor="password">
                کلمه عبور خود را وارد کنید
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label htmlFor="confirmPassword">
                کلمه عبور خود را تایید کنید
                <input
                  type="password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label htmlFor="image">
                لوگو سازمان را ارسال نمائید
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  required={!data.image}
                />
              </label>

              {uploading && <p>در حال بارگذاری لوگو ...</p>}
              {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}

              {data.image && (
                <p>
                  لوگو آپلود شده:{" "}
                  <img
                    src={data.image}
                    alt="Uploaded logo"
                    style={{ maxWidth: "100px", marginTop: "10px" }}
                  />
                </p>
              )}
            </Fragment>
          )}

          <label htmlFor="submit">
            <input
              type="submit"
              name="submit"
              value={state ? "ادامه" : "ثبت نام"}
              disabled={uploading}
            />
          </label>
        </form>
      </section>
    </main>
  );
}

export default Page;
