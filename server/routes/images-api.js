import express from 'express';

// Services
import database from '../services/database';
import logger from '../services/logger';

// Models
import modelFactory from '../models/model-factory';
import ImagesModel from '../models/images-model';

const router = express.Router();

router.get('/images', async (req, res) => {
  let sequelize;
  try {
    logger()({ ...req.query });
    sequelize = await database({
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
    });

    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    modelFactory(sequelize);
    const { page, limit } = req.query;
    const result = await ImagesModel.getImagesInPageLimit(page, limit);

    res.send(result);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    res.status(500).send({ error: 'something blew up' });
  } finally {
    if (sequelize) sequelize.close();
  }
})

export default router;