import { User, UserDocument } from 'src/schema/user.schema';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(body: Partial<UserDocument>): Promise<UserDocument> {
    return await this.userModel.create(body);
  }
  async getUserByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email });
  }
  async getUserById(id: string): Promise<UserDocument | null> {
    return await this.userModel.findById(id);
  }
}
