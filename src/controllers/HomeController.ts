import type { Request, Response } from 'express';

class Home {
  index(req: Request, res: Response) {
    res.json({
      Home: 'Index',
    });
  }
}

export default new Home();
