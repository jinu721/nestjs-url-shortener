import * as bcrypt from 'bcrypt';

export const PasswordUtil = {
  hash: async (plainText: string): Promise<string> => {
    const saltRounds = 10;
    return bcrypt.hash(plainText, saltRounds);
  },

  validate: async (plainText: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(plainText, hashedPassword);
  },
};
