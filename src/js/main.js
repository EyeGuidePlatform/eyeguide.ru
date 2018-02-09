const searchInput = document.getElementById('search-input'),
    dropdown = document.getElementById('dropdown');

searchInput.oninput = async () => {
    dropdown.classList.remove('hidden');

    const newRecords = await getRecordsJSON(searchInput.value);

    updateRecords(newRecords);
}

searchInput.onkeyup = (e) => {
    if (e.keyCode == 40 || e.keyCode == 38) {
        dropdown.focus();
        dropdown.selectedIndex = 0;
        searchInput.value = dropdown.value;
    }
}

dropdown.onchange = (e) => {
    searchInput.value = dropdown.value;
}

function updateRecords(records) {
    let htmlOut = '';

    records.forEach((record) => {
        htmlOut += `
            <option value="${record.name || record}">${record.name || record}</option>
        `;
    });

    document.querySelector('#dropdown').size = records.length;
    dropdown.innerHTML = htmlOut;
}

async function getRecordsJSON (inputVal) {
    const citiesJSON = await $.getJSON('/api/getCities?name=' + inputVal), 
        placesJSON = await $.getJSON('/api/getPlaces?name=' + inputVal);

    let citiesAndPlaces = citiesJSON.concat(placesJSON);

    return citiesAndPlaces.slice(0, 5);
}

$('#slider').slick({
    arrows: false,
    infinite: true,
    speed: 1000,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 3000
});

