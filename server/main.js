import express from 'express';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';

import ImagesApi from './routes/images-api';

// Express Init
const app = express();

// express middleware
app.use(helmet());

// APIs here
app.use('/api', [cors()], ImagesApi);

// React here
app.use(express.static(path.resolve('build')));

app.get('*', (_req, res) => {
  res.sendFile(path.resolve('build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
