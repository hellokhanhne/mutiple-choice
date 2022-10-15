import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Input from "../../components/form/Input";

const INIT_DATA = {
  name: "",
};

const validate = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên đơn vị !"),
});

const UnitForm = ({ initData, onSubmit }) => {
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
      {(_) => (
        <Form>
          <div className="forms_block">
            <div className="form-group ">
              <p className="mb-2">Tên đơn vị</p>
              <Input type="text" name="name" placeholder="Nhập tên đơn vị" />
            </div>

            <div className="form-group ">
              <button
                type="submit"
                className="btn btn-primary  w-100 text-white"
              >
                Lưu lại
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UnitForm;
