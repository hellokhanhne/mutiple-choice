import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

import bell from "../assets/bell.png";
import useWindowSize from "../hooks/useWindowSize";
import "../styles/login.css";

const Login = () => {
  const { width } = useWindowSize();
  const Router = useNavigate();

  const [account, setAccount] = useState("");

  const handleLogin = async () => {
    const q = query(collection(db, "users"), where("taikhoan", "==", account));
    const snaps = await getDocs(q);
    if (snaps.docs.length > 0) {
      localStorage.setItem(
        "account",
        JSON.stringify({
          ...snaps.docs[0].data(),
          id: snaps.docs[0].id,
        })
      );
      return Router("/");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("account")) {
      Router("/");
    }
  }, []);

  return (
    <div className="body-login">
      <div className="purple"></div>
      <div className="medium-blue"></div>
      <div className="light-blue"></div>
      <div className="red"></div>
      <div className="orange"></div>
      <div className="yellow"></div>
      <div className="cyan"></div>
      {width > 600 && (
        <>
          {" "}
          <div className="light-green"></div>
          <div className="lime"></div>
          <div className="magenta"></div>
          <div className="lightish-red"></div>
          <div className="pink"></div>
        </>
      )}
      <div
        className=" w-100  main-form-login"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
        }}
      >
        <div className="w-100 h-100 px-3 py-4 d-flex justify-content-center">
          <div
            className="w-100"
            style={{
              maxWidth: 350,
            }}
          >
            <div className="text-center mb-5 mt-4">
              <img
                src={bell}
                style={{
                  width: "55vw",
                  maxWidth: 250,
                }}
                alt=""
              />
            </div>
            {/* <label className="mb-2 fs-4 fw-bold ">Nhập tài khoản</label> */}
            <input
              type="text"
              onChange={(e) => setAccount(e.target.value)}
              value={account}
              className="form-control mb-4"
              placeholder="Nhập tài khoản của bạn"
            />
            <button className="btn btn-primary w-100" onClick={handleLogin}>
              Vào chơi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
