import * as jwt from 'jsonwebtoken';
import { env } from '../config/env.config';


const ACCESS_TOKEN_SECRET = env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = env.REFRESH_TOKEN_SECRET;

export const JwtUtil = {
  generateAccessToken: async (payload: any): Promise<string> => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "8m" });
  },
  generateRefreshToken: async (payload: any): Promise<string> => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  }
  verifyAccessToken: async (token: string): Promise<any> => {
    try {
      return jwt.verify(token, ACCESS_TOKEN_SECRET );
    } catch (err) {
      throw new Error('Invalid token');
    }
  },
  verifyRefreshToken: async (token: string): Promise<any> => {
    try {
      return jwt.verify(token, REFRESH_TOKEN_SECRET );
    } catch (err) {
      throw new Error('Invalid token');
    }
  },
};
