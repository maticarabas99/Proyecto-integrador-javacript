const productos = [
    {
        id: 1,
        nombre: "Pelota de Futbol",
        cateoria: "futbol",
        precio: 25.499,
        cardImg: "imagenes javascript/16525067-800-auto.jpg",
    },
    {
        id: 2,
        nombre: "Zapatillas de Running",
        cateoria: "running",
        precio: 60.000,
        cardImg: "imagenes javascript/AD_GX9285-1.jpg",
    },
    {
        id: 3,
        nombre: "Discos Olimpicos",
        cateoria: "gimnasio",
        precio: 80.000,
        cardImg: "imagenes javascript/disco-olimpico-acero-45lbs_5000x.jpg",
    },
    {
        id: 4,
        nombre: "Camiseta Estudiantes",
        cateoria: "futbol",
        precio: 28.199,
        cardImg: "imagenes javascript/EDLP.jpg",
    },
    {
        id: 5,
        nombre: "Pelota de Basquet",
        cateoria: "basquet",
        precio: 50.000,
        cardImg: "imagenes javascript/pelota-basquet.jpg",
    },
    {
        id: 6,
        nombre: "Set de mancuernas 10 kg",
        cateoria: "gimnasio",
        precio: 25.000,
        cardImg: "imagenes javascript/mancuernas.jpg",
    },
    {
        id: 7,
        nombre: "Camiseta de boca",
        cateoria: "futbol",
        precio: 30.000,
        cardImg: "imagenes javascript/boca.jpg",
    },
    {
        id: 8,
        nombre: "Camiseta de river",
        cateoria: "futbol",
        precio: 32.000,
        cardImg: "imagenes javascript/river.jpg",
    },
    {
        id: 9,
        nombre: "Camiseta de argentina",
        cateoria: "futbol",
        precio: 66.000,
        cardImg: "imagenes javascript/argentina86.jpg",
    },
    {
        id: 10,
        nombre: "Bicicleta Estática ",
        cateoria: "gimnasio",
        precio: 200.000,
        cardImg: "imagenes javascript/bici.jpg",
    },
    {
        id: 11,
        nombre: "Extensión de Piernas ",
        cateoria: "gimnasio",
        precio: 600.000,
        cardImg: "imagenes javascript/cuadriceps.jpg",
    },
    {
        id: 12,
        nombre: "Barra Olímpica Hexagonal",
        cateoria: "gimnasio",
        precio: 48.700,
        cardImg: "imagenes javascript/barra-hexagonal.jpg",
    },
    {
        id: 13,
        nombre: "Camiseta de basquet",
        cateoria: "basquet",
        precio: 19.500,
        cardImg: "imagenes javascript/camisetadebasqut.jpg",
    },
    {
        id: 14,
        nombre: "Gorra Running",
        cateoria: "running",
        precio: 17.000,
        cardImg: "imagenes javascript/gorra-running.jpg",
    },
    {
        id: 15,
        nombre: "Remera running",
        cateoria: "running",
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
