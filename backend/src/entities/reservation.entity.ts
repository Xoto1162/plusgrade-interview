import { ProductCharge } from "./product-charge.entity";

export class Reservation {
  public id!: string;
  public productCharges!: Array<ProductCharge>;

  constructor(values: Partial<Reservation>) {
    Object.assign(this, values);
  }
}
