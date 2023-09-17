const nav = document.querySelector("#nav");
const cerrar = document.querySelector("#cerrar");
const abrir = document.querySelector("#abrir");
const cardContainer = document.querySelector(".card-productos");
const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const cateoriesConteiner = document.querySelector(".categorias");
const categoriesList = document.querySelectorAll(".categoria");
const btnVm = document.querySelector(".btn-vm");
const btnBuy = document.querySelector(".btn-buy");
const btnDelete = document.querySelector(".btn-delete");
const btnCart = document.querySelector(".btn-cart");
const cartmenu = document.querySelector(".cart");
const overlay = document.querySelector(".overlay");
const successModal = document.querySelector(".add-modal");

abrir.addEventListener("click", () => {
  nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
  nav.classList.remove("visible");
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

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

const renderProducts = (productList) => {
  cardContainer.innerHTML += productList.map(createProductTemplate).join("");
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

const init = () => {
  renderProducts(appState.products[0]);
  btnVm.addEventListener("click", showMoreProducts);
  cateoriesConteiner.addEventListener("click", applyFilter);
};

init();
