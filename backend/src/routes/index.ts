import express, { Request, Response } from "express";
import counterRoutes from "./counter.routes";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Add the other routes here
router.use("/counter", counterRoutes);

export default router;
