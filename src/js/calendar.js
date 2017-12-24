let weekendsToDownload = $('#calendar').attr('value').split(",");
let weekendsToUpload = [];
let datepicker = $('#calendar').datepicker({
    onSelect: function (fd, d, picker) {
        weekendsToUpload = d;
    }
}).data('datepicker');
if (weekendsToDownload.length !== 1) {
    for (let i = 0; i < weekendsToDownload.length; i++) {
        let date = new Date(weekendsToDownload[i]);
        datepicker.selectDate(date);
    }
}

$('.btn-calendar').click(function () {
    let dateData = {};
    dateData.weekends = weekendsToUpload;
    $.ajax({
        data: dateData,
        method: "POST",
        url: '/guideOptions'
    }).done(function () {
        $('.btn-calendar').text("Сохранено!").attr('disabled', 'disabled');
    });
});