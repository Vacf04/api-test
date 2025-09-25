import type { Request, Response } from 'express';
import { prisma } from '../services/prismaService.js';

class AlunoController {
  async index(req: Request, res: Response) {
    try {
      const alunos = await prisma.aluno.findMany({
        orderBy: {
          id: 'desc',
        },
        include: {
          fotos: {
            select: {
              filename: true,
            },
          },
        },
      });

      const alunosComFotosVirtuais = alunos.map((aluno) => {
        const fotosComUrl = aluno.fotos.map((foto) => ({
          ...foto,
          url: `${process.env.URL}${foto.filename}`,
        }));

        return {
          ...aluno,
          fotos: fotosComUrl,
        };
      });

      return res.json(alunosComFotosVirtuais);
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

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const aluno = await prisma.aluno.delete({
        where: {
          id: Number(id),
        },
      });

      if (!aluno) {
        return res
          .status(404)
          .json({ error: 'Esse aluno não foi encontrado!' });
      }

      return res.json({ message: 'Aluno deletado com sucesso!' });
    } catch (e) {
      if (e instanceof Error) {
        return res.json({ error: e.message });
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const aluno = await prisma.aluno.update({
        where: {
          id: Number(id),
        },
        data: req.body,
      });

      if (!aluno) {
        return res
          .status(404)
          .json({ error: 'Esse aluno não foi encontrado!' });
      }

      return res.json(aluno);
    } catch (e) {
      if (e instanceof Error) {
        return res.json({ error: e.message });
      }
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const aluno = await prisma.aluno.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          fotos: {
            select: {
              filename: true,
            },
          },
        },
      });

      if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado!' });
      }

      const fotosComUrl = aluno.fotos.map((foto) => ({
        ...foto,
        url: `${process.env.URL}${foto.filename}`,
      }));

      const alunoComFotosVirtuais = {
        ...aluno,
        fotos: fotosComUrl,
      };

      return res.json(alunoComFotosVirtuais);
    } catch (e) {
      if (e instanceof Error) {
        return res.json({ error: e.message });
      }
    }
  }
}

export default new AlunoController();
