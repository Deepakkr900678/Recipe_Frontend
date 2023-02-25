import React, { useEffect } from "react";
import { useState } from "react";
import { HiOutlineUser } from "react-icons/hi";
import { AiFillCaretDown } from "react-icons/ai";
import Logout from "../Logout/Logout";
import "./Header.css";
import { Cookies } from "react-cookie";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Header = () => {
  const [show, setShow] = useState(false);
  const [userName_id, setUserName_id] = useState({});
  const cookies = new Cookies();
  const token = cookies.get("jwt");

  const [val, setVal] = useState("Search Your Recipe")
  const test = (e) => {
    console.log("Hello World", e.target.value)
    setVal(e.target.value)
  }

  useEffect(() => {
    console.log("Header useEffect");
    const getUserData = () => {
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
          setUserName_id({
            username: res.data.userData[0].username,
            id: res.data.userData[0]._id,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUserData();
  }, [token]);

  return (
    <div className="box">
      <div className="main_header">
        <div className="header_row">
          <HiOutlineUser className="user_icon" />{" "}
          <span className="user_name">{userName_id.username}</span>
          <AiFillCaretDown
            className="drop_down"
            onClick={() => {
              setShow(!show);
            }}
          />
          {show ? <Logout /> : null}
        </div>
      </div>
      <hr className="line"></hr>
      <div className="container">
        <h2>Recipe App</h2>
        <input type="text" value={val} onChange={test} className="input" />
        <button onClick={() => alert(val)} className="button">Click Me</button>

        <h4 className="header">All Recipes</h4>
        <div className="card_1">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" style={{ height: '200px' }} src="https://sallysbakingaddiction.com/wp-content/uploads/2013/05/classic-chocolate-chip-cookies.jpg" />
            <Card.Body>

              <Button variant="dark">Chocolate Chip Cookies</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="card_2">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" style={{ height: '200px' }} src="https://images.herzindagi.info/image/2021/Sep/chaii-samosa.jpg" />
            <Card.Body>

              <Button variant="dark">Samosa</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="card_3">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" style={{ height: '200px' }} src="https://images.herzindagi.info/image/2021/Sep/chicken-tikka-masala.jpg" />
            <Card.Body>

              <Button variant="dark">Chicken Tikka Masala</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="card_4">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" style={{ height: '200px' }} src="https://images.herzindagi.info/image/2021/Sep/Gulab-Jamun.jpg" />
            <Card.Body>

              <Button variant="dark">Gulab Jamun</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Header;
