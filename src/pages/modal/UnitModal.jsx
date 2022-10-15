import React from "react";
import Modal from "react-bootstrap/Modal";
import UnitForm from "../form/UnitForm";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const UnitModalCreate = ({ show, setShow }) => {
  const handleSubmit = (values) => {
    const unitRef = doc(db, "units", uuidv4());
    setDoc(unitRef, values);
    toast.success("Thêm mới thành công !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Tạo đơn vị</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UnitForm onSubmit={handleSubmit} />
      </Modal.Body>
    </Modal>
  );
};

const UnitModalUpdate = ({ show, setShow, unit }) => {
  const handleSubmit = (values) => {
    const unitRef = doc(db, "units", unit.id);
    setDoc(unitRef, values, {
      merge: true,
    });
    setShow();
    toast.success("Cập nhật thành công !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <Modal show={show} onHide={() => setShow()}>
      <Modal.Header closeButton>
        <Modal.Title>Sửa đơn vị</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <UnitForm onSubmit={handleSubmit} initData={unit} />
      </Modal.Body>
    </Modal>
  );
};

export { UnitModalCreate, UnitModalUpdate };
