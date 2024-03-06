import {useState, useEffect, useRef} from 'react';

const StopWatch = () => {

const[isRunning, setIsRunning] = useState(false);
const[elapsedTime, setElapsedTime] = useState(0);
const intervalIdRef = useRef(null);
const startTimeRef = useRef(0);

useEffect(() => {
    if (isRunning) {
        intervalIdRef.current = setInterval(() => {
            setElapsedTime(new Date() - startTimeRef.current);
        }, 10);

        return () => clearInterval(intervalIdRef.current);
    }
}, [isRunning]);


const start = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
}

const stop = () => {
    setIsRunning(false);
    clearInterval(intervalIdRef.current);
}

const reset = () => {
    setElapsedTime(0);
    setIsRunning(false);
}

const formatTime = () => {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / (1000) % 60);
    let miliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = hours < 10? `0${hours}` : hours;
    minutes = minutes < 10? `0${minutes}` : minutes;
    seconds = seconds < 10? `0${seconds}` : seconds;
    miliseconds = miliseconds < 10? `0${miliseconds}` : miliseconds;

    return `${hours}:${minutes}:${seconds}:${miliseconds}`
}

  return (
    <div className='stopwatch'>
        <div className="display">{formatTime()}</div>
        <div className="controls">
            <button className='start-btn' onClick={start}>Start</button>
            <button className='reset-btn' onClick={reset}>Reset</button>
            <button className='stop-btn' onClick={stop}>Stop</button>
        </div>
    </div>
  )
}

export default StopWatch