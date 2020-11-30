import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
const ChatBox = (props) => {
  const {mode, gameId, playerId, username, isalive, actualMinister, actualDirector } = props

  const SERVER_URL_WS = ""
  const CHAT = "/chat/"
  const CHAT_WS = "/chat_ws/{id}/{player_id}"

  if (mode === "chat-box") {
    return (
      <div class="chat-box" id="chat-box">
        <form action="" class="form-container">
          <h1>Chat {}</h1>
      
          <label for="msg"><b>Message</b></label>
          <div>
          </div>
          <textarea placeholder="Type message.." name="msg" required></textarea>
      
          <button type="submit" class="btn">Send</button>
          <button type="button" class="btn cancel" onclick="">Close</button>
        </form>
      </div>
    )
  } else if (mode === "from-back") {
    return (
      <div class="chat-box" id="chat-box">
        <h1>WebSocket Chat</h1>
        <h2>Your ID: <span id="ws-id"></span></h2>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>{
          `var player_id = playerId;
            document.querySelector("#ws-id").textContent = player_id;
            var ws = new WebSocket(ws://localhost:8000/chat` + gameId + "/" +  playerId + `);
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages');
                var message = document.createElement('li');
                var content = document.createTextNode(event.data);
                message.appendChild(content);
                messages.appendChild(message);
            }
          
            function sendMessage(event) {
              var input = document.getElementById("messageText");
              ws.send(input.value);
              input.value = '';
              event.preventDefault();
            }`}</script>
      </div>
    )
  } else {
    return (<></>)
  }
}

export default ChatBox;