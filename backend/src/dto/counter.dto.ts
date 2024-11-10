import { IsDefined, IsNumber } from "class-validator";

export class UpdateCounterDto {
  @IsDefined()
  @IsNumber()
  value!: number;
}
