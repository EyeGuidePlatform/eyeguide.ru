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
});



// this is what you got without react
function modalGroup(minVal) {
    return (
        `
               <div class="price">
                   <span>Количество человек: </span>
                   <label>от
                       <input type="number" value=${minVal} min=${minVal} max=6 readonly>
                   </label>
                   <label>до
                       <input type="number" value=${minVal} min=${minVal} max=6>
                   </label>
                   <br>
                   <span>Цена за одного человека:</span>
                   <input type="number" min=0>
               </div>
       `
    )
}

const addNewPrice = document.querySelector('.modal__add')
const removePrice = document.querySelector('.modal__remove')
const modalBody = document.querySelector('.modal-body')
addNewPrice.addEventListener('click', (e) => {
    e.preventDefault();
    setDisable()
    let n = $('.modal-body .form-group:nth-last-child(2) input')[1]
    if (n.value >= 1) removePrice.classList.remove('none')
    if (n.value >= 6) return;
    let div = document.createElement('div');
    div.className = `form-group`
    div.innerHTML = modalGroup(+n.value + 1);
    modalBody.insertBefore(div, document.querySelector('#duration'))
})

removePrice.addEventListener('click', (e) => {
    e.preventDefault();
    let n = checkInputPrice()
    let node = $('.modal-body .form-group:nth-last-child(2)');
    node.remove()
    if (checkInputPrice()[0].value == 1) removePrice.classList.add('none');
    setDisable()
})

function checkInputPrice() {
    return $(`.modal-body .form-group:nth-last-child(2) input`)
};

function setDisable() {
    let buffer = $('.modal-body .form-group:nth-last-child(2) input');
    buffer[1].readOnly = !buffer[1].readOnly
};