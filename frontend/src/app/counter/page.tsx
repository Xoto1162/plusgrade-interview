"use client";

import { useState } from "react";

export default function CounterPage() {
  const [counterValue, setCounterValue] = useState(0);

  fetch("http://localhost:3001/counter").then(async (res) => {
    const counter = await res.json();
    setCounterValue(counter.value);
  });

  const increment = async () => {
    const counter = await fetch("http://localhost:3001/counter/increment", {
      method: "POST",
    });

    setCounterValue(counterValue + 1);
  };

  const decrement = async () => {
    const counter = await fetch("http://localhost:3001/counter/decrement", {
      method: "POST",
    });

    setCounterValue(counterValue - 1);
  };

  return (
    <div>
      <span>{counterValue}</span>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
