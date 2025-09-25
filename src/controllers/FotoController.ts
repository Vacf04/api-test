import type { Request, Response } from "express";
import upload from "../middlewares/uploadPicture.js";
import { prisma } from "../services/prismaService.js";

class FotoController {
  create(req: Request, res: Response) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.json({ error: error.code });
      }

      if (!req.file) {
        return res.status(400).json({
          error: "Nenhum arquivo enviado",
        });
      }

      const { originalname, filename } = req.file as Express.Multer.File;
      const { alunoId } = req.body;

      const foto = await prisma.foto.create({
        data: {
          originalname,
          filename,
          alunoId,
        },
      });

      return res.json(foto);
    });
  }
}

export default new FotoController();
