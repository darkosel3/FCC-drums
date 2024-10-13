import { useState,useEffect } from 'react'
import './App.css'
const keySounds = {'Q':'Heater-1.mp3',
                      'W':'Heater-2.mp3',
                      'E':'Heater-3.mp3', 
                      'A':'Heater-4.mp3', 
                      'S':'Clap.mp3', 
                      'D':'Open-HH.mp3',
                      'Z':'Kick-n-Hat.mp3',
                      'X':'Kick.mp3',
                      'C':'Closed-HH.mp3'}

function DrumPad({handleKeyDown,keyboard}){
  return (
    <button className="drum-pad" onClick={() => handleKeyDown(keyboard)}>
      {keyboard}
    </button>
  );
}


function App() {
  const [audio,setAudio] = useState('');
  const [display,setDisplay] = useState('')
  useEffect(() => {
    if (audio) {
      audio.play();
    }
  }, [audio]);
  

// Handle keyboard press
useEffect(()=>{
  function handleKeyPress(event){
    const key = event.key.toUpperCase();
    if(keySounds[key]){
      handleKeyDown(key)
    }
  }
  // event listener for keydown
  window.addEventListener('keydown',handleKeyPress)

  // cleanup
  return ()=>{
    window.removeEventListener('keydown',handleKeyPress)
  }
},[])

    function handleKeyDown(key) {
      const outputString = keySounds[key].split('.')[0].replace(/-/g,' ')
      setAudio(new Audio(`/sounds/${keySounds[key]}`))
      setDisplay(outputString)
      audio.play()
    }

  return (
    <div id="drum-machine">
      <div>
        <h1 className='header'>Drum Machine</h1>
        <ul className="keys">
          {Object.entries(keySounds).map(([key])=>(
            <li  key={key}>
              <DrumPad handleKeyDown={handleKeyDown} keyboard={key}/>
            </li>
          ))}
        </ul>
        <div id="display">{display}</div>
      </div>
    </div>
  )
}

export default App
