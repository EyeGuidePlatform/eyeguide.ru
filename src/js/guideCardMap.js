YMaps.jQuery(initMap);
function initMap(){
    map = new YMaps.Map(document.getElementById("YMapsID"));
    map.enableScrollZoom();
    
    map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 10);

    let template = new YMaps.Template(
        `<div class='balloon'> 
            <img class = "balloonImg" src="$[img]"> 
            <h3>$[name]</h3> 
            <p>$[description]</p>
            <a class = 'btn btn-success btn-lg balloonBtn' href = '$[placeurl]'>Подробнее</a>
        </div>`
    );

    let s = new YMaps.Style();
    s.balloonContentStyle = new YMaps.BalloonContentStyle(template);
    
    let places = [];
    (async () => {
        let pCollection = new YMaps.GeoObjectCollection();
        places = await getPlacesJSON(document.querySelector('#avatar').getAttribute('value'));
        places.forEach(place => {
            let point = new YMaps.GeoPoint(place.geo.y, place.geo.x);
            let placemark = new YMaps.Placemark(point, { style: s });
            placemark.name = place.name;
            placemark.description = place.description;
            placemark.img = place.img;
            placemark.placeurl = "/place/" + place._id;
            pCollection.add(placemark);
        });

        map.addOverlay(pCollection);
        map.setCenter(new YMaps.GeoPoint(places[0].geo.y, places[0].geo.x), 10);
    })();
}

async function getPlacesJSON(id) {
    const placesJSON = await $.getJSON(`/api/getPlacesByGuideId/${id}`);
    return JSON.parse(placesJSON);
}
