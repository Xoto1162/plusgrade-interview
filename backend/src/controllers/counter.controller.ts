import counterService from "../services/counter.service";
import { Request, Response } from "express";
import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
} from "../libs/decorators/controller.decorators";
import { UpdateCounterDto } from "../dto/counter.dto";
import { validate } from "../libs/validators/request.validators";
import { Counter } from "../entities/counter.entity";

@Controller("counters")
export class CounterController {
  @Get()
  public listAll(_req: Request, _res: Response): Array<Counter> {
    return counterService.list();
  }

  @Post()
  public create(_req: Request, _res: Response): Counter {
    return counterService.create();
  }

  @Put(":id")
  public async update(
    req: Request,
    _res: Response,
  ): Promise<Counter | undefined> {
    const id: string = req.params.id;
    const updateCounter = await validate(req.body, UpdateCounterDto);

    return counterService.update(id, updateCounter);
  }

  @Delete(":id")
  public delete(req: Request, _res: Response): void {
    const id: string = req.params.id;

    return counterService.remove(id);
  }
}
