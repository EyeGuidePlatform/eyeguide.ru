let signInBtn = document.getElementById('nav-sign-in');
let signInModal = document.querySelector(signInBtn.dataset.target);

signInBtn.onclick = () => {
    signInModal.classList.add('show');
    setTimeout(() => {
        signInModal.style.opacity = '1';
    }, 1);
}

let closeModalBtn = document.getElementById('close-modal');
closeModalBtn.onclick = () => {
    signInModal.style.opacity = '0';
    setTimeout(() => {
        signInModal.classList.remove('show');
    }, 300);
}