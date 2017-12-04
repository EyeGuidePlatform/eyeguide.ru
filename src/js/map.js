
let currentSelect = 'guides';
let switcher = document.querySelector('.switcher');

YMaps.jQuery(initMap);


function initMap() {
    // Создает экземпляр карты и привязывает его к созданному контейнеру
    const map = new YMaps.Map(YMaps.jQuery('#map-sidebar')[0]);
    
    map.enableScrollZoom();
    // Устанавливает начальные параметры отображения карты: центр карты и коэффициент масштабирования
    map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 11);

    let template = new YMaps.Template(
        '<div style="width: 300px; text-align:center"> \
            <img style="width: 90%" src="$[img]"> \
            <h3>$[name]</h3> \
            <p>$[description]</p> \
        </div>'
    );

    let s = new YMaps.Style(); 
    s.balloonContentStyle = new YMaps.BalloonContentStyle(template);

    const currentCity = YMaps.jQuery('.search-input')[0].value;
    
    let placesOfGuides = [],
        allPlaces = [];
    (async () => {
        placesOfGuides = await getPlacesJSON('guides', currentCity);
        allPlaces = await getPlacesJSON('city', currentCity);
        
        let gCollection = createCollection(placesOfGuides, s),
            pCollection = createCollection(allPlaces, s);
         
        showCollection(map, gCollection, placesOfGuides[0].geo);

        switcher.addEventListener('click', (e) => {
            let target = e.target;
            
            if (target.tagName != 'BUTTON' || target.classList.contains('active')) return;
            
            switchBlock(target, map, pCollection, gCollection);
        });
    })();
}

function createCollection(items, s) {
    let newCollection = new YMaps.GeoObjectCollection();
    items.forEach( item => {
        let point = new YMaps.GeoPoint(item.geo.x, item.geo.y);
        let placemark = new YMaps.Placemark(point, {style: s});
        placemark.name = item.name;
        placemark.description = item.description;
        placemark.img = item.img;

        newCollection.add(placemark);
    });

    return newCollection;
}

function showCollection(map, collection, center) {
    map.addOverlay(collection);
    map.setCenter(new YMaps.GeoPoint(center.x, center.y), 11);
}

//FIXME:
// Создать отдельный класс для свитчера
function switchBlock(target, map, pCollection, gCollection) {
    let disableBtn;
    switch (target.className) {
        case 'to-guides':
            disableBtn = document.querySelector('.to-places');
            currentSelect = 'guides';
            map.removeOverlay(pCollection);
            map.addOverlay(gCollection);

            break;
        case 'to-places':
            disableBtn = document.querySelector('.to-guides');
            currentSelect = 'places';
            map.removeOverlay(gCollection);
            map.addOverlay(pCollection);

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