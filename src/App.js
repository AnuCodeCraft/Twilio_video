import React from "react";
import './App.css';
import dotenv from  'dotenv' ;

const { connect, createLocalTracks } = require('twilio-video');

dotenv.config()

function App() {
  
  const handleConnet =() =>{
  const token1 = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzQzOWMzZGUwOTc5OTFiOGFiNzE4ZTcyMmY1YjRmMGQwLTE2MjM5MjI5MDYiLCJpc3MiOiJTSzQzOWMzZGUwOTc5OTFiOGFiNzE4ZTcyMmY1YjRmMGQwIiwic3ViIjoiQUNhYzQ0MjZiODA3NmRiOWNjZTZjMjkyZmQzZjIwMjRjZiIsImV4cCI6MTYyMzkyNjUwNiwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiQW51cHJpeWEiLCJ2aWRlbyI6eyJyb29tIjoiNDU2NyJ9fX0.YUz_qNt0zlp7OTiDcW1T8GiV7WngNn6NJ-6ObYSyL6M"
  connect(token1 , { name:'4567' }).then(room => {
  console.log(`Successfully joined a Room: ${room}`);
  room.on('participantConnected', participant => {
    console.log(`A remote Participant connected: ${participant}`);
    participant.tracks.forEach(publication => {
      if (publication.isSubscribed) {
        const track = publication.track;
        document.getElementById('remote-media-div').appendChild(track.attach());
      }
    });
  
    participant.on('trackSubscribed', track => {
      document.getElementById('remote-media-div').appendChild(track.attach());
    });
    

  });
}, error => {
  console.error(`Unable to connect to Room: ${error.message}`); 
});
    
}

const handleJoin = ()=>{
  const token2 = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzQzOWMzZGUwOTc5OTFiOGFiNzE4ZTcyMmY1YjRmMGQwLTE2MjM5MjI5MDYiLCJpc3MiOiJTSzQzOWMzZGUwOTc5OTFiOGFiNzE4ZTcyMmY1YjRmMGQwIiwic3ViIjoiQUNhYzQ0MjZiODA3NmRiOWNjZTZjMjkyZmQzZjIwMjRjZiIsImV4cCI6MTYyMzkyNjUwNiwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiQW51cHJpeWEiLCJ2aWRlbyI6eyJyb29tIjoiNDU2NyJ9fX0.YUz_qNt0zlp7OTiDcW1T8GiV7WngNn6NJ-6ObYSyL6M"
  connect(token2 , { name: '4567' }).then(room => {
  console.log(`Successfully joined a Room: ${room}`);
  room.on('participantConnected', participant => {
  console.log(`A remote Participant connected: ${participant}`);
  
   
  createLocalTracks({
    audio: true,
    video: { width: 640 }
  }).then(localTracks => {
    return connect(token2, {
      name: '4567',
      tracks: localTracks
    });
  }).then(room => {
    console.log(`Connected to Room: ${room.name}`);
  });
  
  });
}, error => {
  console.error(`Unable to connect to Room: ${error.message}`);
});
  }

    
  
  return (
    
    <div className="app">
       <h1>Video call with  Twilio</h1>
       <div id="remote-media-div">Screen</div>
       <button onClick={handleConnet}>Connect</button>
      <button onClick={handleJoin}>Join Now</button>
        
    </div>
  );
}

export default App;
