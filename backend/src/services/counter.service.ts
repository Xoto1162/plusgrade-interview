import { Counter } from "../types/counter.types";

let counter: Counter = {
  value: 0,
};

const getCounter = (): Counter => {
  return counter;
};

const incrementCounter = (): void => {
  counter.value++;
};

const decrementCounter = (): void => {
  counter.value--;
};

export default {
  getCounter,
  incrementCounter,
  decrementCounter,
};
