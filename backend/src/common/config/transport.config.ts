import * as nodemailer from 'nodemailer';
import { env } from './env.config';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});
