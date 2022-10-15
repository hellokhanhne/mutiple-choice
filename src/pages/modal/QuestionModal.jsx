import { doc, setDoc } from "firebase/firestore";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../firebase";
import QuestionForm from "../form/QuestionForm";

const QuestionModalCreate = ({ show, setShow }) => {
  const handleSubmit = (values) => {
    const unitRef = doc(db, "questions", uuidv4());
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
        <QuestionForm onSubmit={handleSubmit} />
      </Modal.Body>
    </Modal>
  );
};

const QuestionModalUpdate = ({ show, setShow, question }) => {
  const handleSubmit = (values) => {
    const unitRef = doc(db, "questions", question.id);
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
        <QuestionForm onSubmit={handleSubmit} initData={question} />
      </Modal.Body>
    </Modal>
  );
};

export { QuestionModalCreate, QuestionModalUpdate };
