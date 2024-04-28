// EDITAR USUARIOS DE TERCEROS, SOLO PARA ADMIN
const editBtns = document.querySelectorAll('.edit-btn');
const cancelBtns = document.querySelectorAll('.cancel-button');

editBtns.forEach((editBtn, index) => {
    const editContainer = document.querySelectorAll('.edit-container-users')[index];
    editBtn.addEventListener('click', () => {
        editContainer.classList.add('show');
    });
});

cancelBtns.forEach(cancelBtn => {
    cancelBtn.addEventListener('click', () => {
        cancelBtn.closest('.edit-container-users').classList.remove('show');
    });
});
