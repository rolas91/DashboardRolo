import React from "react";
import {
  CheckCircleTwoTone,
  ThunderboltTwoTone,
  DollarTwoTone,
} from "@ant-design/icons";
import "../style/home.css";
const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <div className="acti">
        <h2 style={{ margin: "auto" }}>Total Users :</h2>
        <span className="us">30 users registrados</span>
        <DollarTwoTone style={{ fontSize: 38 }} twoToneColor="#52c41a" />
      </div>
      <div className="acti">
        <h2 style={{ margin: "auto" }}>Users :</h2>
        <span className="us">5 activos</span>
        <CheckCircleTwoTone style={{ fontSize: 38 }} twoToneColor="#52c41a" />
      </div>
      <div className="acti">
        <h2 style={{ margin: "auto" }}>Users :</h2>
        <span className="us">10 disponibles</span>
        <ThunderboltTwoTone style={{ fontSize: 38 }} twoToneColor="blue" />
      </div>
    </div>
  );
};

export default Home;
