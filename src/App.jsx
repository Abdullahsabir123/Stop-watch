import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);  // Time in milliseconds
  const [isActive, setIsActive] = useState(false);  // Whether the stopwatch is running
  const [displayComputerTime, setDisplayComputerTime] = useState(null);  // Computer time to display
  const [showComputerTime, setShowComputerTime] = useState(false);  // Whether to show the computer time

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);  // Increment by 10ms
      }, 10);  // Update every 10 milliseconds
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  // Start displaying the computer time and update it every second
  useEffect(() => {
    let computerTimeInterval = null;

    if (showComputerTime) {
      computerTimeInterval = setInterval(() => {
        const currentTime = new Date();
        setDisplayComputerTime(currentTime.toLocaleTimeString());
      }, 1000);  // Update computer time every second
    }

    return () => clearInterval(computerTimeInterval);
  }, [showComputerTime]);

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setDisplayComputerTime(null);
    setShowComputerTime(false);
  };

  // Trigger to start displaying the current computer time
  const handleDisplayComputerTime = () => {
    setShowComputerTime(true);
  };

  // Format the stopwatch time as HH:MM:SS:MS
  const formatTime = (milliseconds) => {
    const getMilliseconds = `00${milliseconds % 1000}`.slice(-3);
    const totalSeconds = Math.floor(milliseconds / 1000);
    const getSeconds = `0${totalSeconds % 60}`.slice(-2);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const getMinutes = `0${totalMinutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(totalMinutes / 60)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds} : ${getMilliseconds}`;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Stopwatch</h2>
      <div style={{ fontSize: '2rem', marginBottom: '20px' }}>
        {formatTime(time)}
      </div>
      <button onClick={handleStartStop} style={{ marginRight: '10px' }}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button onClick={handleReset} style={{ marginRight: '10px' }}>
        Reset
      </button>
      <button onClick={handleDisplayComputerTime}>
        Real Time
      </button>
      {displayComputerTime && (
        <div style={{ marginTop: '20px', fontSize: '1.5rem' }}>
          Current Time: {displayComputerTime}
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
