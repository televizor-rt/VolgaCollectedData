const fetch = require("node-fetch");
const fs = require("fs");
const tokenKey = "45bd42c9-de3e-4a0b-b22e-c245d042d886";


const getFlightSchedulesBetweenStations =  ({from, to, date="2021-11-21"}) => {

    const url = `https://api.rasp.yandex.net/v3.0/search/?apikey=${tokenKey}&format=json&from=${from}&to=${to}&transport_types=train&system=express&lang=ru_RU&page=1&result_timezone=Europe/Moscow&date=2021-11-21`;
    return new Promise(( (resolve, reject) => {
        fetch(url).then(async res => {
            const response = await res.json();

            resolve(response.segments);
        })
    } ))

}

//getFlightSchedulesBetweenStations({})

const moscow = [
    2000000,
    2000006,
    2000003,
    2000007,
    2000001,
    2006004,
    2000005,
    2000008,
    2000009,
    2000002
]
//10


const spb = [
    2004005,
    2004003,
    2004006,
    2004001,
    2004004
]
//5

const krasnodar = [
    2064800
]

//1


//spb -moscow = 100  === 700
//moscow - krasnodar = 20 = 140
//spb - crasnodar = 10  = 70

const getThreadsFromTo = async () => {
    const data = [];


    for(let i = 0; i < moscow.length; i++){
        for(let j = 0; j < spb.length; j++){
            const threads = await getFlightSchedulesBetweenStations({from: moscow[i], to: spb[j]});
            const dataName = `./spbAndMoscow/moscow-spb/moscow${moscow[i]}-spb${spb[j]}`
            fs.writeFileSync(`${dataName}.json`, JSON.stringify(threads));
            const dbData = JSON.parse(fs.readFileSync(`${dataName}.json`, (err, data) => (data)));
            fs.writeFileSync(`${dataName}.json`, JSON.stringify([...dbData, ...threads]));
            // const text = fs.readFileSync(`${dataName}.json`, 'utf8');
        }
    }
}


getThreadsFromTo();
