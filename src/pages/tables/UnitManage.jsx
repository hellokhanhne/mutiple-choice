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
import { UnitModalCreate, UnitModalUpdate } from "../modal/UnitModal";

const UnitManage = () => {
  const [units, setUnits] = useState([]);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa ?")) {
      const unitRef = doc(db, "units", id);
      deleteDoc(unitRef);
    }
  };

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
          maxWidth: 500,
          textAlign: "right",
        }}
      >
        <button
          className="btn btn-primary"
          onClick={() => setShowModalCreate(true)}
        >
          Thêm đơn vị
        </button>
      </div>
      <table
        className="table table-bordered w-100 m-auto"
        style={{
          maxWidth: 500,
        }}
      >
        <thead>
          <tr>
            <th>STT</th>
            <th>Đơn vị</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {units.map((d, i) => (
            <tr key={d.id}>
              <td>{i + 1}</td>
              <td>{d.name}</td>
              <td>
                <div className="d-flex justify-content-center">
                  {" "}
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => setSelectedUnit(d)}
                  >
                    Sửa
                  </button>{" "}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      handleDelete(d.id);
                    }}
                  >
                    Xóa
                  </button>{" "}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UnitModalCreate show={showModalCreate} setShow={setShowModalCreate} />
      <UnitModalUpdate
        show={!!selectedUnit}
        setShow={() => setSelectedUnit(null)}
        unit={selectedUnit}
      />
    </div>
  );
};

export default UnitManage;
