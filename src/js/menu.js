let menuBtn = document.querySelector('.navbar-toggle');
let menuList = document.querySelector(menuBtn.dataset.target);

menuBtn.onclick = () => {
    menuList.classList.toggle('in');
};