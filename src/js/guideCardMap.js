YMaps.jQuery(function () {
    var map = new YMaps.Map(YMaps.jQuery("#YMapsID")[0]);
    
    // Устанавливает начальные параметры отображения карты: центр карты и коэффициент масштабирования
    map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 10);

    let id = document.getElementById('avatar').value;
    (async()=>{
        let cardPlaces = await getCardPlacesJSON(id);
    });
})

async function getCardPlacesJSON(id) {
    const cardPlaces = await $.getJSON(`/api/getPlacesByGuideId/${id}`);
    console.log(id);
    return JSON.parse(cardPlaces);
};