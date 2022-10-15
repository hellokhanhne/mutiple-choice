import React, { useState } from "react";
import ExamManage from "./tables/ExamManage";
import QuestionManage from "./tables/QuestionManage";
import ResultManage from "./tables/ResultManage";
import UnitManage from "./tables/UnitManage";
import UserManage from "./tables/UserManage";

const Admin = () => {
  const [active, setActive] = useState(5);
  return (
    <div className=" w-100 px-4 py-4">
      <div>
        <h2 className="text-center">
          Hệ thống trắc nghiệm online (realtime database) Firebase
        </h2>
        <div
          className="text-center "
          style={{
            marginTop: "2.25rem",
          }}
        >
          <button
            type="button"
            onClick={() => setActive(1)}
            className={`btn me-4 ${
              active === 1 ? "btn-primary" : "btn-outline-primary"
            }`}
          >
            Danh sách người dùng
          </button>
          <button
            type="button"
            onClick={() => setActive(2)}
            className={`btn me-4 ${
              active === 2 ? "btn-primary" : "btn-outline-primary"
            }`}
          >
            Danh sách câu hỏi
          </button>
          <button
            type="button"
            onClick={() => setActive(3)}
            className={`btn me-4 ${
              active === 3 ? "btn-primary" : "btn-outline-primary"
            }`}
          >
            Danh sách kết quả
          </button>
          <button
            type="button"
            onClick={() => setActive(4)}
            className={`btn me-4  ${
              active === 4 ? "btn-primary" : "btn-outline-primary"
            }`}
          >
            Danh sách đơn vị
          </button>
          <button
            type="button"
            onClick={() => setActive(5)}
            className={`btn ${
              active === 5 ? "btn-primary" : "btn-outline-primary"
            }`}
          >
            Danh sách đề
          </button>
        </div>
        <div>
          {active === 1 && <UserManage />}
          {active === 2 && <QuestionManage />}
          {active === 3 && <ResultManage />}
          {active === 4 && <UnitManage />}
          {active === 5 && <ExamManage />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
