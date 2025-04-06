import jwt from 'jsonwebtoken';
import { Response } from 'express';
import config from '../config/config'
const generateToken = (res:Response, userId:any) => {
  const token = jwt.sign({ userId }, config.JWT_SECRET as string, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  console.log('cookie created')
  console.log('token'+token)
};

export default generateToken;