import React, { Component } from 'react'
import io from 'socket.io-client';

import Messages from './Messages'
import ChatInput from './ChatInput'
import '../styles/ChatApp.css'
 class ChatApp extends Component {
    socket={};
    constructor(props)
    {
        super(props);
        this.state={
            messages:[],
            endpoint: "http://localhost:5555"
        }
        this.sendHandler=this.sendHandler.bind(this);
        this.addMessage=this.addMessage.bind(this);

        this.socket = io(this.state.endpoint,{ query: `username=${props.username}` }).connect();
        
        this.socket.on('server:message', (message) =>{
            this.addMessage(message);
            });
        this.socket.emit('room:create',props.roomname);
        this.socket.on('server',(data)=>{
            console.log(data);
        });
        this.socket.on('server:room1',(data)=>{
            console.log(data);
        });
    }
    
    sendHandler(message){
        const messageObject = {
            username: this.props.username,
            roomname: this.props.roomname,
            message
          };
          // Emit the message to the server
          
        this.socket.emit('client:message', messageObject);

        messageObject.fromMe = true;
        this.addMessage(messageObject);
    }

    addMessage(message) {
        // Append the message to the component state
        const messages = this.state.messages;
        messages.push(message);
        this.setState({ messages });
    }
    render() {
        return (
            <div className="container">
                <h3>Chat App</h3>
                <Messages messages={this.state.messages}/>
                <ChatInput onSend={this.sendHandler} />

            </div>
        )
    }
}
ChatApp.defaultProps = {
    username: 'Anonymous'
};
  export default ChatApp;