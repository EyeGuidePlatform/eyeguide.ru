const switcher = document.querySelector('.switcher'),
      guideOptions = document.querySelectorAll('.search_lang, .search_place, .search_сar')
switcher.onclick = (e) => {
    let target = e.target;
    if (target.tagName != 'BUTTON' || target.classList.contains('active')) return;
    
    let disableBtn;
    switch (target.className) {
        case 'to-guides':
            disableBtn = document.querySelector('.to-places');
            toggleThis(guideOptions);
            break;
        case 'to-places':
            disableBtn = document.querySelector('.to-guides');
            toggleThis(guideOptions);
            break;
    }

    target.classList.add('active');
    disableBtn.classList.remove('active');

    let disableBlock = document.querySelector(disableBtn.dataset.target);
    disableBlock.classList.add('hidden');

    let showBlock = document.querySelector(target.dataset.target);
    showBlock.classList.remove('hidden');
};

function toggleThis(target) {
        target.forEach( elem => {
            elem.classList.toggle('hidden');
        }, this);
}