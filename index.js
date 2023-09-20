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
const btnBuy = document.querySelector(".btn-buy");
const btnDelete = document.querySelector(".btn-delete");
const btnCart = document.querySelector(".btn-cart");
const cartmenu = document.querySelector(".cart");
const overlay = document.querySelector(".overlay");
const successModal = document.querySelector(".add-modal");
const carrito = document.querySelector(".cart");



abrir.addEventListener("click", () => {
    nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
});

btnCart.addEventListener("click", () => {
    cartShop.classList.add("visible");
});
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const eliminarProductoDelCarrito = (product) => {
    cart = cart.filter((item) => item !== product);
    agregarCart();
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
                <img src="${product.cardImg}" alt="${product.nombre}" />
                <p>${product.nombre}</p>
                <div class="agregar">
                    <button>+</button>
                    <p>${product.cantidad}</p>
                    <button>-</button>
                </div>
            </div>
            <div class="cart-total">
                <p><span>$${subtotal.toFixed(3)}</span></p>
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

btnDelete.addEventListener("click" , () =>{
    cart = [];
    agregarCart();
})

const createProductTemplate = (product) => {
    const { id, nombre, precio, cardImg } = product;
    return `
    <div class="card">
          <img class="producto-img" src="${cardImg}" alt=${nombre}">
        <div class="info-card">
            <h3>${nombre}</h3>
            <p>$${precio.toFixed(3)}</p>
        <button class="btn-add"
            data-id='${id}'
            data-nombre='${nombre}'
            data-precio='${precio.toFixed(3)}'
            data-img='${cardImg}'>Agregar al Carrito</button>
        </div>   
    </div>`;
};
document.querySelectorAll(".btn-add").forEach((button) => {
    button.addEventListener("click", (event) => {
        const { target } = event;
        const nombre = target.dataset.nombre;
        const precio = parseFloat(target.dataset.precio);
        const imagen = target.dataset.img;
        agregarProductosAlCarrito(nombre, precio, imagen);
        
    });
});



const agregarProductosAlCarrito = (nombre, precio, cardImg) => {
    const productoExistente = cart.find((product) => product.nombre === nombre);
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
};
window.addEventListener("load", () => {
    agregarCart(); 
    document.querySelectorAll(".btn-add").forEach((button) => {
        button.addEventListener("click", (event) => {
            const { target } = event;
            const nombre = target.dataset.nombre;
            const precio = parseFloat(target.dataset.precio);
            const imagen = target.dataset.img;
            agregarProductosAlCarrito(nombre, precio, imagen);
        });
    });
});



const renderProducts = (productList) => {
    cardContainer.innerHTML += productList.map(createProductTemplate).join("");
    addClickEventToButtons();
};

const islastIndexOf = () => {
    return appState.currentProductsIndex === appState.productslimit - 1;
};

const showMoreProducts = () => {
    appState.currentProductsIndex += 1;
    let { products, currentProductsIndex } = appState;
    renderProducts(products[currentProductsIndex]);
    if (islastIndexOf()) {
        btnVm.classList.add("hidden");
    }
};

const setShowMoreVisibility = () => {
    if (!appState.activeFilter) {
        btnVm.classList.remove("hidden");
        return;
    }
    btnVm.classList.add("hidden");
};

const changeBtnactiveState = (selectedCategoria) => {
    const categorias = [...categoriesList];
    categorias.forEach((categoriaBtn) => {
        if (categoriaBtn.dataset.categoria !== selectedCategoria) {
            categoriaBtn.classList.remove("active");
            return;
        }
        categoriaBtn.classList.add("active");
    });
};

const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.categoria;
    changeBtnactiveState(appState.activeFilter);
    setShowMoreVisibility(appState.activeFilter);
};

const isInInactiveFitlerBtn = (element) => {
    return (
        element.classList.contains("categoria") &&
        !element.classList.contains("active")
    );
};

const applyFilter = (event) => {
    const { target } = event;
    if (!isInInactiveFitlerBtn(target)) return;
    cardContainer.innerHTML = "";

    changeFilterState(target);
    if (appState.activeFilter) {
        renderFilterProducts();
        appState.currentProductsIndex = 0;
        return;
    }
    renderProducts(appState.products[0]);
};

const renderFilterProducts = () => {
    const filteredProducts = productos.filter(
        (products) => products.cateoria === appState.activeFilter
    );
    renderProducts(filteredProducts);
};
// const addClickEventToButtons = () => {
//     const buttons = document.querySelectorAll(".btn-add");
    
//     buttons.forEach((button) => {
//         button.addEventListener("click", handleAddToCart);
//     });
// };

const handleAddToCart = (event) => {
    const { target } = event;
    const nombre = target.dataset.nombre;
    const precio = parseFloat(target.dataset.precio);
    const imagen = target.dataset.img;
    agregarProductosAlCarrito(nombre, precio, imagen);
};


const init = () => {
    renderProducts(appState.products[0]);
    btnVm.addEventListener("click", showMoreProducts);
    cateoriesConteiner.addEventListener("click", applyFilter);
    
};

init();
