import express from "express";
import counterService from "../services/counter.service";

const counterRoutes = express.Router();

counterRoutes.get("/", (req, res) => {
  res.send(counterService.getCounter());
});

counterRoutes.post("/increment", (req, res) => {
  counterService.incrementCounter();
  res.send(counterService.getCounter());
});

counterRoutes.post("/decrement", (req, res) => {
  counterService.decrementCounter();
  res.send(counterService.getCounter());
});

export default counterRoutes;
