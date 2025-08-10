import * as jwt from 'jsonwebtoken';
import { env } from '../config/env.config';

const ACCESS_TOKEN_SECRET = env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = env.REFRESH_TOKEN_SECRET;

export const JwtUtil = {
  generateAccessToken: (payload: any): string => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
  },

  generateRefreshToken: (payload: any): string => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
  },

  verifyAccessToken: (token: string): any => {
    try {
      return jwt.verify(token, ACCESS_TOKEN_SECRET);
    } catch (err) {
      throw new Error('Invalid token');
    }
  },

  verifyRefreshToken: (token: string): any => {
    try {
      return jwt.verify(token, REFRESH_TOKEN_SECRET);
    } catch (err) {
      throw new Error('Invalid token');
    }
  },
};
