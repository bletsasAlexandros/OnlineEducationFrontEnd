import React from "react";
import "./homepagecomp/homepage.css";

import { FaPhone, FaPhoneSlash } from "react-icons/fa";

class Ring extends React.Component {
  constructor(props) {
    super(props);
  }

  render(props) {
    return (
      <div className="popup">
        <div className="popup_inner ring">
          <button className="acceptButton" onClick={this.props.acceptCall}>
            <FaPhone size={32} />
          </button>
          <button className="declineButton" onClick={this.props.declineCall}>
            <FaPhoneSlash size={32} />
          </button>
        </div>
      </div>
    );
  }
}

export default Ring;
