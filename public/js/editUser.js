const editButton = document.getElementById('edit-button-form');
const editFormContainer = document.getElementById('edit-container');
const cancelButton = document.getElementById('cancel-button');

editButton.addEventListener('click', ()=>{
    editFormContainer.classList.add('show');
});

cancelButton.addEventListener('click', ()=>{
    editFormContainer.classList.remove('show');
});
