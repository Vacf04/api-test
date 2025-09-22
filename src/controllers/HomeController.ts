import type { Request, Response } from "express";

class Home {
  index(req: Request, res: Response) {
    res.json({
      "tudo certo": true,
    });
  }
}

export default new Home();
