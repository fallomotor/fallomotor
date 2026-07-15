// ======================================
// FALLOMOTOR v2.0
// script.js
// ======================================

// Variables
const form = document.getElementById("diagnosisForm");
const result = document.getElementById("resultado");

const precisionBar = document.getElementById("precisionBar");
const precisionText = document.getElementById("precisionText");

const urgency = document.getElementById("urgencia");
const causes = document.getElementById("causas");
const checks = document.getElementById("comprobaciones");

function calcularPrecision(){

let puntos = 0;

const campos = [

"marca",
"modelo",
"anio",
"combustible",
"cilindrada",
"codigoMotor",
"dtc"

];

campos.forEach(id=>{

const valor=document.getElementById(id).value;

if(valor!="") puntos++;

});

const sintomas=document.querySelectorAll(".symptom.active");

puntos+=sintomas.length;

let porcentaje=Math.round((puntos/13)*100);

if(porcentaje>100) porcentaje=100;

precisionBar.style.width=porcentaje+"%";

precisionText.innerHTML=porcentaje+"%";

return porcentaje;

}

document.querySelectorAll("input,select,textarea").forEach(el=>{

el.addEventListener("input",calcularPrecision);

});

document.querySelectorAll(".symptom").forEach(btn=>{

btn.addEventListener("click",()=>{

btn.classList.toggle("active");

calcularPrecision();

});

});
// ======================================
// Diagnóstico inteligente
// ======================================

form.addEventListener("submit", function (e) {

    e.preventDefault();

    let precision = calcularPrecision();

    let sintomas = [];

    document.querySelectorAll(".symptom.active").forEach(function (s) {
        sintomas.push(s.dataset.symptom);
    });

    let nivelPrecision = "Baja";

    if (precision >= 80) {
        nivelPrecision = "Muy alta";
    } else if (precision >= 60) {
        nivelPrecision = "Alta";
    } else if (precision >= 40) {
        nivelPrecision = "Media";
    }

    let nivelUrgencia = "Baja";

    let posibles = [];
    let comprobaciones = [];

    // ----------------------------
    // HUMO BLANCO
    // ----------------------------

    if (sintomas.includes("humo_blanco")) {

        nivelUrgencia = "Alta";

        posibles.push(
            "Junta de culata dañada",
            "Refrigerante entrando en la combustión",
            "Fisura en culata",
            "Enfriador EGR averiado"
        );

        comprobaciones.push(
            "Comprobar consumo de refrigerante.",
            "Realizar prueba de CO₂ en el vaso de expansión.",
            "Comprobar presión del circuito.",
            "Verificar el enfriador EGR."
        );
    }

    // ----------------------------
    // RUIDO MOTOR
    // ----------------------------

    if (sintomas.includes("ruido_motor")) {

        nivelUrgencia = "Alta";

        posibles.push(
            "Taqué hidráulico",
            "Inyector defectuoso",
            "Biela",
            "Cadena o correa de distribución",
            "Polea del cigüeñal",
            "Volante bimasa"
        );

        comprobaciones.push(
            "Escuchar el motor con estetoscopio.",
            "Leer correcciones de inyectores.",
            "Comprobar presión de aceite.",
            "Revisar distribución."
        );
    }

    // ----------------------------
    // RUIDO FRENOS
    // ----------------------------

    if (sintomas.includes("ruido_frenos")) {

        posibles.push(
            "Pastillas desgastadas",
            "Discos deformados",
            "Pinza gripada",
            "Protector del disco doblado"
        );

        comprobaciones.push(
            "Medir espesor de pastillas.",
            "Revisar discos.",
            "Comprobar movimiento de pinzas."
        );
    }

    // ----------------------------
    // RUIDO SUSPENSIÓN
    // ----------------------------

    if (sintomas.includes("ruido_suspension")) {

        posibles.push(
            "Bieletas",
            "Copelas",
            "Amortiguadores",
            "Silentblocks",
            "Rótulas"
        );

        comprobaciones.push(
            "Comprobar holguras.",
            "Revisar amortiguadores.",
            "Inspeccionar silentblocks."
        );
    }
        // ----------------------------
    // DIRECCIÓN
    // ----------------------------

    if (sintomas.includes("ruido_direccion")) {

        posibles.push(
            "Terminales de dirección desgastados",
            "Rótulas con holgura",
            "Cremallera de dirección",
            "Bomba de dirección asistida"
        );

        comprobaciones.push(
            "Comprobar holguras en terminales.",
            "Revisar la cremallera.",
            "Verificar el nivel del líquido de dirección."
        );
    }

    // Si no se ha detectado ninguna avería concreta

    if (posibles.length === 0) {

        posibles.push(
            "No hay información suficiente para realizar un diagnóstico preciso."
        );

        comprobaciones.push(
            "Añade más síntomas y datos del vehículo para aumentar la precisión."
        );
    }

    // Eliminar duplicados

    posibles = [...new Set(posibles)];
    comprobaciones = [...new Set(comprobaciones)];

    // Mostrar resultados

    urgency.innerHTML = nivelUrgencia;

    causes.innerHTML = posibles
        .map(item => "<li>" + item + "</li>")
        .join("");

    checks.innerHTML = comprobaciones
        .map(item => "<li>" + item + "</li>")
        .join("");

    document.getElementById("nivelPrecision").innerHTML = nivelPrecision;

    result.style.display = "block";

    // Desplazamiento suave al resultado

    result.scrollIntoView({
        behavior: "smooth"
    });

});
