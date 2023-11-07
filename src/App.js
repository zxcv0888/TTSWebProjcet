import React, { useState } from 'react';
import logo from './logo_ploonet.png';
import title from './bg_img_title.png';
import './App.css';

function App() {

  const [speed, setSpeed] = useState(1);

  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    setSpeed(newSpeed);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="underline"></div>
      </header>
      <body className="App-body">
        <img src={title} className='body-title' />
        <div className='body-select-box'>
        <select className='body-select-one'>
          <option value="option1">Korean</option>
       </select>
        <select className='body-select-two'>
          <option value="optionA">옵션 A</option>
          <option value="optionB">옵션 B</option>
          <option value="optionC">옵션 C</option>
      </select>
      <select className='body-select-three' value={speed} onChange={handleSpeedChange}>
        <option value={0.25}>0.25x</option>
        <option value={0.5}>0.5x</option>
        <option value={0.75}>0.75x</option>
        <option value={1}>1x</option>
        <option value={1.25}>1.25x</option>
        <option value={1.5}>1.5x</option>
        <option value={1.75}>1.75x</option>
        <option value={2}>2x</option>
      </select>
        </div>
        <div className='body-input-box'>
        <textarea className="body-input" placeholder="Please enter your details"></textarea>
        </div>
        <div className='body-btn-box'>
          <button className='body-btn'>generate audio</button>
        </div>
      </body>
    </div>

  );
}

export default App;
