import { Router } from "express";
import UserController from "../controllers/UserController.js";
import loginRequired from "../middlewares/loginRequired.js";

const router = Router();

router.post("/", UserController.create);
router.put("/", loginRequired, UserController.update);
router.delete("/", loginRequired, UserController.delete);

export default router;
