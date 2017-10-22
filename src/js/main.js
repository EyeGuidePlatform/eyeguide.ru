let menuBtn = document.querySelector('.navbar-toggle');
let menuList = document.querySelector(menuBtn.dataset.target);

menuBtn.onclick = () => {
    menuList.classList.toggle('in');
};


let switcher = document.querySelector('.switcher');
switcher.onclick = (e) => {
    let target = e.target;
    
    if (target.tagName != 'BUTTON' || target.classList.contains('active')) return;
    
    let disableBtn;
    switch (target.className) {
        case 'to-guides':
            disableBtn = document.querySelector('.to-places');

            break;
        case 'to-places':
            disableBtn = document.querySelector('.to-guides');

            break;
    }

    target.classList.add('active');
    disableBtn.classList.remove('active');

    let disableBlock = document.querySelector(disableBtn.dataset.target);
    disableBlock.classList.add('hidden');

    let showBlock = document.querySelector(target.dataset.target);
    showBlock.classList.remove('hidden');
};