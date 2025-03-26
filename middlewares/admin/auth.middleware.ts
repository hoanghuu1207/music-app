import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { systemConfig } from "../../config/system";
import AdminModel from "../../models/admin.model";

export const SECRET_KEY: Secret = process.env.SECRET_KEY as Secret;

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const token = req.header("Authorization")?.replace("Bearer ", "");
    const token = req.cookies.token;

    if (!token) {
      res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);

      return;
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;

    const user = await AdminModel.findOne({ _id: (decoded as JwtPayload)._id }).select("-password");

    res.locals.user = user;

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
