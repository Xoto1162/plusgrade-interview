import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate as validateInstance } from "class-validator";

export const validate = async <T extends object>(
  data: any,
  validatingClass: ClassConstructor<T>,
): Promise<T> => {
  const dataInstance = plainToInstance(validatingClass, data);
  const errors = await validateInstance(dataInstance, {
    whitelist: true,
  });
  if (errors.length) {
    // TODO: improve errors handling
    throw new Error("Data validation error");
  }

  return dataInstance;
};
