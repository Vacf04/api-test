import type { Request, Response } from "express";
import { prisma } from "../services/prismaService.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

class Token {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ error: "Credenciais Inválidas." });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcryptjs.compare(password, user.password_hash))) {
      return res.status(401).json({ error: "Credenciais Inválidas." });
    }

    const tokenSecret = process.env.TOKEN_SECRET as string;
    const tokenExpire = Number(process.env.TOKEN_EXPIRES);

    const token = jwt.sign({ id: user.id, email }, tokenSecret, {
      expiresIn: tokenExpire,
    });

    return res.json({ token });
  }
}

export default new Token();
