// const axios = require('axios');
//
// axios.get("").then(res=>{
//     console.log(res)
// }).catch(err=>{
//     console.log(err)
// })

const fetch = require("node-fetch");
const tokenKey = "45bd42c9-de3e-4a0b-b22e-c245d042d886"
const url = `https://api.rasp.yandex.net/v3.0/stations_list/?apikey=${tokenKey}&lang=ru_RU&format=json`



//res.countries[29].regions[53(питер-ленингрОбл)][134(питре)].stations[2(московский вокзал)].codes.esr_code
const getStantions = async () => {
    const url = `https://api.rasp.yandex.net/v3.0/stations_list/?apikey=${tokenKey}&format=json&lang=ru_RU`
    await fetch(url).then(async res => {
        const response = await res.json();
        console.log(response);
    })
}

// getStantions()

const getFlightSchedulesBetweenStations = async ({from='2004001', to = "2006004", date="2021-11-22"}) => {

    const url = `https://api.rasp.yandex.net/v3.0/search/?apikey=${tokenKey}&format=json&from=${from}&to=${to}&transport_types=train&system=express&lang=ru_RU&date=2021-11-21`;
//&page=1&date=2021-11-21
    await fetch(url).then(async res => {
        const response = await res.json();
        console.log(response)
    })
}
 //
 // getFlightSchedulesBetweenStations({})


const getFollowingStations = async () => {
    const uid="678YA_1_2";
    const url = `https://api.rasp.yandex.net/v3.0/thread/?apikey=${tokenKey}&format=json&uid=${uid}&lang=ru_RU&show_systems=all&result_timezone=Europe/Moscow&date=2021-11-21`

    await fetch(url).then(async res => {
        const response = await res.json();
        console.log(response)
    })
}
//
getFollowingStations()
//2021-11-21 15:25:00

//
// две задачи
//
// 1. Саша делает выгрузгу станций
// 2. выгрузка все маршрутов
// список из маршрутов на ближайшие 3 месяца.
// номер поезда:
// список станций поезда:{
//     прибытие
//     отпрвление
// }
// gu_id
// номео поезда{
//
// }
//
//
// выгружать информацию о всех поездов долго. ВЫгрузить не все станции, а набор в каком то регионе(например спб)






const data = [

]

