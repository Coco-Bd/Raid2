const express = require('express');
const path = require('path');
const app = express();

app.use(function(req, res, next) {
  if (req.originalUrl.endsWith('.js')) {
    res.type('application/javascript');
  }
  next();
});

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3032;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});