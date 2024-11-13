export class ProductCharge {
  public id!: number;
  public name!: string;
  public active?: boolean;
  public amount?: number;

  public constructor(values: Partial<ProductCharge>) {
    Object.assign(this, values);
  }
}
