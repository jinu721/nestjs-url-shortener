import type { User } from 'src/schema/user.schema';

interface PublicUserDTO {
  username: string;
  email: string;
}

export const toPublicUser = (user: User): PublicUserDTO => {
  return {
    username: user.username,
    email: user.email,
  };
};
