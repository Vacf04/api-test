import { Router } from "express";
import Token from "../controllers/TokenController.js";

const router = Router();

router.post("/", Token.create);

export default router;
