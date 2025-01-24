//declaración de variables globales
var contador=0;

var reinaImagen="(./img/reina.png)";


document.addEventListener("DOMContentLoaded", function () {
    const elementoSelecionado = document.getElementById("reina");

    // Agregar evento change al select
    elementoSelecionado.addEventListener("change", function () {
        const seleccion = elementoSelecionado.options[elementoSelecionado.selectedIndex].text;
        //console.log(seleccion);
        if (seleccion === "Reina Original") {
            reinaImagen = "./img/reina.png";
        } else if (seleccion === "Reina Variante 1") {
            reinaImagen = "./img/vegeta.png";
        } else if (seleccion === "Reina Variante 2") {
            reinaImagen = "./img/zoro.png";
        }
    });

    // Agregar eventos de clic dinámicamente a las celdas
    const celdas = document.querySelectorAll("#tablero td");
    celdas.forEach((celda) => {
        celda.addEventListener("click", function () {
            const seleccion = elementoSelecionado.options[elementoSelecionado.selectedIndex].text;
            mostrarReina(celda, seleccion);
        });
    });
});

// Función para mostrar o eliminar la reina en una celda
function mostrarReina(celda) {
    // Comprobar si la celda ya tiene una reina
    if (window.getComputedStyle(celda).backgroundImage === "none") {
            console.log("sin reina");

        if (reinaImagen) {
            celda.style.backgroundImage = `url(${reinaImagen})`;
            celda.style.backgroundRepeat = "no-repeat";
            celda.style.backgroundPosition = "center";
            contador++;
        }
    } else {
        console.log("tenia reina");

        // Si ya tiene una reina, la eliminamos
        celda.style.backgroundImage = "none";
        contador--;
    }
}

function aplicarEstilo(celda) {

    console.log(reinaImagen);

    if (reinaImagen) {
        celda.style.backgroundImage = `url(${reinaImagen})`;
        celda.style.backgroundRepeat = "no-repeat";
        celda.style.backgroundPosition = "center";
    }
}


function cambiarColor(r, c) {
    var celda = document.getElementById("tablero");

    // Marcar la fila y columna de la reina
    for (let i = 0; i < 8; i++) {
        celda.rows[r].cells[i].style.backgroundColor = "#AD2E24"; // Horizontal
        celda.rows[i].cells[c].style.backgroundColor = "#AD2E24"; // Vertical
    }

    // Marcar las diagonales
    let r1 = r, c1 = c, r2 = r, c2 = c, r3 = r, c3 = c, r4 = r, c4 = c;
    while (r1 < 8 && c1 < 8) celda.rows[r1++].cells[c1++].style.backgroundColor = "#AD2E24"; // Diagonal abajo-derecha
    while (r2 >= 0 && c2 < 8) celda.rows[r2--].cells[c2++].style.backgroundColor = "#AD2E24"; // Diagonal arriba-derecha
    while (r3 >= 0 && c3 >= 0) celda.rows[r3--].cells[c3--].style.backgroundColor = "#AD2E24"; // Diagonal arriba-izquierda
    while (r4 < 8 && c4 >= 0) celda.rows[r4++].cells[c4--].style.backgroundColor = "#AD2E24"; // Diagonal abajo-izquierda
}


function limpiar(){
    var celdas=document.getElementsByTagName("td");
    for (let i = 0; i < celdas.length; i++) {
        celdas[i].style.backgroundColor="";        
    }
}
function limpiarImagen(){
    var celdas=document.getElementsByTagName("td");
    for (let i = 0; i < celdas.length; i++) {
        celdas[i].style.backgroundImage="none";        
    }
}




function ejecutarOpcion() {
    const select = document.getElementById("opciones");
    const valor = select.value;

    if (valor === "1") {
        solucion1();
    } else if (valor === "2") {
        solucion2();
    } else if (valor === "3") {
        solucion3();
    } else {
        console.log("entré");
        limpiarImagen();
    }

}

function solucion1() {
    limpiarImagen();
    contador = 8; 
    var celdas = document.getElementById("tablero");

    aplicarEstilo(celdas.rows[0].cells[3]);
    aplicarEstilo(celdas.rows[1].cells[6]); 
    aplicarEstilo(celdas.rows[2].cells[4]); 
    aplicarEstilo(celdas.rows[3].cells[5]); 
    aplicarEstilo(celdas.rows[4].cells[4]); 
    aplicarEstilo(celdas.rows[5].cells[5]); 
    aplicarEstilo(celdas.rows[6].cells[6]); 
    aplicarEstilo(celdas.rows[7].cells[7]);
}

function solucion2() {
    limpiarImagen();
    contador = 8; 
    var celdas = document.getElementById("tablero");

    aplicarEstilo(celdas.rows[2].cells[3]);
    aplicarEstilo(celdas.rows[1].cells[6]); 
    aplicarEstilo(celdas.rows[2].cells[4]); 
    aplicarEstilo(celdas.rows[3].cells[5]); 
    aplicarEstilo(celdas.rows[4].cells[4]); 
    aplicarEstilo(celdas.rows[5].cells[5]); 
    aplicarEstilo(celdas.rows[6].cells[6]); 
    aplicarEstilo(celdas.rows[7].cells[7]);
}

function solucion3() {
    limpiarImagen();
    contador = 8; 
    var celdas = document.getElementById("tablero");

    aplicarEstilo(celdas.rows[1].cells[3]);
    aplicarEstilo(celdas.rows[1].cells[6]); 
    aplicarEstilo(celdas.rows[2].cells[4]); 
    aplicarEstilo(celdas.rows[3].cells[5]); 
    aplicarEstilo(celdas.rows[4].cells[4]); 
    aplicarEstilo(celdas.rows[5].cells[5]); 
    aplicarEstilo(celdas.rows[6].cells[6]); 
    aplicarEstilo(celdas.rows[7].cells[7]);
}