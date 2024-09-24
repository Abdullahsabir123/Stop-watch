import React, { useState } from 'react';
import { StrictMode } from 'react';

export default function App() {
  const [a, setA] = useState(0);

  function inc() {
    console.clear();
    setA(a + 1);
    console.log(a + 1);
  }

  function dec() {
    console.clear();
    setA(a - 1);
    console.log(a - 1); 
  }

  return (
    <StrictMode>
      <center>
        <button onClick={dec}> - </button>
        {a}
        <button onClick={inc}> + </button>
      </center>
    </StrictMode>
  );
}
