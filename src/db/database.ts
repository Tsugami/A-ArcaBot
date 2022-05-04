import { toxicModel } from './mongo/models/toxic-model';

export class Database {
  /**
   * Creates a record of the person being toxic on the current date
   * and returns how many times that person was toxic
   */
  async incrementToxicCount(viewerId: string, toxicUserId: string): Promise<number> {
    await toxicModel.create({
      viewerId,
      toxicUserId,
    });

    const count = await toxicModel.countDocuments({
      toxicUserId,
    });

    return count;
  }
}
