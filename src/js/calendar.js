let arrayOfDates = [];
var myDatepicker = $('#calendar').datepicker({
    onSelect: function(fd, d, picker){
        console.log(d);
        arrayOfDates = d;
    },
    onRenderCell: function(date, cellType) {
        if (cellType == 'day' && date.getDate() == 11) {
            return {
                classes: '-selected-'
            }
        }
    }
}).data('datepicker');
$('.btn-calendar').click(function(){
    let dateData = {};
    dateData.weekends = arrayOfDates;
    $.ajax({
        data: dateData,
        method: "POST",
        url: '/guideOptions',
        success: console.log("success")
    });
});

console.log($('#calendar').attr('value'));