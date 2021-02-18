import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    if (tokenString) {
      const userToken = JSON.parse(tokenString);
      return userToken?.token;
    }
    return null;
  };

  const [token, setToken] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem("token");
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  });

  const saveToken = (userToken) => {
    // console.log(userToken);
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken?.token);
  };

  const deleteToken = () => {
    // console.log(userToken);
    window.localStorage.removeItem("token", "");
    setToken(null);
  };

  return {
    updateToken: deleteToken,
    setToken: saveToken,
    token,
  };
}
