const productos = [
    {
        id: 1,
        nombre: "Pelota de Futbol",
        cateorias: "futbol" ,
        precio: 25000,
        cardImg: "imagenes javascript/16525067-800-auto.jpg" ,
    },
    {
        id: 2,
        nombre:"Zapatillas de Running",
        cateorias: "running",
        precio: 60000 ,
        cardImg: "imagenes javascript/AD_GX9285-1.jpg",
    },
    {
        id: 3,
        nombre: "Discos Olimpicos",
        cateorias:"gimnasio",
        precio: 80000,
        cardImg: "imagenes javascript/disco-olimpico-acero-45lbs_5000x.jpg" ,
    },
    {
        id: 4,
        nombre: "Camiseta Estudiantes",
        cateorias: "futbol",
        precio: 20000,
        cardImg: "imagenes javascript/EDLP.jpg" ,
    },
    {
        id: 5,
        nombre: "Pelota de Basquet",
        cateorias: "basquet",
        precio: 50000,
        cardImg: "imagenes javascript/pelota-basquet.jpg" ,
    },
    {
        id: 6,
        nombre: "Set de mancuernas 10 kg",
        cateorias:"gimnasio",
        precio: 60000,
        cardImg: "imagenes javascript/mancuernas.jpg" ,
    },
    {
        id: 7,
        nombre: "Set de mancuernas 10 kg",
        cateorias:"gimnasio",
        precio: 60000,
        cardImg: "imagenes javascript/mancuernas.jpg" ,
    },
    {
        id: 8,
        nombre: "Set de mancuernas 10 kg",
        cateorias:"gimnasio",
        precio: 60000,
        cardImg: "imagenes javascript/mancuernas.jpg" ,
    },
    {
        id: 9,
        nombre: "Set de mancuernas 10 kg",
        cateorias:"gimnasio",
        precio: 60000,
        cardImg: "imagenes javascript/mancuernas.jpg" ,
    },
    {
        id: 10,
        nombre: "Set de mancuernas 10 kg",
        cateorias:"gimnasio",
        precio: 60000,
        cardImg: "imagenes javascript/mancuernas.jpg" ,
    },
    {
        id: 11,
        nombre: "Set de mancuernas 10 kg",
        cateorias:"gimnasio",
        precio: 60000,
        cardImg: "imagenes javascript/mancuernas.jpg" ,
    },
    {
        id: 12,
        nombre: "Set de mancuernas 10 kg",
        cateorias:"gimnasio",
        precio: 60000,
        cardImg: "imagenes javascript/mancuernas.jpg" ,
    },
    {
        id: 13,
        nombre: "Set de mancuernas 10 kg",
        cateorias:"gimnasio",
        precio: 60000,
        cardImg: "imagenes javascript/mancuernas.jpg" ,
    },
    {
        id: 14,
        nombre: "Set de mancuernas 10 kg",
        cateorias:"gimnasio",
        precio: 60000,
        cardImg: "imagenes javascript/mancuernas.jpg" ,
    },
    {
        id: 15,
        nombre: "Set de mancuernas 10 kg",
        cateorias:"gimnasio",
        precio: 60000,
        cardImg: "imagenes javascript/mancuernas.jpg" ,
    },
]

const createProductTemplate = (product) => {
    const { id, nombre, precio, cardImg } = product;
    return `
    <div class="card">
          <img class="producto-img" src="${cardImg}" alt=${nombre}">
          <div class="info-card">
              <h3>${nombre}</h3>
              <p>$${precio}</p>
              <div>
              <button class="btn-add"
              data-id='${id}'
              data-nombre='${nombre}'
              data-precio='${precio}'
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
 
  
  const init = () =>{
    renderProducts(appState.products[0])
    btnVm.addEventListener("click", showMoreProducts)
    
  }
  
  
  init()