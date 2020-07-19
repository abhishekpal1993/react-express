import { Model } from 'sequelize';

import logger from '../services/logger';

export default class ImagesModel extends Model {
  static async getImagesInPageLimit(page = 1, limit = 5) {
    try {
      const offset = ((parseInt(page) - 1) * parseInt(limit));
      const records = await ImagesModel.findAll({ limit, offset });
      
      logger()({
        message: 'Found Images',
        page,
        limit,
        records,
      });

      return records;
    } catch (error) {
      throw new Error('Failed to fetch images', error);
    }
  }
}
