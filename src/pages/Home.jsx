import React from "react";
import CountDown from "../components/CountDown";
import useWindowSize from "../hooks/useWindowSize";
import "../styles/home.css";

const kq = ["A", "B", "C", "D"];

const rel = Array.from({ length: 20 })
  .fill(null)
  .map((_, i) => ({
    no: i + 1,
    rel: kq[Math.round(Math.random() * 4)],
  }));

const Home = () => {
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
        className=" w-100 home-wrapper py-3 px-2"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
        }}
      >
        <div
          className="w-100 h-100"
          style={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          {" "}
          <div
            className="w-100 d-flex"
            style={{
              flex: 1,
            }}
          >
            <div
              className="w-100"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {" "}
              <div className="badge bg-primary text-wrap py-2 px-3">
                <h3 className="mb-0">Hệ thống trắc nghiệm online</h3>
              </div>
              <div
                style={{
                  marginTop: "2rem",
                }}
              >
                <CountDown />
              </div>
              <div
                className="px-3 text-white mt-5"
                style={{
                  borderRadius: 7,
                  backgroundColor: "#555",
                }}
              >
                <div className="py-2 h5">
                  <b>Q. which option best describes your job role?</b>

                  <div className="mt-4">
                    <label className="options">
                      Small Business Owner or Employee
                      <input type="radio" name="radio" />
                      <span className="checkmark"></span>
                    </label>
                    <label className="options">
                      Nonprofit Owner
                      <input type="radio" name="radio" />
                      <span className="checkmark"></span>
                    </label>
                    <label className="options">
                      Journalist or Activist
                      <input type="radio" name="radio" />
                      <span className="checkmark"></span>
                    </label>
                    <label className="options">
                      Other
                      <input type="radio" name="radio" />
                      <span className="checkmark"></span>
                    </label>

                    <button className="btn w-100 btn-primary mt-2">
                      Xác nhận
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* kq */}
          <div
            className="text-white px-3 py-2 mb-3 mt-3"
            style={{
              borderRadius: 7,
              backgroundColor: "#555",
            }}
          >
            <p className="mb-1">
              <b>Kết quả tạm thời</b>
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {rel.map((r) => (
                <span
                  key={r.no}
                  style={{
                    display: "block",
                    width: "20%",
                  }}
                  className=""
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 20,
                    }}
                  >
                    {r.no}
                  </span>
                  {" : "}
                  <span
                    style={{
                      marginLeft: 5,
                    }}
                  >
                    {r.rel || "_"}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
