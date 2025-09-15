"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Fragment, useState } from "react";
import axios from "axios";
import { api } from "../api";

function Page() {
    const router = useRouter();

    const [state, setState] = useState(true);
    const [isExistingUser, setIsExistingUser] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const [data, setData] = useState({
        email: "",
        confirmPassword: "",
        password: "",
        title: "",
        image: "",
    });

    const handleClick = () => {
        router.push("/");
    };

    const [selectedFile, setSelectedFile] = useState(null);

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
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
            axios
                .post(`${api}/api/check-emp-login/`, { email: data.email })
                .then((result) => {
                    if (result.data.exists) {
                        setIsExistingUser(true);
                    } else {
                        setIsExistingUser(false);
                    }
                })
                .catch((err) => {
                    console.log("Error checking email:", err);
                    setIsExistingUser(false);
                });
        } else {
            if (isExistingUser) {
                axios
                    .post(`${api}/api/emp-login/`, {
                        email: data.email,
                        password: data.password,
                    })
                    .then((result) => {
                        console.log(result.data);
                        if (result.data.success) {
                            if (result.data) {
                                localStorage.setItem(
                                    "userID-emp",
                                    result.data["userID-emp"]
                                );
                                router.push("/");
                            } else {
                                alert(
                                    "این حساب برای کارجویان است. لطفا از بخش کارجویان وارد شوید."
                                );
                            }
                        } else {
                            alert(result.data.message);
                        }
                    })
                    .catch((err) => {
                        console.log("Login error:", err);
                        alert(
                            "ورود موفق نبود. لطفا اطلاعات خود را بررسی کنید."
                        );
                    });
            } else {
                // Register new employer
                if (data.password !== data.confirmPassword) {
                    alert("کلمه‌های عبور مطابقت ندارند");
                    setData((prev) => ({
                        ...prev,
                        password: "",
                        confirmPassword: "",
                    }));
                    return;
                }

                if (!selectedFile) {
                    alert("لطفا لوگو سازمان را انتخاب کنید");
                    return;
                }

                if (!data.title) {
                    alert("لطفا نام سازمان را وارد کنید");
                    return;
                }

                const formData = new FormData();
                formData.append("image", selectedFile);
                formData.append("email", data.email);
                formData.append("password", data.password);
                formData.append("title", data.title);

                setUploading(true);
                setUploadError(null);

                // Submit to Django backend
                axios
                    .post(`${api}/api/register-emp/`, formData)
                    .then((result) => {
                        console.log(result.data);
                        localStorage.setItem(
                            "userID-emp",
                            result.data["userID-emp"]
                        );
                        router.push("/");
                    })
                    .catch((err) => {
                        console.error(err);
                        setUploadError("ثبت نام موفق نبود. دوباره تلاش کنید.");
                        alert("ثبت نام موفق نبود. دوباره تلاش کنید.");
                    })
                    .finally(() => {
                        setUploading(false);
                    });
            }
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
                            {!isExistingUser ? (
                                // Registration form
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
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            required
                                        />
                                    </label>

                                    {uploading && (
                                        <p>در حال بارگذاری لوگو ...</p>
                                    )}
                                    {uploadError && (
                                        <p style={{ color: "red" }}>
                                            {uploadError}
                                        </p>
                                    )}

                                    {selectedFile && (
                                        <p>
                                            فایل انتخاب شده: {selectedFile.name}
                                        </p>
                                    )}
                                </Fragment>
                            ) : (
                                // Login form
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
                            )}
                        </Fragment>
                    )}

                    <label htmlFor="submit">
                        <input
                            type="submit"
                            name="submit"
                            value={
                                state
                                    ? "ادامه"
                                    : isExistingUser
                                    ? "ورود"
                                    : "ثبت نام"
                            }
                            disabled={uploading}
                        />
                    </label>
                </form>
            </section>
        </main>
    );
}

export default Page;
