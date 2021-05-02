const express = require('express');
const app = express();

const port = 3000;
app.listen(() => {
  console.log(`Listening to port ${port}`);
})

app.get('/', (req, res) => {
  res.end();
})