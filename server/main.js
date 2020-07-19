import express from 'express';
import cors from 'cors';
import path from 'path';

import ImagesApi from './routes/images-api';

// Express Init
const app = express();

// cors middleware
app.use(cors());

// APIs here
app.use('/api', ImagesApi);

// React here
app.use(express.static(path.resolve('build')));

app.get('*', (_req, res) => {
  res.sendFile(path.resolve('build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
