import { Request, Response, NextFunction } from "express";

export const checkProductData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = [];
  // for..in, for..of, for..each
  for (const key in req.body) {
    if (!req.body[key]) {
      errors.push(`Please add product ${key}.`);
    }
  }

  if (errors.length > 0) return res.status(401).json({ msg: errors });

  next();
};
