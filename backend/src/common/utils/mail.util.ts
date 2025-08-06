import { transporter } from '../config/transport.config';

export const EmailUtil = {
  sendOtp: async (to: string, otp: string): Promise<void> => {
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to,
      subject: 'Your OTP Code',
      text: `Your verification OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
  },
};
