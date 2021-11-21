const fs = require('fs');

const finalData = JSON.parse(fs.readFileSync('threadData.json', (err, data) => (data)))


const file = 'spb-moscow';
const dbData = JSON.parse(fs.readFileSync(`./threadsData/${file}.json`, (err, data) => (data)))

fs.writeFileSync('threadData.json', JSON.stringify([...finalData, ...dbData]));