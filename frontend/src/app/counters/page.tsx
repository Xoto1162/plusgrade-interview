"use client";

import { useEffect, useState } from "react";
import { Stack, Button } from "@mui/material";
import { Counter } from "@/components/counter";

export default function CounterPage() {
  const [counters, setCounters] = useState<
    Array<{ id: string; value: number }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/counters").then(async (res) => {
      setCounters(await res.json());
      setIsLoading(false);
    });
  }, []);

  const updateCounter = async (counterId: string, value: number) => {
    await fetch(`http://localhost:3001/counters/${counterId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        value,
      }),
    });

    counters.find((counter) => counter.id === counterId)!.value = value;
    setCounters([...counters]);
  };

  const createCounter = async () => {
    const response = await fetch(`http://localhost:3001/counters`, {
      method: "POST",
    });

    setCounters([...counters, await response.json()]);
  };

  const remove = async (counterId: string) => {
    await fetch(`http://localhost:3001/counters/${counterId}`, {
      method: "DELETE",
    });

    setCounters([...counters.filter((counter) => counter.id !== counterId)]);
  };

  return isLoading ? (
    "Loading..."
  ) : (
    <Stack direction="column" spacing={1} sx={{ alignItems: "center" }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        {counters.map((counter) => (
          <Counter
            key={counter.id}
            value={counter.value}
            increment={() => updateCounter(counter.id, counter.value + 1)}
            decrement={() => updateCounter(counter.id, counter.value - 1)}
            remove={() => remove(counter.id)}
          />
        ))}
      </Stack>
      <Button variant="contained" color="success" onClick={createCounter}>
        Add counter
      </Button>
    </Stack>
  );
}
