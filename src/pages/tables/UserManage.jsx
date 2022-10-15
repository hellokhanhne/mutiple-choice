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
import { UserModalCreate, UserModalUpdate } from "../modal/UserModal";

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [units, setUnits] = useState([]);

  const [showModalCreate, setShowModalCreate] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa ?")) {
      const unitRef = doc(db, "users", id);
      deleteDoc(unitRef);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setUsers(arr);
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

  return (
    <div>
      <div
        className=" mx-auto mb-4 mt-5"
        style={{
          maxWidth: "80%",
          textAlign: "right",
        }}
      >
        <button
          className="btn btn-primary"
          onClick={() => setShowModalCreate(true)}
        >
          Thêm tài khoản
        </button>
      </div>
      <table
        className="table table-bordered w-100 m-auto"
        style={{
          maxWidth: "80%",
        }}
      >
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Đơn vị</th>
            <th>Email</th>
            <th>Tài khoản</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((d, i) => (
            <tr key={d.id}>
              <td>{i + 1}</td>
              <td>{d.ten}</td>
              <td>{d.donvi}</td>
              <td>{d.email}</td>
              <td>{d.taikhoan}</td>
              <td>
                <div className="d-flex justify-content-center">
                  {" "}
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => setSelectedUser(d)}
                  >
                    Sửa
                  </button>{" "}
                  <button
                    className="btn btn-sm btn-danger"
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
      <UserModalCreate
        units={units}
        show={showModalCreate}
        setShow={setShowModalCreate}
      />
      <UserModalUpdate
        show={!!selectedUser}
        setShow={() => setSelectedUser(null)}
        user={selectedUser}
        units={units}
      />
    </div>
  );
};

export default UserManage;
