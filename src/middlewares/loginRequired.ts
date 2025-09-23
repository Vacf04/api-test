import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  userId?: string | undefined;
  userEmail?: string | undefined;
}

interface UserPayload extends JwtPayload {
  id?: string;
  email?: string;
}

function isUserPayload(data: any): data is UserPayload {
  return (
    typeof data === "object" && data !== null && "id" in data && "email" in data
  );
}

export default (req: CustomRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      error: "É preciso fazer o login.",
    });
  }

  const [texto, token] = authorization.split(" ");

  const tokenSecret = process.env.TOKEN_SECRET as string;

  try {
    if (token) {
      const data = jwt.verify(token, tokenSecret);

      if (isUserPayload(data)) {
        const { id, email } = data;
        req.userId = id;
        req.userEmail = email;
        return next();
      }

      return res.status(401).json({ error: "Token inválido" });
    }
  } catch (e) {
    return res.status(401).json({ error: "Token expirado ou inválido" });
  }
};
