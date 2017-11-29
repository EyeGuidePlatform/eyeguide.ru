
/*
YMaps.jQuery(initMap);
function initMap(){
    const map = new YMaps.Map(YMaps.jQuery("#YMapsID")[0]);
    
    // Устанавливает начальные параметры отображения карты: центр карты и коэффициент масштабирования
    map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 10);
    map.enableScrollZoom();

    let template = new YMaps.Template(
        '<div style="width: 300px; text-align:center"> \
            <img style="width: 90%" src="$[img]"> \
            <h3>$[name]</h3> \
            <p>$[description]</p> \
            <a href="$[placeurl]">Перейти к месту...</a> \
        </div>'
    );

    let s = new YMaps.Style();
    s.BalloonContentStyle = new YMaps.BalloonContentStyle(template);

    (async () => {
        let place = await getPlaceByIdJSON(document.querySelector('#avatar').getAttribute('value'));
        place.forEach(place => {
            let placemark = new YMaps.Placemark(new YMaps.GeoPoint(place.geo.x, place.geo.y), {style: s});
            placemark.name = place.name;
            placemark.description = place.description;
            placemark.img = place.img;
            placemark.placeurl = '/place/' + place._id;
            map.addOverlay(placemark);
        });
    })();
}

async function getPlaceByIdJSON(id) {
    const placeJSON = await $.getJSON(`'/api/getPlace/${id}'`);
    return JSON.parse(placeJSON);
}

