window.jsPDF = window.jspdf.jsPDF;



var arrayNombres1 = ["juan", "diego olaya", "olaya", "manuel", "wilson lo siento", "sebastian sandoval", "b", "c", "d", "f", "a", "abc", "perreo"];
// Arreglo a guardar

// Convertir el arreglo a una cadena JSON y guardar en localStorage
localStorage.setItem('arregloGuardado', JSON.stringify(arrayNombres1));

// Obtener la cadena JSON del localStorage y convertirla de nuevo a un arreglo
var arrayNombres = JSON.parse(localStorage.getItem('arregloGuardado'));


// Modificar el arreglo (por ejemplo, agregar un nuevo elemento)
function agregarNombre(){
 var inputNombre = document.getElementById("nombreNuevo");
arrayNombres.push(inputNombre.value);
localStorage.setItem('arregloGuardado', JSON.stringify(arrayNombres));
asignrNombres();
}
// Guardar el arreglo modificado de nuevo en localStorage
localStorage.setItem('arregloGuardado', JSON.stringify(arrayNombres));

var indice = arrayNombres.indexOf("juan");

// Verificar si el elemento está en el arreglo antes de intentar eliminarlo
if (indice !== -1) {
  // Eliminar el elemento del arreglo
  arrayNombres .splice(indice, 1);

  // Guardar el arreglo modificado de nuevo en localStorage
  localStorage.setItem('arregloGuardado', JSON.stringify(arrayNombres));
}

// Mostrar el arreglo obtenido
console.log(arrayNombres);



var canti = 12;
var fechasIngre = [];

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

asignrNombres();




function obtenerDiaSemana() {
  var fechaSeleccionada = new Date(document.getElementById("fecha").value);
  var ab = 1;
  for (var i = 0; i < canti; i++) {
    if (i == 6) {
      ab = 2;
    }
    if (i == 0) {
      ab = 0;
    }
    if (i != 0 && i != 6) {
      ab = 1;
    }

    fechaSeleccionada.setDate(fechaSeleccionada.getDate() + ab);
    var fechaFormateada = fechaSeleccionada.toISOString().split('T')[0];
    console.log(fechaFormateada);
    fechasIngre.push(fechaFormateada);
    document.getElementById('cuadroFecha' + (i + 1)).value = fechaFormateada;

    var diaSemana = fechaSeleccionada.getDay();
    var dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo",];
    var resultado = document.querySelector('label[for=cuadrofecha' + (i + 1) + ']');
    resultado.textContent = dias[diaSemana];



  } console.log(fechasIngre);

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

    opcionesTotales[j] = arraySinElementosVacios;


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


}

//Asignar nombres
function asignrNombres(){
for (var c = 0; c < canti; c++) {

  // Obtén el elemento select
  var selectNombres = document.getElementById('nombre' + (c + 1));
  arrayNombres.sort();

  // Itera sobre el array y agrega opciones al select
  arrayNombres.forEach(function (nombre) {
    var option = document.createElement('option');
    option.value = nombre.toLowerCase().replace(' ', ''); // Valor de la opción
    option.text = nombre; // Texto visible de la opción
    selectNombres.add(option);
  });
}
}
function calcularP(pr0pinas, arrayNombres, opcionesTotales) {
  var totales = [];

  for (var i = 0; i < arrayNombres.length; i++) {
    var salida = []; // Mover esta línea aquí para reiniciar salida en cada iteración de i

    for (var a = 0; a < opcionesTotales.length; a++) {
      console.log("Resultados formulario " + (a + 1));

      for (var b = 0; b < opcionesTotales[a].length; b++) {
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
    head: [["", fechasIngre[0], fechasIngre[1], fechasIngre[2], fechasIngre[3], fechasIngre[4], fechasIngre[5], fechasIngre[6], fechasIngre[7], fechasIngre[8], fechasIngre[9], fechasIngre[10], fechasIngre[11], "", "",],
    ['Nombre', "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo", "Lunes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo", "Lunes", 'Suma', "Firma"]],
    body: tableData,
    didDrawPage: function (data) {
      // Inserta el nombre de la tabla en la parte superior de la página
      pdf.text(`Tabla propinas AG del ${fechasIngre[0]} al ${fechasIngre[11]} `, data.settings.margin.left, 10);
    }
  });


  // Guardar o mostrar el PDF
  pdf.save(`propinas del ${fechasIngre[0]} al ${fechasIngre[11]}.pdf`);
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
    sumapro[i] = formatN(sumarArray(numero.map(Number)));
  } else {
    sumapro[i] = formatN(parseFloat(sumarArray(numero.map(Number))).toFixed(0));
  }
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


// Función para mostrar/ocultar el carrito de compras
function mostrarCarrito() {
  var carrito = document.getElementById("carrito");
  if (carrito.style.display === "none") {
    carrito.style.display = "block";
  } else {
    carrito.style.display = "none";
  }
}

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
  var listaCarrito = document.getElementById("listaCarrito");
  var nuevoItem = document.createElement("li");
  nuevoItem.textContent = producto;
  listaCarrito.appendChild(nuevoItem);
}

