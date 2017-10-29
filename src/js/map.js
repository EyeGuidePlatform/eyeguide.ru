YMaps.jQuery(function () {
    // Создает экземпляр карты и привязывает его к созданному контейнеру
    let map = new YMaps.Map(YMaps.jQuery("#map-sidebar")[0]);
        
    // Устанавливает начальные параметры отображения карты: центр карты и коэффициент масштабирования
    map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 11);

    let places = [
        {
            name: 'Парк Победы',
            geo: [37.504214, 55.730715]
        },
        {
            name: 'Красная площадь',
            geo: [37.621085, 55.753564]
        },
        {
            name: 'Парк Зарядье',
            geo: [37.629008, 55.751320]
        }
    ];

    let pCollection = new YMaps.GeoObjectCollection();
    
    places.forEach( (place) => {
        let point = new YMaps.GeoPoint(place.geo[0], place.geo[1]);
        let placemark = new YMaps.Placemark(point);
        placemark.name = place.name;

        pCollection.add(placemark);
    });
    
    map.addOverlay(pCollection);
});

let switcher = document.querySelector('.switcher');
switcher.onclick = (e) => {
    let target = e.target;
    
    if (target.tagName != 'BUTTON' || target.classList.contains('active')) return;
    
    let disableBtn;
    switch (target.className) {
        case 'to-guides':
            disableBtn = document.querySelector('.to-places');

            break;
        case 'to-places':
            disableBtn = document.querySelector('.to-guides');

            break;
    }

    target.classList.add('active');
    disableBtn.classList.remove('active');

    let disableBlock = document.querySelector(disableBtn.dataset.target);
    disableBlock.classList.add('hidden');

    let showBlock = document.querySelector(target.dataset.target);
    showBlock.classList.remove('hidden');
};


function switchBlock(target) {
    let disableBtn;
    switch (target.className) {
        case 'to-guides':
            disableBtn = document.querySelector('.to-places');

            break;
        case 'to-places':
            disableBtn = document.querySelector('.to-guides');

            break;
    }

    target.classList.add('active');
    disableBtn.classList.remove('active');

    let disableBlock = document.querySelector(disableBtn.dataset.target);
    disableBlock.classList.add('hidden');

    let showBlock = document.querySelector(target.dataset.target);
    showBlock.classList.remove('hidden');
}