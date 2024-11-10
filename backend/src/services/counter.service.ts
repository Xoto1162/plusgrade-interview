import { Counter, UpdateCounter } from "../types/counter.types";
import { v4 as uuidv4 } from "uuid";

let counters: Array<Counter> = [];

const create = (): Counter => {
  const createdCounter = {
    id: uuidv4(),
    value: 0,
  };

  counters.push(createdCounter);

  return createdCounter;
};

const list = (): Array<Counter> => {
  return counters;
};

const get = (id: string): Counter | undefined => {
  return counters.find((counter) => counter.id === id);
};

const update = (
  id: string,
  updateCounter: UpdateCounter,
): Counter | undefined => {
  const counterToUpdate = counters.find((counter) => counter.id === id);
  if (!counterToUpdate) {
    return undefined;
  }

  counterToUpdate.value = updateCounter.value;

  return counterToUpdate;
};

const remove = (id: string): void => {
  counters = counters.filter((counter) => counter.id !== id);
};

export default {
  create,
  list,
  get,
  update,
  remove,
};
