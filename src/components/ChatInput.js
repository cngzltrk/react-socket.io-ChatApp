import React, { Component } from 'react'

 class ChatInput extends Component {
     constructor(props){
         super(props);
         this.state={
             chatInput:''
         }

         this.textChangeHandler = this.textChangeHandler.bind(this);
         this.submitHandler=this.submitHandler.bind(this);
     }

     submitHandler(event){
         event.preventDefault();

         this.props.onSend(this.state.chatInput);

         this.setState({ chatInput: '' });
     }
     textChangeHandler(event)  {
        this.setState({ chatInput: event.target.value });
      }
    render() {
        return (
            <div>
               <form className="chat-input" onSubmit={this.submitHandler}>
                   <input type="text"
                    onChange={this.textChangeHandler}
                    value={this.state.chatInput}
                    placeholder="Write a message..."
                    required/>
               </form>
            </div>
        )
    }
}


export default ChatInput;
