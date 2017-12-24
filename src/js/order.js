let ISODate = document.querySelector('.date').getAttribute('value');
let months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", 
            "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
date = new Date(ISODate);
currentDate = date.getDate();
currentMonth = months[date.getMonth()];
currentYear = date.getFullYear();
currentHours = date.getHours();
currentMinutes = date.getMinutes();
if(currentHours < 10){
    currentHours = '0' + currentHours;
}
if(currentMinutes < 10){
    currentMinutes = '0' + currentMinutes;
}
let stringDate = currentDate + ' ' + currentMonth + " " + currentYear + 'г.' + ' в ' + currentHours + ':' + currentMinutes;
$('.date').append(stringDate);

let status = $('p span').attr('value');
let mark = $('.stars').attr('value');
$('input:radio').click(function(){
    $('.btn-rate').removeAttr('disabled');
});
switch(status){
    case '0':
        $('p span').append('Заявка подана').css({'color':'grey'});
        break;
    case '1':
        $('p span').append('Принята гидом').css({'color':'black'});
        break;
    case '2':
        $('p span').append('Экскурсия завершена').css({'color':'green'});
        $('.btn-cancel').hide();
        (mark === '' && mark !== '0')? $('div.stars').css({"display":"inline-block"}) : $('div.stars').css({"display":"none"});
        break;
    case '3':
        $('p span').append('Экскурсия отменена туристом').css({'color':'red'});
        $('.btn-cancel').hide();
        break;
    case '4':
        $('p span').append('Экскурсия отменена гидом').css({'color':'red'});
        $('.btn-cancel').hide();
        break;
    case '5':
        $('p span').append('Экскурсия отменена туристом').css({'color':'red'});
        $('.btn-cancel').hide();
        break;
}