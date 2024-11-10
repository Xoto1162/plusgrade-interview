import { UpdateCounterDto } from "../dto/counter.dto";
import { Counter } from "../entities/counter.entity";

let counters: Array<Counter> = [];

const create = (): Counter => {
  const createdCounter = new Counter();

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
  updateCounter: UpdateCounterDto,
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
