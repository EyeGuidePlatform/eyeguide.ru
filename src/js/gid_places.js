let placesSelect = new Choices('#place_choise');
// Создает обработчик события window.onLoad
YMaps.jQuery(function () {
// Создание экземпляра карты и его привязка к созданному контейнеру
map = new YMaps.Map(document.getElementById("YMapsID"));
 
// Установка для карты ее центра и масштаба
map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 10);

// Создание меток

let places = [
    {
        name: 'Red Square',
        loc: [37.621085, 55.753564]
    }, 
    {
        name: 'Arbat str',
        loc: [ 37.591548, 55.749501]
    }
]


let allPlaces = new YMaps.GeoObjectCollection();

places.forEach( place => {
    let point = new YMaps.GeoPoint(place.loc[0], place.loc[1]),
        placemark = new YMaps.Placemark(point);
    placemark.name = place.name;
    allPlaces.add(placemark);
})

// Добавление метки на карту
map.addOverlay(allPlaces);

})

// добавление нового места гиду
const citySelect = document.getElementById('place_choise');

(async () => {
    const places = await editPlacesJSON('none');

    updatePlaces(places, citySelect.value);

    citySelect.onchange = e => {
        let newCity = e.target.value;

        updatePlaces(places, newCity);
    }
})();

function updatePlaces(places, newCity) {
    let items = [];

    places.forEach( place => {
        if (place.city == newCity) {
            const item = {
                value: place._id,
                label: place.name
            };
            items.push(item);
        }
    } );

    //Обновляем места, принадлежащие выбранному городу
    placeSelect.clearStore().setChoices(items, 'value', 'label', false);
}

async function getPlacesJSON () {
    const placesJSON = await $.getJSON('/api/editPlaces/none');

    return JSON.parse( placesJSON );
}