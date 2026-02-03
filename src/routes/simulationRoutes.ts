import { Router } from "express";
import { SimulationController } from "../controllers/SimulationController";

const router = Router();
const controller = new SimulationController();

router.post("/", controller.create);
router.get("/:usuarioId", controller.byUser);

export default router;
