let data = [];
let csvFileName = "";

//Convertir archivo CSV a tabla 
function parseCSV(csvData){
    const rows = csvData.split("\n");
    data = [...rows];
    const tableBody=document.querySelector('#csvTable');
    rows.forEach( row =>{
        const colums = row.split(',');
        const tr = document.createElement('tr');
        colums.forEach(column=>{
            const td = document.createElement('td');
            td.textContent=column;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
    console.log(csvData);
}

//Leer archivo CSV
function readCSV(file){
    const reader = new FileReader();
    reader.onload= function(e){
        const csvData = e.target.result;
        parseCSV(csvData);
    }
    reader.readAsText(file);
}

//Lectura a traves del boton
document.querySelector('#leerCSV').addEventListener('click', function(e){
    e.preventDefault();
    const input = document.querySelector('#csvFile');
    const file = input.files[0];
    readCSV(file);
});

// Insertar datos en el archivo CSV
const form = document.getElementById('FormIngreso');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    let formData = new FormData(form);
    
    //Verificar que todos los campos estén llenos
    if (formData.get("nombre") && formData.get("apellido") && formData.get("edad") && formData.get("carrera")) {
        insert(formData);
    } else {
        alert("Completa todos los campos antes de enviar el formulario.");
    }
});
    
function insert(formData){
    // Obtención de los datos del formulario
    let nombre = formData.get("nombre");
    let apellido = formData.get("apellido");
    let edad = formData.get("edad");
    let carrera = formData.get("carrera");

    // Insertando datos en la tabla
    let tabla = document.getElementById("csvTable");
    let nuevaFila = tabla.insertRow(-1);

    let nuevaCelda = nuevaFila.insertCell(0);
    nuevaCelda.textContent = nombre;

    nuevaCelda = nuevaFila.insertCell(1);
    nuevaCelda.textContent = apellido;

    nuevaCelda = nuevaFila.insertCell(2);
    nuevaCelda.textContent = edad;

    nuevaCelda = nuevaFila.insertCell(3);
    nuevaCelda.textContent = carrera;

    //Limpiar campos
    document.getElementById("nombre").value='';
    document.getElementById("apellido").value='';
    document.getElementById("edad").value='';
    document.getElementById("carrera").value='';

    //Insertar los datos en el archivo
    const nuevoDato = `\r\n${formData.get("nombre")}, ${formData.get("apellido")}, ${formData.get("edad")}, ${formData.get("carrera")},`
    data.push(nuevoDato);
    console.log(data);
}

//Descarga del nuevo archivo con los datos nuevos
function descargar(){
    const nuevoCSV = new Blob(data,{ type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(nuevoCSV);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = "datos-actualizados.csv";
    enlace.click();
}

//Eliminar fila
function eliminar() {
    const indice = prompt("Ingresa el índice de la fila que deseas eliminar:");
    const tabla = document.getElementById("csvTable");
    const filas = tabla.getElementsByTagName("tr");

    if (indice >= 0 && indice < filas.length) {
        filas[indice].remove();
    } else {
        alert("Índice inválido.");
    }

    //Eliminar fila en el archivo
    const index = parseInt(indice);
    const datoEliminado = data.indexOf(indice);
    if (index > -1) {
        data.splice(datoEliminado, 1); 
    }
    console.log(data);
}
