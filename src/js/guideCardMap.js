
// Создает обработчик события window.onLoad
YMaps.jQuery(function () {
    // Создает экземпляр карты и привязывает его к созданному контейнеру
    var map = new YMaps.Map(YMaps.jQuery("#YMapsID")[0]);            
    // Устанавливает начальные параметры отображения карты: центр карты и коэффициент масштабирования
    map.enableScrollZoom();
    map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 10);
    // var coordinates = ;
    var placemark = new YMaps.Placemark(new YMaps.GeoPoint(37.609218,55.753559));
    
    // Устанавливает содержимое балуна
    placemark.name = "Москва";
    placemark.description = "Столица Российской Федерации";
    
    // Добавляет метку на карту
    map.addOverlay(placemark); 
})