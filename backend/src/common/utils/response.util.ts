import { Response } from 'express';

export const successResponse = (
  res: Response,
  status: number,
  message: string = 'Success',
  data: any = null,
) => {
  res.status(status).json({
    success: true,
    status,
    message,
    data,
  });
};
