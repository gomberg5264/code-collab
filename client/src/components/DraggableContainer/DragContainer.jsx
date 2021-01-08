import React, { Component } from "react";

export default class DragContainer extends Component {
  constructor() {
    super();
    this.state = {
      videoOn: false,
    };
    this.dragElement = this.dragElement.bind(this);
    this.streamCamVideo = this.streamCamVideo.bind(this);
    this.stopVideo = this.stopVideo.bind(this);
  }

  componentDidMount() {
    this.dragElement(document.getElementById("video-container"));
  }

  dragElement = (elmnt) => {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
  };

  streamCamVideo = () => {
    this.setState(
      {
        videoOn: !this.state.videoOn,
      },
      () => {
        console.log(this.state.videoOn);
        var constraints = { audio: true, video: { width: 300, height: 200 } };
        const video = document.querySelector("video");
        if (this.state.videoOn) {
          video.style.display = "block";
          //Start Web Came
          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            //use WebCam
            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
              this.localStream = stream;
              video.srcObject = stream;
              video.play();
            });
          }
        } else {
          this.stopVideo();
        }
      }
    );
  }

  stopVideo = () => {
    const video = document.querySelector("video");

    video.pause();
    video.src = "";
    video.srcObject = null;
    video.style.display = "none";
    // As per new API stop all streams
    if (this.localStream)
      this.localStream.getTracks().forEach((track) => track.stop());
  }

  render() {
    return (
      <>
        <div id="video-container" draggable="true">
          <video autoPlay={true} id="videoElement" controls></video>
        </div>
        <i
          class="fa fa-video-camera fa-lg"
          aria-hidden="true"
          onClick={this.streamCamVideo}
        ></i>{" "}
        <b>{this.state.videoOn ? "ON" : "OFF"}</b>
      </>
    );
  }
}
