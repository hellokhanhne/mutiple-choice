import { doc, setDoc } from "firebase/firestore";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../firebase";
import UserForm from "../form/UserForm";

const UserModalCreate = ({ show, setShow, units }) => {
  const handleSubmit = (values) => {
    const unitRef = doc(db, "users", uuidv4());
    setDoc(unitRef, {
      ...values,
      matkhau: "",
      quyen: "user",
    });
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
        <Modal.Title>Tạo người dùng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserForm units={units} onSubmit={handleSubmit} />
      </Modal.Body>
    </Modal>
  );
};

const UserModalUpdate = ({ show, setShow, units, user }) => {
  const handleSubmit = (values) => {
    const userRef = doc(db, "users", user.id);
    setDoc(
      userRef,
      {
        ...values,
        matkhau: "",
        quyen: "user",
      },
      {
        merge: true,
      }
    );
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
        <Modal.Title>Sửa người dùng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <UserForm units={units} onSubmit={handleSubmit} initData={user} />
      </Modal.Body>
    </Modal>
  );
};

export { UserModalCreate, UserModalUpdate };
