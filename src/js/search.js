const urlParams = new URLSearchParams(window.location.search),
    selectedCity = urlParams.get('city');

// map
YMaps.jQuery(function () {

    map = new YMaps.Map(document.getElementById("YMapsID"));
    map.enableScrollZoom();

    map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 10);
    let template = new YMaps.Template(
        `<div class='balloon'> 
                <img src="$[img]"> 
                <h3>$[name]</h3> 
                <p>$[description]</p> 
            </div>`
    );

    let s = new YMaps.Style();
    s.balloonContentStyle = new YMaps.BalloonContentStyle(template);

    var mama = 1;

    let places = [];
    (async () => {
        console.log(selectedCity);
        if (selectedCity) {
            places = await getPlacesJSON('city', selectedCity);
        } else {
            places = await getPlacesJSON('allPlaces');
        }

        let pCollection = new YMaps.GeoObjectCollection();

        places.forEach(place => {
            let point = new YMaps.GeoPoint(place.geo.y, place.geo.x);
            let placemark = new YMaps.Placemark(point, { style: s });
            placemark.name = place.name;
            placemark.description = place.description;
            placemark.img = place.img;

            pCollection.add(placemark);
        });

        map.addOverlay(pCollection);
        map.setCenter(new YMaps.GeoPoint(places[0].geo.y, places[0].geo.x), 10);
    })();

});

// switcher

const switcher = document.querySelector('.switcher')

switcher.onclick = (e) => {
    let target = e.target;
    if (target.tagName != 'BUTTON' || target.classList.contains('active')) return;

    let disableBtn;
    switch (target.className) {
        case 'to-places':
            disableBtn = document.querySelector('.to-placesMap');
            break;
        case 'to-placesMap':
            disableBtn = document.querySelector('.to-places');
            break;
    }

    target.classList.add('active');
    disableBtn.classList.remove('active');

    let disableBlock = document.querySelector(disableBtn.dataset.target);
    disableBlock.classList.add('hidden');

    let showBlock = document.querySelector(target.dataset.target);
    showBlock.classList.remove('hidden');
};

function toggleThis(target) {
        target.forEach( elem => {
            elem.classList.toggle('hidden');
        }, this);
}

async function getPlacesJSON (attr, param) {
    const placesJSON = await $.getJSON('/api/getPlaces/' + attr + '=' + param);

    return JSON.parse( placesJSON );
}
