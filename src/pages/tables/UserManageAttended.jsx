import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

const UserManageAttended = () => {
  const [users, setUsers] = useState([]);
  // const [units, setUnits] = useState([]);
  const [checkInMark, setCheckInMark] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "checkIns"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      const checkInObject = arr.reduce((prev, cur) => {
        if (prev[cur.donvi]) {
          prev[cur.donvi] = {
            total: prev[cur.donvi].total + 1,
          };
        } else {
          prev[cur.donvi] = {
            total: 1,
          };
        }
        return prev;
      }, {});
      const checkInsArray = Object.entries(checkInObject).map(
        ([key, value]) => {
          return {
            name: key,
            ...value,
          };
        }
      );
      setCheckInMark(checkInsArray);
      arr.sort((a, b) => a.donvi.localeCompare(b.donvi));
      setUsers(arr);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   const q = query(collection(db, "units"));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     let arr = [];
  //     querySnapshot.forEach((doc) => {
  //       arr.push({ ...doc.data(), id: doc.id });
  //     });
  //     setUnits(arr);
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <div className="mt-5">
      <div className="d-flex">
        <table
          className="table table-bordered w-100 m-auto"
          style={{
            maxWidth: "70%",
          }}
        >
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Đơn vị</th>
              {/* <th>Email</th> */}
              <th>Tài khoản</th>
            </tr>
          </thead>
          <tbody>
            {users.map((d, i) => (
              <tr key={d.id}>
                <td>{i + 1}</td>
                <td>{d.ten}</td>
                <td>{d.donvi}</td>
                {/* <td>{d.email}</td> */}
                <td>{d.taikhoan}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="px-4"
          style={{
            minWidth: 400,
          }}
        >
          <h4 className="text-center mb-4">Tổng tham gia từng đơn vị </h4>
          <div>
            {checkInMark.map((m) => (
              <p key={m.name}>
                {m.name} <strong>{"  : " + m.total}</strong>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManageAttended;
