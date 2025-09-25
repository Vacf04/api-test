import type { Request, Response } from "express";
import upload from "../middlewares/uploadPicture.js";

class FotoController {
  create(req: Request, res: Response) {
    return upload(req, res, (error) => {
      if (error) {
        return res.json({ error: error.code });
      }

      return res.json(req.file);
    });
  }
}

export default new FotoController();
