"use client";
import { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { api } from "../api";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const [data, setData] = useState({
    userID: "",
  });

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    if (!userID) {
      router.push("/");
    }
    setData({ ...data, userID: userID });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(data.userID);
    const formData = new FormData();
    const fileInput = event.target.elements.file;
    if (fileInput.files.length === 0) return alert("Please select a file");

    formData.append("file", fileInput.files[0]);

    const id = data.userID;

    const res = await fetch(`${api}/api/cv/${id}/add/`, {
      method: "POST",
      body: formData,
    });

    const d = await res.json();
    if (!res.ok) alert(d.error || "Upload failed");
    else alert(d.message);
  }

  return (
    <Fragment>
      <Header />
      <form onSubmit={handleSubmit}>
        <label htmlFor="file">
          رزومه خود را آپلود نمائید
          <input type="file" name="file" />
        </label>
        <label htmlFor="submit">
          <input type="submit" value="آپلود" name="submit" />
        </label>
      </form>
      <Footer />
    </Fragment>
  );
}

export default Page;
