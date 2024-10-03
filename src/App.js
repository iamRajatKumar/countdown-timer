import { useEffect, useState } from "react";
import "./App.css";
import InputTimer from "./components/inputTimer";
import ShowTimer from "./components/showTimer";

function App() {
  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(0);

  const handleStart = () => {
    if (hours < 0 || minutes < 0 || seconds <= 0) {
      alert("Invalid Input");
      return;
    } else {
      setIsStart(true);
    }
  };

  const handleInput = (e) => {
    console.log(e.target.id);
    const value = parseInt(e.target.value);
    const id = e.target.id;
    if (id === "hours") {
      setHours(value);
    } else if (id === "minutes") {
      setMinutes(value);
    } else {
      setSeconds(value);
    }
  };

  const resetTimer = ()=>{
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    clearInterval(timerId);
  }

  const handlePause = () => {
    setIsPause(true);
    clearInterval(timerId);
  };

  const handleResume = () => {
    setIsPause(false);
    runTimer(seconds, minutes, hours);
  };

  const handleReset = () => {
    setIsStart(false);
    resetTimer();
  };

  const runTimer = (sec, min, hr, tid) => {
    if (sec > 0) {
      setSeconds((s) => s - 1);
    } else if (sec === 0 && min > 0) {
      setMinutes((m) => m - 1);
      setSeconds(59);
    } else {
      setHours((h) => h - 1);
      setMinutes(59);
      setSeconds(59);
    }
    //Timer dont go in negative
    if (sec === 0 && min === 0 && hr === 0) {
      // resetTimer();
      handleReset();
      alert("Timer is Finished!");
      clearInterval(tid);
      return;
    }
  };

  useEffect(() => {
    let tid;
    if (isStart) {
      tid = setInterval(() => {
        runTimer(seconds, minutes, hours, tid);
      }, 1000);
      setTimerId(tid);
    }
    //component unmount
    return () => {
      clearInterval(tid);
    };
  },// eslint-disable-next-line 
  [isStart, hours, minutes, seconds]); 

  console.log(hours, minutes, seconds);

  

  return (
    <div className="App">
      <h1 className="h1">Countdown Timer</h1>
      {/* if is Start not true then we will show this container */}
      {!isStart && 
      <InputTimer handleInput={handleInput} handleStart={handleStart}/>
      }

      {/* if isStart is true then we will show this container */}
      {
      isStart && <ShowTimer
      hours={hours}
      minutes={minutes}
      seconds = {seconds}
      isPause = {isPause}
      handlePause={handlePause}
      handleReset={handleReset}
      handleResume = {handleResume}
      />
      
      }
    </div>
  );
}

export default App;
