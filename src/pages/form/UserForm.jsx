import { Field, Form as FormikForm, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import Input from "../../components/form/Input";

const INIT_DATA = {
  ten: "",
  donvi: "",
  email: "",
  taikhoan: "",
};

const validate = Yup.object({
  ten: Yup.string().required("Vui lòng nhập tên người dùng !"),
  donvi: Yup.string().test(
    "null",
    "Vui lòng chọn đơn vị người dùng !",
    (val) => {
      return ![undefined, null, ""].includes(val);
    }
  ),
  email: Yup.string().required("Vui lòng nhập email người dùng !"),
  taikhoan: Yup.string().required("Vui lòng nhập tài khoản người dùng !"),
});

const UserForm = ({ initData, onSubmit, units }) => {
  const initDataValidated = initData || INIT_DATA;
  const unitsValidated = units || [];

  return (
    <Formik
      validationSchema={validate}
      initialValues={initDataValidated}
      enableReinitialize
      onSubmit={(values, { resetForm, setFieldValue }) => {
        onSubmit(values);
        resetForm();
        setFieldValue("donvi", "Chọn đơn vị người dùng");
      }}
    >
      {({
        errors,
        resetForm,
        touched,

        setFieldValue,
      }) => (
        <FormikForm>
          <div className="forms_block">
            <div className="form-group mb-3">
              <p className="mb-2">Tên người dùng</p>
              <Input type="text" name="ten" placeholder="Nhập tên người dùng" />
            </div>

            <div className="form-group mb-3">
              <p className="mb-2">Đơn vị người dùng</p>
              <Field name="donvi" as="select" className="form-control">
                <option disabled value="">
                  Chọn đơn vị người dùng
                </option>
                {unitsValidated.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </Field>

              {errors.donvi && touched.donvi && (
                <div className="invalid-feedback d-block">{errors.donvi}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <p className="mb-2">Email người dùng</p>
              <Input
                type="text"
                name="email"
                placeholder="Nhập email người dùng"
              />
            </div>

            <div className="form-group mb-3">
              <p className="mb-2">Tài khoản người dùng</p>
              <Input
                type="text"
                name="taikhoan"
                placeholder="Nhập tài khoản người dùng"
              />
            </div>

            <div className="form-group d-flex justify-content-end ">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setFieldValue("donvi", "Chọn đơn vị người dùng");
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
        </FormikForm>
      )}
    </Formik>
  );
};

export default UserForm;
