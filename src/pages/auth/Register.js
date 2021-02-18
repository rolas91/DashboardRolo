import React, { useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../style/Login.css";
import Login from "./Login";
import useToken from "../../hook/useToken";

export default function Register({ logs, setLogs }) {
  const { token, setToken } = useToken();
  const [completed, setCompleted] = useState(false);
  const [errortext, setErrortext] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      email: Yup.string().email("Invalid email format").required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Required!"),
    }),
    onSubmit: (values) => {
      const { username, email, password } = values;
      console.log(JSON.stringify(values, null, 2));
      fetch("https://api-senior-care.herokuapp.com/api/v1/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((resultado) => {
          console.log("reultado del json", resultado);
          if (resultado.message === 404) {
            Swal.fire({
              icon: "error",
              title: "Not found",
              text: "Server error",
            });
          }
          setCompleted(true);
          if (!completed) {
            Swal.fire({
              icon: "success",
              title: "Registro completo...",
              text: "Registro en la tabla",
            });
          }
          setLogs(false);
          console.log(logs);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  if (logs === false) {
    return <Login setToken={setToken} />;
  }
  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div
          style={{
            width: "500px",
            justifyContent: "center",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Registro</h1>
          <div style={{ width: "800px" }}>
            <div className="form2">
              <label className="form-label2">User</label>
              <input
                className="form-input2"
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              {formik.errors.full_name && formik.touched.full_name && (
                <p>{formik.errors.full_name}</p>
              )}
            </div>
            <div className="form2">
              <label className="form-label2">Email</label>
              <input
                className="form-input2"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <p>{formik.errors.email}</p>
              )}
            </div>
            <div className="form2">
              <label className="form-label2">Password</label>
              <input
                className="form-input2"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && (
                <p>{formik.errors.password}</p>
              )}
            </div>
            <div className="form2">
              <label className="form-label2">Confirm Password</label>
              <input
                className="form-input2"
                type="password"
                name="confirm_password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
              />
              {formik.errors.confirm_password &&
                formik.touched.confirm_password && (
                  <p>{formik.errors.confirm_password}</p>
                )}
            </div>
            <div>
              {!errortext ? null : (
                <h2 style={{ color: "red" }}>{errortext}</h2>
              )}
            </div>
            <div>
              <button className="btn2" type="submit">
                Registrarme
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
