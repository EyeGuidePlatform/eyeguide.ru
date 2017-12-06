$(()=>{
    
    $('#ajax-form').submit(event=>{
        
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '//formspree.io/pavel10_pushkarev@mail.ru',
            data: $('#ajax-form').serialize(),
            datatype: 'json'
        }).done(response => {
            $('#form-messages').removeClass('error');
            $('#form-messages').addClass('success');
            $('#form-messages').text("Ваше сообщение успешно отправлено!");
            $('.name').val('');
            $('.email').val('');
            $('.subject').val('');
            $('.message').val('');
        });
    });
})
//vladserov1805@mail.ru
