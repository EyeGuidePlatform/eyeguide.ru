let singleChoiceInputs = new Choices('.single-choice'),
    multipleChoiceInputs = new Choices('.multiple-choice', {
        removeItemButton: true
    }),
    placeSelect = new Choices('#places', {
        removeItemButton: true
    });

let places;
let citySelect = document.getElementById('city');
$.getJSON('/getPlaces', data => {
    places = JSON.parse(data);
    updatePlaces(citySelect.value);
});

citySelect.onchange = e => {
    let newCity = e.target.value;

    updatePlaces(newCity);
}

let passwordInput = document.getElementById('password'),
    passwordAgainInput = document.getElementById('password-again'),
    passwordAccept = false;
passwordAgainInput.onchange = e => {
    let password = passwordInput.value,
        passwordAgain = e.target.value;
    
    passwordAccept = false;
    if (password == passwordAgain) {
        passwordAccept = true;
    }
}

let submitBtn = document.getElementById('submit');
submitBtn.onclick = () => {
    if (!passwordAccept) return false;
}

function updatePlaces(newCity) {
    let options = [];

    places.forEach( place => {
        if (place.city == newCity) {
            let option = {
                value: place._id,
                label: place.name
            };
            options.push(option);
        }
    } );

    placeSelect.clearStore();
    placeSelect.setChoices(options, 'value', 'label', false);
}