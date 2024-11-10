"use client";

import { Button, Stack } from "@mui/material";

export type CounterProps = {
  value: number;
  increment: () => void;
  decrement: () => void;
  remove: () => void;
};

export function Counter({ value, increment, decrement, remove }: CounterProps) {
  return (
    <Stack direction="column" spacing={1} sx={{ alignItems: "center" }}>
      <span>{value}</span>
      <Button variant="contained" onClick={increment}>
        Increment
      </Button>
      <Button variant="outlined" onClick={decrement}>
        Decrement
      </Button>
      <Button variant="contained" color="error" onClick={remove}>
        Delete
      </Button>
    </Stack>
  );
}
