import dotenv from 'dotenv';
dotenv.config();

import { dirname, resolve } from 'path';
import express from 'express';
import type { Application } from 'express';
import homeRoutes from '../src/routes/homeRoutes.js';
import alunoRoutes from './routes/alunoRoutes.js';
import userRoutes from './routes/userRoutes.js';
import tokenRoutes from './routes/tokenRoutes.js';
import fotoRoutes from './routes/fotoRoutes.js';
import { fileURLToPath } from 'url';

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
    this.app.use(
      '/uploads',
      express.static(
        resolve(dirname(fileURLToPath(import.meta.url)), '..', 'uploads'),
      ),
    );
  }

  private routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/alunos', alunoRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/tokens', tokenRoutes);
    this.app.use('/fotos', fotoRoutes);
  }
}

export default new App().app;
