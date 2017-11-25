let placesSelect = new Choices('#place_choise');

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

    let places = [];
    (async () => {
        places = await getPlacesJSON()

        let pCollection = new YMaps.GeoObjectCollection();

        places.forEach(place => {
            let point = new YMaps.GeoPoint(place.geo.x, place.geo.y);
            let placemark = new YMaps.Placemark(point, { style: s });
            placemark.name = place.name;
            placemark.description = place.description;
            placemark.img = place.img;

            pCollection.add(placemark);
        });

        map.addOverlay(pCollection);
        map.setCenter(new YMaps.GeoPoint(places[0].geo.x, places[0].geo.y), 10);
    })();

});

async function getPlacesJSON() {
    const places = await $.getJSON(`/api/getMyPlaces`)
    return JSON.parse(places)
};
// =================================================
// modal window
// =================================================
const total = document.querySelector('#total-people')
const total_label = document.querySelector('#form-label')

const duration = document.querySelector('#duration')
const duration_label = document.querySelector('#form-duration')

const modal = document.querySelector('#myModal form')
const place = document.querySelector('#place_choise')
const placeForm = document.querySelector('#place-form')

total.addEventListener('input', (e) => {
    total_label.textContent = `Максимальное количество человек:  ${e.target.value}`
});
duration.addEventListener('input', (e) => {
    duration_label.textContent = `Длительность экскурсии в часах:  ${e.target.value}`
});

placeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (place.value !== 'Выберите место') {
        $('#myModal').modal('toggle')
    }
})

modal.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(document.forms.excursion)
    const buffer = {}

    formData.append('place', place.value)

    for (var pair of formData.entries()) {
        buffer[pair[0]] = pair[1]
    }

    $('#myModal').modal('toggle');

    $.post('/guidePlaceAdd', buffer, (data) => {
       if (typeof data.redirect == 'string') window.location = data.redirect
    })

    
})