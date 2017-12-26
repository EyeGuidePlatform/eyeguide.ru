const paginationContainer = $('.pagination-container')[0],
    loader = document.querySelector('.loader'),
    total = loader.dataset.total;

let pageNum = 2;

function loadPlaces(pageNum, otherQueries) {
    $('.loader').show('fast');
    $.ajax({
        url: '/api/getPlaces',
        type: 'GET',
        data: 'page=' + pageNum + '&' + otherQueries,
        success: function(places){
            $('.loader').hide('1000');
            places.forEach((place) => {
                paginationContainer.innerHTML += 
                    `<a href="/place/${ place._id }" class="element col-lg-4 col-md-6 col-sm-12 col-xs-12">
                        <div style="background-image: url('${ place.img }')" class="element-img col-md-12"></div>
                        <div class="element-info col-md-12">
                            <h3 class="element-name">${ place.name }</h3>
                            <p class="element-stats">
                                ${ place.description.slice(0,110) }...
                            </p>
                        </div>
                    </a>`
            });
        }
    });
}

function loadGuides(pageNum, otherQueries) {
    $('.loader').show();
    $.ajax({
        url: '/api/getGuides',
        type: 'GET',
        data: 'page=' + pageNum + '&' + otherQueries,
        success: function(guides){
            $('.loader').hide();
            guides.forEach((guide) => {
                paginationContainer.innerHTML += 
                    `<a href="/profile/${ guide._id }" class="element col-lg-4 col-md-6 col-sm-12 col-xs-12">
                        <div style="background-image: url('${ guide.img }')" class="element-img col-md-12"></div>
                        <div class="element-info col-md-12">
                            <h3 class="element-name">${ guide.name }</h3>
                            <p class="element-stats">
                                ${ guide.info.hours } часов экскурсии<br>
                                ${ guide.info.tours } проведенных экскурсий<br>
                                ${ guide.info.happy } счастливых туристов
                            </p>
                        </div>
                    </a>`
            });
        }
    });
}