/*
Consumir el endPoint de la API del clima Open-Meteo: 
- https://open-meteo.com/
- https://open-meteo.com/en/docs
- Ejemplo de petición
https://api.open-meteo.com/v1/forecast?latitude=7.1254&longitude=-73.1198&current=temperature_2m&hourly=temperature_2m&timezone=auto&past_days=3&forecast_days=3


Características para desarrollar: 
 - Cuando el sitio cargue se debe mostrar un gráfico con datos de prueba y la tabla sin datos
 - Cuando el usuario de click al botón buscar se debe hacer la solicitud de los datos a la API
 - Al recibir la respuesta del servidor se deben mapear los datos en la tabla y en el gráfico.
 - En caso de no encontrar datos o presentar un error se debe reportar por consola"
*/

let base_url = "https://api.open-meteo.com/v1/forecast?";
let end_url = "&current=temperature_2m&hourly=temperature_2m&timezone=auto&past_days=3&forecast_days=3";

const ctx = document.getElementById('grafico').getContext('2d');
let graficoClima;

function mapearDatos(datos){
    document.getElementById("v_lat").innerText = datos.latitude;
    document.getElementById("v_long").innerText = datos.longitude;
    document.getElementById("v_alt").innerText = datos.elevation;
    document.getElementById("v_zone").innerText = datos.timezone;
    document.getElementById("v_temp").innerText = datos.current.temperature_2m;
    document.getElementById("v_hour").innerText = datos.current.time;

    actualizarGrafico(datos.hourly.time, datos.hourly.temperature_2m);
}


function cargarDatos(){
    let latitude= document.getElementById('latitud').value;
    let longitude= document.getElementById('longitud').value;

    let url = base_url + "&latitude="+latitude +"&longitude="+longitude+end_url;


    fetch(url)
        .then((response)=>{
            if(!response.ok){
                throw new error ('error en la solicitud');
            }
            return response.json();
        })
        .then((data)=>{
            mapearDatos(data);
        })
        .catch((Error)=>{
            console.log('error'+Error);
        })


    console.log('latitud', latitude);
    console.log('longitud', longitude);
}


function actualizarGrafico(labels, data) {
    if (graficoClima) {
        graficoClima.destroy(); // Eliminar gráfico previo para evitar superposiciones
    }

    graficoClima = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels, 
            datasets: [{
                label: 'Temperatura (°C)',
                data: data,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}



//ADS Listener
document.getElementById("buscar_datos").addEventListener("click", cargarDatos);


/*
//Ejemplo de creación de Gráfico
const ctx = document.getElementById('grafico');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2025-03-02T00:00', '2025-03-02T01:00', '2025-03-02T02:00', '2025-03-02T03:00', '2025-03-02T04:00'],
        datasets: [{
            label: 'Temperatura',
            data: [20.3, 20.5, 20.3, 20.1, 19.9, 19.7],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
  });
*/
