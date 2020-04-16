import React from "react";
import axios from "axios";
import StarRatingComponent from "react-star-rating-component";

class reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.id,
      profReviews: [],
      done: false,
    };
  }

  async componentWillMount(props) {
    console.log(this.props.id);
    await axios
      .get("http://localhost:5000/users/getreviews/id", {
        params: {
          id: this.props.id,
        },
      })
      .then((res) => {
        console.log("hi");
        for (var i = 0; i < res.data.length; i++) {
          this.setState((prevState) => ({
            profReviews: [...prevState.profReviews, res.data[i]],
          }));
        }
        localStorage.setItem(
          "profReviews",
          JSON.stringify(this.state.profReviews)
        );
      })
      .then(() => {
        this.setState({ done: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  reviews = () => {
    var rev = JSON.parse(localStorage.getItem("profReviews"));
    if (rev.length > 0) {
      var a = [];
      var i;
      for (i = 0; i < rev.length; i++) {
        a.push(
          <div
            className="container"
            key={i}
            style={{
              paddingTop: "15px",
              paddingBottom: "15px",
              fontWeight: "normal",
              margin: "5px",
              padding: "0",
            }}
          >
            {rev[i].review}{" "}
            <StarRatingComponent
              name={i.toString()}
              value={parseInt(rev[i].stars, 10)}
              style={{ right: "0px" }}
            />
          </div>
        );
      }
      return <div>{a}</div>;
    } else {
      return null;
    }
  };

  render() {
    return <div>{this.state.done ? this.reviews() : <p>Loading...</p>}</div>;
  }
}

export default reviews;
