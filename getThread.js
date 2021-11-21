const fetch = require("node-fetch");
const fs = require("fs");
const tokenKey = "45bd42c9-de3e-4a0b-b22e-c245d042d886"
var uuid = require('uuid');








const getFollowingStations = async ({uid}) => {
    // const uid="678YA_1_2";
    const url = `https://api.rasp.yandex.net/v3.0/thread/?apikey=${tokenKey}&format=json&uid=${uid}&lang=ru_RU&show_systems=all&result_timezone=Europe/Moscow&date=2021-11-21`

    return new Promise((resolve=>{
        fetch(url).then(async res => {
            const response = await res.json();
            resolve(response)
        })
    }))
}


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

const getData = async () =>{
    const threads = []
    for(let i = 0; i < moscow.length; i++) {
        for (let j = 0; j < spb.length; j++) {
            const fileName = `moscow${moscow[i]}-spb${spb[j]}`;
            const text = JSON.parse(fs.readFileSync(`./spbAndMoscow/moscow-spb/${fileName}.json`, 'utf8'));
                for (let k = 0; k < text.length; k++) {
                    const uid = text[k].thread.uid;
                    const uuId = uuid.v4();
                    const threadInfo = await getFollowingStations({uid});
                    if(threadInfo.error){
                        continue;
                    }
                    const stops = threadInfo.stops;
                    const thread = text[k].thread;

                    const data = {
                        "id": uuId,
                        "trainRouteId": uid,
                        "additionalData": {
                            "name": thread.title,
                            "number": thread.number
                        },
                        "stops": (() => {
                            return stops.map((stop) => {
                                const stop_timeInSeconds = stop.stop_time;
                                return {
                                    "id": uuId,
                                    "expressId": stop.station.codes.express,
                                    "moscowArriveTime": stop.arrival,
                                    "moscowDepartureTime": stop.departure,
                                    "stopTime": stop_timeInSeconds,
                                    "additionalData": {
                                        "stationName": stop.station.title
                                    }
                                }
                            })
                        })()
                    }
                    threads.push(data);
            }
        }
    }
    fs.writeFileSync('./threadsData/moscow-spb.json', JSON.stringify(threads));
    // const dbData = JSON.parse(fs.readFileSync('./threadsData/krasnodar-spb.json', (err, data) => (data)))
    //
    // fs.writeFileSync('./threadsData/krasnodar-spb.json', JSON.stringify([...dbData, ...threads]));

    //
    // const dbData = JSON.parse(fs.readFileSync('./threadsData/krasnodar-spb.json', (err, data) => (threads)))
    //
    // fs.writeFileSync('./threadsData/krasnodar-spb.json', JSON.stringify([...dbData, ...threads]));


}

getData()