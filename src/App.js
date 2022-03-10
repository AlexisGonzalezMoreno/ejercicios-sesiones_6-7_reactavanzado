import React from 'react';
import './App.css';
import { withServiceWorkerUpdater } from '@3m1/service-worker-updater';

function App() {

  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");

  function displayNotification() {
    
  }

  const sendMessage = () => {
    if (Notification.permission == 'granted') {
      try {
        new Notification(title, { body: message});
    } catch (e) {
        if (e.name == 'TypeError')
            return false;
    }
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" value={ title } onChange={e => setTitle(e.target.value)} placeholder="Introduce un título" />
        <input type="text" value={ message } onChange={e => setMessage(e.target.value)} placeholder="Introduce un mensaje" />
        <button onClick={ sendMessage }>Enviar</button>
      </header>
    </div>
  );
}

export default App;
