# collectedData

## Использованные сервисы:
1. tutu.ru
2. Яндекс.Расписание API

### Этапы сбора данных:
1. Определение id станций для использования API Яндекс.Расписания (в API Яндекс.Расписания нет возможности корректно извлечь большое количество станций с их id в каком либо виде кодировки. Был произведен поиск иных ресурсов и единственным сервисом, удовлетворившим потребность в id оказался tutu.ru: выгрузка csv файла со станциями отправления и прибытия и их id в формате Экспресс-3 + обработка и стандартизация файла).
2. Обращение к API Яндекс.Расписания с помощью id Экспресс-3: 
    * Получение информации о поездах, доступных со станции отправления до станции прибытия (f'https://api.rasp.yandex.net/v3.0/search/?apikey={apikey}&format=json&from={from}&to={to}&transport_types=train&system=express&lang=ru_RU&date={date}').
    * Получение информации об остановках, которые совершает конкретный поезд с помощью uid, полученного в предыдущем запросе (f'https://api.rasp.yandex.net/v3.0/thread/?apikey={apikey}&format=json&uid={uid}&lang=ru_RU&show_systems=all').
3. Обработка данных для их стандартизации.

## Ограничения данных:
1. Данные получены за 2 дня и растянуты далее на 3 месяца (вследствии ограничения на кол-во запросов API Яндекс.Расписания: 500 в сутки).
2. Отсутствие информации о наличии багажного купе (Яндекс.Расписание такие данные не предоставляет, а обогащать данные с помощью сайта ржд повышает трудозатраты на получение данных)
