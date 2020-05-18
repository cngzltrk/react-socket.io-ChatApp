import React, { Component } from "react";
import "../styles/App.css";
import "../styles/Login.css";
import ChatApp from "./ChatApp";
import ModalExample from './createRoom'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      roomname:"",
      submitted: false,
    };

    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
    this.roomnameSubmitHandler = this.roomnameSubmitHandler.bind(this);

  }

  usernameChangeHandler(event) {
    this.setState({ username: event.target.value });
  }
  usernameSubmitHandler(event) {
    event.preventDefault();
    this.setState({ submitted: true, username: this.state.username });
  }
  roomnameSubmitHandler(event) {
    this.setState({  roomname: event })
  }

  render() {
    if (this.state.submitted) {
      return <ChatApp username={this.state.username} roomname={this.state.roomname}/>;
    }

   

    return (
      <div className="container">
        <div id="app">
          <ModalExample onClickHandle={this.roomnameSubmitHandler}>

          </ModalExample>
          <form
            onSubmit={this.usernameSubmitHandler}
            className="username-container"
          >
            <h1>React Instant Chat - {this.state.username}</h1>
            <div>
              <input
                type="text"
                onChange={this.usernameChangeHandler}
                placeholder="Enter a username ..."
                required
              />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
