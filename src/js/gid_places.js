// Создает обработчик события window.onLoad
YMaps.jQuery(function () {
// Создание экземпляра карты и его привязка к созданному контейнеру
map = new YMaps.Map(document.getElementById("YMapsID"));
 
// Установка для карты ее центра и масштаба
map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 10);

// Создание метки
const  placemark1 = new YMaps.Placemark(
    new YMaps.GeoPoint(37.64, 55.76), 
    {style: "default#photographerIcon"}
),
    placemark2 = new YMaps.Placemark(
        new YMaps.GeoPoint(37.60, 55.76), 
        {style: "default#photographerIcon"}
    )

placemark1.name = "Название места №1";
placemark1.description = "Описание места №1";

placemark2.name = "Название места №2";
placemark2.description = "Описание места №2";

// Добавление метки на карту
map.addOverlay(placemark1);
map.addOverlay(placemark2);
})
