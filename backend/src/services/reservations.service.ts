import productAssignmentsDatabase from "../database/product_assignment.json";
import productChargesDatabase from "../database/product_charges.json";
import { Reservation } from "../entities/reservation.entity";
import _ from "lodash";
import { ProductCharge as ProductChargeEntity } from "../entities/product-charge.entity";

type ProductAssigment = {
  id: number;
  name: string;
  reservation_uuid: string;
};

type ProductAssignmentByReservationId = {
  [key: string]: Array<ProductAssigment>;
};

type ProductCharge = {
  special_product_assignment_id: number;
  active: boolean;
  amount: number;
};

const listDetailedReservations = (): Array<Reservation> => {
  const productsByReservations: ProductAssignmentByReservationId = _.groupBy(
    productAssignmentsDatabase,
    "reservation_uuid",
  );

  const reservations: Array<Reservation> = [];

  for (const [key, value] of Object.entries(productsByReservations)) {
    const productCharges = value.map((product) => {
      const productCharge: ProductCharge | undefined =
        productChargesDatabase.find(
          (productCharge) =>
            productCharge.special_product_assignment_id === product.id,
        );

      return new ProductChargeEntity({
        name: product.name,
        active: productCharge?.active,
        amount: productCharge?.amount,
      });
    });

    reservations.push(new Reservation({ id: key, productCharges }));
  }

  return reservations;
};

export default {
  listDetailedReservations,
};
