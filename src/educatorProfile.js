import React from "react";
import "./profiles.css";
import NavBar from "./homepagecomp/navbarProfile";

class educatorProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      description: "Submit your review"
    };
  }
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-md-6 img">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvzOpl3-kqfNbPcA_u_qEZcSuvu5Je4Ce_FkTMMjxhB-J1wWin-Q"
                alt=""
                class="img-rounded"
              />
            </div>
            <div className="col-md-6 details">
              <blockquote>
                <h5>First and Last Name</h5>
                <small>
                  <cite title="Source Title">
                    Home <i className="icon-map-marker"></i>
                  </cite>
                </small>
              </blockquote>
              <p>
                email <br />
                birthday
              </p>
            </div>
          </div>
        </div>
        <div className="sectionStyle">
          <div className="row">
            <div className="col-md sector">Notes</div>
          </div>
          <div className="row">
            <div className="col-md sector">Reviews</div>
          </div>
          <div className="row">
            <div className="col-md sector">
              <form>
                <textarea
                  style={{ margin: "10px", width: "80%", outline: "none" }}
                  placeholder={this.state.description}
                />
                <button
                  type="submit"
                  name="Submit"
                  value="Submit"
                  style={{
                    margin: "10px",
                    width: "130px",
                    height: "40px",
                    borderRadius: "4px",
                    float: "right"
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default educatorProfile;
