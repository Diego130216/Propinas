window.jsPDF = window.jspdf.jsPDF;



var arrayNombres = ["juan", "diego olaya", "olaya", "manuel", "wilson lo siento", "sebastian sandoval", "b", "c", "d", "f", "a", "abc", "perreo"];
var canti = 4;

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

    <label for="nombre${id}">Todos los Nombres:</label>
  <select id="nombre${id}" multiple>
  
    <!-- Agrega más opciones según sea necesario -->
  </select>

  <div>
    <button onclick="moverElementos('nombre${id}', 'nombres${id}')">Agregar &gt;&gt;</button>
    <button onclick="moverElementos('nombres${id}', 'nombre${id}')">&lt;&lt; Quitar</button>
  </div>

  <label for="nombres${id}">Nombres Seleccionados:</label>
  <select id="nombres${id}" name="nombres${id}[]" multiple required></select>`

    // <label for="nombres${id}">Nombres:</label>
    // <select id="nombres${id}" name="nombres${id}[]" multiple required>
    //   <!-- Agrega opciones según sea necesario -->
    // </select>
  ;

  contenedor.appendChild(formulario);
}

function moverElementos(origenId, destinoId) {
  var origen = document.getElementById(origenId);
  var destino = document.getElementById(destinoId);

  for (var i = 0; i < origen.options.length; i++) {
    if (origen.options[i].selected) {
      destino.add(new Option(origen.options[i].text, origen.options[i].value));
      origen.remove(i);
      i--; // Ajustar el índice después de la eliminación
    }
  }
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

    // for (var i = 0; i < select.options.length; i++) {
    //   if (select.options[i].selected) {
    //     opcionesSeleccionadas[i] = select.options[i].value;
    //     options[i].value
    //   }
    // }
    for (var i = 0; i < select.options.length; i++) {
      opcionesSeleccionadas.push(select.options[i].innerText);
      console.log("selec",select.options[i].innerText)
    }


    var arraySinElementosVacios = opcionesSeleccionadas.filter(function (elemento) {
      return typeof elemento === 'string' && elemento.trim() !== "";
    });

    var propi = document.getElementById('propina' + (j + 1)).value;
    propiT = propiT + parseInt(propi);
    var numeroRedondeado;;

    // Verificar si el número es entero antes de redondear
    if (Number.isInteger(parseFloat(propi / arraySinElementosVacios.length))) {
      numeroRedondeado = propi / arraySinElementosVacios.length;
    } else {
      numeroRedondeado = parseFloat(propi / arraySinElementosVacios.length).toFixed(0);
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
  var selectNombres = document.getElementById('nombre' + (c + 1));

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
        console.log(opcionesTotales[a][b], arrayNombres[i]);
        if (opcionesTotales[a][b] === arrayNombres[i]) {
          salida[a] = formatN(pr0pinas[a]);
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
  var dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  var dia = ["Miércoles   Jueves    Viernes   Sábado   Domingo Lunes  Miércoles   Jueves    Viernes   Sábado   Domingo Lunes"];
  // Configurar contenido del PDF
  pdf.text("Resultados Totales", 80, 5);
  // Configurar contenido del PDF
  pdf.text("Resultados Totales", 80, 5);

  // Organizar en una tabla
  var tableData = [];
  for (var i = 0; i < arrayNombres.length; i++) {
    tableData.push([arrayNombres[i], totales[i][0], totales[i][1], totales[i][2], totales[i][3], totales[i][4], totales[i][5], totales[i][6], totales[i][7], totales[i][8], totales[i][9], totales[i][10], totales[i][11], propinaT(totales[i]), "        "]);
  }

  // Configurar estilos para la tabla
  var StyleDef = {
    font: 'helvetica', // Tipo de fuente
    fontStyle: 'normal', // Estilo de fuente: normal, bold, italic, bolditalic
    fontSize: 8, // Tamaño de la fuente

  };

  // Configurar opciones para la tabla
  pdf.autoTable({
    theme: 'grid',
    styles: StyleDef,
    startY: 15,
    head: [['Nombre', "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo", "Lunes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo", "Lunes", 'Suma', "Firma"]],
    body: tableData
  });


  // Guardar o mostrar el PDF
  pdf.save("resultados.pdf");
}

function sumarArray(array) {
  return array.reduce((acumulador, elemento) => acumulador + elemento, 0);
}

//Calcula el total de propinas por persona
function propinaT(array1) {
  var sumapro = []
  var numero = removeCommas(array1);

    console.log(numero);
    if (Number.isInteger(sumarArray(numero.map(Number)))) {
      sumapro[i] =formatN (sumarArray(numero.map(Number)));
    } else {
      sumapro[i] = formatN(parseFloat(sumarArray(numero.map(Number))).toFixed(0));
    }
    console.log(sumapro)
    var vacios = sumapro.filter(function (elemento) {
      return elemento !== "";
    });
  return vacios;
  
}

//Le da formato a los numeros en . por cada 1000
function formatN(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

//Devuelve el formato 
function removeCommas(formattedArray) {
  return formattedArray.map(function (formattedNumber) {
    if (typeof formattedNumber === 'string') {
      return formattedNumber.replace(/\./g, "");
    } else {
      return String(formattedNumber);
    }
  });
}