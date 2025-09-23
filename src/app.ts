import dotenv from "dotenv";
dotenv.config();

import express from "express";
import type { Application } from "express";
import homeRoutes from "../src/routes/homeRoutes.js";
import alunosRoutes from "./routes/alunosRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";

class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  private routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/alunos", alunosRoutes);
    this.app.use("/users", userRoutes);
    this.app.use("/tokens", tokenRoutes);
  }
}

export default new App().app;
