

YMaps.jQuery(initMap);
function initMap(){
    map = new YMaps.Map(document.getElementById("YMapsID"));
    map.enableScrollZoom();
    
    map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 10);

    let template = new YMaps.Template(
        `<div class='balloon'> 
            <img src="$[img]"> 
            <h3>$[name]</h3> 
            <p>$[description]</p>
            <a class = 'btn btn-success mapBtn' href = '$[placeurl]'>К месту</a>
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
    // var s = new YMaps.Style();
    // s.balloonContentStyle = new YMaps.BalloonContentStyle(
    //     new YMaps.Template("<div style=\"color:#0A0; width: 300px;\">$[description]</div>")
    // );
    
    // var placemark = new YMaps.Placemark(new YMaps.GeoPoint(37.7,55.7), {style: s} );
    // placemark.description = "Добро пожаловать на Яндекс.Карты!";
    // map.addOverlay(placemark);    
    // placemark.openBalloon();
}

async function getPlacesJSON(id) {
    const placesJSON = await $.getJSON(`/api/getPlacesByGuideId/${id}`);
    return JSON.parse(placesJSON);
}
