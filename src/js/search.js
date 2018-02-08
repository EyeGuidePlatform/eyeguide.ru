const urlParams = new URLSearchParams(window.location.search),
    selectedCity = urlParams.get('city');

//Поле 'выбор мест'
const placeSelect = new Choices('#place', {
    removeItemButton: true
}),
    selectedPlace = urlParams.get('place'),

    citySelect = document.getElementById('city');


//Infinite scroll pagination
$(window).scroll(function(){
    if  (!paginationContainer.classList.contains('hidden') && ($(window).scrollTop() >= $(document).height() - $(window).height() - 1)){
        if (pageNum > total) return 
        
        loadPlaces(pageNum, window.location.search.slice(1));
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
    let items = [{value: null, label: ''}];

    places.forEach( place => {
        if (place.city == newCity) {
            const item = {
                value: place._id,
                label: place.name
            };
            if (selectedPlace == place._id) {
                item.selected = true;
            }
            
            items.push(item);
        }
    } );

    //Обновляем места, принадлежащие выбранному городу
    placeSelect.clearStore().setChoices(items, 'value', 'label', false);
}

// map
ymaps.ready(function () {
    let places = [];
    (async () => {

        let BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            //'<div >' +
            '<img class ="balloonImg" src="$[properties.img]">'+ 
            '<h3>$[properties.name]</h3>'+
            '<p>$[properties.description]</p>'+
            '<a class="btn btn-success btn-lg balloonBtn" href="$[properties.placeurl]">Подробнее...</a>',
            //+'</div>',
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
        });

        if (selectedPlace) {
            places.push(await getPlacesJSON('id', selectedPlace));
        } else if (selectedCity) {
            places = await getPlacesJSON('city', selectedCity);
        } else {
            places = await getPlacesJSON('allPlaces');
        }

        let placemarks = [];
        places.forEach(place => {
            let placemark = new ymaps.Placemark([place.geo.x, place.geo.y],
                {
                    name: place.name,
                    description: place.description,
                    img: place.img,
                    placeurl: "/place/" + place._id
                },
                {
                    balloonContentLayout: BalloonContentLayout
                });
            placemarks.push(placemark);    
        });

        map = new ymaps.Map("YMapsID",{
                    center: [places[0].geo.x, places[0].geo.y],
                    behaviors: ["default", "scrollZoom"],
                    zoom: 10,
                },
                {
                    geoObjectClusterDisableClickZoom: true
                }
            );
            let clusterer = new ymaps.Clusterer({
                // Поскольку опции задаются для кластеров, а не для всего
                // кластеризатора, им нужно приписать префикс 'cluster'.
                clusterDisableClickZoom: true,
        
                // Если нужно задать опции для балуна кластера, то к названию
                // опции приписываются сразу 2 префикса - 'cluster' и 'balloon'.
                clusterBalloonMainContentLayout: BalloonContentLayout,
                //clusterBalloonSidebarItemLayout: BalloonContentLayout,
                // Настроим ширину левой части балуна кластера
                clusterBalloonSidebarWidth: 100,
                // и ширину балуна целиком.
                clusterBalloonWidth: 300
            });
            clusterer.add(placemarks);
            /*placemarks.map(placemark => {
                map.geoObjects.add(placemark)
            });*/

            map.geoObjects.add(clusterer);
        map.controls.add('zoomControl', { left: 5, top: 5 })
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
