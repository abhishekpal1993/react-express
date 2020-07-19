import * as pg from 'pg';
import { Sequelize } from 'sequelize';

const database = ({ database, username, password, host }) => new Sequelize(
  database,
  username,
  password,
  {
    host,
    dialect: 'postgres',
    dialectModule: pg,
  });

export default database;
