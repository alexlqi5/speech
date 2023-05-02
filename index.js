import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './HelloWorld';

function App() {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');

      setTranscript(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  const handleToggleListen = () => {
    setIsListening(!isListening);
  };

  return (
    <div>
      <button onClick={handleToggleListen}>
        {isListening ? 'Stop' : 'Start'} Listening
      </button>
      <p>{transcript}</p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));

