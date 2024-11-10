import counterService from "../services/counter.service";
import { Request, Response } from "express";
import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
} from "../libs/decorators/controller.decorators";
import { Counter, UpdateCounter } from "../types/counter.types";

@Controller("counters")
export class CounterController {
  @Get()
  public listAll(req: Request, res: Response): Array<Counter> {
    return counterService.list();
  }

  @Post()
  public create(req: Request, res: Response): Counter {
    return counterService.create();
  }

  @Put(":id")
  public update(req: Request, res: Response): Counter | undefined {
    const id: string = req.params.id;
    const updateCounter: UpdateCounter = req.body;

    return counterService.update(id, updateCounter);
  }

  @Delete(":id")
  public delete(req: Request, res: Response): void {
    const id: string = req.params.id;

    return counterService.remove(id);
  }
}
