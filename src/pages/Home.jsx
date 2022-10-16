import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import CountDown from "../components/CountDown";
import { db } from "../firebase";
import useWindowSize from "../hooks/useWindowSize";
import "../styles/home.css";

export const kqOptions = {
  dapana: "A",
  dapanb: "B",
  dapanc: "C",
  dapand: "D",
};

const initQuestions = JSON.parse(localStorage.getItem("exams"));

const Home = () => {
  const { width } = useWindowSize();
  const [loading, setLoading] = useState(true);
  const [isInContest, setIsInContest] = useState(false);
  const [results, setResults] = useState([]);
  const [kq, setKq] = useState(null);
  const [account, setAccount] = useState(
    JSON.parse(localStorage.getItem("account"))
  );
  const currenntResultId = useRef(null);
  const [submit, setSubmit] = useState({
    isSubmitted: false,
    answerSubmitted: null,
  });

  const [questionExam, setQuestionExam] = useState(initQuestions);

  const [questionsIndex, setQuestionIndex] = useState(
    Number(localStorage.getItem("questionsIndex")) || 0
  );

  const [answer, setAnswer] = useState(null);

  const handleSubmitAnswer = async () => {
    let newResult = [...results];

    newResult = newResult.filter(
      (n) => n.id !== currenntResultId.current && n.index !== questionsIndex
    );

    const id = uuidv4();
    currenntResultId.current = id;

    const ref = doc(db, `result_test_1`, account?.id);

    await setDoc(ref, {
      userId: account?.id,
      username: account?.ten,
      taikhoan: account?.taikhoan,
      unit: account?.donvi,
      results: [
        ...newResult,
        {
          questionId: questionExam[questionsIndex]?.id,
          user_answer: answer,
          id,
          index: questionsIndex,
        },
      ],
    });

    localStorage.setItem("questionsIndex", questionsIndex + 1);

    setSubmit({
      answerSubmitted: answer,
      isSubmitted: true,
    });
    toast.success("Chọn đáp án thành công !", {
      autoClose: 1000,
    });
  };

  const handleResetCurrentId = () => {
    currenntResultId.current = null;
  };

  useEffect(() => {
    const q = query(collection(db, "contest"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setIsInContest(querySnapshot.docs[0].data().isInContest);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "result_test_1", account?.id),
      (doc) => {
        const data = [...(doc.data()?.results || [])];
        if (data.length > 0) {
          data.sort((s1, s2) => s1.index - s2.index);
        }

        setResults(data);
        setLoading(false);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  // chon de
  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("exams")) {
        const querySnapshot = await getDocs(collection(db, "examsQ"));
        const queryData = querySnapshot.docs.map((d) => d.data());
        if (queryData.length > 0) {
          const selected =
            queryData[Math.floor(Math.random() * (queryData.length - 1))];

          const questions = await Promise.all(
            selected.ids.map((id) => {
              const ref = doc(db, "questions", id);
              return getDoc(ref);
            })
          );

          const last_data = questions.map((q) => ({
            ...q.data(),
            id: q.id,
          }));

          localStorage.setItem("exams", JSON.stringify(last_data));

          setQuestionExam(last_data);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (questionsIndex === 20 && results.length > 0) {
      // caculate result
      const totalTrueRel = results.reduce((prev, cur) => {
        const q = questionExam.find((d) => d.id === cur.questionId);
        if (cur.user_answer === q.dapandung) {
          return prev + 1;
        }
        return prev;
      }, 0);

      setKq({
        diem: totalTrueRel,
      });
    }
  }, [questionsIndex, results]);

  return (
    <>
      {loading && (
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
      {localStorage.getItem("account") ? (
        <>
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
                    <div
                      style={{
                        backgroundColor: " rgb(85, 85, 85)",
                      }}
                      className="badge bg-primary  text-wrap py-2 px-3 mb-3"
                    >
                      <h4 className="mb-0">Hệ thống trắc nghiệm online</h4>
                    </div>
                    <div
                      style={{
                        backgroundColor: " rgb(85, 85, 85)",
                      }}
                      className="badge bg-danger  text-wrap py-2 px-3 text-start"
                    >
                      <h5
                        style={{
                          fontSize: 16,
                        }}
                        className="mb-0"
                      >
                        {" "}
                        <b>Tên thí sinh</b> : {account?.ten}
                      </h5>
                      <h5
                        style={{
                          fontSize: 16,
                        }}
                        className="mb-0"
                      >
                        <b>Đơn vị</b> : {account?.donvi}
                      </h5>
                    </div>
                    {/* kq  */}
                    {kq?.diem && isInContest && (
                      <div
                        style={{
                          backgroundColor: " rgb(85, 85, 85)",
                        }}
                        className="badge    text-wrap py-3 px-3 mt-5 text-center"
                      >
                        <h3 className="mb-2">
                          Chúc mừng bạn đã hoàn thành bài trắc nghiệm !
                        </h3>
                        <h3>
                          Số câu đúng <strong>{kq.diem} / 20</strong>
                        </h3>
                      </div>
                    )}
                    {!isInContest && (
                      <div
                        style={{
                          backgroundColor: " rgb(85, 85, 85)",
                        }}
                        className="badge mt-4 bg-danger  text-wrap py-3 px-3 text-start"
                      >
                        <h3 className="mb-0">
                          Cuộc thi sắp bắt đầu thí sinh vui lòng chờ ...
                        </h3>
                      </div>
                    )}
                    {!isInContest && (
                      <div className="mt-4   py-3 px-3 ">
                        <img
                          src="https://www.jimphicdesigns.com/downloads/imgs-mockup/hourglass.gif"
                          className="w-100"
                          alt=""
                        />
                      </div>
                    )}
                    {isInContest && !loading && questionsIndex < 20 && (
                      <>
                        <div
                          style={{
                            marginTop: "1rem",
                          }}
                        >
                          <CountDown
                            results={results}
                            handleResetCurrentId={handleResetCurrentId}
                            setAnswer={setAnswer}
                            setQuestionIndex={setQuestionIndex}
                            questionsIndex={questionsIndex}
                            answer={answer}
                            submit={submit}
                            setSubmit={setSubmit}
                            account={account}
                            currenntResultId={currenntResultId}
                            questionId={questionExam[questionsIndex]?.id}
                          />
                        </div>
                        <div
                          className="px-3 text-white "
                          style={{
                            marginTop: "1rem",
                            borderRadius: 7,
                            backgroundColor: "#555",
                          }}
                        >
                          <div className="py-2 h5">
                            {submit.answerSubmitted && (
                              <p className="mb-1">
                                {" "}
                                <b
                                  className="text-warning"
                                  style={{
                                    fontSize: 18,
                                  }}
                                >
                                  Đã chọn đáp án :{" "}
                                  {kqOptions[submit.answerSubmitted]}
                                </b>
                              </p>
                            )}
                            <b
                              style={{
                                fontSize: 18,
                              }}
                            >
                              Câu{" "}
                              {questionsIndex +
                                1 +
                                "/" +
                                questionExam?.length +
                                " :  "}{" "}
                              {questionExam[questionsIndex]?.cauhoi}
                            </b>

                            <div className="mt-3">
                              <label className="options">
                                A. {questionExam[questionsIndex]?.dapana}
                                <input
                                  type="radio"
                                  checked={answer === "dapana"}
                                  value="dapana"
                                  onChange={(e) => {
                                    setAnswer(e.target.value);
                                  }}
                                  name="dapan"
                                />
                                <span className="checkmark"></span>
                              </label>
                              <label className="options">
                                B. {questionExam[questionsIndex]?.dapanb}
                                <input
                                  type="radio"
                                  checked={answer === "dapanb"}
                                  value="dapanb"
                                  onChange={(e) => {
                                    setAnswer(e.target.value);
                                  }}
                                  name="dapan"
                                />
                                <span className="checkmark"></span>
                              </label>
                              <label className="options">
                                C. {questionExam[questionsIndex]?.dapanc}
                                <input
                                  type="radio"
                                  checked={answer === "dapanc"}
                                  value="dapanc"
                                  onChange={(e) => {
                                    setAnswer(e.target.value);
                                  }}
                                  name="dapan"
                                />
                                <span className="checkmark"></span>
                              </label>
                              <label className="options">
                                D. {questionExam[questionsIndex]?.dapand}
                                <input
                                  value="dapand"
                                  type="radio"
                                  checked={answer === "dapand"}
                                  onChange={(e) => {
                                    setAnswer(e.target.value);
                                  }}
                                  name="dapan"
                                />
                                <span className="checkmark"></span>
                              </label>

                              <button
                                onClick={handleSubmitAnswer}
                                className="btn w-100 btn-primary mt-2"
                              >
                                Xác nhận
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {/* kq */}
                {isInContest && (
                  <div
                    className="text-white px-3 py-2 mb-3 mt-3"
                    style={{
                      borderRadius: 7,
                      backgroundColor: "#555",
                    }}
                  >
                    <p className="mb-1">
                      <b>Đáp án đã chọn</b>
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      {results.map((r) => (
                        <span
                          key={r.index}
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
                            {r.index + 1}
                          </span>
                          {" : "}
                          <span
                            style={{
                              marginLeft: 5,
                            }}
                          >
                            {kqOptions[r.user_answer] || "_"}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
