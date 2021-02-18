import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import "../../style/Login.css";
import Register from "./Register";
const url = "https://api-senior-care.herokuapp.com/api/v1/auth/login";
async function loginUser(credentials) {
  // console.log(credentials);
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
}

export default function Login({ setToken }) {
  const [logs, setLogs] = useState(false);
  const handleSubmit = async (values) => {
    const { email, password } = values;
    // console.log(values);
    const token = await loginUser({
      email,
      password,
    });
    const res = await token.json();
    setToken(res);
    // console.log(res);
  };

  if (logs) {
    return <Register logs={logs} setLogs={setLogs} />;
  }

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          background: "#fff",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "20px",
          padding: "10px",
          flexDirection: "column",
        }}
      >
        <h1 style={{ fontWeight: "bold", color: "#000" }}>Login</h1>
        <Form
          name="normal_login"
          className="login-form"
          onFinish={handleSubmit}
          // onSubmitCapture={handleSubmit}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                background: "green",
                borderRadius: "20px",
                marginRight: "10px",
                marginLeft: "10px",
                color: "#fff",
              }}
              type="prymary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or{" "}
            <Button
              onClick={() => {
                setLogs(!logs);
                console.log(logs);
              }}
            >
              Sing in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
