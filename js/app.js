// ========================================
// VARIABLES GLOBALES
// ========================================

// DATOS DE SESIÓN
var sesionActiva = false;

// ARRAYS PARA ALMACENAR DATOS
var duenos = [];
var mascotas = [];
var agenda = [];
var carrito = [];

// PRODUCTOS DEL CATÁLOGO (con imágenes)
var productos = [
    { 
        id: 1, 
        nombre: "Shampoo Premium", 
        precio: 150, 
        tipo: "producto",
        imagen: "..\\imagenes\\Imagen-de-WhatsApp-2024-11-10-a-las-12.46.04_f7ae8227-1.jpg"
    },
    { 
        id: 2, 
        nombre: "Cepillo Profesional", 
        precio: 30, 
        tipo: "producto",
        imagen: "..\\imagenes\\4976555849110.jpg"
    },
    { 
        id: 3, 
        nombre: "Juguete Interactivo", 
        precio: 180, 
        tipo: "producto",
        imagen: "..\\imagenes\\71RjQBwFciL._AC_.jpg"
    },
    { 
        id: 4, 
        nombre: "CIBAU Adulto Rza. Mediana 15kg", 
        precio: 487, 
        tipo: "producto",
        imagen: "..\\imagenes\\comida-perro.jpg"
    },
    { 
        id: 5, 
        nombre: "Collar Elegante", 
        precio: 120, 
        tipo: "producto",
        imagen: "..\\imagenes\\COLLAR-PARA-MASCOTA_CASCABEL.jpg"
    },
    { 
        id: 6, 
        nombre: "Baño Express", 
        precio: 50, 
        tipo: "servicio",
        imagen: "..\\imagenes\\baño.jpg"
    },
    { 
        id: 7, 
        nombre: "MATISSE Gatos Castrados Pollo 7.5kg", 
        precio: 287, 
        tipo: "producto",
        imagen: "..\\imagenes\\comida-gato.jpg"
    },
    { 
        id: 8, 
        nombre: "Rompecabezas de Comida para Mascotas", 
        precio: 68, 
        tipo: "producto",
        imagen: "..\\imagenes\\platcom.jpg"
    },
];

// ========================================
// FUNCIONES DE SESIÓN
// ========================================

// FUNCIÓN LOGIN
function iniciarSesion() {
    var usuario = document.getElementById("usuario").value;
    var password = document.getElementById("password").value;

    if (usuario === "admin" && password === "1234") {
        sesionActiva = true;
        document.getElementById("login").style.display = "none";
        document.getElementById("sistema").style.display = "block";
        cargarCatalogo();
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}

// FUNCIÓN CERRAR SESIÓN
function cerrarSesion() {
    sesionActiva = false;
    document.getElementById("login").style.display = "block";
    document.getElementById("sistema").style.display = "none";
    document.getElementById("usuario").value = "";
    document.getElementById("password").value = "";
}

// ========================================
// FUNCIONES DE NAVEGACIÓN
// ========================================

// FUNCIÓN MOSTRAR MÓDULO
function mostrarModulo(modulo) {
    // Ocultar todos los módulos
    document.getElementById("modRegistro").classList.remove("activo");
    document.getElementById("modAgenda").classList.remove("activo");
    document.getElementById("modCarrito").classList.remove("activo");
    
    // Remover clase activo de botones
    document.getElementById("btnRegistro").classList.remove("activo");
    document.getElementById("btnAgenda").classList.remove("activo");
    document.getElementById("btnCarrito").classList.remove("activo");

    // Mostrar el módulo seleccionado
    if (modulo === "registro") {
        document.getElementById("modRegistro").classList.add("activo");
        document.getElementById("btnRegistro").classList.add("activo");
    } else if (modulo === "agenda") {
        document.getElementById("modAgenda").classList.add("activo");
        document.getElementById("btnAgenda").classList.add("activo");
    } else if (modulo === "carrito") {
        document.getElementById("modCarrito").classList.add("activo");
        document.getElementById("btnCarrito").classList.add("activo");
    }
}

// ========================================
// FUNCIONES DEL MÓDULO REGISTRO
// ========================================

// REGISTRAR DUEÑO
function registrarDueno() {
    var nombre = document.getElementById("nombreDueno").value;
    var telefono = document.getElementById("telefonoDueno").value;
    var correo = document.getElementById("correoDueno").value;

    if (nombre === "" || telefono === "" || correo === "") {
        alert("Por favor complete todos los campos");
        return;
    }

    var dueno = {
        id: duenos.length + 1,
        nombre: nombre,
        telefono: telefono,
        correo: correo
    };

    duenos.push(dueno);
    
    mostrarMensaje("mensajeRegistro", "Dueño registrado exitosamente");
    limpiarFormularioDueno();
    actualizarListaDuenos();
}

// REGISTRAR MASCOTA
function registrarMascota() {
    var nombre = document.getElementById("nombreMascota").value;
    var especie = document.getElementById("especieMascota").value;
    var raza = document.getElementById("razaMascota").value;

    if (nombre === "" || especie === "" || raza === "") {
        alert("Por favor complete todos los campos");
        return;
    }

    var mascota = {
        id: mascotas.length + 1,
        nombre: nombre,
        especie: especie,
        raza: raza
    };

    mascotas.push(mascota);
    
    mostrarMensaje("mensajeRegistro", "Mascota registrada exitosamente");
    limpiarFormularioMascota();
    actualizarListaMascotas();
}

// ========================================
// FUNCIONES DEL MÓDULO AGENDA
// ========================================

// AGENDAR SERVICIO
function agendarServicio() {
    var fecha = document.getElementById("fechaServicio").value;
    var hora = document.getElementById("horaServicio").value;
    var mascota = document.getElementById("mascotaServicio").value;
    var servicio = document.getElementById("tipoServicio").value;

    if (fecha === "" || hora === "" || mascota === "" || servicio === "") {
        alert("Por favor complete todos los campos");
        return;
    }

    var cita = {
        id: agenda.length + 1,
        fecha: fecha,
        hora: hora,
        mascota: mascota,
        servicio: servicio
    };

    agenda.push(cita);
    
    mostrarMensaje("mensajeAgenda", "Servicio agendado exitosamente");
    limpiarFormularioAgenda();
    actualizarListaAgenda();
}

// ========================================
// FUNCIONES DEL MÓDULO CARRITO
// ========================================

// CARGAR CATÁLOGO CON IMÁGENES
function cargarCatalogo() {
    var html = "";
    
    for (var i = 0; i < productos.length; i++) {
        html += "<div class='producto'>";
        html += "<img src='" + productos[i].imagen + "' alt='" + productos[i].nombre + "' class='producto-imagen'>";
        html += "<h4>" + productos[i].nombre + "</h4>";
        html += "<p>Tipo: " + productos[i].tipo + "</p>";
        html += "<div class='precio'>bs " + productos[i].precio + "</div>";
        html += "<button class='btn' onclick='agregarAlCarrito(" + productos[i].id + ")'>Comprar</button>";
        html += "</div>";
    }
    
    document.getElementById("catalogoProductos").innerHTML = html;
}

// AGREGAR AL CARRITO
function agregarAlCarrito(idProducto) {
    var producto = null;
    
    for (var i = 0; i < productos.length; i++) {
        if (productos[i].id === idProducto) {
            producto = productos[i];
            break;
        }
    }

    if (producto !== null) {
        carrito.push(producto);
        actualizarCarrito();
    }
}

// ACTUALIZAR CARRITO
function actualizarCarrito() {
    var html = "";
    var subtotal = 0;

    if (carrito.length === 0) {
        html = "<p>El carrito está vacío</p>";
    } else {
        for (var i = 0; i < carrito.length; i++) {
            html += "<div class='carrito-item'>";
            html += "<div>";
            html += "<strong>" + carrito[i].nombre + "</strong><br>";
            html += "<small>" + carrito[i].tipo + "</small>";
            html += "</div>";
            html += "<div class='precio'>bs " + carrito[i].precio + "</div>";
            html += "</div>";
            
            subtotal += carrito[i].precio;
        }
    }

    document.getElementById("carritoItems").innerHTML = html;
    document.getElementById("subtotal").textContent = subtotal;
    document.getElementById("total").textContent = subtotal;
}

// ========================================
// FUNCIONES DE ACTUALIZACIÓN DE LISTAS
// ========================================

// ACTUALIZAR LISTA DE DUEÑOS
function actualizarListaDuenos() {
    var html = "<h4>Dueños Registrados (" + duenos.length + ")</h4>";
    
    for (var i = 0; i < duenos.length; i++) {
        html += "<div class='lista-item'>";
        html += "<strong>" + duenos[i].nombre + "</strong><br>";
        html += "Tel: " + duenos[i].telefono + " | Email: " + duenos[i].correo;
        html += "</div>";
    }
    
    document.getElementById("listaDuenos").innerHTML = html;
}

// ACTUALIZAR LISTA DE MASCOTAS
function actualizarListaMascotas() {
    var html = "<h4>Mascotas Registradas (" + mascotas.length + ")</h4>";
    
    for (var i = 0; i < mascotas.length; i++) {
        html += "<div class='lista-item'>";
        html += "<strong>" + mascotas[i].nombre + "</strong><br>";
        html += mascotas[i].especie + " - " + mascotas[i].raza;
        html += "</div>";
    }
    
    document.getElementById("listaMascotas").innerHTML = html;
}

// ACTUALIZAR LISTA DE AGENDA
function actualizarListaAgenda() {
    var html = "<h4>Servicios Agendados (" + agenda.length + ")</h4>";
    
    for (var i = 0; i < agenda.length; i++) {
        html += "<div class='lista-item'>";
        html += "<strong>" + agenda[i].servicio + "</strong><br>";
        html += "Mascota: " + agenda[i].mascota + " | ";
        html += "Fecha: " + agenda[i].fecha + " | Hora: " + agenda[i].hora;
        html += "</div>";
    }
    
    document.getElementById("listaAgenda").innerHTML = html;
}

// ========================================
// FUNCIONES AUXILIARES
// ========================================

// LIMPIAR FORMULARIO DUEÑO
function limpiarFormularioDueno() {
    document.getElementById("nombreDueno").value = "";
    document.getElementById("telefonoDueno").value = "";
    document.getElementById("correoDueno").value = "";
}

// LIMPIAR FORMULARIO MASCOTA
function limpiarFormularioMascota() {
    document.getElementById("nombreMascota").value = "";
    document.getElementById("especieMascota").value = "";
    document.getElementById("razaMascota").value = "";
}

// LIMPIAR FORMULARIO AGENDA
function limpiarFormularioAgenda() {
    document.getElementById("fechaServicio").value = "";
    document.getElementById("horaServicio").value = "";
    document.getElementById("mascotaServicio").value = "";
    document.getElementById("tipoServicio").value = "";
}

// MOSTRAR MENSAJES
function mostrarMensaje(idElemento, texto) {
    var elemento = document.getElementById(idElemento);
    elemento.textContent = texto;
    elemento.className = "mensaje exito";
    
    setTimeout(function() {
        elemento.className = "mensaje";
    }, 3000);
}