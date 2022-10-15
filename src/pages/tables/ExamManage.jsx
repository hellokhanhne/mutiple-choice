import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../../firebase";

import { Form, Formik } from "formik";
import Input from "../../components/form/Input";
import { toast } from "react-toastify";

const ExamManage = () => {
  const [examNo, setExamNo] = useState("");
  const [exams, setExams] = useState([]);
  const [questions, setQuestions] = useState([]);

  // console.log(exams);

  // const handleDelete = (id) => {
  //   const unitRef = doc(db, "examsQ", id);
  //   deleteDoc(unitRef);
  // };

  // handleDelete(1);
  // handleDelete("2");

  useEffect(() => {
    const q = query(collection(db, "questions"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({
          ...doc.data(),
          ids: doc.data().ids,
          id: doc.id,
        });
      });

      setQuestions(arr);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const q = query(collection(db, "examsQ"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setExams(arr);
      setExamNo(arr.length?.toString());
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
          maxWidth: 500,
          textAlign: "right",
        }}
      >
        <Formik
          initialValues={{
            number: examNo,
          }}
          enableReinitialize
          onSubmit={(values) => {
            if (isNaN(values.number)) {
              return toast.error("Nhập vào một số !");
            }
            if (Number(values.number) < 1) {
              return toast.error("Phải có ít nhất 1 đề !");
            }
            if (questions.length < 1) {
              return toast.error(
                "Chưa có câu hỏi để tạo bộ đề. Vui lòng tạo ít nhất 1 câu hỏi !"
              );
            }

            for (let i of Array.from(
              { length: Number(values.number) },
              (_, k) => k + 1
            )) {
              const examRef = doc(db, "examsQ", i.toString());
              setDoc(
                examRef,
                {
                  made: i,
                  ids: Array.from({ length: 20 })
                    .fill(null)
                    .map(
                      () =>
                        questions[
                          Math.floor(Math.random() * (questions.length - 1))
                        ]?.id
                    ),
                },
                {
                  merge: true,
                }
              );
            }
          }}
        >
          {(_) => (
            <Form>
              <div className=" d-flex align-items-center justify-content-end">
                <div className="form-group ">
                  <Input
                    type="text"
                    name="number"
                    placeholder="Nhập số lượng đề thi"
                  />
                </div>

                <div className="form-group mb-3 ms-3">
                  <button
                    type="submit"
                    className="btn btn-primary   text-white"
                  >
                    Lưu số lượng đề thi
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <table
        className="table table-bordered w-100 m-auto"
        style={{
          maxWidth: 800,
        }}
      >
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã đề</th>
            <th>ID các câu hỏi</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((d, i) => (
            <tr key={d.id}>
              <td>{i + 1}</td>
              <td>{d.made}</td>
              <td>
                {d?.ids?.map((t, i) => (
                  <p key={(t, i)}>{t}</p>
                ))}
              </td>
              <th>
                <button className="btn btn-secondary">Xem chi tiết</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamManage;
