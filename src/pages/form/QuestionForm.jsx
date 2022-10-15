import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import TextField from "../../components/form/TextField";

const INIT_DATA = {
  cauhoi: "",
  dapana: "",
  dapanb: "",
  dapanc: "",
  dapand: "",
  dapandung: "",
};

const OPTIONS = ["dapana", "dapanb", "dapanc", "dapand"];

const validate = Yup.object({
  cauhoi: Yup.string().required("Vui lòng nhập câu hỏi !"),
  dapana: Yup.string().required("Vui lòng nhập đáp án !"),
  dapanb: Yup.string().required("Vui lòng nhập đáp án !"),
  dapanc: Yup.string().required("Vui lòng nhập đáp án !"),
  dapand: Yup.string().required("Vui lòng nhập đáp án !"),
  dapandung: Yup.string().required("Vui lòng nhập đáp án đúng !"),
});

const QuestionForm = ({ initData, onSubmit }) => {
  const initDataValidated = initData || INIT_DATA;
  return (
    <Formik
      validationSchema={validate}
      initialValues={initDataValidated}
      enableReinitialize
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ resetForm, errors, touched }) => (
        <Form>
          <div className="forms_block">
            <div className="form-group mb-3">
              <p className="mb-2">Câu hỏi</p>
              <TextField name="cauhoi" />
            </div>

            <div className="form-group mb-3">
              <p className="mb-2">Đáp án A</p>
              <TextField rows={1} name="dapana" />
            </div>

            <div className="form-group mb-3">
              <p className="mb-2">Đáp án B</p>
              <TextField rows={1} name="dapanb" />
            </div>

            <div className="form-group mb-3">
              <p className="mb-2">Đáp án C</p>
              <TextField rows={1} name="dapanc" />
            </div>

            <div className="form-group mb-3">
              <p className="mb-2">Đáp án D</p>
              <TextField rows={1} name="dapand" />
            </div>

            <div className="form-group mb-3">
              <p className="mb-2">Đáp án đúng</p>
              <Field name="dapandung" as="select" className="form-control">
                <option value="" disabled>
                  Chọn đáp án đúng
                </option>
                {OPTIONS.map((d) => (
                  <option value={d} key={d}>
                    {d}
                  </option>
                ))}
              </Field>
              {errors.dapandung && touched.dapandung && (
                <div className="invalid-feedback d-block">
                  {errors.dapandung}
                </div>
              )}
            </div>

            <div className="form-group d-flex justify-content-end ">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                }}
                className="btn btn-secondary   text-white me-3"
              >
                Đặt lại
              </button>
              <button type="submit" className="btn btn-primary   text-white">
                Lưu lại
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default QuestionForm;
