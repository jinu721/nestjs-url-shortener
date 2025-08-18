import {
  Model,
  Document,
  FilterQuery,
  UpdateQuery,
  PipelineStage,
} from 'mongoose';
import { IBaseRepository } from '../interfaces/base.repository.interface';

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  async create(doc: Partial<T>): Promise<T> {
    return await this.model.create(doc);
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOne(filter).exec();
  }

  async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
    return await this.model.find(filter).exec();
  }

  async update(id: string, updateData: UpdateQuery<T>): Promise<T | null> {
    return await this.model
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  async count(filter: FilterQuery<T> = {}): Promise<number> {
    return await this.model.countDocuments(filter).exec();
  }
  async aggregate<R = any>(pipeline: PipelineStage[]): Promise<R[]> {
    return await this.model.aggregate(pipeline).exec();
  }
}
