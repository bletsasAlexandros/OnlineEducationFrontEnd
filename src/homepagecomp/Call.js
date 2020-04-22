import React, { Component } from "react";
import AgoraRTC from "agora-rtc-sdk";
import "./video.css";
let client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });

const USER_ID = Math.floor(Math.random() * 1000000001);
const APP_ID = "aed1787f4f1d41a0baf205dc0193f586";

export default class Call extends Component {
  localStream = AgoraRTC.createStream({
    streamID: USER_ID,
    audio: true,
    video: true,
    screen: false,
  });

  state = {
    remoteStreams: [],
    channel: this.props.channel,
    close: false,
  };

  componentDidMount() {
    this.initLocalStream();
    this.initClient();
    this.setState({ channel: this.props.channel }, () => {
      console.log(this.state.channel);
      this.joinChannel();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.close) {
      console.log("Stoping Video");
      this.localStream.close("agora_local");
    }
  }

  initLocalStream = () => {
    let me = this;
    me.localStream.init(
      function () {
        console.log("getUserMedia successfully");
        me.localStream.play("agora_local");
      },
      function (err) {
        console.log("getUserMedia failed", err);
      }
    );
  };

  initClient = () => {
    client.init(
      APP_ID,
      function () {
        console.log("AgoraRTC client initialized");
      },
      function (err) {
        console.log("AgoraRTC client init failed", err);
      }
    );
    this.subscribeToClient();
  };

  subscribeToClient = () => {
    let me = this;
    client.on("stream-added", me.onStreamAdded);
    client.on("stream-subscribed", me.onRemoteClientAdded);

    client.on("stream-removed", me.onStreamRemoved);

    client.on("peer-leave", me.onPeerLeave);
  };

  onStreamAdded = (evt) => {
    let me = this;
    let stream = evt.stream;
    console.log("New stream added: " + stream.getId());
    me.setState(
      {
        remoteStreams: {
          ...me.state.remoteStream,
          [stream.getId()]: stream,
        },
      },
      () => {
        // Subscribe after new remoteStreams state set to make sure
        // new stream dom el has been rendered for agora.io sdk to pick up
        client.subscribe(stream, function (err) {
          console.log("Subscribe stream failed", err);
        });
      }
    );
  };

  joinChannel = () => {
    let me = this;
    client.join(
      null,
      me.props.channel,
      USER_ID,
      function (uid) {
        console.log("User " + uid + " join channel successfully");
        client.publish(me.localStream, function (err) {
          console.log("Publish local stream error: " + err);
        });

        client.on("stream-published", function (evt) {
          console.log("Publish local stream successfully");
        });
      },
      function (err) {
        console.log("Join channel failed", err);
      }
    );
  };

  onRemoteClientAdded = (evt) => {
    let me = this;
    let remoteStream = evt.stream;
    me.state.remoteStreams[remoteStream.getId()].play(
      "agora_remote " + remoteStream.getId()
    );
  };

  onStreamRemoved = (evt) => {
    let me = this;
    let stream = evt.stream;
    if (stream) {
      let streamId = stream.getId();
      let { remoteStreams } = me.state;

      stream.stop();
      delete remoteStreams[streamId];

      me.setState({ remoteStreams });

      console.log("Remote stream is removed " + stream.getId());
    }
  };

  onPeerLeave = (evt) => {
    console.log("remove");
    let me = this;
    let stream = evt.stream;
    if (stream) {
      let streamId = stream.getId();
      let { remoteStreams } = me.state;

      stream.stop();
      delete remoteStreams[streamId];

      me.setState({ remoteStreams });

      console.log(evt.uid + " leaved from this channel");
    }
  };

  render() {
    return (
      <div className="videoPopUp">
        <div className="row">
          <div
            id="agora_local"
            style={{ width: "200px", height: "200px" }}
            className="cont column left"
          />
          <div className="column right">
            {Object.keys(this.state.remoteStreams).map((key) => {
              let stream = this.state.remoteStreams[key];
              let streamId = stream.getId();
              return (
                <div
                  key={streamId}
                  id={`agora_remote ${streamId}`}
                  style={{
                    width: "500px",
                    height: "500px",
                    backgroundColor: "red",
                    textAlign: "center",
                    float: "right",
                    right: "15%",
                  }}
                  className="cont"
                />
              );
            })}
            {/* <div
              style={{
                width: "500px",
                height: "500px",
                backgroundColor: "red",
                textAlign: "center",
                float: "right",
                right: "15%",
              }}
              className="cont"
            ></div> */}
          </div>
        </div>
      </div>
    );
  }
}
