"use client";

import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type ProductCharge = {
  name: string;
  active?: boolean;
  amount?: number;
};

type Reservation = {
  id: string;
  productCharges: Array<ProductCharge>;
};

const columns: Array<GridColDef<Reservation>> = [
  { field: "id", headerName: "Reservation UUID", width: 300 },
  {
    field: "numberActivePurchases",
    headerName: "Number of Active Purchases",
    width: 300,
    valueGetter: (_value, row) =>
      row.productCharges.filter((product) => product.active).length,
  },
  {
    field: "sumOfActiveCharges",
    headerName: "Sum of Active Charges",
    width: 300,
    valueGetter: (_value, row) =>
      row.productCharges
        .filter((product) => product.active)
        .reduce((acc, productCharge) => acc + productCharge.amount!, 0),
  },
];

export default function ReservationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState<Array<Reservation>>([]);

  useEffect(() => {
    fetch("http://localhost:3001/reservations").then(async (res) => {
      setReservations(await res.json());
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    "Loading..."
  ) : (
    <DataGrid rows={reservations} columns={columns}></DataGrid>
  );
}
