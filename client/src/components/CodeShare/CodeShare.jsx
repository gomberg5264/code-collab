import React from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import CodeEditor from "../CodeEditor/CodeEditor";
import DragContainer from "../DraggableContainer/DragContainer";

import "./codeshare.css";
import "./styles.css";
import "./prism.css";

class CodeShare extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.uniqueKey;
    this.state = {
      shareTxt: "",
      show: false,
      videoOn: false,
      editorLanguage: "javascript",
      mute: false,
      loader: true,
    };
    this.showModal = this.showModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.closeAndGoback = this.closeAndGoback.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.localStream = null;
    this.showRegenation()
  }

  showRegenation() {
    setTimeout(() => {
      this.setState({
        loader: false,
      });
    }, 3000);
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
      <>
        {this.state.loader ? (
          <div className="loading-screen">
            <h1>Getting Things Ready</h1>
            <h5>Establishing connection with the server</h5>
            <br></br>
            <div className="loader"></div>
          </div>
        ) : (
          <div className="wrapper share-code">
            <div className="doc">
              <header>
                <div className="row">
                  <div className="col-md-6 text-left">
                    <h3>Online Code Share Room</h3>
                  </div>
                  <div className="col-md-6 text-right">
                    <span>
                      <button
                        className="btn btn-danger"
                        onClick={this.showModal}
                      >
                        End Session
                      </button>
                    </span>
                  </div>
                </div>
              </header>
              <br></br>

              <Row>
                <Col md="4">
                  <Form>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                      <Form.Label column sm="4">
                        Select Language
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          as="select"
                          defaultValue="javascript"
                          onChange={(e) =>
                            this.setState({ editorLanguage: e.target.value })
                          }
                        >
                          <option value="javascript" selected>
                            JavaScript
                          </option>
                          <option value="nodejs" selected>
                            Node JS
                          </option>
                          <option value="css" selected>
                            CSS
                          </option>
                        </Form.Control>
                      </Col>
                    </Form.Group>
                  </Form>
                </Col>
                <Col md="8" className="text-right">
                  <span className="enable-video">
                    <i class="fa fa-download fa-lg" aria-hidden="true"></i>{" "}
                    <i
                      className={`fa ${
                        this.state.mute
                          ? "fa-microphone-slash"
                          : "fa-microphone"
                      } fa-lg`}
                      aria-hidden="true"
                      onClick={() => this.setState({ mute: !this.state.mute })}
                    ></i>
                    <DragContainer />
                  </span>
                </Col>
              </Row>

              <CodeEditor language={this.state.editorLanguage} id={this.id} />
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
        )}
      </>
    );
  }
}

export default CodeShare;
