import type { Request, Response } from 'express';
import { prisma } from '../services/prismaService.js';

class AlunoController {
  async index(req: Request, res: Response) {
    try {
      const alunos = await prisma.aluno.findMany();
      return res.json(alunos);
    } catch (e) {
      return res.status(500).json({ error: 'Erro ao buscar alunos.' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const aluno = await prisma.aluno.create({ data: req.body });
      return res.status(201).json(aluno);
    } catch (e: unknown) {
      if (e instanceof Error) {
        return res.status(400).json({ error: e.message });
      } else {
        return res.status(400).json({ error: 'unknow error' });
      }
    }
  }
}

export default new AlunoController();
