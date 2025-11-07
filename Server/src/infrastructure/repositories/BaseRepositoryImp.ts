import { injectable } from "inversify";
import { Model, Types, Document } from "mongoose";

@injectable()
export abstract class BaseRepositoryImp<T> {
  protected model: Model<any>;

  protected mapDbToDomain(dbObj: any): T {
    if (!dbObj) return null as any;

    const obj = dbObj.toObject ? dbObj.toObject({ versionKey: false }) : dbObj;

    return {
      ...obj,
      id: obj.id ?? obj._id?.toString(),
    } as T;
  }

  protected mapDbArrayToDomain(docs: any[]): T[] {
    return docs.map((doc) => this.mapDbToDomain(doc)!).filter(Boolean);
  }

  constructor(model: Model<any>) {
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  async findById(id: string): Promise<T | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    const data = await this.model.findById(id);
    return this.mapDbToDomain(data);
  }

  async create(item: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> {
    const created = new this.model(item);
    const saved = await created.save();
    return this.mapDbToDomain(saved);
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    const data = await this.model.findByIdAndUpdate(id, item, { new: true });
    return this.mapDbToDomain(data);
  }

  async delete(id: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(id)) return false;
    const deleted = await this.model.findByIdAndDelete(id);
    return !!deleted;
  }
}
