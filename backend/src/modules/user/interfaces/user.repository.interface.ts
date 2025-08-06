import { UserDocument } from 'src/schema/user.schema';

export interface IUserRepository {
  createUser(body: UserDocument): Promise<UserDocument>;
  getUserByEmail(email: string): Promise<UserDocument>;
}
