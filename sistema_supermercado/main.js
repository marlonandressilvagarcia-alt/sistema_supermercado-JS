const productos = [
{ id: 1, nombre: "Manzanas", precio: 2.50, categoria: "Frutas" },
{ id: 2, nombre: "Leche", precio: 3.20, categoria: "Lácteos" },
{ id: 3, nombre: "Pan", precio: 1.80, categoria: "Panadería" },
{ id: 4, nombre: "Queso", precio: 5.00, categoria: "Lácteos" },
{ id: 5, nombre: "Tomates", precio: 2.00, categoria: "Verduras" },
{ id: 6, nombre: "Huevos", precio: 4.50, categoria: "Lácteos" },
{ id: 7, nombre: "Arroz", precio: 3.00, categoria: "Granos" },
{ id: 8, nombre: "Aceite", precio: 6.00, categoria: "Aceites" }
];

let carrito = [];

function mostrarProductos() {
    const listaProductos = document.getElementById("productosLista");
    listaProductos.innerHTML = "";

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.className = "producto-card";
        card.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p style="color: #777; font-size: 14px;">${producto.categoria}</p>
            <p class="producto-precio">$${producto.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        listaProductos.appendChild(card);
    });
}

function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    const existe = carrito.find(item => item.id === idProducto);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById("carritoLista");

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>El carrito está vacío</p>";
        document.getElementById("totalPrecio").innerText = "0.00";
        document.getElementById("totalCantidad").innerText = "0";
        return;
    }

    listaCarrito.innerHTML = "";

    carrito.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "carrito-item";
        itemDiv.innerHTML = `
            <div class="carrito-item-info">
                <h4>${item.nombre}</h4>
                <p>$${item.precio.toFixed(2)} x ${item.cantidad}</p>
            </div>
            <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;
        listaCarrito.appendChild(itemDiv);
    });

    calcularTotales();
}

function calcularTotales() {
    const totalPrecio = carrito.reduce((acumulador, item) => acumulador + (item.precio * item.cantidad), 0);
    const totalCantidad = carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);

    document.getElementById("totalPrecio").innerText = totalPrecio.toFixed(2);
    document.getElementById("totalCantidad").innerText = totalCantidad;
}

function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    actualizarCarrito();
}

function limpiarCarrito() {
    carrito = [];
    actualizarCarrito();
}

document.addEventListener('DOMContentLoaded', function () {
    mostrarProductos();
    actualizarCarrito();

    const btnLimpiar = document.getElementById("limpiarCarrito");
    btnLimpiar.addEventListener("click", limpiarCarrito);
});