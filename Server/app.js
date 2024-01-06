const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;

app.get('/tiles/:z/:x/:y.png', async (req, res) => {
  const { z, x, y } = req.params;
  const url = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
  console.log(`Fetching tile ${z}/${x}/${y}`);

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    res.header('Content-Type', 'image/png');
    res.send(response.data);
    console.log(`Fetched tile ${z}/${x}/${y}`);
  } catch (error) {
    res.status(500).send('Error fetching tile');
  }
  console.log('-----------------------------------');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
