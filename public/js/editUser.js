console.log("EditUser cargando linkeado correctamente");

const editButton = document.getElementById('edit-button-form');
const editFormContainer = document.getElementById('edit-container');
const cancelButton = document.getElementById('edit-cancel-button');
const deletebutton = document.getElementById('delete-button');
const confirmContainer = document.getElementById('confirm-container');
const cancelBtn = document.getElementById('cancel-button');

editButton.addEventListener('click', ()=>{
    editFormContainer.classList.add('show');
});

cancelButton.addEventListener('click', ()=>{
    editFormContainer.classList.remove('show');
});


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


deletebutton.addEventListener('click', () => {
    confirmContainer.classList.add('show');
});

cancelBtn.addEventListener('click', () => {
    confirmContainer.classList.remove('show');
});