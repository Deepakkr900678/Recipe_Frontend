import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";
import Header from "../header_sidebar/Header";

const Property = () => {
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get("jwt");
  let navigate = useNavigate();

  useEffect(() => {
    const afterLogin = () => {
      console.log("Inside afterLogin function property.js useEffect");
      axios({
        method: "get",
        url: "https://recipe-backend-n2b6.onrender.com/property",
        headers: {
          Accept: "application/json",
          authorization: token,
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          console.log("Inside then block of property.js");
          setUsers(res.data.property);
        })
        .catch((err) => {
          console.log("Inside catch block of property.js");
          console.log(err);

          if (
            err.response.data === "Unauthorized user" ||
            err.response.status === 409
          ) {
            navigate("/login");
          }
        });
    };

    afterLogin();
  }, [token, navigate, value]);

  return (
    <>
      <Header />
    </>
  );
};

export default Property;
