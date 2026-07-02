const express = require('express');

const app = express();

app.get('/', () => {
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});