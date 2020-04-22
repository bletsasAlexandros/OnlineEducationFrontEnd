import React from "react";
import ChannelForm from "./ChannelForm";
import Call from "./Call";

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: "",
    };
  }

  selectChannel = (channel) => {
    this.setState({ channel });
  };

  render() {
    return (
      <div className="App">
        <ChannelForm selectChannel={this.selectChannel} />
        <Call channel={this.state.channel} />
      </div>
    );
  }
}

export default Video;
