import React from "react";
import ReactDOM from "react-dom";
import { TextField, SelectField, CheckboxField } from "./fields";
import { withFormik, Form } from "formik";
import * as Yup from "yup";

import "./styles.css";

let FormikApp = ({ values, errors, touched, isSubmitting, isValid, dirty }) => {
  return (
    <Form className="container mt-3">
      <TextField
        field={{
          name: "username",
          type: "text",
          placeholder: "Nick",
          label: "Username"
        }}
        form={{ errors, touched }}
      />

      {/* Email */}
      <TextField
        field={{
          name: "email",
          type: "email",
          placeholder: "email@example.com",
          label: "Email"
        }}
        form={{ errors, touched }}
      />

      {/* Password */}
      <TextField
        field={{
          name: "password",
          type: "password",
          placeholder: "qwerty123",
          label: "Password"
        }}
        form={{ errors, touched }}
      />

      {/* Select */}
      <SelectField
        field={{ name: "plan", label: "Plan" }}
        options={{ free: "Free", premium: "Premium" }}
      />

      {/* Checkbox */}
      <CheckboxField
        field={{ name: "check", label: "Checkbox" }}
        checked={values.check}
      />

      <br />

      {/* Buttons */}
      <div>
        <button
          disabled={isSubmitting || !isValid}
          className="btn btn-primary mr-3"
          type="submit"
        >
          Submit
        </button>

        <button
          disabled={isSubmitting || !dirty}
          className="btn btn-secondary"
          type="reset"
        >
          Reset
        </button>
      </div>
    </Form>
  );
};

// Wrap our form to Formik HOC
FormikApp = withFormik({
  // Initial form values
  mapPropsToValues({ username, email, password, check, plan }) {
    return {
      username: username || "",
      email: email || "",
      password: password || "",
      check: check || false,
      plan: plan || "free"
    };
  },
  // Simulate async request with server validation
  handleSubmit(values, actions) {
    setTimeout(() => {
      if (values.email === "kryaxtun@gmail.com") {
        actions.setErrors({
          email: "Этот адрес уже используется",
          username: "Имя занято"
        });
      } else {
        alert(JSON.stringify(values, null, 2));
        actions.resetForm();
      }
      actions.setSubmitting(false);
    }, 1000);
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .min(3, "Имя должно содержать не менее 3 символов")
      .required("Обязательное поле"),
    email: Yup.string()
      .email("Введите корректный адрес")
      .required("Обязательное поле"),
    password: Yup.string()
      .min(6, "Пароль должен содержать не менее 6 символов")
      .required("Обязательное поле"),
    check: Yup.bool().oneOf([true], "Поле должно быть активным")
  })
})(FormikApp);

const rootElement = document.getElementById("root");
ReactDOM.render(<FormikApp />, rootElement);
