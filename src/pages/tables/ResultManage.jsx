import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

const ResultManage = () => {
  const [results, setResults] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [markUnits, setMarkUnits] = useState([]);

  const [units, setUnits] = useState([]);
  const [unit, setUnit] = useState("");

  useEffect(() => {
    if (questions.length > 0 && users.length > 0) {
      const q = query(collection(db, "result_test_1"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let arr = [];
        querySnapshot.forEach((doc) => {
          arr.push({
            ...doc.data(),
            id: doc.id,
            trueQuestionsNo: doc.data()?.results?.reduce((prev, cur) => {
              if (cur.user_answer === q.dapandung) {
                return prev + 1;
              }
              return prev;
            }, 0),
            total: doc.data()?.results?.length,
          });
        });

        const markUnitData = arr.reduce((prev, cur) => {
          const unit = users.find((u) => u.id === cur.userId)?.donvi;
          if (prev[unit]) {
            prev[unit] = {
              ...prev[unit],
              total: prev[unit].total + cur.total,
              trueQuestionsNo: prev[unit].trueQuestionsNo + cur.trueQuestionsNo,
            };
          } else {
            prev[unit] = {
              total: cur.total,
              trueQuestionsNo: cur.trueQuestionsNo,
            };
          }
          return prev;
        }, {});
        const markUnitDataArray = [];
        for (let [key, value] of Object.entries(markUnitData)) {
          markUnitDataArray.push({
            name: key,
            ...value,
          });
        }
        setMarkUnits(markUnitDataArray);
        setResults(arr);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [questions, users]);

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setUsers(arr);

      // setUnits(Array.from(new Set(arr.map((u) => u.donvi))));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const q = query(collection(db, "units"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setUnits(arr);
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
        arr.push({
          ...doc.data(),
          id: doc.id,
        });
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
        className="d-flex justify-content-center mt-5 mb-3"
        style={
          {
            // flexWrap: "wrap",
          }
        }
      >
        {/* <button
          type="button"
          onClick={() => setUnit(null)}
          className={`btn me-4  ${
            unit === null ? "btn-secondary" : "btn-outline-secondary"
          }`}
        >
          Xem tất cả
        </button> */}
        <select
          className="form-control"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          style={{
            maxWidth: 500,
          }}
        >
          {" "}
          <option value="">All</option>
          {units.map((u) => (
            <option value={u.name} key={u.name}>
              {" "}
              {u.name}
            </option>
          ))}
        </select>
        {/* {units.map((t) => (
          <button
            type="button"
            key={t.name}
            onClick={() => setUnit(t.name)}
            className={`btn me-4 mb-3 ${
              unit === t.name ? "btn-secondary" : "btn-outline-secondary"
            }`}
          >
            {t.name}
          </button>
        ))} */}
      </div>
      <div className="d-flex">
        <table
          className="table table-bordered w-100 m-auto mt-2"
          style={{
            // maxWidth: 1350,
            flex: 1,
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
              users.length > 0 &&
              (unit === ""
                ? results
                : results.filter((r) => {
                    const _unit = users.find((u) => u.id === r.userId).donvi;

                    if (_unit === unit) {
                      return true;
                    }
                    return false;
                  })
              ).map((d, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{d.userId}</td>
                  <td>{d.taikhoan}</td>
                  <td>{d.username}</td>
                  <td>{d.trueQuestionsNo + " / " + d.total}</td>
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
        <div
          style={{
            minWidth: 400,
          }}
          className="px-3 py-4"
        >
          <h4 className="text-center mb-4">Tổng điểm từng đơn vị : </h4>
          <div>
            {markUnits.map((m) => (
              <p key={m.name}>
                {m.name} <strong>{m.trueQuestionsNo + " / " + m.total}</strong>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultManage;
