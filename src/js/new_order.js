// добавление мест или гидов в селект при загрузке страницы
let placeId, guideId;
window.onload = () => {
  const selectForm = new Choices('#select_form');

  if (document.querySelector('#regForm .tab div').id === "guide") {
    let check = document.querySelector('#guide');
    guideId = check.getAttribute('value');


    (async () => {
      let places = await getPlacesJSON(guideId);
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


  } else if (document.querySelector('#regForm .tab div').id === "place") {
    let check = document.querySelector('#place');
    placeId = check.getAttribute('value');


    (async () => {
      let guides = await getGuidesJSON(placeId);
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
    let buffer = document.querySelector('#select_form').value;
    guideId ? placeId = buffer : guideId = buffer;
    setModal(guideId, placeId)
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

function setModal(guideId, placeId) {
  //todo
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

const createBtn = document.querySelector('#createOrderBtn')
createBtn.addEventListener('click', (e) => {

  const myForm = document.querySelector('#regForm')
  const order = new FormData(myForm)
  const buffer = {}

  order.append('guideId', guideId)
  order.append('placeId', placeId)

  for (let pair of order.entries()) {
    buffer[pair[0]] = pair[1]
  }

  $.post('/set_new_order', buffer, (data) => {
    window.location = `order/${data}`
  })
})

$('#nextBtn').click(function () {
  let name = $('input[name="name"]').val(),
    surname = $('input[name="surname"]').val(),
    phone = $('input[name="phone"]').val(),
    email = $('input[name="email"]').val(),
    date = $('input[name="date"]').val(),
    time = $('input[name="time"]').val(),
    people = $('input[name="people"').val();
  $('.name').text(name);
  $('.surname').text(surname);
  $('.phone').text(phone);
  $('.email').text(email);
  $('.date').text(date);
  $('.time').text(time);
  $('.people').text(people);
});
