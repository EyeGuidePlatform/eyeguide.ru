const multipleChoiceInputs = new Choices('.multiple-choice', {
    removeItemButton: true
});

const inputs = $('*[data-role="input"]');
const defaults = $('*[data-role="default"]');
const inputPhoto = $('*[data-role="input_photo"]')
$('.big_edit, .edit_small').click(e => {
    [].forEach.call(inputs, input => {
        input.classList.toggle('none')
    });
    [].forEach.call(defaults, def => {
        def.classList.toggle('none')
    });
})
$('.edit_photo').click(e => {
    e.preventDefault();
    $('#img').trigger('click')
})

$('#img').change(e => {
    e.preventDefault();
    $('.imgForm').submit();
})
