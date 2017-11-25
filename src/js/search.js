const switcher = document.querySelector('.switcher'),
      guideOptions = document.querySelectorAll('.search_lang, .search_place, .search_сar')
switcher.onclick = (e) => {
    let target = e.target;
    if (target.tagName != 'BUTTON' || target.classList.contains('active')) return;
    
    let disableBtn;
    switch (target.className) {
        case 'to-guides':
            disableBtn = document.querySelector('.to-places');
            toggleThis(guideOptions);
            break;
        case 'to-places':
            disableBtn = document.querySelector('.to-guides');
            toggleThis(guideOptions);
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


//Поле 'выбор мест'
const placeSelect = new Choices('#places', {
        removeItemButton: true
    }),

    citySelect = document.getElementById('city');

(async () => {
    const places = await getPlacesJSON('city', 'none');

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

async function getPlacesJSON (attr, param) {
    const placesJSON = await $.getJSON('/api/getPlaces/' + attr + '=' + param);

    return JSON.parse( placesJSON );
}