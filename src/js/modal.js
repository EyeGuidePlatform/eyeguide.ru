document.onclick = (e) => {
    const target = e.target;
    
    if (target.closest('.open-modal')) {
        const modalDiv = document.querySelector(target.closest('.open-modal').dataset.target);
        modalDiv.classList.add('show');
        setTimeout(() => {
            modalDiv.style.opacity = '1';
        }, 1);

        return false;
    }

    if (target.closest('.close-modal')) {
        const modalDiv = document.querySelector(target.closest('.close-modal').dataset.target);
        modalDiv.style.opacity = '0';
        setTimeout(() => {
            modalDiv.classList.remove('show');
        }, 300);
    }
}