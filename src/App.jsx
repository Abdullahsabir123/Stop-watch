import React, { useState } from 'react'

export default function App() {
  const [start , setStart] = useState(false);
  const [timer , setTimer] = useState(0);
  const [initid, setIntid] = useState(null);
  const [laps , setLaps] = useState([]);

  function hundlebuttons(){
    if(!start){
      setStart(true)
      const id = setInterval(() => {
        setTimer((e) => e + 1)
      }, 1000);
      setIntid(id);
    }else{
      clearInterval(initid);
      setStart(false)
    }
  }

    function reset(){
      clearInterval(initid);
      setStart(false);
      setTimer(0);
      setLaps([]);
    }

    function lap() {
      setLaps((e) => [...e , timer]);
    }

    let hours = Math.floor(timer / 3600);
    let minutes = Math.floor((timer % 3600) / 60);
    let seconds = timer % 60;

  return (
    <>
    <center>
      <p>{hours}h:{minutes}m:{seconds}s</p>
      <button onClick={hundlebuttons}>
        {start ? 'Stop' : 'Start'}
      </button>
      <button onClick={reset}>Reset</button>
      <button onClick={lap} disabled={!start}>Lap</button>
      <div>
      <h3>Laps:</h3>
      {laps.map((lapTime,index) => {
        let lapHours = Math.floor(lapTime / 3600);
        let lapMinutes = Math.floor((lapTime % 3600) / 60);
        let lapSeconds = lapTime % 60;
        return(
          <p key={index}>{lapHours}h:{lapMinutes}m:{lapSeconds}s</p>
        );
      })}
      </div>
    </center>
    </>
  )
}
