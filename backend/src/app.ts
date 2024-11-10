import express, { Express, Handler, Request, Response } from "express";
import controllers from "./controllers";
import cors from "cors";
import { IRoute, MetadataKeys } from "./libs/decorators/controller.decorators";

class App {
  public instance: Express;

  constructor() {
    this.instance = express();
    this.instance.use(express.json());
    this.instance.use(cors());
    this.registerControllers();
  }

  private registerControllers() {
    for (const controllerClass of controllers) {
      const controllerInstance: { [handlerName: string]: Handler } =
        new controllerClass() as any;

      const basePath: string = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        controllerClass,
      );
      const routes: Array<IRoute> = Reflect.getMetadata(
        MetadataKeys.ROUTES,
        controllerClass,
      );

      const router = express.Router();

      for (const { method, path, handlerName } of routes) {
        router[method](`/${path}`, async (request, response, next) => {
          try {
            response.send(
              await controllerInstance[String(handlerName)].bind(
                controllerInstance,
              )(request, response, next),
            );
          } catch (error) {
            next(error);
          }
        });
      }

      this.instance.use(`/${basePath}`, router);
    }
  }
}

export default new App();
