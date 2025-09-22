import { Router } from "express";
import Home from "../controllers/HomeController.js";

const router = Router();

router.get("/", Home.index);

export default router;
