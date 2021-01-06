import React from "react";
import "./codeshare.css";
import { Modal, Button } from "react-bootstrap";
import CodeEditor from '../CodeEditor/CodeEditor'
import "./styles.css";


class CodeShare extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.uniqueKey;
    this.state = {
      shareTxt: "",
      show: false,
      videoOn: false,
      editorLanguage:'javascript'
    };
    this.showModal = this.showModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.closeAndGoback = this.closeAndGoback.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.streamCamVideo = this.streamCamVideo.bind(this);
    this.stopVideo = this.stopVideo.bind(this);
    this.localStream = null;
  }

  streamCamVideo() {
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

  stopVideo() {
    const video = document.querySelector("video");

    video.pause();
    video.src = "";
    video.srcObject = null;
    video.style.display = "none";
    // As per new API stop all streams
    if (this.localStream)
      this.localStream.getTracks().forEach((track) => track.stop());
  }

  

  showModal() {
    this.setState({
      show: true,
    });
  }

  handleClose() {
    this.setState({
      show: false,
    });
  }

  closeAndGoback() {
    this.setState(
      {
        show: false,
      },
      () => {
        this.props.history.push("/");
      }
    );
  }

  copyToClipboard() {
    console.log(this.refs.input);
    this.refs.input.select();
    document.execCommand("copy");
  }

  render() {
    return (
      <div className="wrapper share-code">
        <div className="doc">
          <header>
            <div className="row">
              <div className="col-md-6 text-left">
                <h3>Online Code Share Room</h3>
              </div>
              <div className="col-md-6 text-right">
                <span>
                  <button className="btn btn-danger" onClick={this.showModal}>
                    End Session
                  </button>
                </span>
              </div>
            </div>
          </header>
          <div className="sub-header row">
            {" "}
            <div className="col-md-6 share-link">
              <span>
                <i class="fa fa-link" aria-hidden="true"></i>{" "}
                {/* <input
                  ref="input"
                  disabled
                  value={window.location.href}
                ></input> */}
                {window.location.href}
              </span>{" "}
              <span>
                <i
                  class="fa fa-files-o"
                  aria-hidden="true"
                  onClick={this.copyToClipboard}
                ></i>
              </span>
            </div>
            <div className="col-md-6 text-right">
              <svg height="20" width="20" className="blinking">
                <circle cx="5" cy="5" r="5" fill="lightgreen" />
                Sorry, your browser does not support inline SVG.
              </svg>{" "}
              You session is live
            </div>
          </div>
          <div id="video-container">
            <video autoPlay={true} id="videoElement" controls></video>
          </div>
          <div className="enable-video">
            {/* <img
              onClick={this.streamCamVideo}
              src={
                !this.state.videoOn
                  ? window.location.origin + "/assets/img/no-video.svg"
                  : window.location.origin + "/assets/img/video-camera.png"
              }
              alt="video"
            />  */}
            <i class="fa fa-video-camera" aria-hidden="true"></i>{" "}
            <b>{this.state.videoOn ? "ON" : "OFF"}</b>
          </div>

          
          <CodeEditor
            language={this.state.editorLanguage}
            id={this.id}
            
          />
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to end this session?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.closeAndGoback}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CodeShare;
