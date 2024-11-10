import { v4 as uuidv4 } from "uuid";

export class Counter {
  public id!: string;
  public value!: number;

  constructor() {
    this.id = uuidv4();
    this.value = 0;
  }
}
