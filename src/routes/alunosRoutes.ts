import { Router } from "express";
import AlunoController from "../controllers/AlunoController.js";

const router = Router();

router.get("/", AlunoController.index);
router.post("/", AlunoController.create);

export default router;
