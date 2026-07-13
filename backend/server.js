const express = require('express');
const path = require('path');

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
 * Route
 * 
 * req: request received from frontend
 * res: response to be sent back to frontend
 */

app.get('/api', async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      return res.status(400).json({ error: 'keyword query parameter is required' });
    }
    
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

/**
 * This makes Express serve the frontend/dist React files directly, 
 * so the same server handles both the API and the website.
 */
app.use(express.static(path.join(__dirname, '../frontend/dist')));

/**
 * Hosting platforms (like Render) assign the port dynamically via PORT env var at runtime.
 * 8080 is only a fallback for local dev.
 */
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
