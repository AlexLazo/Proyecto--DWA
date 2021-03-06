jQuery(document).ready(function($) {

    "use strict";

    $(function() {
        $("#tabs").tabs();
    });

    //Botón de regresar arriba
    $(window).scroll(function() {
        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }
        // Deslizar hacia arriba
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });
    // Script para deslizar arriba
    $('.scroll-up-btn').click(function() {
        $('html').animate({ scrollTop: 0 });
        // Eliminar el desplazamiento suave en el clic del botón deslizante
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function() {
        // Aplicando denuevo el desplazamiento suave en los elementos del menú
        $('html').css("scrollBehavior", "smooth");
    });


    // Animación de la página de carga

    $("#preloader").animate({
        'opacity': '0'
    }, 600, function() {
        setTimeout(function() {
            $("#preloader").css("visibility", "hidden").fadeOut();
        }, 300);
    });

    ///Animación para el cambio de color del navbar al hacer scroll

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        var box = $('.header-text').height();
        var header = $('header').height();

        if (scroll >= box - header) {
            $("header").addClass("background-header");
        } else {
            $("header").removeClass("background-header");
        }
    });
    if ($('.owl-marca').length) {
        $('.owl-marca').owlCarousel({
            loop: true,
            nav: false,
            dots: true,
            items: 1,
            margin: 30,
            autoplay: false,
            smartSpeed: 700,
            autoplayTimeout: 6000,
            responsive: {
                0: {
                    items: 1,
                    margin: 0
                },
                460: {
                    items: 1,
                    margin: 0
                },
                576: {
                    items: 3,
                    margin: 20
                },
                992: {
                    items: 5,
                    margin: 30
                }
            }
        });
    }
    if ($('.owl-banner').length) {
        $('.owl-banner').owlCarousel({
            loop: true,
            nav: false,
            dots: true,
            items: 1,
            margin: 0,
            autoplay: false,
            smartSpeed: 700,
            autoplayTimeout: 6000,
            responsive: {
                0: {
                    items: 1,
                    margin: 0
                },
                460: {
                    items: 1,
                    margin: 0
                },
                576: {
                    items: 1,
                    margin: 20
                },
                992: {
                    items: 1,
                    margin: 30
                }
            }
        });
    }

    $(".Modern-Slider").slick({
        autoplay: true,
        autoplaySpeed: 10000,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        dots: true,
        pauseOnDotsHover: true,
        cssEase: 'linear',
        draggable: false,
        prevArrow: '<button class="PrevArrow"></button>',
        nextArrow: '<button class="NextArrow"></button>',
    });

    //Filtros de busqueda al ser seleccionados

    $('.filters ul li').click(function() {
        $('.filters ul li').removeClass('active');
        $(this).addClass('active');

        var data = $(this).attr('data-filter');
        $grid.isotope({
            filter: data
        })
    });

    //Dando formato al acordeón utilizado en la página de contacto
    var $grid = $(".grid").isotope({
        itemSelector: ".all",
        percentPosition: true,
        masonry: {
            columnWidth: ".all"
        }
    })
    $('.accordion > li:eq(0) a').addClass('active').next().slideDown();

    $('.accordion a').click(function(j) {
        var dropDown = $(this).closest('li').find('.content');

        $(this).closest('.accordion').find('.content').not(dropDown).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.accordion').find('a.active').removeClass('active');
            $(this).addClass('active');
        }

        dropDown.stop(false, true).slideToggle();

        j.preventDefault();
    });
    $('#multi').mdbRange({
        single: {
            active: true,
            multi: {
                active: true,
                rangeLength: 1
            },
        }
    });

});


///Carrito de compras
// variables y constantes
const cartContainer = document.querySelector('.cart-container');
const productList = document.querySelector('.product-list');
const cartList = document.querySelector('.cart-list');
const cartTotalValue = document.getElementById('cart-total-value');
const cartCountInfo = document.getElementById('cart-count-info');
let cartItemID = 1;

eventListeners();

// Todos los eventListeners
function eventListeners() {
    window.addEventListener('DOMContentLoaded', () => {
        loadJSON();
        loadCart();
    });

    // mostrar/ocultar contenido del carritor
    document.getElementById('cart-btn').addEventListener('click', () => {
        cartContainer.classList.toggle('show-cart-container');
    });

    // agregar al carrito
    productList.addEventListener('click', purchaseProduct);

    // eliminar del carrito
    cartList.addEventListener('click', deleteProduct);
}

// actualizar la información del carrito
function updateCartInfo() {
    let cartInfo = findCartInfo();
    cartCountInfo.textContent = cartInfo.productCount;
    cartTotalValue.textContent = cartInfo.total;
}

// cargar los el contenido de productos del Json
function loadJSON() {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            let html = '';
            data.forEach(product => {
                html += `
                <div class = "product-item">
                    <div class = "product-img">
                        <img src = "${product.imgSrc}" alt = "Imágenes del producto">
                        <button type = "button" class = "add-to-cart-btn">
                            <i class = "fas fa-shopping-cart"></i>Agregar al carrito
                        </button>
                    </div>

                    <div class = "product-content">
                        <h3 class = "product-name">${product.name}</h3>
                        <span class = "product-category">${product.category}</span>
                        <p class = "product-price">$${product.price}</p>
                    </div>
                </div>
            `;
            });
            productList.innerHTML = html;
        })
}


// Comprar productos
function purchaseProduct(e) {
    if (e.target.classList.contains('add-to-cart-btn')) {
        let product = e.target.parentElement.parentElement;
        getProductInfo(product);
    }
}

// Obtener la info del producto antes de agregarlo al carrito
function getProductInfo(product) {
    let productInfo = {
        id: cartItemID,
        imgSrc: product.querySelector('.product-img img').src,
        name: product.querySelector('.product-name').textContent,
        category: product.querySelector('.product-category').textContent,
        price: product.querySelector('.product-price').textContent
    }
    cartItemID++;
    addToCartList(productInfo);
    saveProductInStorage(productInfo);
}

// Agregar el producto seleccionado al carrito
function addToCartList(product) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-id', `${product.id}`);
    cartItem.innerHTML = `
        <img src = "${product.imgSrc}" alt = "product image">
        <div class = "cart-item-info">
            <h3 class = "cart-item-name">${product.name}</h3>
            <span class = "cart-item-category">${product.category}</span>
            <span class = "cart-item-price">${product.price}</span>
        </div>

        <button type = "button" class = "cart-item-del-btn">
            <i class = "fas fa-times"></i>
        </button>
    `;
    cartList.appendChild(cartItem);
}

// guardar el producto en el almacenamiento local
function saveProductInStorage(item) {
    let products = getProductFromStorage();
    products.push(item);
    localStorage.setItem('products', JSON.stringify(products));
    updateCartInfo();
}

//Obtener la info de todos los productos si están dentro del almacenamiento local
function getProductFromStorage() {
    return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    // devuelve un array vacío si no hay productos
}

// cargar los productos del carrito
function loadCart() {
    let products = getProductFromStorage();
    if (products.length < 1) {
        cartItemID = 1; // si no hay productos dentro del almacenamiento local
    } else {
        cartItemID = products[products.length - 1].id;
        cartItemID++;
        // else get the id of the last product and increase it by 1
    }
    products.forEach(product => addToCartList(product));

    //Calcula y actualiza la información del carrito
    updateCartInfo();
}

// Calcula el total del carrito y otra info
function findCartInfo() {
    let products = getProductFromStorage();
    let total = products.reduce((acc, product) => {
        let price = parseFloat(product.price.substr(1)); // removiendo el simbolo del dólar
        return acc += price;
    }, 0); // agregando todos los precios

    return {
        total: total.toFixed(2),
        productCount: products.length
    }
}

// Eliminando los productos del carrito y del almacenamiento local
function deleteProduct(e) {
    let cartItem;
    if (e.target.tagName === "BUTTON") {
        cartItem = e.target.parentElement;
        cartItem.remove(); // esto solo lo remuve del DOM
    } else if (e.target.tagName === "I") {
        cartItem = e.target.parentElement.parentElement;
        cartItem.remove(); // esto solo lo remueve del DOM
    }

    let products = getProductFromStorage();
    let updatedProducts = products.filter(product => {
        return product.id !== parseInt(cartItem.dataset.id);
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // Actualizando la lista de productos despues de la eliminación
    updateCartInfo();
}