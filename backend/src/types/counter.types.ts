export type Counter = {
  id: string;
  value: number;
};

export type UpdateCounter = Pick<Counter, "value">;
