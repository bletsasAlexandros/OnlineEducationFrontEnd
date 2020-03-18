import React from "react";
import { GoMail } from "react-icons/go";
import "./homepage.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <div style={{ marginRight: "100px", marginLeft: "100px" }}>
        <h2>OnliEdu</h2>
        <h3 className="a">
          <GoMail size={32} />{" "}
        </h3>
        <Link to="/OnliEdu/studentProfile">
          <p style={{ color: "black" }}>My profile</p>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
