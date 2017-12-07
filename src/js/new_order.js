// добавление мест или гидов в селект при загрузке страницы
window.onload = () => {
  const selectForm = new Choices('#select_form')

  if (document.querySelector('#guide')) {
    let check = document.querySelector('#guide');
    (async () => {
      let places = await getPlacesJSON(check.getAttribute('value'));
      let items = [];
      places.forEach(place => {
        const item = {
          value: place._id,
          label: place.name
        };
        items.push(item);

      });


      // Обновляем места, принадлежащие выбранном гиду
      selectForm.setChoices(items, 'value', 'label', false);
    })();


  } else if (document.querySelector('#place')) {
    let check = document.querySelector('#place');
    (async () => {
      let guides = await getGuidesJSON(check.getAttribute('value'));
      let items = [];
      guides.forEach(guide => {
        const item = {
          value: guide._id,
          label: `${guide.surname} ${guide.name}`
        };
        items.push(item);

      });


      // Обновляем гидов, принадлежащие выбранном месту
      selectForm.setChoices(items, 'value', 'label', false);
    })();
  }


  async function getPlacesJSON(id) {
    const placesJSON = await $.getJSON(`/api/getPlacesByGuideId/${id}`);

    return JSON.parse(placesJSON);
  };

  async function getGuidesJSON(id) {
    const guidesJSON = await $.getJSON(`/api/getGuidesByPlaceId/${id}`);

    return JSON.parse(guidesJSON);
  };
}

const regForm = document.querySelector('#regForm')

// regForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   $('#myModal').modal('toggle')
// })



let choice = document.querySelector('#select_form')
let currentTab = 0;
showTab(currentTab);

function showTab(n) {
  let x = document.getElementsByClassName("tab"),
    prevBtn = document.getElementById("prevBtn"),
    nextBtn = document.getElementById("nextBtn")

  x[n].style.display = "block";

  prevBtn.style.display = n == 0 ? 'none' : 'inline'
  nextBtn.textContent = (n == (x.length - 1)) ? 'Готово' : 'Далее'


  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  let x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // if you have reached the end of the form...
  if (currentTab + n >= x.length) {
    $('#myModal').modal('toggle')
    return false;
  }
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  let x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");


  //   A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      if (y[i].classList.contains('choices__input') && choice.value) {
        continue
      }
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

  [].forEach.call(x, ((step, index) => {
    index === n ? step.classList.add('active') : step.classList.remove('active')
  }))
}