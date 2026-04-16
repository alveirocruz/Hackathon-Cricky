const productos = [
    { id: 1, nombre: "Viaje a Cartagena", precio: 800000},
    { id: 2, nombre: "Tour San Andres", precio: 1200000},
    { id: 3, nombre: "Viaje a Santa Marta", precio: 900000},
    { id: 4, nombre: "Tour Medellin", precio: 700000},
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
function mostrarProductos() {
    const contenedor = document.getElementById("productos");

    productos.forEach(prod => {
        const col = document.createElement("div");
        col.classList.add("col-md-4", "mb-4");

        col.innerHTML = `
            <div class="card h-100 shadow-lg">
                <img src="#" class="card-img-top" alt="viaje">
                <div class="card-body text-center">
                    <h5 class="card-title">${prod.nombre}</h5>
                    <p class="card-text">$${prod.precio}</p>
                    <button class="btn btn-primary btn-lg w-100" onclick="agregarCarrito(${prod.id})">
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
    carrito.push(producto);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}

function mostrarCarrito() {
    const lista = document.getElementById("lista-carrito");
    lista.innerHTML = "";

    carrito.forEach((prod, index) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-betwee");

        li.innerHTML = `
            ${prod.nombre} - $${prod.precio}
            <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">❌</button>
        `;

        lista.appendChild(li);
    });

    document.getElementById("contador").textContent = carrito.length;
}

function eliminarProducto(index) {
    carrito.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}

mostrarProductos();
mostrarCarrito();