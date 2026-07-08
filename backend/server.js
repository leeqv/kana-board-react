const express = require('express');

/**
 * Need to use a backend as a middleman because browsers enforce CORS,
 * so React cannot call the Jisho API directly React ↔ Jisho API ❌
 * 
 * Express is a Node.js library that provides useful methods like get, listen, and use.
 * 
 * React ↔ Express ↔ Jisho API ✅
 * (request ➡, response ⬅)
 */
const app = express();

/**
 * Fix CORS issues for browser ↔ server requests
 * 
 * CORS is a browser security feature: it blocks requests from frontend (React, localhost 5173) to backend (Express localhost 8080) if origins differ.
 * Server-side requests (Express ↔ Jisho API) are not affected.
 * 
 * CORS is a Node.js middleware for Express/Connect that sets CORS response headers. These headers tell browsers which origins can read responses from your server.
 * https://expressjs.com/en/resources/middleware/cors.html
 */
const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:5173'],
};
app.use(cors(corsOptions));

/**
 * Route
 * 
 * req: request received from frontend
 * res: response to be sent back to frontend
 */

app.get('/api', async (req, res) => {
  try {
    const { keyword } = req.query;
    const kanjiResponse = await fetch(
      `https://jisho.org/api/v1/search/words?keyword=${keyword}`
    );

    // Fetch response .json(): JSON ➡ JS Object
    // https://developer.mozilla.org/en-US/docs/Web/API/Response/json
    const kanjiObject = await kanjiResponse.json();

    const data = kanjiObject.data
      // Get results where the reading and hiragana keyword match exact
      .filter(({japanese}) => japanese.some(word => word.reading === keyword));

    // 1 kanji can have different forms, ex: ああ - 唖々 can be written as 唖唖. 
    // So 1 item from jisho data can have more than 1 result item (not 1:1 map).
    let filteredData = [];

    data.forEach(item => {
      const definition = item.senses[0].english_definitions[0];

      const kanjis = item.japanese;
      kanjis.forEach(k => {
        if (k.word && k.reading === keyword) {
          filteredData.push({
            kanji: k.word,
            definition: definition,
          });
        }
      });
    });

    // Express res.json(): JS Object ➡ JSON to be sent back to frontend
    // https://expressjs.com/en/api.html#express.json
    // res.json(data);
    res.json(filteredData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(8080, () => {
  console.log('Server started on port 8080');
});
