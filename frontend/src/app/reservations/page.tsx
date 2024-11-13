"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

type ProductCharge = {
  name: string;
  active?: boolean;
  amount?: number;
};

type Reservation = {
  id: string;
  productCharges: Array<ProductCharge>;
};

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
    <CollapsibleTable reservations={reservations}></CollapsibleTable>
  );
}

function Row(props: { row: Reservation }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? "Close" : "Open"}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">
          {row.productCharges.filter((product) => product.active).length}
        </TableCell>
        <TableCell align="right">
          {row.productCharges
            .filter((product) => product.active)
            .reduce((acc, productCharge) => acc + productCharge.amount!, 0)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Charge</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.productCharges.map((historyRow) => (
                    <TableRow key={historyRow.name}>
                      <TableCell component="th" scope="row">
                        {historyRow.name}
                      </TableCell>
                      <TableCell>
                        {historyRow.active === true
                          ? "active"
                          : historyRow.active === false
                            ? "cancelled"
                            : ""}
                      </TableCell>
                      <TableCell>{historyRow.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function CollapsibleTable(props: { reservations: Array<Reservation> }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Reservation UUID</TableCell>
            <TableCell>Number of Active Purchases</TableCell>
            <TableCell>Sum of Active Charges</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.reservations.map((row) => (
            <Row key={row.id} row={row}></Row>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
