let currentTab = 0; 
showTab(currentTab);

function showTab(n) {
    let x = document.getElementsByClassName("tab"),
        prevBtn = document.getElementById("prevBtn"),
        nextBtn = document.getElementById("nextBtn")

    x[n].style.display = "block";

    prevBtn.style.display = n == 0 ? 'none' :  'inline'
    nextBtn.style.display = (n == (x.length - 1))? 'Submit' : 'Next'


    fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  let x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  let x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");

//   [].forEach.call(y, (input => {
//      if (input.value == "") {
//          y.className += 'invalid';

//          valid = false;
//      }
//   }))

//   A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
    let x = document.getElementsByClassName("step");

    [].forEach.call(x, ( (step, index) => {
      index === n? step.classList.add('active') : step.classList.remove('active')
    }))
}

// Место в зависимости от select
const citySelect = document.querySelector('#city');
const currentCity = document.querySelector('#city-img');
const check = document.querySelector('#check');

(async () => {
    let place = await getPlacesJSON(citySelect.value);
    console.log(place)
    updatePlace(place);

    citySelect.onchange = e => {
        let shit = e.target.value;
        // place = await getPlacesJSON(citySelect.value)
        updatePlace(shit);
    }
})();

function updatePlace(place) {
    // let items = [];
    currentCity.style.backgroundImage = `url(${place.img})`;
    currentCity.value = place._id;
    check.innerHTML = place.name;


    // places.forEach( place => {
    //     if (place.city == newCity) {
    //         const item = {
    //             value: place._id,
    //             label: place.name
    //         };
    //         items.push(item);
    //     }
    // } );

    //Обновляем места, принадлежащие выбранному городу
    // placeSelect.clearStore().setChoices(items, 'value', 'label', false);
}

async function getPlacesJSON (id) {
    const placeJSON = await $.getJSON(`/api/getPlace/${id}`);

    return JSON.parse( placeJSON );
}