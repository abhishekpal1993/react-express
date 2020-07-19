const fs = require('fs');
const path = require('path');

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_MIGRATION_HOST,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_MIGRATION_HOST,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_MIGRATION_HOST,
    dialect: 'postgres',
  },
};

fs.writeFile(
  path.resolve('server', 'sequelize', 'sequelize-config.json'),
  JSON.stringify(config, null, 2),
  (err, data) => {
    if (err) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  });