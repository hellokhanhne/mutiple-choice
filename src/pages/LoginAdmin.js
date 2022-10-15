import React from "react";
import bell from "../assets/bell.png";
import useWindowSize from "../hooks/useWindowSize";
import "../styles/login.css";

const LoginAdmin = () => {
  const { width } = useWindowSize();

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
              className="form-control mb-4"
              placeholder="Nhập tài khoản "
            />
            <input
              type="password"
              className="form-control mb-4"
              placeholder="Nhập mật khẩu "
            />
            <button className="btn btn-primary w-100">Đăng nhập</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
