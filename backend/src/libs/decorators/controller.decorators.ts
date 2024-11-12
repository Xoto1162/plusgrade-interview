import "reflect-metadata";
import { Handler } from "express";

export enum MetadataKeys {
  BASE_PATH = "base_path",
  ROUTES = "routes",
  MIDDLEWARES = "middlewares",
}

enum Methods {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

export type IRoute = {
  method: Methods;
  path: string;
  handlerName: string | symbol;
};

const extendArrayMetadata = <T extends Array<unknown>>(
  metadataKey: string,
  values: T,
  target: Function,
) => {
  const previousValue = Reflect.getMetadata(metadataKey, target) ?? [];
  const newValue = [...previousValue, ...values];
  Reflect.defineMetadata(metadataKey, newValue, target);
};

export const Controller = (basePath: string): ClassDecorator => {
  return (target: Function) => {
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);
  };
};

const methodDecoratorFactory = (method: Methods) => {
  return (path: string = ""): MethodDecorator => {
    return (target: any, propertyKey: any) => {
      const controllerClass = target.constructor;

      extendArrayMetadata(
        MetadataKeys.ROUTES,
        [
          {
            method,
            path,
            handlerName: propertyKey,
          },
        ],
        controllerClass,
      );
    };
  };
};

export const Get = methodDecoratorFactory(Methods.GET);
export const Post = methodDecoratorFactory(Methods.POST);
export const Put = methodDecoratorFactory(Methods.PUT);
export const Delete = methodDecoratorFactory(Methods.DELETE);

export const Middleware = (
  ...middlewares: Array<Handler>
): ClassDecorator & MethodDecorator => {
  return (
    target: Function | object,
    _propertyKey?: string | Symbol,
    descriptor?: TypedPropertyDescriptor<any>,
  ) => {
    // Handle method decorator
    if (descriptor) {
      extendArrayMetadata(
        MetadataKeys.MIDDLEWARES,
        middlewares,
        descriptor.value,
      );
      return;
    }
    // Handle class decorator
    if (!(target instanceof Function)) {
      throw new Error("target is not a Function instance");
    }
    extendArrayMetadata(MetadataKeys.MIDDLEWARES, middlewares, target);
  };
};
