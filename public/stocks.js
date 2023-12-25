const Stocks = require("stocks.js")
var stock = new Stocks("8ZQ6XU9SW0WQSERV")

async function request(){
    var options = {
        symbol: 'SCHD',
        interval: 'weekly',
        amount: 52
      };
    var result = await stock.timeSeries(options);
    console.log(result)
}

request()
