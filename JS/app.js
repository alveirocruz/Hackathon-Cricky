const productos = [
    { id: 1, nombre: "Viaje a Cartagena", precio: 800000, img: "img/Cartagena.png"},
    { id: 2, nombre: "Tour San Andres", precio: 1200000, img: "img/San_Andres.png"},
    { id: 3, nombre: "Viaje a Santa Marta", precio: 900000, img: "img/Santa_Marta.jpg"},
    { id: 4, nombre: "Tour Medellin", precio: 700000, img: "img/Medellin.jpg"},
    { id: 5, nombre: "Tour Medellin", precio: 500000, img: "img/Cali.jpg"},
    { id: 6, nombre: "Tour Medellin", precio: 900000, img: "img/NevadoTolima.jpg"},
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
function mostrarProductos() {
    const contenedor = document.getElementById("productos");

    productos.forEach(prod => {
        const col = document.createElement("div");
        col.classList.add("col-md-4", "mb-4");

        col.innerHTML = `
            <div class="card h-100 shadow-lg">
                <img src="${prod.img}" class="card-img-top" alt="${prod.nombre}">
                <div class="card-body text-center">
                    <h5 class="card-title">${prod.nombre}</h5>
                    <p class="card-text">$${prod.precio}</p>
                    <button class="btn btn-primary btn-lg w-100"
                        onclick="agregarCarrito(${prod.id})">
                        Agregar
                    </button>
                </div>
            </div>
        `;
        contenedor.appendChild(col);
    });
}

function agregarCarrito(id) {
    const producto = productos.find(p => p.id === id);

    if (!producto) {
        console.error("Producto no encontrado");
        return;
    }
    carrito.push(producto);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}

function mostrarCarrito() {
    const contenedor = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");

    contenedor.innerHTML = "";
    let total = 0;

    carrito.forEach((prod, index) => {
        const col = document.createElement("div");
        col.classList.add("col-md-4", "mb-4");

        col.innerHTML = `
            <div class="card shadow">
                <img src="${prod.img}" class="card-img-top">

                <div class="card-body text-center">
                    <h5>${prod.nombre}</h5>
                    <p>$${prod.precio.toLocaleString()}</p>

                    <button class="btn btn-danger"
                        onclick="eliminarProducto(${index})">
                        Eliminar ❌
                    </button>
                </div>
            </div>
        `;

        contenedor.appendChild(col)
        total += prod.precio;
    });

    totalElemento.textContent = total.toLocaleString();
    document.getElementById("contador").textContent = carrito.length;
}

function eliminarProducto(index) {
    carrito.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}

mostrarProductos();
mostrarCarrito();

function vaciarCarrito() {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}