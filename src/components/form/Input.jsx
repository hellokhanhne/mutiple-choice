import { ErrorMessage, useField } from "formik";
import React from "react";

const Input = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-3">
      <input
        {...field}
        {...props}
        className={`form-control ${props.className}   ${
          meta.touched && meta.error && "is-invalid"
        }`}
      />
      {meta.error && (
        <ErrorMessage
          component="div"
          name={field.name}
          className="invalid-feedback"
        />
      )}
    </div>
  );
};

export default Input;
