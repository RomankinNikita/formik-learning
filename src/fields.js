import React from "react";
import { Field, ErrorMessage } from "formik";

export const TextField = ({ field, form }) => {
  const { name, label } = field;
  const { errors, touched } = form;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Field
        {...field}
        className={
          errors[name] && touched[name]
            ? "form-control is-invalid"
            : "form-control"
        }
        id={name}
      />
      <ErrorMessage
        name={name}
        render={msg => <div className="invalid-feedback">{msg}</div>}
      />
    </div>
  );
};

export const SelectField = ({ field, options }) => {
  const { name, label } = field;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Field name={name} component="select" id={name} className="form-control">
        {/* Render options */}
        {Object.entries(options).map(([value, label]) => (
          <option value={value}>{label}</option>
        ))}
      </Field>
    </div>
  );
};

export const CheckboxField = ({ field, checked }) => {
  const { name, label } = field;
  return (
    <div className="custom-control custom-checkbox">
      <Field
        type="checkbox"
        name={name}
        checked={checked}
        className="custom-control-input"
        id={name}
      />
      <label className="custom-control-label" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};
