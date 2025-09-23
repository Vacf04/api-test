import type { Request, Response } from 'express';
import { prisma } from '../services/prismaService.js';
import bcryptjs from 'bcryptjs';
import validator from 'validator';

class UserController {
  async create(req: Request, res: Response) {
    try {
      if (!(req.body.nome.length > 4 && req.body.nome.length < 30)) {
        return res.status(400).json({ error: 'Nome inválido' });
      }

      if (!validator.isEmail(req.body.email)) {
        return res.status(400).json({ error: 'E-mail inválido.' });
      }

      if (
        !validator.isStrongPassword(req.body.password, {
          minLength: 6,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 0,
        })
      ) {
        return res.status(400).json({
          error:
            'A senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula, uma minúscula e um número.',
        });
      }

      const password_hash = await bcryptjs.hash(req.body.password, 10);

      const newUser = await prisma.user.create({
        data: {
          nome: req.body.nome,
          email: req.body.email,
          password_hash: password_hash,
        },
      });

      res.json({ message: 'Usuario criado com sucesso' });
    } catch (e: unknown) {
      if (e instanceof Error) {
        res.status(400).json({ error: e.message });
      }
    }
  }

  async index(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
      res.json(user);
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);

      if (!userId) {
        return res.status(400).json({ error: 'ID não enviado.' });
      }

      const newData = await prisma.user.update({
        where: {
          id: userId,
        },
        data: req.body,
      });

      res.json(newData);
    } catch (e) {
      return res.json(null);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);

      if (!userId) {
        return res.status(400).json({ error: 'ID não enviado.' });
      }

      const deletedUser = await prisma.user.delete({
        where: {
          id: userId,
        },
      });
      res.json(deletedUser);
    } catch (e) {
      return res.json(null);
    }
  }
}

export default new UserController();
