import React, { useState } from 'react';
import './App.css';
import $ from 'jquery';
import sendlogo from './sendlogo.png';



function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  

  const handleSubmit = (e) => {
    getResponse();
    e.preventDefault();
    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.message);
        console.log(data.message);
        getHardResponse(data.message);
        setMessage('');
      });
  };
  function getHardResponse(responseText) {
    //let botResponse = $({response}).val();
    let botHtml = '<p class="botText"><span>' + responseText +'</span></p>';
  $("#chatbox").append(botHtml);
  document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

//Gets the text text from the input box and processes it
function getResponse() {
    let userText = $("#textInput").val();
    if (userText != '') {
      let userHtml = '<p class="userText"><span>' + userText + '</span></p>';
      $("#textInput").val("");
      $("#chatbox").append(userHtml);
      document.getElementById("chat-bar-bottom").scrollIntoView(true);
    }
}



  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello world</h1>
        <img src={sendlogo} alt="Logo" />
      </header>
      <div className="chat-bar-collapsible">
        <button id="chat-button" type="button" className="collapsible">Chat with ChatBot! 
          
          </button>
        <div className="content">
            <div className="full-chat-block"> 
              <div className="outer-container">
                <div className="chat-container">
                  <div id="chatbox">
                    <p className="botText"><span>Hello</span></p>
                  </div>
                  <div className="chat-bar-input-block">
                    <form onSubmit={handleSubmit}>
                      <div id="userInput">
                        
                        <input id="textInput" className="input-box" type="text" name="msg" placeholder='type here'
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)}
                        ></input>
                        
                      </div>
                      <button type="submit" className="submit-button"><img src={sendlogo} alt="Logo" className='send-logo' /></button> 
                    </form>
                  </div>
                  
                  <div id="chat-bar-bottom">
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      
    </div>

  );
}

export default App
