import { Router } from "express";

import FotoController from "../controllers/FotoController.js";

const router = Router();

router.post("/", FotoController.create);

export default router;
