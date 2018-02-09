async function getPlacesJSON(id) {
    const placesJSON = await $.getJSON(`/api/getPlacesByGuideId/${id}`);
    return JSON.parse(placesJSON);
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

        places = await getPlacesJSON(document.querySelector('#avatar').getAttribute('value'));

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