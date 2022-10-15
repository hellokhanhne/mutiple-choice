import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../../firebase";
import {
  QuestionModalCreate,
  QuestionModalUpdate,
} from "../modal/QuestionModal";

const QuestionManage = () => {
  const [questions, setQuestions] = useState([]);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa ?")) {
      const unitRef = doc(db, "questions", id);
      deleteDoc(unitRef);
    }
  };

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
      <div
        className=" mx-auto mb-4 mt-5"
        style={{
          maxWidth: "80vw",
          textAlign: "right",
        }}
      >
        <button
          className="btn btn-primary"
          onClick={() => setShowModalCreate(true)}
        >
          Thêm câu hỏi
        </button>
      </div>
      <table
        className="table table-bordered w-100 m-auto mt-3"
        style={{
          maxWidth: "80vw",
          overflowX: "auto  ",
        }}
      >
        <thead>
          <tr>
            <th>STT</th>
            <th>Câu hỏi</th>
            <th>Đáp án A</th>
            <th>Đáp án B</th>
            <th>Đáp án C</th>
            <th>Đáp án D</th>
            <th>Đáp án đúng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((d, i) => (
            <tr key={d.id}>
              <td>{i + 1}</td>
              <td>{d.cauhoi}</td>
              <td>{d.dapana}</td>
              <td>{d.dapanb}</td>
              <td>{d.dapanc}</td>
              <td>{d.dapand}</td>
              <td>{d.dapandung}</td>
              <td>
                <div className="d-flex justify-content-center">
                  {" "}
                  <button
                    className="btn  btn-warning me-2"
                    onClick={() => setSelectedQuestion(d)}
                  >
                    Sửa
                  </button>{" "}
                  <button
                    className="btn  btn-danger"
                    onClick={() => handleDelete(d.id)}
                  >
                    Xóa
                  </button>{" "}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <QuestionModalCreate
        show={showModalCreate}
        setShow={setShowModalCreate}
      />
      <QuestionModalUpdate
        show={!!selectedQuestion}
        setShow={() => setSelectedQuestion(null)}
        question={selectedQuestion}
      />
    </div>
  );
};

export default QuestionManage;
