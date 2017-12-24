//Поле 'выбор мест'
const placeSelect = new Choices('#places', {
        removeItemButton: true
    }),
    urlParams = new URLSearchParams(window.location.search),
    selectedPlaces = urlParams.getAll('places'),

    citySelect = document.getElementById('city');


//Infinite scroll pagination
$(window).scroll(function(){
    if  (!paginationContainer.classList.contains('hidden') && ($(window).scrollTop() == $(document).height() - $(window).height())){
        loadGuides(pageNum, window.location.search.slice(1));
        pageNum++;
    }
}); 

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
            if (selectedPlaces.indexOf(place._id) != -1) {
                item.selected = true;
            }
            
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