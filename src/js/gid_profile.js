const multipleChoiceInputs = new Choices('.multiple-choice', {
    removeItemButton: true
});

const inputs = $('*[data-role="input"]');
const defaults = $('*[data-role="default"]');

$('.big_edit').click(e => {
    [].forEach.call(inputs, input => {
        input.classList.toggle('none')
    });
    [].forEach.call(defaults, def => {
        def.classList.toggle('none')
    });
})

