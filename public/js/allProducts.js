//Cambia la imagen principal del producto por sobre la que se hace click 
document.addEventListener('DOMContentLoaded', function () {
    const clickableImages = document.querySelectorAll('.clickable');

    clickableImages.forEach(function (clickableImage) {
        clickableImage.addEventListener('click', function () {
            const productIndex = this.getAttribute('data-product-index');
            const mainImage = document.querySelector('.product-container:nth-child(' + (parseInt(productIndex) + 1) + ') .mainImage');
            const tempSrc = mainImage.src;
            mainImage.src = this.src;
            this.src = tempSrc;
        });
    });
});