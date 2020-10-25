import { Request, Response, NextFunction } from 'express';
const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }

  res.json({
    message: error.message
  })

  next();
}

export default errorHandler;