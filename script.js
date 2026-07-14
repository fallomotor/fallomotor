const symptoms = document.querySelectorAll(".symptom");

let selectedSymptoms = [];


// Selección de síntomas

symptoms.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("active");

        const value = button.dataset.value;


        if(selectedSymptoms.includes(value)){

            selectedSymptoms = selectedSymptoms.filter(item => item !== value);

        } else {

            selectedSymptoms.push(value);

        }

    });

});



// Botón analizar

document.getElementById("analyzeBtn").addEventListener("click", () => {


const loading = document.getElementById("loading");
const result = document.getElementById("result");


loading.classList.remove("hidden");
result.classList.add("hidden");



setTimeout(()=>{


loading.classList.add("hidden");
result.classList.remove("hidden");



let datos = 0;


// Contar datos del vehículo

const fields = [
"marca",
"modelo",
"anio",
"motor",
"cilindrada",
"combustible",
"dtc"
];


fields.forEach(id=>{

if(document.getElementById(id).value){

datos++;

}

});


// Añadir síntomas

datos += selectedSymptoms.length;



if(document.getElementById("otros").value){

datos++;

}



document.getElementById("dataCount").innerHTML = datos;



// Precisión

let precision="Baja";


if(datos >= 8){

precision="Alta";

}

else if(datos >=4){

precision="Media";

}


document.getElementById("precision").innerHTML = precision;



// Urgencia

let urgency="Media";


if(selectedSymptoms.includes("motor")){

urgency="Revisar pronto";

}

if(selectedSymptoms.includes("frenos")){

urgency="Alta";

}


document.getElementById("urgency").innerHTML = urgency;




// Diagnóstico básico

let causes = [];
let checks = [];



if(selectedSymptoms.includes("motor")){

causes.push(
"Posible problema relacionado con combustión, inyección, lubricación o componentes internos del motor."
);

checks.push(
"Comprobar niveles, ruidos, valores de diagnosis y funcionamiento del sistema de inyección."
);

}



if(selectedSymptoms.includes("frenos")){

causes.push(
"Posible desgaste o fallo en componentes del sistema de frenado."
);

checks.push(
"Revisar pastillas, discos, líquido de frenos y posibles fugas."
);

}



if(selectedSymptoms.includes("suspension")){

causes.push(
"Posible desgaste en amortiguadores, silentblocks o elementos de suspensión."
);

checks.push(
"Realizar inspección visual y comprobar holguras."
);

}



if(selectedSymptoms.includes("electricidad")){

causes.push(
"Posible fallo eléctrico, sensor o comunicación electrónica."
);

checks.push(
"Leer códigos DTC y comprobar alimentación eléctrica."
);

}



if(selectedSymptoms.includes("climatizacion")){

causes.push(
"Posible problema en circuito de climatización."
);

checks.push(
"Comprobar presión del circuito y funcionamiento del compresor."
);

}



if(selectedSymptoms.includes("ruidos")){

causes.push(
"Ruido procedente de algún componente mecánico que requiere localización."
);

checks.push(
"Identificar zona exacta del ruido y comprobar piezas relacionadas."
);

}



if(causes.length===0){

causes.push(
"Selecciona más síntomas para obtener un diagnóstico más preciso."
);

checks.push(
"Aporta más información del vehículo y las condiciones del fallo."
);

}




document.getElementById("causes").innerHTML =
causes.map(item=>`<li>${item}</li>`).join("");



document.getElementById("checks").innerHTML =
checks.map(item=>`<li>${item}</li>`).join("");



},1500);



});
