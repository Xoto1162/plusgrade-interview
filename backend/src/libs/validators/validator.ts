import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate as validateClass } from "class-validator";

export const validate = async <T extends object>(
  data: any,
  validatingClass: ClassConstructor<T>,
): Promise<T> => {
  const dataClass = plainToInstance(validatingClass, data);
  const errors = await validateClass(dataClass, {
    whitelist: true,
  });
  if (errors.length) {
    // TODO: improve errors handling
    throw new Error("Data validation error");
  }

  return dataClass;
};
