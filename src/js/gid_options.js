const form = document.querySelector('.container form'),
    confirm = document.querySelector('.container__confirm')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const elems = e.target.elements
    let old_pas = elems.old_pwd.value,
        new_pas = elems.new_pwd.value,
        new_pas2 = elems.new_pwd2.value

    elems.new_pwd.style.backgroundColor = elems.new_pwd2.style.backgroundColor = elems.old_pwd.style.backgroundColor = 'white'

    if (new_pas !== new_pas2) {
        elems.new_pwd.style.backgroundColor = elems.new_pwd2.style.backgroundColor = 'rgba(255, 0, 0, 0.337)'
        elems.new_pwd.value = elems.new_pwd2.value = ''
        return
    }

    (async () => {
        let check = await checkPassJSON(old_pas);
        if (!check) {
            elems.old_pwd.style.backgroundColor = 'rgba(255, 0, 0, 0.337)'
            elems.old_pwd.value = ''
            return
        }

        (async () => {
            let check = await changePassJSON(new_pas)
            elems.new_pwd.value = elems.new_pwd2.value = elems.old_pwd.value = ''
            confirm.classList.remove('hide')
            setTimeout(() => {
                confirm.classList.add('hide')
            }, 5000)
        })();

    })();


});

async function checkPassJSON(pass) {
    const check = await $.getJSON(`/api/checkPass/${pass}`);
    console.log(check);
    return JSON.parse(check);
}
async function changePassJSON(pass) {
    const check = await $.getJSON(`/api/changePass/${pass}`);
    console.log(check);
    return JSON.parse(check);
}