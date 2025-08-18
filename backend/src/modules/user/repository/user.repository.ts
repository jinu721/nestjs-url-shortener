import { User, UserDocument } from 'src/schema/user.schema';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/modules/base/repository/base.repository';

@Injectable()
export class UserRepository
  extends BaseRepository<UserDocument>
  implements IUserRepository
{
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super(userModel);
  }
  async createUser(body: Partial<UserDocument>): Promise<UserDocument> {
    return await this.create(body);
  }
  async getUserByEmail(email: string): Promise<UserDocument | null> {
    return await this.findOne({ email });
  }
  async getUserById(id: string): Promise<UserDocument | null> {
    return await this.findById(id);
  }
}
