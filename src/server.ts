const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', () => {
});

app.listen(PORT, () => {
  console.log('Server running on port', {PORT}.PORT);
});