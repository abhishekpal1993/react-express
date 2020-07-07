import express from 'express';
import path from 'path';

// Express Init
const app = express();

// React Static Files
app.use(express.static(path.join('./build')));

// React index.html fetch
app.get('/', function (req, res) {
  res.sendFile(path.join('./build', 'index.html'));
});

// APIs here

app.listen(process.env.PORT || 8080);