const nav = document.querySelector("#nav")
const cerrar = document.querySelector("#cerrar")
const abrir = document.querySelector("#abrir")
const cardContainer = document.querySelector(".card-productos")
const productsCart = document.querySelector(".cart-container")
const total = document.querySelector(".total")
const cateoriesConteiner = document.querySelector(".categorias")
const categoriesList = document.querySelectorAll(".categoria")
const btnVm = document.querySelector(".btn-vm")
const btnBuy = document.querySelector(".btn-buy")
const btnDelete = document.querySelector(".btn-delete")
const btnCart = document.querySelector(".btn-cart")
const cartmenu = document.querySelector(".cart")
const overlay = document.querySelector(".overlay")
const successModal = document.querySelector('.add-modal')


const productos = [
    {
        id: 1,
        nombre: "Pelota de Futbol",
        cateorias: "futbol" ,
        precio: 25.499,
        cardImg: "imagenes javascript/16525067-800-auto.jpg" ,
    },
    {
        id: 2,
        nombre:"Zapatillas de Running",
        cateorias: "running",
        precio: 60.000 ,
        cardImg: "imagenes javascript/AD_GX9285-1.jpg",
    },
    {
        id: 3,
        nombre: "Discos Olimpicos",
        cateorias:"gimnasio",
        precio: 80.000,
        cardImg: "imagenes javascript/disco-olimpico-acero-45lbs_5000x.jpg" ,
    },
    {
        id: 4,
        nombre: "Camiseta Estudiantes",
        cateorias: "futbol",
        precio: 28.199,
        cardImg: "imagenes javascript/EDLP.jpg" ,
    },
    {
        id: 5,
        nombre: "Pelota de Basquet",
        cateorias: "basquet",
        precio: 50.000,
        cardImg: "imagenes javascript/pelota-basquet.jpg" ,
    },
    {
        id: 6,
        nombre: "Set de mancuernas 10 kg",
        cateorias:"gimnasio",
        precio: 60.040,
        cardImg: "imagenes javascript/mancuernas.jpg" ,
    },
    {
        id: 7,
        nombre: "camiseta de boca",
        cateorias:"futbol",
        precio: 60.000,
        cardImg: "imagenes javascript/boca.jpg" ,
    },
    {
        id: 8,
        nombre: "camiseta de river",
        cateorias:"futbol",
        precio: 60000,
        cardImg: "imagenes javascript/river.jpg" ,
    },
    {
        id: 9,
        nombre: "camiseta de argentina",
        cateorias:"futbol",
        precio: 60000,
        cardImg: "imagenes javascript/argentina86.jpg" ,
    },
    {
        id: 10,
        nombre: "Set de mancuernas 10 kg",
        cateorias:"gimnasio",
        precio: 60000,
        cardImg: "imagenes javascript/bici.jpg" ,
    },
    {
        id: 11,
        nombre: "Set de mancuernas 10 kg",
        cateorias:"gimnasio",
        precio: 60000,
        cardImg: "imagenes javascript/cuadriceps.jpg" ,
    },
    {
        id: 12,
        nombre: "Set de mancuernas 10 kg",
        cateorias:"gimnasio",
        precio: 60000,
        cardImg: "imagenes javascript/barra-hexagonal.jpg" ,
    },
    {
        id: 13,
        nombre: "Set de mancuernas 10 kg",
        cateorias:"gimnasio",
        precio: 60000,
        cardImg: "imagenes javascript/camisetadebasqut.jpg" ,
    },
    {
        id: 14,
        nombre: "Set de mancuernas 10 kg",
        cateorias:"gimnasio",
        precio: 60000,
        cardImg: "imagenes javascript/gorra-running.jpg" ,
    },
    {
        id: 15,
        nombre: "Set de mancuernas 10 kg",
        cateorias:"gimnasio",
        precio: 60000,
        cardImg: "imagenes javascript/remera-running.jpg" ,
    },
]

abrir.addEventListener("click", () => {
    nav.classList.add("visible");  
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible")
})

let cart = JSON.parse(localStorage.getItem("cart")) || []

const createProductTemplate = (product) => {
    const { id, nombre, precio, cardImg } = product;
    return `
    <div class="card">
          <img class="producto-img" src="${cardImg}" alt=${nombre}">
          <div class="info-card">
              <h3>${nombre}</h3>
              <p>$${precio.toFixed(3)}</p>
              <div>
              <button class="btn-add"
              data-id='${id}'
              data-nombre='${nombre}'
              data-precio='${precio.toFixed(3)}'
              data-img='${cardImg}'>Agregar al Carrito</button>
          </div>
           </div>
      </div>`;
  };
  
  const renderProducts = (productList) => {
    cardContainer.innerHTML += productList
      .map(createProductTemplate)
      .join('');
  };

  const dividerProductsInParts = (size) => {
    let productsList = []
    for (let i = 0; i < productos.length; i+= size) {
        productsList.push(productos.slice(i,i + size))
    }
    return productsList
  }

  const appState = {
    products: dividerProductsInParts(6),
    currentProductsIndex: 0,    
    productslimit: dividerProductsInParts(6).length,
    activeFilter: null
  }

console.log(appState)
 

  
 

const islastIndexOf = () => {
    return appState.currentProductsIndex === appState.productslimit -1
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

 const changeBtnactiveState = (selectedCategory) => {
    const categorias = [...categoriesList];
    categorias.forEach((categoriaBtn) =>{
        if(categoriaBtn.dataset.categoria !== selectedCategory){
        categoriaBtn.classList.remove("active")
        return;
    }
    categoriaBtn.classList.add("active")
    })
 }

 const changeFilterState = (btn) =>{
    appState.activeFilter = btn.dataset.categoria;
    changeBtnactiveState(appState.activeFilter);
    setShowMoreVisibility(appState.activeFilter);
   
 };
 
const isInInactiveFitlerBtn = (element) =>{
    return (
        element.classList.contains("categoria") && !element.classList.contains("active")
    )
}

const applyFilter = (event) =>{
    const {target} = event;
    if(!isInInactiveFitlerBtn(target)) return;
    cardContainer.innerHTML = ""
    if(appState.activeFilter){
        renderFilterProducts();
        appState.currentProductsIndex= 0;
        return;
    }
    renderProducts(appState.products[0])
}

const renderFilterProducts = () => {
    const filteredProducts = productos.filter(
        (products) => products.cateorias === appState.activeFilter
    );
    renderProducts(filteredProducts)
} 

const init = () =>{
    renderProducts(appState.products[0])
    btnVm.addEventListener("click", showMoreProducts)
    cateoriesConteiner.addEventListener("click", applyFilter)
  }
  
  
  init()