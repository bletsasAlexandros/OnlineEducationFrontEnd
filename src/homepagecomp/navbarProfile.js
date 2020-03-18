import React from "react";
import "./homepage.css";
import { IoIosHome, IoIosMail, IoIosSettings } from "react-icons/io";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav style={{ minHeight: "5vh", overflow: "auto" }}>
      <div style={{ display: "inline" }}>
        <Link to="/OnliEdu/homepage">
          <IoIosHome
            size={28}
            style={{ verticalAlign: "inherit", color: "black" }}
          />
        </Link>
        <h2 style={{ display: "inline", top: "10px" }}>OnliEdu</h2>
      </div>

      <div className="navbarIcons">
        <IoIosMail size={32} />
        <br />
      </div>
    </nav>
  );
}

export default NavBar;
