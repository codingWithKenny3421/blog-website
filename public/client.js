async function fetchData() {
    let symbolInput = document.getElementById("tickerInput").value;
    const response = await fetch(`http://localhost:3000/api/data?symbol=${symbolInput}`);
    const result = await response.json();
    document.getElementById('stockData').innerHTML = JSON.stringify(result, null, 2);
    for(const key in result ) {
        if(result.hasOwnProperty(key)) {
            console.log(key + ": " + result[key]);
        }
    }
}

fetchData();
