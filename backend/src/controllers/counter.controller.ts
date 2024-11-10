import counterService from "../services/counter.service";
import { Request, Response } from "express";
import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
} from "../libs/decorators/controller.decorators";
import { Counter } from "../types/counter.types";
import { UpdateCounterDto } from "../dto/counter.dto";
import { validate } from "../libs/validators/validator";

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
  public async update(
    req: Request,
    res: Response,
  ): Promise<Counter | undefined> {
    const id: string = req.params.id;
    const updateCounter = await validate(req.body, UpdateCounterDto);

    return counterService.update(id, updateCounter);
  }

  @Delete(":id")
  public delete(req: Request, res: Response): void {
    const id: string = req.params.id;

    return counterService.remove(id);
  }
}
