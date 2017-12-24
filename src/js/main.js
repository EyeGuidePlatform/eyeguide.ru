// let menuBtn = document.querySelector('.navbar-toggle');
// let menuList = document.querySelector(menuBtn.dataset.target);

// menuBtn.onclick = () => {
//     menuList.classList.toggle('in');
// };


// let switcher = document.querySelector('.switcher');
// switcher.onclick = (e) => {
//     let target = e.target;
    
//     if (target.tagName != 'BUTTON' || target.classList.contains('active')) return;
    
//     let disableBtn;
//     switch (target.className) {
//         case 'to-guides':
//             disableBtn = document.querySelector('.to-places');

//             break;
//         case 'to-places':
//             disableBtn = document.querySelector('.to-guides');

//             break;
//     }

//     target.classList.add('active');
//     disableBtn.classList.remove('active');

//     let disableBlock = document.querySelector(disableBtn.dataset.target);
//     disableBlock.classList.add('hidden');

//     let showBlock = document.querySelector(target.dataset.target);
//     showBlock.classList.remove('hidden');
// };


// function switchBlock(target) {
//     let disableBtn;
//     switch (target.className) {
//         case 'to-guides':
//             disableBtn = document.querySelector('.to-places');

//             break;
//         case 'to-places':
//             disableBtn = document.querySelector('.to-guides');

//             break;
//     }

//     target.classList.add('active');
//     disableBtn.classList.remove('active');

//     let disableBlock = document.querySelector(disableBtn.dataset.target);
//     disableBlock.classList.add('hidden');

//     let showBlock = document.querySelector(target.dataset.target);
//     showBlock.classList.remove('hidden');
// }

// (async () => {
//     const places = await getPlacesJSON('');

//     updatePlaces(places, citySelect.value);

//     citySelect.onchange = e => {
//         let newCity = e.target.value;

//         updatePlaces(places, newCity);
//     }
// })();

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

