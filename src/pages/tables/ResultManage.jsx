import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

const ResultManage = () => {
  const [results, setResults] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "result_test_1"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setResults(arr);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const q = query(collection(db, "questions"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setQuestions(arr);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <table
        className="table table-bordered w-100 m-auto mt-5"
        style={{
          maxWidth: 1350,
        }}
      >
        <thead>
          <tr>
            <th>STT</th>
            <th>ID người dùng</th>
            <th>Tài khoản </th>
            <th>Tên</th>
            <th>Số câu trả lời đúng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {results.length > 0 &&
            questions.length > 0 &&
            results.map((d, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{d.userId}</td>
                <td>{d.taikhoan}</td>
                <td>{d.username}</td>
                <td>
                  {d.results.reduce((prev, cur) => {
                    const q = questions.find((d) => d.id === cur.questionId);
                    if (cur.user_answer === q.dapandung) {
                      return prev + 1;
                    }
                    return prev;
                  }, 0) +
                    " / " +
                    d.results.length}
                </td>
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
