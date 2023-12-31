const productos = [
    {
        id: 1,
        nombre: "Pelota de Futbol",
        categoria: "futbol",
        precio: 25.499,
        cardImg: "imagenes javascript/16525067-800-auto.jpg",
    },
    {
        id: 2,
        nombre: "Zapatillas de Running",
        categoria: "running",
        precio: 60.000,
        cardImg: "imagenes javascript/AD_GX9285-1.jpg",
    },
    {
        id: 3,
        nombre: "Discos Olimpicos",
        categoria: "gimnasio",
        precio: 80.000,
        cardImg: "imagenes javascript/disco-olimpico-acero-45lbs_5000x.jpg",
    },
    {
        id: 4,
        nombre: "Camiseta Estudiantes",
        categoria: "futbol",
        precio: 28.199,
        cardImg: "imagenes javascript/EDLP.jpg",
    },
    {
        id: 5,
        nombre: "Pelota de Basquet",
        categoria: "basquet",
        precio: 50.000,
        cardImg: "imagenes javascript/pelota-basquet.jpg",
    },
    {
        id: 6,
        nombre: "Set de mancuernas 10 kg",
        categoria: "gimnasio",
        precio: 25.000,
        cardImg: "imagenes javascript/mancuernas.jpg",
    },
    {
        id: 7,
        nombre: "Camiseta de boca",
        categoria: "futbol",
        precio: 30.000,
        cardImg: "imagenes javascript/boca.jpg",
    },
    {
        id: 8,
        nombre: "Camiseta de river",
        categoria: "futbol",
        precio: 32.000,
        cardImg: "imagenes javascript/river.jpg",
    },
    {
        id: 9,
        nombre: "Camiseta de argentina",
        categoria: "futbol",
        precio: 66.000,
        cardImg: "imagenes javascript/argentina86.jpg",
    },
    {
        id: 10,
        nombre: "Bicicleta Estática ",
        categoria: "gimnasio",
        precio: 200.000,
        cardImg: "imagenes javascript/bici.jpg",
    },
    {
        id: 11,
        nombre: "Extensión de Piernas ",
        categoria: "gimnasio",
        precio: 600.000,
        cardImg: "imagenes javascript/cuadriceps.jpg",
    },
    {
        id: 12,
        nombre: "Barra Olímpica Hexagonal",
        categoria: "gimnasio",
        precio: 48.700,
        cardImg: "imagenes javascript/barra-hexagonal.jpg",
    },
    {
        id: 13,
        nombre: "Camiseta de basquet",
        categoria: "basquet",
        precio: 19.500,
        cardImg: "imagenes javascript/camisetadebasqut.jpg",
    },
    {
        id: 14,
        nombre: "Gorra Running",
        categoria: "running",
        precio: 17.000,
        cardImg: "imagenes javascript/gorra-running.jpg",
    },
    {
        id: 15,
        nombre: "Remera running",
        categoria: "running",
        precio: 19.000,
        cardImg: "imagenes javascript/remera-running.jpg",
    },
]

const dividerProductsInParts = (size) => {
    let productsList = []
    for (let i = 0; i < productos.length; i += size) {
        productsList.push(productos.slice(i, i + size))
    }
    return productsList
}

const appState = {
    products: dividerProductsInParts(6),
    currentProductsIndex: 0,
    productslimit: dividerProductsInParts(6).length,
    activeFilter: null
}

