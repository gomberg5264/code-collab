import React, { Component } from "react";
import Prism from "prismjs";
import { DebounceInput } from "react-debounce-input";
import DataCallApi from "../../utils/api.js";
import { PUSHER_CLUSTER, PUSHER_KEY } from "../../utils/constants";
import Pusher from "pusher-js";


class CodeEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: this.props.content
    };
    this.triggerChange = this.triggerChange.bind(this);
    this.send = this.send.bind(this);
  }

  handleKeyDown = (evt) => {
    let value = this.state.content,
      selStartPos = evt.currentTarget.selectionStart;

    // handle 4-space indent on
    if (evt.key === "Tab") {
      value =
        value.substring(0, selStartPos) +
        "    " +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();

      this.setState({
        content: value,
      });
    }
  };

  componentDidMount() {
    Prism.highlightAll();
    const pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe(this.props.id);

    channel.bind("client-message", (html) => {
      this.setState({
        content: html,
      });
    });
  }

  componentDidUpdate(){
    if(this.state.content){
      Prism.highlightAll();
    }
  }

  triggerChange = (event) => {
    debugger;
    this.setState(
      {
        content: event.target.value,
      },
      () => {
        this.send();
      }
    );
  };

  send() {
    const payload = {
      message: this.state.content,
      uniqueId: this.props.id,
    };
    DataCallApi.pusherMessage(payload).then((response) => {
      console.log(response);
    });
  }

  render() {
    return (
      <div className="code-edit-container">
        <DebounceInput
          element="textarea"
          minLength={2}
          className="code-input"
          value={this.state.content}
          debounceTimeout={300}
          onChange={this.triggerChange}
          placeholder="Start Typing...."
        />
        <pre className="code-output">
          <code className={`language-${this.props.language}`}>{this.state.content}</code>
        </pre>
      </div>
    );
  }
}

export default CodeEditor;
