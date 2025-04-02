import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
};

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};

export {notFound,errorHandler}
