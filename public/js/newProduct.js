// CARGAR EN TIEMPO REAL EL NOMBRE Y DESCRIPCION DEL PRODUCTO
document.addEventListener('DOMContentLoaded', function() {
    // Escuchando el evento de entrada en los campos del formulario
    document.querySelectorAll('.form-container input, .form-container textarea, .form-container select').forEach(input => {
        input.addEventListener('input', function() {
            // Obteniendo el valor del campo
            const value = this.value;
            // Obteniendo el nombre del campo
            const name = this.getAttribute('name');
            // Actualizando el contenido del elemento correspondiente en el preview-box
            const previewElement = document.getElementById(`preview-${name}`);
            if (previewElement) {
                previewElement.textContent = value;
            }
        });
    });
});

// CALCULA EL PRECIO EN TIEMPO REAL
document.addEventListener('DOMContentLoaded', function() {
    // Función para calcular el final-price
    function calculateFinalPrice() {
        // Obteniendo el valor del campo price
        const price = parseFloat(document.querySelector('input[name="price"]').value);
        // Obteniendo el valor del campo discount
        const discount = parseFloat(document.querySelector('input[name="discount"]').value);
        document.querySelector('.discount').textContent = `%${discount} dto`;
        // Calculando el final-price aplicando el descuento al price
        const finalPrice = price - (price * (discount / 100));
        // Actualizando el contenido del elemento correspondiente en el preview-box
        document.querySelector('.final-price').textContent = `$${finalPrice.toFixed(2)}`;
    }

    // Escuchando el evento de entrada en el campo price
    document.querySelector('input[name="price"]').addEventListener('input', calculateFinalPrice);

    // Escuchando el evento de entrada en el campo discount (si es un campo de entrada)
    document.querySelector('input[name="discount"]').addEventListener('input', calculateFinalPrice);

    // Escuchando el evento de entrada en el campo discount (si es un elemento de texto)
    document.querySelector('.discount').addEventListener('input', calculateFinalPrice);
});

// script para mostrar dinamicamente un video de youtube
const videoInput = document.getElementById('videoInput');
const videoPreview = document.getElementById('videoPreview');

videoInput.addEventListener('input', function() {
    const videoCode = this.value.trim(); // Obtener el código del video y eliminar espacios en blanco

    // Validar que el código del video no esté vacío y comience con '<iframe'
    if (videoCode && videoCode.startsWith('<iframe')) {
        videoPreview.innerHTML = videoCode; // Mostrar el código del video en la vista previa
        document.getElementsByClassName('fa-youtube')[0].style.display = 'none';
    } else {
        videoPreview.innerHTML = ''; // Limpiar la vista previa si no se proporciona un código válido
    }
});

// script para mostrar dinamicamente una imagen
document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('mainImageInput');
    const imagePreview = document.getElementById('mainImagePreview');

    const bannerInput = document.getElementById('bannerImageInput');
    const bannerPreview = document.getElementById('banner-preview');

    imageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function(event) {
                const imageUrl = event.target.result;
                const imgElement = document.createElement('img');
                document.getElementsByClassName('main-img-mobile')[0].style.display = 'none';
                imgElement.src = imageUrl;
                imgElement.style.maxWidth = '100%';
                imgElement.style.maxHeight = '200px'; 
                imagePreview.innerHTML = ''; // Limpia cualquier imagen previa
                imagePreview.appendChild(imgElement); // Agrega la imagen cargada al contenedor de vista previa
            };

            reader.readAsDataURL(file); // Lee el archivo como una URL de datos
        }
    });

    bannerInput.addEventListener('change', function(event) {
        const file = event.target.files[0];

        if(file){
            const reader = new FileReader();

            reader.onload = function(event) {
                const imageUrl = event.target.result;
                const imgElement = document.createElement('img');
                document.getElementsByClassName('product-banner')[0].style.display = 'none';
                imgElement.src = imageUrl;
                imgElement.style.maxWidth = '100%';
                imgElement.style.maxHeight = '200px'; 
                bannerPreview.innerHTML = ''; // Limpia cualquier imagen previa
                bannerPreview.appendChild(imgElement); // Agrega la imagen cargada al contenedor de vista previa
            };

            reader.readAsDataURL(file);
        }
    })
});

document.addEventListener('DOMContentLoaded', function() {
    const moreImagesInput = document.getElementById('moreImageInput');
    const moreImagesContainer = document.getElementById('moreImagesContainer');

    moreImagesInput.addEventListener('change', function(event) {
        const files = event.target.files;

        // Limpiar el contenido anterior en moreImagesContainer
        moreImagesContainer.innerHTML = '';

        // Recorrer los archivos seleccionados y mostrarlos en moreImagesContainer
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = function(event) {
                const imageUrl = event.target.result;
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.style.maxWidth = '100%';
                imgElement.style.maxHeight = '200px';
                moreImagesContainer.appendChild(imgElement); // Agrega la imagen al contenedor
            };

            reader.readAsDataURL(file); // Lee el archivo como una URL de datos
        }
    });
});


// Script para el efecto de sombra al pasar el mouse sobre otro elemento 
document.addEventListener('DOMContentLoaded', function() {
    const moreImagesLabel = document.getElementById('moreImagesLabel');
    const moreImagesContainer = document.getElementById('moreImagesContainer');
    const bannerImageLabel = document.getElementById('bannerImageLabel');
    const bannerImageContainer = document.getElementById('bannerImage');

    moreImagesLabel.addEventListener('mouseover', function() {
        moreImagesContainer.classList.add('box-shadowed'); // Agregar la clase para el efecto de sombra
    });

    moreImagesLabel.addEventListener('mouseout', function() {
        moreImagesContainer.classList.remove('box-shadowed'); // Remover la clase al salir del elemento
    });

    bannerImageLabel.addEventListener('mouseover', function() {
        bannerImageContainer.classList.add('box-shadowed'); // Agregar la clase para el efecto de sombra
    });

    bannerImageLabel.addEventListener('mouseout', function() {
        bannerImageContainer.classList.remove('box-shadowed'); // Remover la clase al salir del elemento
    })

}); 

// Script para mostrar el nombre del archivo cargado
let mainImage = document.querySelector("#mainImageInput");
mainImage.addEventListener("change", function() {    
    document.querySelector("#mainImageName").innerText = mainImage.files[0].name;
})

let moreImages = document.querySelector("#moreImageInput");
moreImages.addEventListener("change", function() {
    document.querySelector("#moreImagesNames").innerText = `${moreImages.files[0].name} + ${moreImages.files[1].name} + ${moreImages.files[2].name}`;
})

let bannerImage = document.querySelector("#bannerImageInput");
bannerImage.addEventListener("change", function() {
    document.querySelector("#bannerImageName").innerText = bannerImage.files[0].name;
});