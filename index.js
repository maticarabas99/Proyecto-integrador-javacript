const nav = document.querySelector("#nav")
const cerrar = document.querySelector("#cerrar")
const abrir = document.querySelector("#abrir")
const cardContainer = document.querySelector(".card-productos")
const productsCart = document.querySelector(".cart-container")
const total = document.querySelector(".total")
const cateoriesConteiner = document.querySelector(".categorias")
const cateoriesList = document.querySelectorAll(".cat-list")
const btnVm = document.querySelector(".btn-vm")
const btnBuy = document.querySelector(".btn-buy")
const btnDelete = document.querySelector(".btn-delete")
const btnCart = document.querySelector(".btn-cart")
const cartmenu = document.querySelector(".cart")
const overlay = document.querySelector(".overlay")
const successModal = document.querySelector('.add-modal')


abrir.addEventListener("click", () => {
    nav.classList.add("visible");  
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible")
})

let cart = JSON.parse(localStorage.getItem("cart")) || []



  const islastIndexOf = () => {
    return appState.currentProductsIndex === appState.productslimit - 1
}

const showMoreProducts = () => {
    appState.currentProductsIndex += 1;
    let { products, currentProductsIndex } = appState;
    renderProducts(products[currentProductsIndex]);
    if(islastIndexOf()) {
        btnVm.classList.add("hidden")
    }
}



const setShowMoreVisibility = () => {
    if (!appState.activeFilter) {
        btnVm.classList.remove("hidden")
        return;
    }
    btnVm.classList.add("hidden");
}
// 