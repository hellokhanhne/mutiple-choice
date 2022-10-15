import React from "react";
import { useState } from "react";

const ResultManage = () => {
  const [results, setResults] = useState([]);

  return (
    <div>
      <table
        className="table table-bordered w-100 m-auto mt-5"
        style={{
          maxWidth: 500,
        }}
      >
        <thead>
          <tr>
            <th>STT</th>
            <th>ID người dùng</th>
            <th>Tài khoản người dùng</th>
            <th>Đáp án của người dùng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {results.map((d, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{d.userId}</td>
              <td>{d.taikhoan}</td>
              <td>{d.dapannguoidung}</td>
              <td>
                <div className="d-flex justify-content-center">
                  {" "}
                  <button className="btn btn-sm btn-secondary">
                    Xem chi tiết
                  </button>{" "}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultManage;
