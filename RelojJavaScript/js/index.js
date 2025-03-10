/* Ejercicio una función que permite mostrar el reloj
en el elemento HTML con id="reloj" al presionar el botón con id="mostrar" */
function reloj() {
    let fecha = new Date();
    console.log (fecha);
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();

    document.getElementById("reloj").innerText= ""+hora+":"+minutos+":"+segundos;

  
     setTimeout(reloj, 1000);
    
}

// Agregar el evento click al botón
document.getElementById("mostrar").addEventListener("click", reloj);