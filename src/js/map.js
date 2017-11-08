YMaps.jQuery(function () {
    // Создает экземпляр карты и привязывает его к созданному контейнеру
    let map = new YMaps.Map(YMaps.jQuery("#map-sidebar")[0]);
    
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

    let places = [
        {
            name: 'Парк Победы',
            description: 'Один из крупнейших в России и в мире мемориальных комплексов, площадь которого 135 га, посвящен победе в Великой Отечественной войне.',
            img: '/img/park_pobedy.jpg',
            geo: [37.504214, 55.730715]
        },
        {
            name: 'Красная площадь',
            description: 'Главная площадь Москвы, расположенная в центре радиально-кольцевой планировки города между Московским Кремлём и Китай-городом. Также неофициально является главной площадью страны.',
            img: '/img/red_square.jpg',
            geo: [37.621085, 55.753564]
        },
        {
            name: 'Парк Зарядье',
            description: 'Объект в одноимённом историческом районе Москвы, созданный на месте снесённой в 2006 году гостиницы «Россия». Расположен на территории площадью в 13 га между Китайгородским проездом, улицей Варваркой и Москворецкой набережной.',
            img: '/img/zaryade.jpg',
            geo: [37.629008, 55.751320]
        }
    ];

    let pCollection = new YMaps.GeoObjectCollection();
    
    places.forEach( (place) => {
        let point = new YMaps.GeoPoint(place.geo[0], place.geo[1]);
        let placemark = new YMaps.Placemark(point, {style: s});
        placemark.name = place.name;
        placemark.description = place.description;
        placemark.img = place.img;

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