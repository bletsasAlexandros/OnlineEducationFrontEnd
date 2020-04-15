import React from "react";
import "./homepage.css";
import { IoIosHome, IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from "./logo.png";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
    };
  }

  componentDidMount() {
    const userIdC = JSON.parse(localStorage.getItem("profileUser"));
    this.setState({
      token: userIdC._id,
    });
  }

  render() {
    return (
      <nav style={{ minHeight: "5vh", overflow: "auto" }}>
        <div style={{ display: "inline" }}>
          <Link
            to={{
              pathname: "/OnliEdu/homepage",
            }}
          >
            <div
              style={{
                height: "50px",
                width: "200px",
                position: "relative",
                marginLeft: "15%",
              }}
            >
              <img src={logo} />
            </div>
          </Link>
        </div>
      </nav>
    );
  }
}

export default NavBar;
