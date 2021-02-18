import React, { useState, useRef, useEffect } from "react";
import FilteredGrid from "../components/Filtergrid";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../style/form.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export default function Register() {
  const [rows, setRows] = useState();
  const [columns, setColumns] = useState();
  const [completed, setCompleted] = useState(false);
  const grid = useRef();
  const [errortext, setErrortext] = useState("");

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      address: "",
      schedule: "",
      startDate: "",
      days: "",
      payDertail: "",
      experience: "",
      lat: "",
      lng: "",
      jobStatusId: "",
      state: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().min(3, "Mininum 3 characters").required("Required!"),
      description: Yup.string()
        .required("Required!")
        .min(10, "Minimo 10 caracteres"),
      address: Yup.string()
        .min(5, "Minimum 8 characters")
        .required("Required!"),
      schedule: Yup.string()
        .min(10, "Mininum 10 characters")
        .required("Required!"),
      startDate: Yup.string()
        .min(2, "Mininum 2 characters")
        .required("Requiered!"),
      days: Yup.string().min(1, "Mininum 1 characters").required("Requiered"),
      payDertail: Yup.string()
        .min(2, "Mininum 2 characters")
        .required("Requiered"),
      experience: Yup.string()
        .min(3, "Mininum 3 characters")
        .required("Requiered"),
      lat: Yup.string().required("Requiered"),
      lng: Yup.string().required("Requiered"),
      jobStatusId: Yup.number().positive().required("Requiered"),
      state: Yup.number().positive().required("Requiered"),
    }),
    onSubmit: async (values) => {
      //   console.log(values);
      const {
        title,
        description,
        address,
        schedule,
        startDate,
        days,
        payDertail,
        experience,
        lat,
        lng,
        jobStatusId,
        state,
      } = values;
      //   const info = JSON.stringify(values, null, 2);
      const final = [];
      const res = await fetch(
        "https://api-senior-care.herokuapp.com/api/v1/job/register",
        {
          method: "POST",
          body: JSON.stringify({
            title: title,
            description: description,
            address: address,
            schedule: schedule,
            startDate: startDate,
            days: days,
            payDertail: payDertail,
            experience: experience,
            lat: lat,
            lng: lng,
            jobStatusId: jobStatusId,
            state: state,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //////////////////////////////////////////////////////////////////////////////////
      // falta poner el estado activo y desactivo => state ? "Activo" : "Desactivado"
      //////////////////////////////////////////////////////////////////////////////////
      const val = await res.json();
      final.push(val.data);
      console.log(val);
      setCompleted(true);
      setRows((prevState) => {
        return [
          ...prevState,
          { ...val.data, state: state ? "Activo" : "Desactivo" },
        ];
      });

      !completed &&
        Swal.fire({
          icon: "success",
          title: "Registro completo...",
          text: "Registro en la tabla",
        });
    },
  });

  // all job consulta
  const fetchJobs = async () => {
    const finalarrray = [];
    const data = await JSON.parse(localStorage.getItem("token"));
    console.log(data);
    const res = await fetch(
      "https://api-senior-care.herokuapp.com/api/v1/job/getJobs",
      {
        headers: { token: `${data?.token}` },
      }
    );
    const valor = await res.json();
    console.log("El valor esta aqui mamon=>", valor);
    finalarrray.push(valor.data);
    const newRow = valor.result.map((item) => ({
      ...item,
      state: item.state ? "Activo" : "Desactivo",
    }));
    setRows(newRow);
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  //columnas
  useEffect(() => {
    setColumns([
      {
        title: "Title",
        dataIndex: "title",
        key: "1",
        fixed: "left",
        width: 200,
        ...grid.current.getColumnSearch("title"),
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "2",
        width: 200,
        ...grid.current.getColumnSearch("description"),
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "3",
        width: 200,
        ...grid.current.getColumnSearch("address"),
      },
      {
        title: "Schedule",
        dataIndex: "schedule",
        key: "4",
        width: 200,
        ...grid.current.getColumnSearch("schedule"),
      },
      {
        title: "StartDate",
        dataIndex: "startDate",
        key: "5",
        width: 200,
        ...grid.current.getColumnSearch("startDate"),
      },
      {
        title: "Days",
        dataIndex: "days",
        key: "6",
        width: 50,
        ...grid.current.getColumnSearch("days"),
      },
      {
        title: "Pay Detail",
        dataIndex: "payDertail",
        key: "7",
        width: 50,

        ...grid.current.getColumnSearch("payDertail"),
      },
      {
        title: "Experience",
        dataIndex: "experience",
        key: "8",
        width: 50,

        ...grid.current.getColumnSearch("experience"),
      },
      {
        title: "Lat",
        dataIndex: "lat",
        key: "9",
        width: 50,

        ...grid.current.getColumnSearch("lat"),
      },
      {
        title: "Long",
        dataIndex: "lng",
        key: "9",
        width: 50,

        ...grid.current.getColumnSearch("lng"),
      },
      {
        title: "Id del trabajo",
        dataIndex: "jobStatusId",
        key: "9",
        width: 50,

        ...grid.current.getColumnSearch("jobStatusId"),
      },
      {
        title: "Estado",
        dataIndex: "state",
        key: "9",
        width: 100,

        ...grid.current.getColumnSearch("state"),
      },
    ]);
  }, []);
  return (
    <div className="App">
      <h1>Nuevo trabajo</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="form-content">
          <div className="form">
            <label className="form-label">Titulo:</label>
            <input
              className="form-input"
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.errors.title && formik.touched.title && (
              <p style={{ color: "red" }}>{formik.errors.title}</p>
            )}
          </div>
          <div className="form">
            <label className="form-label">Description:</label>
            <input
              className="form-input"
              type="text"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            {formik.errors.description && formik.touched.description && (
              <p style={{ color: "red" }}>{formik.errors.description}</p>
            )}
          </div>
          <div className="form">
            <label className="form-label">Address:</label>
            <input
              className="form-input"
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            {formik.errors.address && formik.touched.address && (
              <p style={{ color: "red" }}>{formik.errors.address}</p>
            )}
          </div>
          <div className="form">
            <label className="form-label">Calendario:</label>
            <input
              className="form-input"
              type="text"
              name="schedule"
              value={formik.values.schedule}
              onChange={formik.handleChange}
            />
            {formik.errors.schedule && formik.touched.schedule && (
              <p style={{ color: "red" }}>{formik.errors.schedule}</p>
            )}
          </div>
        </div>
        <div className="form-content">
          <div className="form">
            <label className="form-label">Dia de inicio</label>
            <input
              style={{ paddingLeft: 10, paddingRight: 10 }}
              type="date"
              min="2020-01-01"
              max="2023-01-01"
              name="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange}
            />
            {formik.errors.startDate && formik.touched.startDate && (
              <p style={{ color: "red" }}>{formik.errors.startDate}</p>
            )}
          </div>
          <div className="form">
            <label className="form-label">Dias</label>
            <input
              className="form-input"
              type="text"
              name="days"
              value={formik.values.days}
              onChange={formik.handleChange}
            />
            {formik.errors.days && formik.touched.days && (
              <p style={{ color: "red" }}>{formik.errors.days}</p>
            )}
          </div>
          <div className="form">
            <label className="form-label">Detalle de pago</label>
            <input
              className="form-input"
              type="text"
              name="payDertail"
              value={formik.values.payDertail}
              onChange={formik.handleChange}
            />
            {formik.errors.payDertail && formik.touched.payDertail && (
              <p style={{ color: "red" }}>{formik.errors.payDertail}</p>
            )}
          </div>
          <div className="form">
            <label className="form-label">Experiencia</label>
            <input
              className="form-input"
              type="text"
              name="experience"
              value={formik.values.experience}
              onChange={formik.handleChange}
            />
            {formik.errors.experience && formik.touched.experience && (
              <p style={{ color: "red" }}>{formik.errors.experience}</p>
            )}
          </div>
        </div>
        <div className="form-content">
          <div className="form">
            <label className="form-label">Latitud</label>
            <input
              className="form-input"
              type="text"
              name="lat"
              value={formik.values.lat}
              onChange={formik.handleChange}
            />
            {formik.errors.lat && formik.touched.lat && (
              <p style={{ color: "red" }}>{formik.errors.lat}</p>
            )}
          </div>
          <div className="form">
            <label className="form-label">Longitud</label>
            <input
              className="form-input"
              type="text"
              name="lng"
              value={formik.values.lng}
              onChange={formik.handleChange}
            />
            {formik.errors.lng && formik.touched.lng && (
              <p style={{ color: "red" }}>{formik.errors.lng}</p>
            )}
          </div>
          <div className="form">
            <label className="form-label">Id del estado del trabajo</label>
            <input
              className="form-input"
              type="number"
              name="jobStatusId"
              value={formik.values.jobStatusId}
              onChange={formik.handleChange}
            />
            {formik.errors.jobStatusId && formik.touched.jobStatusId && (
              <p style={{ color: "red" }}>{formik.errors.jobStatusId}</p>
            )}
          </div>
          <div className="form">
            <label className="form-label">Estado</label>
            <input
              className="form-input"
              type="number"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
            />
            {formik.errors.state && formik.touched.state && (
              <p style={{ color: "red" }}>{formik.errors.state}</p>
            )}
          </div>
        </div>

        <div>
          {!errortext ? null : <h2 style={{ color: "red" }}>{errortext}</h2>}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px",
          }}
        >
          <button className="btn" type="submit">
            Registrar Trabajo
          </button>
        </div>
      </form>
      <div>
        <FilteredGrid ref={grid} columns={columns} rows={rows} />
      </div>
    </div>
  );
}
