$('.new_order').on('submit', (e) => {
    e.preventDefault();
    $.ajax({
        url: `/order/confirm/${e.currentTarget.id}`,
        type: 'PUT',
        success: function() {
            location.reload()
        }
     });

});

$('.current_order').on('submit', (e) => {
    e.preventDefault();
    $.ajax({
        url: `/order/done/${e.currentTarget.id}`,
        type: 'PUT',
        complete: function() {
            location.reload()
        }
    })
})