//declaración de variables globales
var contador=0;
var reinaImagen="url(./img/reina.png)";

var colorCeldaImpar="#fece9e";
var colorCeldaPar="#d18b47";

var colorCeldaBloqueada="#861F18";

var colorCeldaAtaque="#AD2E24";

document.addEventListener("DOMContentLoaded", function() {
    cambiarColoresTablero();
});

document.getElementById("reina").addEventListener("change", function () {
    const selectedOption = this.value; 

    if (selectedOption === "reina0") {
        console.log("Has seleccionado: Reina Original");
    } else if (selectedOption === "reina1") {
        console.log("Has seleccionado: Reina Variante 1");
    } else if (selectedOption === "reina2") {
        console.log("Has seleccionado: Reina Variante 2");
    } else {
        console.log("No has seleccionado una opción válida.");
    }
});



function mostrarReina(celda){

    var row = celda.parentNode.rowIndex; // Fila
    var col = celda.cellIndex; //Columna

    if (window.getComputedStyle(celda).backgroundImage=="none") {

        var cellValue = celda.getAttribute("data-valor"); 

        if (contador<8 && cellValue != "bloqueada"){
        celda.style = `background-image: ${reinaImagen};
               background-repeat:no-repeat;
               background-position:center;` 
        contador++;
        
        ataqueColor(row, col, "bloqueada");
        }
    } else{ 
        ataqueColor(row, col, "desbloqueada");
        celda.style = `background-image:none;`
        celda.setAttribute("data-valor", "desbloqueada");
        contador--;       
    }

    actualizarReinas()
}


function ataqueColor(r, c, valor) {
    const celda = document.getElementById("tablero");
    const color = valor === "bloqueada" ? colorCeldaBloqueada : "none";

    // Función auxiliar para aplicar cambios a una celda
    function aplicarCambio(row, col) {
        const currentCell = celda.rows[row]?.cells[col];
        if (currentCell) {
            currentCell.style.backgroundColor = color;
            currentCell.setAttribute("data-valor", valor);
        }
    }

    // Marcar horizontal y vertical
    for (let i = 0; i < 8; i++) {
        aplicarCambio(r, i); // Horizontal
        aplicarCambio(i, c); // Vertical
    }

    // Marcar diagonales
    let r1 = r, c1 = c, r2 = r, c2 = c, r3 = r, c3 = c, r4 = r, c4 = c;
    while (r1 < 8 && c1 < 8) aplicarCambio(r1++, c1++); // Diagonal abajo-derecha
    while (r2 >= 0 && c2 < 8) aplicarCambio(r2--, c2++); // Diagonal arriba-derecha
    while (r3 >= 0 && c3 >= 0) aplicarCambio(r3--, c3--); // Diagonal arriba-izquierda
    while (r4 < 8 && c4 >= 0) aplicarCambio(r4++, c4--); // Diagonal abajo-izquierda
}




function cambiarColor(r, c) {
    var celda = document.getElementById("tablero");

    // Marcar la fila y columna de la reina
    for (let i = 0; i < 8; i++) {
        celda.rows[r].cells[i].style.backgroundColor = colorCeldaAtaque; // Horizontal
        celda.rows[i].cells[c].style.backgroundColor = colorCeldaAtaque; // Vertical
    }

    // Marcar las diagonales
    let r1 = r, c1 = c, r2 = r, c2 = c, r3 = r, c3 = c, r4 = r, c4 = c;
    while (r1 < 8 && c1 < 8) celda.rows[r1++].cells[c1++].style.backgroundColor = colorCeldaAtaque; // Diagonal abajo-derecha
    while (r2 >= 0 && c2 < 8) celda.rows[r2--].cells[c2++].style.backgroundColor = colorCeldaAtaque; // Diagonal arriba-derecha
    while (r3 >= 0 && c3 >= 0) celda.rows[r3--].cells[c3--].style.backgroundColor = colorCeldaAtaque; // Diagonal arriba-izquierda
    while (r4 < 8 && c4 >= 0) celda.rows[r4++].cells[c4--].style.backgroundColor = colorCeldaAtaque; // Diagonal abajo-izquierda
}


function limpiar(){
    var celdas=document.getElementsByTagName("td");
    for (let i = 0; i < celdas.length; i++) {
        celdas[i].style.backgroundColor="";        
    }

    cambiarColoresTablero();
}

function limpiarImagen(){
    var celdas=document.getElementsByTagName("td");
    for (let i = 0; i < celdas.length; i++) {
        celdas[i].style.backgroundImage="none";        
    }
    cambiarColoresTablero();


}

//Imagen reina

function cambiarReina(){
    const select = document.getElementById("reina");
    const valor = select.value;

    if (valor === "0") {
        reinaImagen="url(./img/reina.png)";
    } else if (valor === "1") {
        reinaImagen="url(./img/reina2.png)";
    } else if (valor === "2") {
        reinaImagen="url(./img/reina3.png)";
    }
    cambiarColoresTablero();
    actualizarReinas();
}

function actualizarReinas() {
    const celdas = document.getElementById("tablero").getElementsByTagName("td");

    for (let i = 0; i < celdas.length; i++) {
        let celda = celdas[i];
        
        if (window.getComputedStyle(celda).backgroundImage !== "none") {
            celda.style.backgroundImage = reinaImagen;
            celda.style.backgroundRepeat = "no-repeat";
            celda.style.backgroundPosition = "center";

            let row = celda.parentNode.rowIndex;  // Fila de la celda
            let col = celda.cellIndex;

            ataqueColor(row, col, "bloqueada");
        }
    }
}

//Soluciones

function ejecutarOpcion(){
    const select = document.getElementById("opciones");
    const valor = select.value;

    if (valor === "1") {
        solucion1();
    } else if (valor === "2") {
        solucion2();
    } else if (valor === "3") {
        solucion3();
    }
    cambiarColoresTablero();

}

function desbloquearTodasLasCeldas() {
    var tablero = document.getElementById("tablero");
    for (let r = 0; r < tablero.rows.length; r++) {
        var fila = tablero.rows[r];
        for (let c = 0; c < fila.cells.length; c++) {
            var celda = fila.cells[c];
            celda.removeAttribute("data-valor");
        }
    }
}

function reinicio(){
    contador = 0;

    limpiarImagen();
    desbloquearTodasLasCeldas()
    cambiarColoresTablero();

}

function solucion1() {
    contador = 8;
    limpiarImagen(); 

    var celdas = document.getElementById("tablero");

    var estilo = `background-image: ${reinaImagen};
               background-repeat:no-repeat;
               background-position:center;`;

    celdas.rows[0].cells[4].style = estilo;
    celdas.rows[1].cells[1].style = estilo; 
    celdas.rows[2].cells[3].style = estilo; 
    celdas.rows[3].cells[6].style = estilo; 
    celdas.rows[4].cells[2].style = estilo; 
    celdas.rows[5].cells[7].style = estilo; 
    celdas.rows[6].cells[5].style = estilo; 
    celdas.rows[7].cells[1].style = estilo;

    actualizarReinas()
    cambiarColoresTablero();

}

function solucion2() {
    contador = 8;
    limpiarImagen(); 

    var celdas = document.getElementById("tablero");

    var estilo = `background-image: ${reinaImagen};
               background-repeat:no-repeat;
               background-position:center;` ;

    celdas.rows[0].cells[3].style = estilo;
    celdas.rows[1].cells[1].style = estilo; 
    celdas.rows[2].cells[6].style = estilo; 
    celdas.rows[3].cells[2].style = estilo; 
    celdas.rows[4].cells[5].style = estilo; 
    celdas.rows[5].cells[7].style = estilo; 
    celdas.rows[6].cells[4].style = estilo; 
    celdas.rows[7].cells[0].style = estilo;

    actualizarReinas()
    cambiarColoresTablero();

}

function solucion3() {
    contador = 8;
    limpiarImagen(); 

    var celdas = document.getElementById("tablero");

    var estilo = `background-image: ${reinaImagen};
               background-repeat:no-repeat;
               background-position:center;` ;

    celdas.rows[0].cells[4].style = estilo;
    celdas.rows[1].cells[6].style = estilo; 
    celdas.rows[2].cells[2].style = estilo; 
    celdas.rows[3].cells[7].style = estilo; 
    celdas.rows[4].cells[1].style = estilo; 
    celdas.rows[5].cells[4].style = estilo; 
    celdas.rows[6].cells[0].style = estilo; 
    celdas.rows[7].cells[5].style = estilo;

    actualizarReinas()
    cambiarColoresTablero();

}

//Colores

function cambiarColoresTablero() {
    colorCeldaAtaque = (document.getElementById('colorCeldaAtaqueID')).value;
    colorCeldaBloqueada = (document.getElementById('colorCeldaBloqueadoID')).value;
    
    const rows = document.querySelectorAll('tr');
    colorCeldaImpar = (document.getElementById('colorCeldaImparID')).value;
    colorCeldaPar = (document.getElementById('colorCeldaParID')).value;

    rows.forEach((row, rowIndex) => {
        const cells = row.querySelectorAll('td');
        
        cells.forEach((cell, cellIndex) => {
            if (cell.getAttribute("data-valor") === "bloqueada") {
                cell.style.backgroundColor = colorCeldaBloqueada; 
            } else {
                if ((rowIndex % 2 === 0 && cellIndex % 2 === 0) || (rowIndex % 2 !== 0 && cellIndex % 2 !== 0)) {
                    cell.style.backgroundColor = colorCeldaImpar; 
                }

                if ((rowIndex % 2 !== 0 && cellIndex % 2 === 0) || (rowIndex % 2 === 0 && cellIndex % 2 !== 0)) {
                    cell.style.backgroundColor = colorCeldaPar; 
                }
            }
        });
    });
}