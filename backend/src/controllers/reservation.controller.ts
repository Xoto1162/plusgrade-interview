import { Controller, Get } from "../libs/decorators/controller.decorators";
import reservationsService from "../services/reservations.service";
import { Reservation } from "../entities/reservation.entity";

@Controller("reservations")
export class ReservationController {
  @Get()
  public listDetailedReservations(): Array<Reservation> {
    return reservationsService.listDetailedReservations();
  }
}
