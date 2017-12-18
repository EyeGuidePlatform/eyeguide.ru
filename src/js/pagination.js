const paginationContainer = $('.pagination-container')[0];

let pageNum = 2;

$(window).scroll(function(){
    if  ($(window).scrollTop() == $(document).height() - $(window).height()){
        loadElements(pageNum, window.location.search.slice(1));
        pageNum++;
    }
}); 

function loadElements(pageNum, otherQueries) {
    $.ajax({
        url: '/api/getPlaces',
        type: 'GET',
        data: 'page=' + pageNum + '&' + otherQueries,
        success: function(places){
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