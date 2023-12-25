const express = require('express');
const path = require("path");
const app = express();
const Stocks = require('stocks.js');
const port = 3000;

// Serve your stocks.html file
app.use(express.static(__dirname));
app.set("view engine", "ejs")


app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'stocks.html'));
  });


// Handle API request
app.get('/api/data', async (req, res) => {
    const stock = new Stocks("8ZQ6XU9SW0WQSERV");
    let symbol = req.query.symbol || "";
    const options = {
        symbol: symbol,
        interval: 'weekly',
        amount: 52
    };
    const result = await stock.timeSeries(options);
 
    res.json(result);
    
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
