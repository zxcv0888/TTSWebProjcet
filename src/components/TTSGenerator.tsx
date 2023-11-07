import React, { useState } from 'react';

function TTSGenerator() {
  const [uid, setUid] = useState<string | null>(null);
  const [tts, setTTS] = useState(false);
  const [text, setText] = useState('');
  const [sidNum, setSidNum] = useState('');
  const [sidNum1, setSidNum1] = useState('');
  const [audioValue, setAudioValue] = useState<string | null>(null);

  const createTTS = () => {
    setTTS(false);
    const formData = new FormData();
    formData.append('sid', sidNum);
    formData.append('text', text);
    formData.append('lang', sidNum1);

    let query = `sid=${sidNum}&text=${text}&lang=${sidNum1}`;

    // Fetch 및 데이터 처리
    fetch('http://192.168.220.224/tts?' + query, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data2) => {
        setUid(data2.uid);
        query += '&uid=' + data2.uid;

        fetch('http://192.168.220.224/tts/audio?' + query, {
          method: 'GET',
          mode: 'cors',
        })
          .then((response) => response.blob())
          .then((data) => {
            const reader = new FileReader();
            reader.readAsDataURL(data);
            reader.onloadend = function () {
              const base64data = reader.result as string;

              setAudioValue(base64data.replace('data:audio/wav;base64,', ''));
            };
            setTTS(true);
          });
      });
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={sidNum} onChange={(e) => setSidNum(e.target.value)}>
        {/* 음성 옵션 선택 */}
      </select>
      <select value={sidNum1} onChange={(e) => setSidNum1(e.target.value)}>
        {/* 언어 옵션 선택 */}
      </select>
      <button onClick={createTTS}>Generate Audio</button>
      {tts && audioValue && (
        <div>
          {/* 결과 표시 */}
          <audio controls>
            <source src={`data:audio/wav;base64,${audioValue}`} type="audio/wav" />
          </audio>
        </div>
      )}
    </div>
  );
}

export default TTSGenerator;
