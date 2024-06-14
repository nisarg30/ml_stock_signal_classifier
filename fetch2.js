const TradingView = require('@mathieuc/tradingview');
const fs = require('fs');
var data = require('./x');
var arra = Object.keys(data);

function writeCandlestickDataToCSV(stockName, confirmationPeriods, chartPeriods, array1, array2, tf) {
    const header = 'Timestamp,Open,Max,Min,Volume,wvf,wvfl,rangeHigh,rangeHighl,Close,Entry\n';
    let previousEntry = 2; 
    let entry = previousEntry;
    const rows = confirmationPeriods.map((data, index) => {
        const chartData = chartPeriods[index];
        previousEntry = entry;
        if (array1.includes(chartData.time * 1000)) {
            entry = 1; 
        } else if (array2.includes(chartData.time * 1000)) {
            entry = 0; 
        } else {
            entry = 2;
        }
        
        return `${chartData.time},${chartData.open},${chartData.max},${chartData.min},${chartData.volume},${data.wvf},${data.wvfl},${data.rangeHigh},${data.rangeHighl},${chartData.close},${previousEntry}\n`;
    });
    const newContent = rows.join('');

    const filePath = `datax/${stockName}_${tf}.csv`;
    // let existingContent = '';
    // if (fs.existsSync(filePath)) {
    //     existingContent = fs.readFileSync(filePath, 'utf8');
    //     existingContent = existingContent.split('\n').filter(line => line.trim() !== '' && line !== header).join('\n');
    // }

    const csvContent = header + newContent;
    console.log(csvContent);
    fs.writeFileSync(filePath, csvContent);
}

const xyz = async (stockname, tf) => {
    const client = new TradingView.Client({
        token: 'xajjrhtxu2peve0li7lfje3vpmiho4b0',
        signature: 'v2:SqjPdUb4iLLB/WJW3tlMYIZFOlcXT6f2oceM/5bCNlw=',
    });
    
    const chart = new client.Session.Chart();
    chart.setMarket(`NSE:${stockname}`, {
        timeframe: tf,
        range: 10000000,
    });
    
    const indicator = await TradingView.getIndicator('USER;f691a941ff2d44fc8b6ac9020465b2b4', '49.0');
    
    const ConfirmationEntry = new chart.Study(indicator);
    
    ConfirmationEntry.onUpdate(async () => {
        console.log('Plot values', ConfirmationEntry.periods[ConfirmationEntry.periods.length - 1], chart.periods[chart.periods.length - 1]);
        const array1 = [];
        const array2 = [];
        ConfirmationEntry.strategyReport.trades.forEach(element => {
            if (element.profit.p > 0) {
                array1.push(element.entry.time);
            } else {
                array2.push(element.entry.time);
            }
        });
        writeCandlestickDataToCSV(stockname, ConfirmationEntry.periods, chart.periods, array1, array2, tf);
        console.log(array1.length, array2.length);
        client.end();
    });
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchDataWithDelay() {
    // arra = arra.splice(656,);
    // for (const item of arra) {
    //     await xyz(item);
    //     await delay(1000); 
    //     console.log('Delay of 1000ms completed');
    // }
    xyz("BANKNIFTY", '1');
}

fetchDataWithDelay();
