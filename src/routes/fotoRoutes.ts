import { Router } from "express";

import FotoController from "../controllers/FotoController.js";
import loginRequired from "../middlewares/loginRequired.js";

const router = Router();

router.post("/", loginRequired, FotoController.create);

export default router;
