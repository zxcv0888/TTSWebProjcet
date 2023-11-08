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
    setAudioValue(null);
    setTTS(false);

    const query = `text=${text}&master_key=${master_key}&call_id=${call_id}&sid=${sid}&tempo=${tempo}&sample_rate=${sample_rate}`;

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
          <option value={0}>김하윤(일반)</option>
          <option value={1}>김하윤(밝은)</option>
          <option value={2}>한보람(일반)</option>
          <option value={3}>한보람(밝은)</option>
          <option value={4}>차유나(일반)</option>
          <option value={5}>차유나(밝은)</option>
          <option value={6}>노경연(일반)</option>
          <option value={7}>노경연(밝은)</option>
          <option value={8}>연빛나(일반)</option>
          <option value={9}>연빛나(밝은)</option>
          <option value={10}>김동희(일반)</option>
          <option value={11}>김동희(밝은)</option>
          <option value={12}>오세혁(일반)</option>
          <option value={13}>오세혁(밝은)</option>
          <option value={14}>조용민</option>
          <option value={15}>김경일</option>
          <option value={16}>김상균</option>
          <option value={17}>김완선</option>
          <option value={18}>이경일</option>
          <option value={19}>카이스트</option>
          <option value={20}>지향</option>
          <option value={21}>세하</option>
          <option value={22}>토니</option>
          <option value={23}>엘리</option>
          <option value={24}>로이</option>
          <option value={25}>이든</option>
          <option value={26}>루디</option>
          <option value={27}>노아</option>
          <option value={28}>루비</option>
          <option value={29}>세미</option>
          <option value={30}>제니</option>
          <option value={31}>로운</option>
          <option value={32}>이안</option>
          <option value={33}>조이</option>
      </select>
      <input 
        type="number" 
        step="0.01" 
        value={tempo} 
        onChange={(e) => {
          const inputValue = parseFloat(e.target.value);
          const roundedValue = Math.round(inputValue * 100) / 100;
          setTempo(roundedValue);
        }}
        className='body-select-three'
      />
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
        </div>
          {tts && audioValue && (
            <audio controls className='audio'>
              <source src={`data:audio/wav;base64,${audioValue}`} type='audio/wav' />
            </audio>
          )}
      </body>
    </div>
  );
}

export default App;
