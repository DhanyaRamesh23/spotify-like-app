import Axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const login = (email, password) => {
  return Axios.post(SERVER_URL + "api/user/login", {
    email: email,
    password: password,
  })
    .then((res) => {
      if (res.status === 200) {
        localStorage.setItem("user", res.data.token);
        return true;
      } else return false;
    })
    .catch((err) => {
      if (err.response.status === 400) {
        window.alert("Wrong credentials");
      } else if (err.response.status === 404) {
        window.alert("Wrong email");
      }

      return false;
    });
};

const authHeader = () => {
  const token = localStorage.getItem("user");
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  } else {
    return null;
  }
};

const hasToken = () => {
  const token = localStorage.getItem("user");
  return token !== null;
};

const logout = () => {
  localStorage.removeItem("user");
};

export { login, authHeader, logout, hasToken };
