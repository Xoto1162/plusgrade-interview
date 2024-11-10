import "reflect-metadata";

export enum MetadataKeys {
  BASE_PATH = "base_path",
  ROUTES = "routes",
}

export enum Methods {
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

export const Controller = (basePath: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);
  };
};

const methodDecoratorFactory = (method: Methods) => {
  return (path: string = "") => {
    return (target: any, propertyKey: any) => {
      const controllerClass = target.constructor;

      const routes: Array<IRoute> = Reflect.hasMetadata(
        MetadataKeys.ROUTES,
        controllerClass,
      )
        ? Reflect.getMetadata(MetadataKeys.ROUTES, controllerClass)
        : [];

      routes.push({
        method,
        path,
        handlerName: propertyKey,
      });

      Reflect.defineMetadata(MetadataKeys.ROUTES, routes, controllerClass);
    };
  };
};

export const Get = methodDecoratorFactory(Methods.GET);
export const Post = methodDecoratorFactory(Methods.POST);
export const Put = methodDecoratorFactory(Methods.PUT);
export const Delete = methodDecoratorFactory(Methods.DELETE);
