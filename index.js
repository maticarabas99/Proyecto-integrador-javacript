const nav = document.querySelector("#nav");
const cerrar = document.querySelector("#cerrar");
const abrir = document.querySelector("#abrir");
const cardContainer = document.querySelector(".card-productos");
const cartItem = document.querySelector(".cart-item");
const total = document.querySelector(".total");
const cateoriesConteiner = document.querySelector(".categorias");
const categoriesList = document.querySelectorAll(".categoria");
const btnVm = document.querySelector(".btn-vm");
const cartShop = document.querySelector(".cart-shop");
const btnDelete = document.querySelector(".btn-delete");
const btnBuy = document.querySelector(".btn-buy");
const btnCart = document.querySelector(".btn-cart");
const cartmenu = document.querySelector(".cart");
const carrito = document.querySelector(".cart");
const cerrarCart = document.querySelector(".cerrar-cart");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
    carrito.classList.remove("visible");
});

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
});

btnCart.addEventListener("click", () => {
    carrito.classList.add("visible");
    nav.classList.remove("visible");
});

cerrarCart.addEventListener("click", () => {
    carrito.classList.remove("visible");
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const eliminarProductoDelCarrito = (product) => {
    cart = cart.filter((item) => item !== product);
    agregarCart();
    localStorage.setItem("cart", JSON.stringify(cart));
};

const agregarCart = () => {
    let cartTotal = 0;
    cartItem.innerHTML = "";

    cart.forEach((product) => {
        const listItem = document.createElement("div");
        listItem.classList.add("item");
        const subtotal = product.precio * product.cantidad;
        cartTotal += subtotal;

        listItem.innerHTML = `
            <div class="item">
                <img class="item-img" src="${product.cardImg}" alt="${product.nombre}" />
                <p>${product.nombre}</p>
                <div class="agregar">
                    <p>${product.cantidad}</p>
                </div>
                <div class="cantidad">
                    <button><img src="imagenes javascript/minus.png" /></button>
                    <button><img src="imagenes javascript/plus.png" /></button>
                </div>
            </div>
            <div class="cart-total">
                <p>$<span>${subtotal.toFixed(3)}</span></p>
            </div>
            <button class="eliminar">X</button>
        `;

        listItem.querySelector(".eliminar").addEventListener("click", () => {
            eliminarProductoDelCarrito(product);
        });
        cartItem.appendChild(listItem);
    });

    total.textContent = cartTotal.toFixed(3);
};

btnDelete.addEventListener("click", () => {
    const resultado = window.confirm("¿Estás seguro de que quieres vaciar el carrito?");
    if (resultado) {
        cart = [];
        agregarCart();
        localStorage.removeItem("cart");
    } else {
    }
});

btnBuy.addEventListener("click", () => {
    const resultado = window.confirm("¿Estás seguro de que quieres realizar la compra?");
    if (resultado) {
        cart = [];
        agregarCart();
        localStorage.removeItem("cart");
    } else {
    }
});

const createProductTemplate = (product) => {
    const { id, nombre, precio, cardImg } = product;
    return `
    <div class="card">
        <img class="producto-img" src="${cardImg}" alt="${nombre}">
        <div class="info-card">
            <h3>${nombre}</h3>
            <p>$${precio.toFixed(3)}</p>
            <button class="btn-add"
                data-id='${id}'
                data-nombre='${nombre}'
                data-precio='${precio.toFixed(3)}'
                data-img='${cardImg}'>Agregar al Carrito</button>
            <div class="agregado"></div>
        </div>
    </div>`;
};

document.querySelectorAll(".btn-add").forEach((button) => {
    button.addEventListener("click", (event) => {
        const { target } = event;
        const nombre = target.dataset.nombre;
        const precio = parseFloat(target.dataset.precio);
        const imagen = target.dataset.img;
        agregarProductosAlCarrito(nombre, precio, imagen, target);
    });
});

const agregarProductosAlCarrito = (nombre, precio, cardImg, button) => {
    let productoExistente = cart.find((product) => product.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        const productoSeleccionado = {
            nombre,
            precio,
            cardImg,
            cantidad: 1,
        };
        cart.push(productoSeleccionado);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    agregarCart();
    const mensajeAgregado = button.parentElement.querySelector(".agregado");
    mensajeAgregado.textContent = `Agregado al carrito con éxito`;
    setTimeout(() => {
        mensajeAgregado.textContent = "";
    }, 1500);
};

window.addEventListener("load", () => {
    agregarCart();
});

const renderProducts = (productList) => {
    cardContainer.innerHTML += productList.map(createProductTemplate).join("");
    addClickEventToButtons();
};
const isLastIndexOf = () => {
    return appState.currentProductsIndex === appState.productslimit - 1;
};

const showMoreProducts = () => {
    appState.currentProductsIndex += 1;
    let { products, currentProductsIndex } = appState;
    renderProducts(products[currentProductsIndex]);
    if (isLastIndexOf()) {
        btnVm.classList.add("hidden");
    }
};

const setShowMoreVisibility = () => {
    if (!appState.activeFilter) {
        btnVm.classList.remove("hidden");
    } else {
        btnVm.classList.add("hidden");
    }
};

const changeBtnActiveState = (selectedCategoria) => {
    const categorias = [...categoriesList];
    categorias.forEach((categoriaBtn) => {
        if (categoriaBtn.dataset.categoria !== selectedCategoria) {
            categoriaBtn.classList.remove("active");
        } else {
            categoriaBtn.classList.add("active");
        }
    });
};

const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.categoria;
    changeBtnActiveState(appState.activeFilter);
    setShowMoreVisibility(appState.activeFilter);
};

const isInInactiveFilterBtn = (element) => {
    return (
        element.classList.contains("categoria") &&
        !element.classList.contains("active")
    );
};

const applyFilter = (event) => {
    const { target } = event;
    if (isInInactiveFilterBtn(target)) {
        cardContainer.innerHTML = "";
        changeFilterState(target);
        if (appState.activeFilter) {
            renderFilterProducts();
            appState.currentProductsIndex = 0;
        } else {
            renderProducts(appState.products[0]);
        }
    }
};

const renderFilterProducts = () => {
    const filteredProducts = productos.filter(
        (product) => product.categoria === appState.activeFilter
    );
    renderProducts(filteredProducts);
};

const addClickEventToButtons = () => {
    const buttons = document.querySelectorAll(".btn-add");

    buttons.forEach((button) => {
        button.addEventListener("click", handleAddToCart);
    });
};

const handleAddToCart = (event) => {
    const { target } = event;
    const nombre = target.dataset.nombre;
    const precio = parseFloat(target.dataset.precio);
    const imagen = target.dataset.img;
    agregarProductosAlCarrito(nombre, precio, imagen, target);
};

const init = () => {
    renderProducts(appState.products[0]);
    btnVm.addEventListener("click", showMoreProducts);
    cateoriesConteiner.addEventListener("click", applyFilter);
};

init();