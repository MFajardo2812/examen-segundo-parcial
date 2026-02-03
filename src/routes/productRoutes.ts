import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const router = Router();
const controller = new ProductController();

router.get("/", controller.getActive);

export default router;
