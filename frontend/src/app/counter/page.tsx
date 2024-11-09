"use client";

import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";

export default function CounterPage() {
  const [counterValue, setCounterValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/counter").then(async (res) => {
      const counter = await res.json();
      setCounterValue(counter.value);
      setIsLoading(false);
    });
  }, []);

  const increment = async () => {
    await fetch("http://localhost:3001/counter/increment", {
      method: "POST",
    });

    setCounterValue(counterValue + 1);
  };

  const decrement = async () => {
    await fetch("http://localhost:3001/counter/decrement", {
      method: "POST",
    });

    setCounterValue(counterValue - 1);
  };

  return isLoading ? (
    "Loading..."
  ) : (
    <Stack direction="column" spacing={1} sx={{ alignItems: "center" }}>
      <span>{counterValue}</span>
      <Button variant="contained" onClick={increment}>
        Increment
      </Button>
      <Button variant="outlined" onClick={decrement}>
        Decrement
      </Button>
    </Stack>
  );
}
