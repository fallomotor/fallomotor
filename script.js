let sistemaSeleccionado = "";
let sintomaSeleccionado = "";


// Selección de sistema

function seleccionarSistema(sistema){

    sistemaSeleccionado = sistema;

    document.querySelectorAll(".sistemas button")
    .forEach(boton => boton.classList.remove("activo"));

    event.target.classList.add("activo");

}



// Selección de síntoma

function seleccionarSintoma(sintoma){

    sintomaSeleccionado = sintoma;

    document.querySelectorAll(".sintomas button")
    .forEach(boton => boton.classList.remove("activo"));

    event.target.classList.add("activo");

}




// Diagnóstico

function analizarAveria(){


let marca = document.getElementById("marca").value;
let modelo = document.getElementById("modelo").value;
let anio = document.getElementById("anio").value;
let motor = document.getElementById("motor").value;
let cilindrada = document.getElementById("cilindrada").value;
let combustible = document.getElementById("combustible").value;

let otros = document.getElementById("otros").value;



let resultado = document.getElementById("resultado");



if(marca=="" || modelo==""){

resultado.innerHTML =
"⚠️ Introduce al menos marca y modelo del vehículo.";

return;

}



let precision = 30;

let causas = "";



if(sistemaSeleccionado=="Motor"){

precision +=20;

causas += `
<h3>⚙️ Posibles causas de motor</h3>

<ul>

<li>Desgaste interno del motor</li>

<li>Problemas de inyección</li>

<li>Falta de presión o lubricación</li>

<li>Componentes mecánicos con holgura</li>

</ul>

`;

}



if(sintomaSeleccionado=="Ruido motor"){

precision +=15;

causas +=`

<h3>🔊 Ruido motor detectado</h3>

<ul>

<li>Revisar distribución</li>

<li>Comprobar inyectores</li>

<li>Revisar taqués o elementos móviles</li>

<li>Comprobar presión de aceite</li>

</ul>

`;

}



if(sintomaSeleccionado=="Humo blanco"){

precision +=15;

causas +=`

<h3>💨 Humo blanco</h3>

<ul>

<li>Posible entrada de refrigerante</li>

<li>Problema de combustión</li>

<li>Revisar junta de culata</li>

</ul>

`;

}



if(sintomaSeleccionado=="Ruido frenos"){

precision +=15;

causas +=`

<h3>🛑 Frenos</h3>

<ul>

<li>Pastillas desgastadas</li>

<li>Discos dañados</li>

<li>Elementos de frenado con holgura</li>

</ul>

`;

}



if(causas==""){

causas=`

<h3>🔍 Diagnóstico inicial</h3>

<p>
Se necesitan más datos para aumentar la precisión.
Selecciona sistema y síntomas.
</p>

`;

}



resultado.innerHTML = `

<h3>🚗 Vehículo analizado</h3>

<p>
<strong>${marca} ${modelo}</strong><br>

Año: ${anio || "No indicado"}<br>

Motor: ${motor || "No indicado"}<br>

Cilindrada: ${cilindrada || "No indicada"}<br>

Combustible: ${combustible || "No indicado"}

</p>


<hr>


${causas}


<h3>📊 Precisión del diagnóstico</h3>

<p>
Datos analizados: ${precision/10}
<br>
Nivel de precisión: ${precision}% 
</p>


<h3>⚠️ Nivel de urgencia</h3>

<p>
Realizar comprobaciones antes de sustituir componentes.
</p>

`;

}
