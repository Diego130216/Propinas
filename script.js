window.jsPDF = window.jspdf.jsPDF


var arrayNombres = ["juan", "diego", "olaya", "manuel", "wilson", "a", "b", "c", "d", "f", "a", "abc", "perreo", "juan", "diego", "olaya", "manuel", "wilson", "a", "b", "c", "d", "f", "a", "abc", "perreo"];
var canti = 12;

// Función para crear un nuevo formulario
function crearFormulario(id) {
  var contenedor = document.getElementById('contenedorFormularios');

  var formulario = document.createElement('form');
  formulario.id = 'miFormulario' + id;
  formulario.className = 'miFormulario';
  formulario.action = '#';
  formulario.method = 'post';

  formulario.innerHTML = `
    <label for="cuadrofecha${id}">Fecha:</label>
    <input type="date" id="cuadroFecha${id}" name="cuadroFecha${id}"   readonly>

    <label for="propina${id}">Valor de propina:</label>
    <input type="number" id="propina${id}" name="propina${id}" min="0" required>

    <label for="nombres${id}">Nombres:</label>
    <select id="nombres${id}" name="nombres${id}[]" multiple required>
      <!-- Agrega opciones según sea necesario -->
    </select>
  `;

  contenedor.appendChild(formulario);
}

// Crear x cantidad de formularios
for (var i = 1; i <= canti; i++) {
  crearFormulario(i);
}




function obtenerDiaSemana() {
  var fechaSeleccionada = new Date(document.getElementById("fecha").value);
  var ab = 1;
  for (var i = 0; i < canti; i++) {
    if (i == 6) {
      ab = 2;
    } else {
      ab = 1;
    }

    fechaSeleccionada.setDate(fechaSeleccionada.getDate() + ab);
    var fechaFormateada = fechaSeleccionada.toISOString().split('T')[0];
    document.getElementById('cuadroFecha' + (i + 1)).value = fechaFormateada;

    var diaSemana = fechaSeleccionada.getDay();
    var dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo",];
    var resultado = document.querySelector('label[for=cuadrofecha' + (i + 1) + ']');
    resultado.textContent = dias[diaSemana];



  }

}

function enviarFormularios(event) {


  // Cambia "miFormulario" a la clase correcta
  var formularios = document.getElementsByClassName("formulario");

  for (var i = 0; i < formularios.length; i++) {
    console.log("Enviando formulario " + (i + 1));
  }

  var opcionesTotales = [];
  var pr0pinas = [];
  var propiT = 0;

  for (var j = 0; j < canti; j++) {
    var opcionesSeleccionadas = [];
    var select = document.getElementById('nombres' + (j + 1));

    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].selected) {
        opcionesSeleccionadas[i] = select.options[i].value;
      }
    }


    var arraySinElementosVacios = opcionesSeleccionadas.filter(function (elemento) {
      return elemento !== "";
    });

    var propi = document.getElementById('propina' + (j + 1)).value;
    propiT = propiT + parseInt(propi);
    var numeroRedondeado ;;

    // Verificar si el número es entero antes de redondear
    if (Number.isInteger(parseFloat(propi/arraySinElementosVacios.length))) {
      numeroRedondeado = propi/arraySinElementosVacios.length;
    } else {
      numeroRedondeado = parseFloat(propi /arraySinElementosVacios.length).toFixed(3);
    }
    pr0pinas.push(numeroRedondeado);
    console.log(propi)

    opcionesTotales[j] = arraySinElementosVacios;
    console.log("Matriz uni", opcionesSeleccionadas);
    console.log("Matriz bi", opcionesTotales);

    // Resto de la lógica que desees aplicar
  }
  console.log(pr0pinas, propiT)
  console.log("Resultados");
  for (var a = 0; a < opcionesTotales.length; a++) {
    console.log("Resultados formulario " + (a + 1))
    for (var b = 0; b < opcionesTotales[a].length; b++) {
      console.log(opcionesTotales[a][b]);
    }
  }
  generarPDF(pr0pinas, arrayNombres, opcionesTotales);
  // Array con nombres

}

//Asignar nombres
for (var c = 0; c < canti; c++) {

  // Obtén el elemento select
  var selectNombres = document.getElementById('nombres' + (c + 1));

  // Itera sobre el array y agrega opciones al select
  arrayNombres.forEach(function (nombre) {
    var option = document.createElement('option');
    option.value = nombre.toLowerCase().replace(' ', ''); // Valor de la opción
    option.text = nombre; // Texto visible de la opción
    selectNombres.add(option);
  });
}

function calcularP(pr0pinas, arrayNombres, opcionesTotales) {
  var totales = [];

  for (var i = 0; i < arrayNombres.length; i++) {
    var salida = []; // Mover esta línea aquí para reiniciar salida en cada iteración de i

    for (var a = 0; a < opcionesTotales.length; a++) {
      console.log("Resultados formulario " + (a + 1));

      for (var b = 0; b < opcionesTotales[a].length; b++) {
        if (opcionesTotales[a][b] === arrayNombres[i]) {
          salida[a] = pr0pinas[a];
          break;
        } else {
          salida[a] = 0;
        }
      }
    }

    totales.push(salida);
  }
  var totalesSinElementosVacios = totales.filter(function (elemento) {
    return elemento !== "";
  });

  return totalesSinElementosVacios;
}

function generarPDF(pr0pinas, arrayNombres, opcionesTotales) {
  var totales = calcularP(pr0pinas, arrayNombres, opcionesTotales);

  // Crear un nuevo documento PDF
  var pdf = new jsPDF({
    orientation: "landscape"
  });
  var dias = ["Miércoles   Jueves    Viernes   Sábado   Domingo Lunes  Miércoles   Jueves    Viernes   Sábado   Domingo Lunes"];

  // Configurar contenido del PDF
  pdf.text("Resultados Totales", 80, 5);
  pdf.text(dias, 40, 10);

  var suma = propinaT(totales);
  // Agregar datos al PDF
  var j = 0;
  for (var i = 0; i < totales.length; i++) {

    pdf.text(arrayNombres[i], 5, 30 + j * 10);
    pdf.text("" + totales[i], 35, 30 + j * 10);
    pdf.text("" + suma[i], 250, 30 + j * 10);

    if ((i + 1) % 15 === 0) {
      // Si se desborda, agregar una nueva página
      j = 0;
      pdf.addPage({
        orientation: "landscape"
      })
    }
    j++;
  }

  // Guardar o mostrar el PDF
  pdf.save("resultados.pdf");
}

function sumarArray(array) {
  return array.reduce((acumulador, elemento) => acumulador + elemento, 0);
}

function propinaT(array) {
  var sumapro = []
  for (var i = 0; i < array.length; i++) {
    sumapro[i] = sumarArray(array[i].map(Number));
  }
  return sumapro;
}