import React, { useState } from 'react';

import logo from './logo_ploonet.png';
import title from './bg_img_title.png';
import './App.css';

function App() {

  const master_key = 'TTS webpage';
  const call_id = 'none';
  const [text, setText] = useState('');
  const [sid, setSid] = useState(0);
  const [tempo, setTempo] = useState(1);
  const sample_rate = '22k';

  const [tts, setTTS] = useState(false);
  const [audioValue, setAudioValue] = useState(null);
  
  const createTTS = () => {
    const query = 'text=${text}&master_ket=${master_key}&call_id=${call_id}&sid=${sid}&tempo=${tempo}&sample_rate=${sample_rate}';

    fetch('http://192.168.220.224:26000/ttsstream?' + query, {method: 'GET', mode: 'cors'})
    .then((response) => response.blob())
    .then((data) => {
      const reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onloadend = function() {
        const base64data = reader.result;

        setAudioValue(base64data.replace('data:audio/wav;base64,',''));
      };
      setTTS(true);
    });
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
        <select className='body-select-two' value={sid} onChange={(e) => setSid(parseInt(e.target.value))}>
          <option value={0}>옵션 A</option>
          <option value={1}>옵션 B</option>
          <option value={2}>옵션 C</option>
      </select>
      <select className='body-select-three' value={tempo} onChange={(e) => setTempo(parseFloat(e.target.value))}>
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
        <textarea 
          className="body-input" 
          placeholder="Please enter your details" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          >
        </textarea>
        </div>
        <div className='body-btn-box'>
          <button className='body-btn' onClick={createTTS}>generate audio</button>
          {tts && audioValue && (
            <audio controls>
              <source src={'data:audio/wav;base64,${audioValue}'} type='audio/wav' />
            </audio>
          )}
        </div>
      </body>
    </div>

  );
}

export default App;
