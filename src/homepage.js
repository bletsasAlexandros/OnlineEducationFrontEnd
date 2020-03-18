import React from "react";
import NavBar from "./homepagecomp/navbar";
import "./homepagecomp/homepage.css";
import LessonSelection from "./homepagecomp/lessonsSelect";
import "./homepagecomp/homepage.css";
import Online from "./homepagecomp/online";

/*This will be the main page*/

function HomePage() {
  return (
    <div>
      <NavBar />
      <br />
      <div style={{ marginRight: "100px", marginLeft: "100px" }}>
        <LessonSelection />

        <div className="content">
          <div className="homepage-style-main">
            <Online />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
