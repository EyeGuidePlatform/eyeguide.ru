var menuBtn = document.querySelector('.navbar-toggle');
var menuList = document.querySelector(menuBtn.dataset.target);

menuBtn.onclick = function () {
    menuList.classList.toggle('in');
}