import React, { useState, useCallback, useEffect } from "react";

const User = () => {
  const [values, setValues] = useState([]);
  const fetchData = useCallback(async () => {
    const finalarrray = [];
    const data = await JSON.parse(localStorage.getItem("token"));
    console.log(data);
    const res = await fetch(
      "https://api-senior-care.herokuapp.com/api/v1/user/user-info",
      {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          token: `${data?.token}`,
        },
      }
    );
    const valor = await res.json();
    finalarrray.push(valor);
    setValues(finalarrray);
  }, []);
  useEffect(() => {
    console.log(values);
    fetchData();
  }, [fetchData]);
  return (
    <div>
      {values?.map((item, i) => {
        return (
          <div key={i}>
            <span>{item.firstname}</span>
          </div>
        );
      })}
    </div>
  );
};

export default User;
