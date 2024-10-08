window.jsPDF = window.jspdf.jsPDF;
var firmaVariable = null
// Inicializar el arreglo del local store de que el DOM haya cargado completamente
document.addEventListener("DOMContentLoaded", function () {
  recuperarNombres();
});

// Arreglo a guardar
// Convertir el arreglo a una cadena JSON y guardar en localStorage
//localStorage.setItem('arregloGuardado', JSON.stringify(arrayNombres1));

// Obtener la cadena JSON del localStorage y convertirla de nuevo a un arreglo
var arrayNombres = JSON.parse(localStorage.getItem('arregloGuardado'));

// Modificar el arreglo (por ejemplo, agregar un nuevo elemento)


function agregarNombre() {
  var inputNombre = document.getElementById("nombreNuevo");
  var nombre = inputNombre.value.trim();

  if (nombre !== "" && !arrayNombres.includes(nombre)) { // Verifica que el nombre no esté vacío y no se repita
    arrayNombres.push(nombre);
    localStorage.setItem('arregloGuardado', JSON.stringify(arrayNombres));
    asignrNombres();
    inputNombre.value = ""; // Limpiar el campo de entrada después de agregar el nombre
  } else if (arrayNombres.includes(nombre)) {
    alert("El nombre ya está en la lista");
  } else {
    alert("El nombre no puede estar vacío");
  }
}

// Función para recuperar nombres del localStorage
function recuperarNombres() {
  var arrayNombres = JSON.parse(localStorage.getItem('arregloGuardado')) || [];
  //asignrNombres(arrayNombres);
  var arraypr0pinas = JSON.parse(localStorage.getItem('pr0pinas')) || [];
  var arrayopcionesTotales = JSON.parse(localStorage.getItem('opcionesTotales')) || [];
  var arraydiaTotal = JSON.parse(localStorage.getItem('diaTotal')) || [];
  var arrayfestivo = JSON.parse(localStorage.getItem('festivo')) || []; 

  switch (arrayfestivo) {
    case 1:
      canti = 11;
      festivo = 1
      console.log("festivo corrercto")
      break;
    case 2:
      canti = 11;
      festivo = 2
      break;
    case 3:
      canti = 12;
      festivo = 3
      break;
    case 4:
      canti = 10;
      festivo = 4
      break;
    default:
      canti = 2;
      console.log("no funciono festivo corrercto")
  }
  formulario()
  console.log(arrayopcionesTotales)
  asignrNombresCambios(arrayopcionesTotales,arrayNombres)
}

function asignrNombresCambios(arrayopcionesTotales, arrayNombres) {
  for (var c = 0; c < canti; c++) {
    var contenedorNombres = document.getElementById('nombres' + (c + 1));

    if (!contenedorNombres) {
      contenedorNombres = document.createElement('select');
      contenedorNombres.id = 'nombres' + (c + 1);
      document.getElementById('selectContainer').appendChild(contenedorNombres);
    } else {
      // Clear existing options before adding new ones
      contenedorNombres.innerHTML = '';
    }

    arrayopcionesTotales[c].forEach(function(nombres) {
      var option = document.createElement('option');
      option.value = nombres.toLowerCase().replace(' ', '');
      option.text = nombres;
      contenedorNombres.add(option);
    });
  }
}


// Mostrar el arreglo obtenido

console.log(arrayNombres);

var festivo = 0;
//Crear formularios seegun el radio button 
document.querySelectorAll('input[name="festivo"]').forEach((radio) => {
  radio.addEventListener('change', (event) => {
    switch (event.target.value) {
      case 'primero':
        canti = 11;
        festivo = 1
        break;
      case 'segundo':
        canti = 11;
        festivo = 2
        break;
      case 'dos':
        canti = 12;
        festivo = 3
        break;
      case 'nhay':
        canti = 10;
        festivo = 4
        break;
      default:
        canti = 0;
    }
    formulario();  // Puedes eliminar esta línea después de la prueba
    document.querySelectorAll('input[name="festivo"]').forEach((r) => {
      r.disabled = true;
    });
    document.getElementById('festivoDiv').style.display = 'none';
  });
});

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
function formulario() {
  for (var i = 1; i <= canti; i++) {
    crearFormulario(i);
  }

 // asignrNombres();
}

function obtenerDiaSemana() {
  var fechaSeleccionada = new Date(document.getElementById("fecha").value);
  var ab = 1;

  switch (festivo) {
    case 1:
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
      }

      break;
    case 2:
      for (var i = 0; i < canti; i++) {
        if (i == 5) {
          ab = 3;
        }
        if (i == 0) {
          ab = 0;
        }
        if (i != 0 && i != 5) {
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
      }

      break;
    case 3:
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
      }
      break;
    case 4:
      for (var i = 0; i < canti; i++) {
        if (i == 5) {
          ab = 3;
        }
        if (i == 0) {
          ab = 0;
        }
        if (i != 0 && i != 5) {
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
      }
      break;
    default:
      break;
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
  var diaTotal = [];

  for (var j = 0; j < canti; j++) {
    var opcionesSeleccionadas = [];
    var select = document.getElementById('nombres' + (j + 1));

    for (var i = 0; i < select.options.length; i++) {
      opcionesSeleccionadas.push(select.options[i].innerText);
    }


    var arraySinElementosVacios = opcionesSeleccionadas.filter(function (elemento) {
      return typeof elemento === 'string' && elemento.trim() !== "";
    });

    var propi = (document.getElementById('propina' + (j + 1)).value)*0.9;
    propi.toFixed(2);
    diaTotal[j] = propi;
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
  generarPDF(pr0pinas, arrayNombres, opcionesTotales, diaTotal);


}

function asignrNombres() {
  for (var c = 0; c < canti; c++) {
    var contenedorNombre = document.getElementById('nombre' + (c + 1));
    var contenedorNombres = document.getElementById('nombres' + (c + 1));

    if (!contenedorNombre) {
      contenedorNombre = document.createElement('select');
      contenedorNombre.id = 'nombre' + (c + 1);
      document.getElementById('selectContainer').appendChild(contenedorNombre);
    } else {
      // Preserve preselected options in their original order
      var preselectedOptions = Array.from(contenedorNombre.options).filter(function (option) {
        return option.selected;
      });
      contenedorNombre.innerHTML = '';
      for (var i = 0; i < preselectedOptions.length; i++) {
        contenedorNombre.add(preselectedOptions[i]);
      }
    }

    if (!contenedorNombres) {
      contenedorNombres = document.createElement('select');
      contenedorNombres.id = 'nombres' + (c + 1);
      document.getElementById('selectContainer').appendChild(contenedorNombres);
    } else {
      //contenedorNombres.innerHTML = ''; // Clear existing options before adding new ones
    }

    arrayNombres.sort();

    arrayNombres.forEach(function (nombre) {
      var option = document.createElement('option');
      option.value = nombre.toLowerCase().replace(' ', ''); // Option value
      option.text = nombre; // Option text

      // Check if the name already exists in the "nombre" select element
      if (!contenedorNombres.querySelector(`option[value="${nombre.toLowerCase().replace(' ', '')}"]`)) {
        contenedorNombre.add(option);
      }
    });
  }
}
function quitarNombre() {
  var inputNombre = document.getElementById("quitarNombre");
  var nombreQuit = inputNombre.value.trim();

  if (nombreQuit !== "" && arrayNombres.includes(nombreQuit)) {
    // Get the index of the name to remove
    var index = arrayNombres.indexOf(nombreQuit);

    // Remove the name using splice()
    if (index !== -1) {
      arrayNombres.splice(index, 1);
      localStorage.setItem('arregloGuardado', JSON.stringify(arrayNombres));
      asignrNombres();
      inputNombre.value = "";
    }
  }
  else if (!arrayNombres.includes(nombreQuit)) {
    alert("El nombre ya no está en la lista");
  } else {
    alert("El nombre no puede estar vacío");
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

function generarPDF(pr0pinas, arrayNombres, opcionesTotales, diaTotal) {
  localStorage.setItem('pr0pinas', JSON.stringify(pr0pinas));
  localStorage.setItem('opcionesTotales', JSON.stringify(opcionesTotales));
  localStorage.setItem('diaTotal', JSON.stringify(diaTotal));
  localStorage.setItem('festivo', JSON.stringify(festivo));
  var totales = calcularP(pr0pinas, arrayNombres, opcionesTotales);

  // Crear un nuevo documento PDF
  var pdf = new jsPDF({
    orientation: "landscape"
  });

  // Organizar en una tabla
  var tableData = [];
  for (var i = 0; i < arrayNombres.length; i++) {
    if(festivo == 1){
    tableData.push([arrayNombres[i], totales[i][0], totales[i][1], totales[i][2],
    totales[i][3], totales[i][4], totales[i][5], totales[i][6], totales[i][7],
    totales[i][8], totales[i][9], totales[i][10], "---", propinaT(totales[i]), firmaVariable]);
  }else if(festivo==2){
    tableData.push([arrayNombres[i], totales[i][0], totales[i][1], totales[i][2],
      totales[i][3], totales[i][4], "---", totales[i][5], totales[i][6],
      totales[i][7], totales[i][8], totales[i][9], totales[i][9], propinaT(totales[i]), firmaVariable]);

  }else if(festivo == 4){
    tableData.push([arrayNombres[i], totales[i][0], totales[i][1], totales[i][2],
      totales[i][3], totales[i][4],"---", totales[i][5], totales[i][6],
      totales[i][7], totales[i][8], totales[i][9], "---", propinaT(totales[i]), firmaVariable]);

  }
  else {
    tableData.push([arrayNombres[i], totales[i][0], totales[i][1], totales[i][2],
      totales[i][3], totales[i][4], totales[i][5], totales[i][6], totales[i][7],
      totales[i][8], totales[i][9], totales[i][10], totales[i][11], propinaT(totales[i]), firmaVariable]);
  }
}

  // Configurar estilos para la tabla
  var StyleDef = {
    font: 'helvetica', // Tipo de fuente
    fontStyle: 'normal', // Estilo de fuente: normal, bold, italic, bolditalic
    fontSize: 8, // Tamaño de la fuente

  };
  var tableHeaders = ["Nombre", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo", "Lunes", "Miércoles",
    "Jueves", "Viernes", "Sábado", "Domingo", "Lunes", "Suma", "Firma"];
  // Configurar opciones para la tabla
  pdf.autoTable({
    theme: 'grid',
    styles: StyleDef,
    startY: 15,
    head: [["", fechasIngre[0], fechasIngre[1], fechasIngre[2], fechasIngre[3],
      fechasIngre[4], fechasIngre[5], fechasIngre[6], fechasIngre[7], fechasIngre[8],
      fechasIngre[9], fechasIngre[10], fechasIngre[11], "", "",],
    ['Nombre', "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo", "Lunes", "Miércoles", "Jueves",
      "Viernes", "Sábado", "Domingo", "Lunes", 'Suma', "Firma"],
    ["", diaTotal[0], diaTotal[1], diaTotal[2], diaTotal[3], diaTotal[4], diaTotal[5],
      diaTotal[6], diaTotal[7], diaTotal[8], diaTotal[9], diaTotal[10], diaTotal[11]]],

    
    body: tableData,
    didDrawPage: function (data) {
      // Inserta el nombre de la tabla en la parte superior de la página
      pdf.text(`Tabla propinas AG del ${fechasIngre[0]} al ${fechasIngre[11]} `, data.settings.margin.left, 10);
    }
  });

  // Obtener el contenido del PDF como data URI
  var dataUri = pdf.output('datauristring');

  // Obtener el contenedor del visor PDF
  var viewerContainer = document.getElementById('pdf-viewer');

  // Limpiar el contenido actual del contenedor
  viewerContainer.innerHTML = '';

  // Crear un elemento <embed> para mostrar el PDF
  var embed = document.createElement('embed');
  embed.type = 'application/pdf';
  embed.width = '100%';
  embed.height = '800px';
  // Establecer la escala de visualización (ajusta este valor según tus necesidades)
  var scale = 2.0;
  // Configurar el objeto <embed> con la escala y el contenido del PDF
  embed.src = `${dataUri}#zoom=${scale}`;
  // Agregar el elemento embed al contenedor del visor
  viewerContainer.appendChild(embed);

}

function sumarArray(array) {
  return array.reduce((acumulador, elemento) => acumulador + elemento, 0);
}

//Calcula el total de propinas por persona
function propinaT(array1) {
  var sumapro = []
  var numero = removeCommas(array1);
  var suma = sumarArray(numero.map(Number));

  if (Number.isInteger(suma)) {
    sumapro.push(formatN(suma));
  } else {
    sumapro.push(formatN(parseFloat(suma).toFixed(0)));
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
document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("FirmaD")
  var signaturePad = new SignaturePad(canvas);
  document.getElementById("clear").addEventListener("click", function () {
    signaturePad.clear();
  });

  document.getElementById("save").addEventListener("click", function () {
    var signatureDataUrl = signaturePad.toDataURL();
    console.log("Firma guardada:", signatureDataUrl);

    // Puedes almacenar la firma en una variable o realizar otra acción con ella
    var firmaVariable = signatureDataUrl;
  });
});

