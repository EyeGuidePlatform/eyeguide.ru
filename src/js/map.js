const currentCity = $('.search-input')[0].value;

let currentSelect = 'guides',
    switcher = $('.switcher')[0];

/*YMaps.jQuery(initMap);


function initMap() {
    (async () => {
        // Создает экземпляр карты и привязывает его к созданному контейнеру
        const map = new YMaps.Map(YMaps.jQuery('#map-sidebar')[0]);
        
        map.enableScrollZoom();
        // Устанавливает начальные параметры отображения карты: центр карты и коэффициент масштабирования
        map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 11);

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

        let allPlaces = await getPlacesJSON('city', currentCity);
            
        let pCollection = createCollection(allPlaces, s);
        showCollection(map, pCollection, allPlaces[0].geo);
        

        switcher.addEventListener('click', (e) => {
            let target = e.target;
            
            if (target.tagName != 'BUTTON' || target.classList.contains('active')) return;
            
            switchBlock(target, pCollection);
        });
    })();
}*/

function createCollection(items, s) {
    let newCollection = new YMaps.GeoObjectCollection();
    items.forEach( item => {
        let point = new YMaps.GeoPoint(item.geo.y, item.geo.x);
        let placemark = new YMaps.Placemark(point, {style: s});
        placemark.name = item.name;
        placemark.description = item.description;
        placemark.img = item.img;
        placemark.placeurl = "/place/" + item._id;
        newCollection.add(placemark);
    });

    return newCollection;
}

function showCollection(map, collection, center) {
    map.addOverlay(collection);
    map.setCenter(new YMaps.GeoPoint(center.y, center.x), 11);
}

//FIXME:
// Создать отдельный класс для свитчера
function switchBlock(target, pCollection, gCollection) {
    let disableBtn;
    switch (target.className) {
        case 'to-guides':
            disableBtn = document.querySelector('.to-places');
            currentSelect = 'guides';

            break;
        case 'to-places':
            disableBtn = document.querySelector('.to-guides');
            currentSelect = 'places';

            break;
    }

    target.classList.add('active');
    disableBtn.classList.remove('active');

    let disableBlock = document.querySelector(disableBtn.dataset.target);
    disableBlock.classList.add('hidden');

    let showBlock = document.querySelector(target.dataset.target);
    showBlock.classList.remove('hidden');
}

async function getPlacesJSON (attr, param) {
    const placesJSON = await $.getJSON('/api/getPlaces/' + attr + '=' + param);

    return JSON.parse( placesJSON );
}

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

        let places = await getPlacesJSON('city', currentCity);
        //console.log(places);
        let placemarks = [];

        map = new ymaps.Map('map-sidebar',{
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

        switcher.addEventListener('click', (e) => {
            let target = e.target;
            
            if (target.tagName != 'BUTTON' || target.classList.contains('active')) return;
            
            switchBlock(target, pCollection);
        });
    })();

});