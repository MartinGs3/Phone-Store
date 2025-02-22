/* const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
});

const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const cartInfo = document.querySelector('.container-cart-products .row-product');
const rowProduct = document.querySelector('.row-product');
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

let allProducts = [];

function showHTML() {
    rowProduct.innerHTML = '';
    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        `;

        rowProduct.appendChild(containerProduct);

        total += parseInt(product.quantity) * parseFloat(product.price.slice(1));
        totalOfProducts += product.quantity;
    });

    valorTotal.innerText = `$${total.toFixed(2)}`;
    countProducts.innerText = totalOfProducts;

    if (!allProducts.length) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }
}

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

const productsList = document.querySelector('.products');
productsList.addEventListener('click', e => {
    if (e.target.classList.contains('botones-de-enlace')) {
        const product = e.target.parentElement;

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h3').textContent,
            price: product.querySelector('p').textContent,
        };

        const exists = allProducts.some(product => product.title === infoProduct.title);

        exists ? (() => {
            const products = allProducts.map(product => product.title === infoProduct.title ? { ...product, quantity: product.quantity + 1 } : product);
            allProducts = [...products];
        })() : (() => {
            allProducts = [...allProducts, infoProduct];
        })();

        showHTML();
    }
});

const rowProducts = document.querySelector('.row-product');

rowProducts && rowProducts.addEventListener('click', e => {
    e.target.classList.contains('icon-close') && (() => {
        const title = e.target.parentElement.querySelector('p').textContent;
        allProducts = allProducts.filter(product => product.title !== title);
        showHTML();
    })();
});

const form = document.getElementById("formulario-contacto");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    enviarFormulario();
});

function enviarFormulario() {
    const nombre = form.querySelector("#nombre").value;
    const email = form.querySelector("#email").value;
    const telefono = form.querySelector("#tel").value;
    const consulta = form.querySelector("#consulta").value;

    const formData = {
        Nombre: nombre,
        Email: email,
        Telefono: telefono,
        Consulta: consulta
    };

    const formDataJSON = JSON.stringify(formData);

    const url = 'http://127.0.0.1:5500/pages/contacto.html'; 

    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log('Respuesta del servidor:', response);
                mostrarNotificacion('¡Formulario enviado correctamente!');
            } else {
                console.error('Error al enviar el formulario:', xhr.statusText);
                mostrarNotificacion('Error al enviar el formulario', 'error');
                
            }
        }
    };

    xhr.send(formDataJSON);
}

function mostrarNotificacion(mensaje, tipo) {
    Toastify({
        text: mensaje,
        duration: 3000,
        close: true,
        gravity: "top",
        backgroundColor: tipo === 'success' ? "green" : "red",
    }).showToast();
}
 */
/* document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos todos los productos
    document.querySelectorAll('.product-card').forEach(card => {
        const imageElement = card.querySelector('.product-image');
        const priceElement = card.querySelector('.price');
        const storageSelector = card.querySelector('.storage-selector');
        const prevBtn = card.querySelector('.prev-btn');
        const nextBtn = card.querySelector('.next-btn');

        // Verificamos si todos los elementos existen
        if (imageElement && priceElement && storageSelector && prevBtn && nextBtn) {
            let currentIndex = 0; // Índice de la imagen actual
            let currentImages = card.dataset.images128.split(','); // Por defecto, usamos las imágenes de 128GB

            // Cuando cambia el selector de almacenamiento
            storageSelector.addEventListener('change', () => {
                const selectedStorage = storageSelector.value;
                if (selectedStorage === "128") {
                    currentImages = card.dataset.images128.split(','); // Imágenes para 128GB
                    priceElement.textContent = card.dataset.price128;
                } else {
                    currentImages = card.dataset.images256.split(','); // Imágenes para 256GB
                    priceElement.textContent = card.dataset.price256;
                }
                currentIndex = 0; // Reiniciar el índice de las imágenes
                imageElement.src = currentImages[currentIndex]; // Actualizar imagen
            });

            // Cambiar la imagen al hacer clic en la imagen principal
            imageElement.addEventListener('click', () => {
                const selectedStorage = storageSelector.value;
                if (selectedStorage === "128") {
                    storageSelector.value = "256"; // Cambiar a 256GB
                    currentImages = card.dataset.images256.split(',');
                    priceElement.textContent = card.dataset.price256;
                } else {
                    storageSelector.value = "128"; // Cambiar a 128GB
                    currentImages = card.dataset.images128.split(',');
                    priceElement.textContent = card.dataset.price128;
                }
                currentIndex = 0; // Reiniciar el índice
                imageElement.src = currentImages[currentIndex]; // Actualizar imagen
            });

            // Función para mostrar la imagen anterior
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
                imageElement.src = currentImages[currentIndex]; // Cambiar a la imagen anterior
            });

            // Función para mostrar la imagen siguiente
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % currentImages.length;
                imageElement.src = currentImages[currentIndex]; // Cambiar a la imagen siguiente
            });
        } else {
            console.error('Uno o más elementos no se encontraron en el DOM');
        }
    });
});
 */

document.addEventListener("DOMContentLoaded", function () {
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card) => {
        const storageSelector = card.querySelector(".storage-selector");
        const batterySelector = card.querySelector(".battery-selector");
        const priceElement = card.querySelector(".product-price");
        const imageElement = card.querySelector(".product-image");
        const productNameElement = card.querySelector(".product-name");
        const versionSelector = card.querySelector(".version-selector"); // Selector para la versión

        // Datos de cada iPhone
        const productData = {
            "iPhone 8": {
                "64GB": {
                    "80%": { price: 295, image: "./img/iphone8-64gb.jpg" },
                    "90%": { price: 320, image: "./img/iphone8-64gb.jpg" }
                }
            },
            "iPhone 8 Plus": {
                "64GB": {
                    "80%": { price: 330, image: "./img/iphone13-128gb.jpg" },
                    "90%": { price: 350, image: "./img/iphone13-128gb.jpg" }
                }
            },
            "iPhone XR": {
                "64GB": {
                    "80%": { price: 390, image: "img/iphonexr-64gb.jpg" }
                },
                "128GB": {
                    "80%": { price: 415, image: "./img/iphoneXR-1288gb.jpg" },
                    "90%": { price: 420, image: "./img/iphoneXR-1288gb.jpg" }
                }
            },
            "iPhone 11": {
                "64GB": {
                    "80%": { price: 420, image: "./img/iphone11-64gb.jpg" },
                    "90%": { price: 430, image: "./img/iphone11-64gb.jpg" },
                    "100%": { price: 450, image: "./img/iphone11-64gb.jpg" }
                },
                "256GB": {
                    "70%": { price: 475, image: "./img/iphone11-256gb.jpg" }
                }
            },
            "iPhone 13": {
                "128GB": {
                    "80%": { price: 630, image: "./img/iphone13-128gb.jpg" },
                    "85%": { price: 480, image: "./img/iphone13-128gb.jpg" },
                    "100%": { price: 655, image: "./img/iphone13-128gb.jpg" }
                },
                "256GB": {
                    "80%": { price: 665, image: "./img/iphone13-256gb.jpg" },
                    "100%": { price: 690, image: "./img/iphone13-256gb.jpg" }
                }
            },
            "iPhone 15 Pro": {
                "128GB": {
                    "100%": { price: 1085, image: "./img/iphone-15-128gb.jpg" }
                },
                "256GB": {
                    "100%": { price: 1115, image: "./img/iphone15-256gb-2.jpg" }
                }
            }
        };

        function updateBatteryOptions() {
            const model = productNameElement.textContent.trim();
            const storage = storageSelector.value;

            if (!batterySelector) return; // Si no hay selector de batería, no hacemos nada

            batterySelector.innerHTML = ""; // Limpiamos las opciones actuales

            if (productData[model] && productData[model][storage]) {
                const availableBatteries = Object.keys(productData[model][storage]);

                availableBatteries.forEach(battery => {
                    const option = document.createElement("option");
                    option.value = battery;
                    option.textContent = battery;
                    batterySelector.appendChild(option);
                });
            }
        }

        function updateProductDetails() {
            const model = productNameElement.textContent.trim();
            const storage = storageSelector.value;
            const battery = batterySelector ? batterySelector.value : "100%";

            console.log("Modelo seleccionado:", model);
            console.log("Almacenamiento seleccionado:", storage);
            console.log("Batería seleccionada:", battery);

            if (productData[model] && productData[model][storage] && productData[model][storage][battery]) {
                const data = productData[model][storage][battery];
                priceElement.textContent = `$${data.price}`;
                imageElement.src = data.image;
            }

            // Cambiar el nombre del modelo según el almacenamiento y la versión
            if (storage === "64GB" && model === "iPhone 8" && versionSelector.value === "iPhone 8 Plus") {
                productNameElement.textContent = "iPhone 8 Plus";
                // Actualizamos las opciones de almacenamiento para reflejar el cambio
                storageSelector.innerHTML = `<option value="64GB">64GB</option>`;
            } else if (storage === "64GB" && model === "iPhone 8 Plus" && versionSelector.value === "iPhone 8") {
                productNameElement.textContent = "iPhone 8";
                // Actualizamos las opciones de almacenamiento para reflejar el cambio
                storageSelector.innerHTML = `<option value="64GB">64GB</option>`;
            } else {
                productNameElement.textContent = model; // Si no hay cambio, se mantiene el nombre original
            }
        }

        versionSelector.addEventListener("change", function () {
            updateProductDetails();
        });

        storageSelector.addEventListener("change", function () {
            updateBatteryOptions();
            updateProductDetails();
        });

        if (batterySelector) batterySelector.addEventListener("change", updateProductDetails);

        updateBatteryOptions();
        updateProductDetails();
    });
});
