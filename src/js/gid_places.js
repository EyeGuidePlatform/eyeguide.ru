let placesSelect = new Choices('#place_choise');

ymaps.ready(function () {
    let places = [];
    (async () => {

        let MainBalloonLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="balloon">' +
            '<img class="balloonImg" src="$[properties.img]">'+ 
            '<h3>$[properties.name]</h3>'+
            '<p>$[properties.description]</p>'+
            '<a class="btn btn-success btn-sm balloonBtn" href="$[properties.placeurl]">Подробнее...</a>',
            +'</div>',
            {
    
            build: function () {
                BalloonContentLayout.superclass.build.call(this);
                $('#counter-button').bind('click', this.onCounterClick);
                $('#count').html(counter);
            },
    
            clear: function () {
                $('#counter-button').unbind('click', this.onCounterClick);
                BalloonContentLayout.superclass.clear.call(this);
            }
        }),
        ClasterContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="cluster-balloon-item" [if data.isSelected]style="font-weight: bold;"[endif]>$[properties.name]</div>'
        ),
        ClaterBallonLayout = ymaps.templateLayoutFactory.createClass(
            '<div>'+
            '<h3>7777$[clusterCaption]</h3>'+
            '<p>$[properties.description]</p>'+
            '</div>'
        );

        places = await getPlacesJSON();

        let placemarks = [];

        map = new ymaps.Map("YMapsID",{
                    center: [places[0].geo.x, places[0].geo.y],
                    behaviors: ["default", "scrollZoom"],
                    zoom: 11,
                },
                {
                    geoObjectClusterDisableClickZoom: true
                }
            );
            let clusterer = new ymaps.Clusterer({
                clusterDisableClickZoom: false,
                BalloonMainContentLayout: MainBalloonLayout,
            });
            places.forEach(place => {
                let placemark = new ymaps.Placemark([place.geo.x, place.geo.y],
                    {
                        name: place.name,
                        description: place.description,
                        img: place.img,
                        placeurl: "/place/" + place._id,
                        clusterCaption: place.name
                    },
                    {
                        balloonContentLayout: MainBalloonLayout
                    });
                placemarks.push(placemark);    
            });
            clusterer.add(placemarks);

            map.geoObjects.add(clusterer);
        map.controls.add('zoomControl', { left: 5, top: 5 })
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
    console.log(buffer);
    console.log('-----');
    //for 

    let prices = []
    const totalPrices = (Object.keys( buffer ).length - 2)/3;

    for (let i = 1; i <= totalPrices; i++) {
        prices.push({
            price: +buffer[`price${i}`],
            people:[+buffer[`peopleMin${i}`], +buffer[`peopleMax${i}`] ]
        })
    }

    //alert('worked');
    const formPOST = {}
    formPOST.text = $('#text1').val();
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