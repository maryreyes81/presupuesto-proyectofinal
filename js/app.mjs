import { Ingreso } from "./Ingreso.mjs";
import { Egreso} from "./Egreso.mjs";


let ingresos = [
  new Ingreso("Salario", 20000),
  new Ingreso("Venta auto", 50000),
];

let egresos = [new Egreso("Renta", 4000), new Egreso("Ropa", 800)];

const cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};

const totalIngresos = () => {
  let totalIngreso = 0;
  for (let ingreso of ingresos) {
    totalIngreso += ingreso.valor;
  }
  return totalIngreso;
};

const totalEgresos = () => {
  let totalEgreso = 0;
  for (let egreso of egresos) {
    totalEgreso += egreso.valor;
  }
  return totalEgreso;
};

//Formato moneda
let formatoMoneda = (valor) => {
  return valor.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  });
};

let formatoPorcentaje = (valor) => {
  return valor.toLocaleString("es-MX", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

const cargarCabecero = () => {
  const ingresoTotal = totalIngresos();
  const egresoTotal = totalEgresos();
  const presupuesto = ingresoTotal - egresoTotal;
  const porcentajeEgreso = ingresoTotal > 0 ? egresoTotal / ingresoTotal : 0;

  // Asignar valores formateados a los elementos HTML
document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos").innerHTML = formatoMoneda(ingresoTotal);
  document.getElementById("egresos").innerHTML = formatoMoneda(egresoTotal);
};


cargarCabecero();
window.onload = cargarApp;

const cargarIngresos = () => {
  let ingresosHTML = "";
  for (let ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

const crearIngresoHTML = (ingreso) => {
  return `
<div class="elemento limpiarEstilos" id="ingreso-${ingreso.id}">
<div class="elemento_descripcion">${ingreso.descripcion}</div>
<div class="derecha limpiarEstilos">
<div class="elemento_valor">+${formatoMoneda(parseFloat(ingreso.valor.toFixed(2)))}</div>
<div class="elemento_eliminar">
<button class="elemento_eliminar--btn" onclick="eliminarIngreso(${ingreso.id})">
<ion-icon name="close-circle-outline"></ion-icon>
</button>
</div>
</div>
</div>
`;
};

const cargarEgresos = () => {
  let egresosHTML = "";
  for (let egreso of egresos) {
    egresosHTML += crearEgresoHTML(egreso);
  }
  document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

const crearEgresoHTML = (egreso) => {
  let porcentaje = egreso.valor / totalEgresos();
  return `
<div class="elemento limpiarEstilos" id="egreso-${egreso.id}">
<div class="elemento_descripcion">${egreso.descripcion}</div>
<div class="derecha limpiarEstilos">
<div class="elemento_valor">-${formatoMoneda(egreso.valor)}</div>
<div class="elemento_porcentaje">${formatoPorcentaje(porcentaje)}</div>
<div class="elemento_eliminar">
<button class="elemento_eliminar--btn" onclick="eliminarEgreso(${egreso.id})">
<ion-icon name="close-circle-outline"></ion-icon>
</button>
</div>
</div>
</div>
`;
};

// Después de crearIngresoHTML y crearEgresoHTML
const eliminarIngreso = (id) => {
  ingresos = ingresos.filter((ingreso) => ingreso.id !== id);
  cargarCabecero();
  cargarIngresos();
};

const eliminarEgreso = (id) => {
  egresos = egresos.filter((egreso) => egreso.id !== id);
  cargarCabecero();
  cargarEgresos();
};

///Agregar nuevo ingreso o egreso

const agregarDato = () => {
  const forma = document.getElementById('forma');
  const tipo = forma['tipo'].value;
  const descripcion = forma['descripcion'].value;
  const valor = parseFloat(forma["valor"].value);

if (descripcion !== '' && !isNaN(valor) && valor > 0) {
  if (tipo === 'ingreso') {
    ingresos.push(new Ingreso(descripcion, valor));
    cargarCabecero();
    cargarIngresos();
  } else if (tipo === 'egreso') {
    egresos.push(new Egreso(descripcion, valor));
    cargarCabecero();
    cargarEgresos();
  }
  forma.reset(); // limpiar formulario
} else {
  alert("Por favor, ingresa una descripción y un valor numérico positivo.");
}
}

// Asegurar que los botones de eliminar funcionen
window.eliminarIngreso = eliminarIngreso;
window.eliminarEgreso = eliminarEgreso;
window.agregarDato = agregarDato;

// Escuchar envío del formulario cuando el DOM esté listo

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("forma").addEventListener("submit", function (e) {
    e.preventDefault(); // evita recargar la página
    agregarDato();      // llama tu función
  });
});