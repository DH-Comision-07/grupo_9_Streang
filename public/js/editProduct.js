// VENTANA PARA CONFIRMAR DELETE DE UN PRODUCTO
const deletebutton = document.getElementById('delete-button');
const confirmContainer = document.getElementById('confirm-container');
const cancelButton = document.getElementById('cancel-button');

deletebutton.addEventListener('click', () => {
    confirmContainer.classList.add('show');
});

cancelButton.addEventListener('click', () => {
    confirmContainer.classList.remove('show');
})


