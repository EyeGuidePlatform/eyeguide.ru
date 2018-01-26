let placesSelect = new Choices('#place_choise');

YMaps.jQuery(function () {

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
        places = await getPlacesJSON()

        let pCollection = new YMaps.GeoObjectCollection();

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

    for (let pair of formData.entries()) {
        buffer[pair[0]] = pair[1]
    }
    let prices = []
    const totalPrices = (Object.keys( buffer ).length - 2)/3;

    for (let i = 1; i <= totalPrices; i++) {
        prices.push({
            price: +buffer[`price${i}`],
            people:[+buffer[`peopleMin${i}`], +buffer[`peopleMax${i}`] ]
        })
    }

    const formPOST = {}
    formPOST.place = buffer['place'];
    formPOST.duration = buffer['duration'];
    formPOST.price = prices
    $('#myModal').modal('toggle');

    $.post('/guidePlaceAdd', formPOST, (data) => {
        if (typeof data.redirect == 'string') window.location = data.redirect
    })
});



// this is what you got without react
function modalGroup(minVal, counter) {
    return (
        `
               <div class="price">
                   <span>Количество человек: </span>
                   <label>от
                       <input type="number" name="peopleMin${counter}" value=${minVal} readonly>
                   </label>
                   <label>до
                       <input type="number" name="peopleMax${counter}" value=${minVal} min=${minVal}>
                   </label>
                   <br>
                   <span>Цена за одного человека:</span>
                   <input type="number" name="price${counter}" min=0 required>
               </div>
       `
    )
}

const addNewPrice = document.querySelector('.modal__add')
const removePrice = document.querySelector('.modal__remove')
const modalBody = document.querySelector('.modal-body')
let counter = 1;
addNewPrice.addEventListener('click', (e) => {
    e.preventDefault();
    
    let n = checkInputPrice()[1].value
    let input1 = checkInputPrice()[0].value
    if (n <= input1-1) {
        return
    }
    setDisable()
    if (n >= 1) removePrice.classList.remove('none')
    let div = document.createElement('div');
    div.className = `form-group`
    div.innerHTML = modalGroup(+n + 1, ++counter);
    modalBody.insertBefore(div, document.querySelector('#duration'))
})

removePrice.addEventListener('click', (e) => {
    e.preventDefault();
    let n = checkInputPrice()
    let node = $('.modal-body .form-group:nth-last-child(2)');
    node.remove()
    if (checkInputPrice()[0].value == 1) removePrice.classList.add('none');
    setDisable()
    counter--;
})

function checkInputPrice() {
    return $(`.modal-body .form-group:nth-last-child(2) input`)
};

function setDisable() {
    let buffer = $('.modal-body .form-group:nth-last-child(2) input');
    buffer[1].readOnly = !buffer[1].readOnly
};