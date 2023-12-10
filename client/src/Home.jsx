import React, { useState } from 'react';
import './Home.css'; // Import your CSS file for styling

function Home() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('en');
  const [translatedText, setTranslatedText] = useState('');

  const startMike = () => {
    // Add functionality for starting the microphone
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const translateText = () => {
    // Send the text and language to the backend
    fetch('http://localhost:5173/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, language }),
    })
      .then((response) => response.json())
      .then((data) => setTranslatedText(data.translatedText))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="full-screen">
      <h1 className="center-heading">Advisions Translation Tool</h1>
      <div className="home-container">
        <div className="text-area-container">
          <div className="textarea-group">
            <h3>Source Text:</h3>
            <textarea
              className="source-text"
              rows="13"
              cols="80"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter source text..."
            />
          </div>
          <div className="textarea-group">
            <h3>Translated Text:</h3>
            <textarea
              className="translated-text"
              rows="13"
              cols="80"
              readOnly
              value={translatedText}
              placeholder="Translation will appear here..."
            />
          </div>
        </div>
        <div className="controls-container">
          <div className="mic-button">
            <button onClick={startMike}>Start Mic</button>
          </div>
          <div className="translation-controls">
            <label>
              Select Language:
              <select
                className="language-select"
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="en">English</option>
                <option value="ru">Russian</option>
                <option value="fr">French</option>
                <option value="hi">Hindi</option>
              </select>
            </label>
            <button className="translate-button" onClick={translateText}>
              Translate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
