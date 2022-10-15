import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";
import "./countdown.css";

const CountDown = ({
  submit,
  answer,
  setAnswer,
  account,
  questionId,
  handleResetCurrentId,
  setQuestionIndex,
  setSubmit,
  results,
  questionsIndex,
}) => {
  const [count, setCount] = useState(4);

  useEffect(() => {
    if (count === 0) {
      if (submit.isSubmitted) {
        handleResetCurrentId();
        setSubmit({
          isSubmitted: false,
          answerSubmitted: null,
        });
        setAnswer(null);
        setQuestionIndex((i) => i + 1);
        setCount(4);
        return;
      } else {
        const ref = doc(db, `result_test_1`, account?.id);
        const newRel = results.filter((r) => r.index !== questionsIndex);

        setDoc(ref, {
          userId: account?.id,
          username: account?.ten,
          taikhoan: account?.taikhoan,
          results: [
            ...newRel,
            {
              questionId,
              user_answer: answer,
              id: uuidv4(),
              index: questionsIndex,
            },
          ],
        }).then(() => {
          localStorage.setItem("questionsIndex", questionsIndex + 1);
          handleResetCurrentId();

          setSubmit({
            isSubmitted: false,
            answerSubmitted: null,
          });
          setAnswer(null);
          setQuestionIndex((i) => i + 1);
          setCount(8);
        });
        return;
      }
    }
    const timer = setTimeout(() => {
      setCount((c) => c - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [count]);
  return (
    <>
      {count <= 0 && (
        <div
          style={{
            position: "fixed",
            inset: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99999,
            backgroundColor: "rgba(0,0,0,.3)",
          }}
        >
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif"
            width={110}
            height={110}
            alt=""
          />
        </div>
      )}
      <div className="countdown-wrapper">
        <div
          className={`c100 p${Math.round((count / 30) * 100)} ${
            count > 10 ? "green" : "red-col"
          }  `}
        >
          <span>{count}</span>
          <div className="slice">
            <div className="bar"></div>
            <div className="fill"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountDown;
