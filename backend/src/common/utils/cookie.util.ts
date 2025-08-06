import { Response } from 'express';
import { env } from '../config/env.config';

export const CookieUtil = {
  setRefreshToken: (res: Response, token: string): void => {
    res.cookie('refreshToken', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
      domain: env.NODE_ENV === 'production' ? '.jinu.site' : undefined,
      path: '/',
      maxAge: 24 * 60 * 60 * 1000,
    });
  },
};
