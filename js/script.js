

//Validar si el formulario se encuentra completo
  function validarFormulario() {
    var rut = document.getElementById('rut').value;
    var edad = document.getElementById('edad').value;
    var fecha = document.getElementById('fecha').value;
    var hora = document.getElementById('hora').value;
    var min = document.getElementById('min').value;
    var serv = document.getElementById('serv').value;
    var descrip = document.getElementById('descrip').value;
    var accreal = document.getElementById('accreal').value;
    var registro = document.getElementById('regist').value;
    var inform = document.getElementById('inform').value;


    var rt = comprobarRut(rut);
    
    if(rut.length == 0 ) {
      document.getElementById('rut').focus();
      alert('Por favor ingrese RUT');	
      
      return;
    }
    
    if (edad.length == 0 || edad <= 0  || isNaN(edad) == true) {
      document.getElementById('edad').focus();
      alert('Ingrese edad correctamente');
    
      return;
    }
    if(formatoFecha(fecha) == false ){
      document.getElementById('fecha').focus();
      alert('Error en la fecha ingresada');
      return;
    }
    if (fecha.length == 0) {
      document.getElementById('fecha').focus();
      alert('No ha seleccionado la fecha del evento');
      return;
    }

    if (hora.length == 0 || hora<0 || hora>23 || isNaN(hora) == true){
      document.getElementById('hora').focus();
      alert('No ha especificado la hora correctamente (Hora mal ingresada no puede ser superior a 23)');
      return;
    }
    if(min.length == 0 || min <0 || min >59 || isNaN(min) == true){
        document.getElementById('min').focus();
        alert('No ha especificado la hora correctamente (Minutos mal ingresados no puede ser superior a 59)');
        return;
    }
    
   if (serv.length == 0 || serv == 0 ){
     document.getElementById('serv').focus();
      alert('No ha seleccionado el Servicio de ocurrencia');
      return;
    }

    if (descrip.length == 0){
      document.getElementById('descrip').focus();
      alert('No ha descrito el evento');
      return;
    }

   if (accreal.length == 0){
    document.getElementById('accreal').focus();
      alert('No ha especificado las acciones realizadas');
      return;
    }
    if (registro.length == 0){
      document.getElementById('regist').focus();
      alert('No se informo si fue registrado en la ficha clinica');
      return;
    }

    if (inform.length == 0){
      document.getElementById('inform').focus();
      alert('No ha indicado a quien se le informara de este evento');
      return;
    }
    if (rt == true){
      alert('Ingresado con Exito');
    }

  }

//Comprobacion para el rut si tiene caracteres que no corresponden
function comprobarRut(r){

var formato = "";

for (i=0; i < r.length; i++){

if(r.charAt(i) != ' ' && r.charAt(i) != '.' && r.charAt(i) != '-'){
  formato = formato + r.charAt(i);
}
}
r = formato;

//Comprobar si los valores son numeros o K
for (i=0; i < r.length; i++){
  if(isNaN(r.charAt(i)) == true && r.charAt(i) != "k" && r.charAt(i) != "K"){
  alert("El rut ingresado no es valido.Por favor ingrese correctamente");
  return false;
  
  }
}
return true;

} 

//Validar formato de fecha ingresada
function formatoFecha(fech){
  var pattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
  if ((fech.match(pattern) && fech != '')) {
    return true
  }else{
    return false
  }
}

//Validar mensaje para contacto 

function enviarMensaje(){
  var mensaje = document.getElementById('msj').value;

  if (mensaje.length == 0){
    alert('El mensaje esta vacio');
    document.getElementById('msj').focus();
    return;
  }
  alert('Mensaje enviado correctamente');

}




// Capturando el DIV alerta y mensaje
var alerta = document.getElementById("alerta");
var mensaje = document.getElementById("mensaje");

//RUT validaciones 

// Permitir sólo números en el imput
function isNumber(evt) {
  var charCode = evt.which ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode === 75) return false;

  return true;
}
function checkRut(rut) {

  if (rut.value.length <= 1) {
    alerta.classList.remove('alert-success', 'alert-danger');
    alerta.classList.add('alert-info');
  }

  // Obtiene el valor ingresado quitando puntos y guión.
  var valor = clean(rut.value);

  // Divide el valor ingresado en dígito verificador y resto del RUT.
  cuerpo = valor.slice(0, -1);
  dv = valor.slice(-1).toUpperCase();

  // Separa con un Guión el cuerpo del dígito verificador.
  rut.value = format(rut.value);

  // Si no cumple con el mínimo ej. (n.nnn.nnn)
  if (cuerpo.length < 7) {
    rut.setCustomValidity("RUT Incompleto");
    alerta.classList.remove('alert-success', 'alert-danger');
    alerta.classList.add('alert-info');
    mensaje.innerHTML = 'Ingresó un RUT muy corto, el RUT debe ser mayor a 7 Dígitos. Ej: x.xxx.xxx-x';
    return false;
  }

  // Calcular Dígito Verificador "Método del Módulo 11"
  suma = 0;
  multiplo = 2;

  // Para cada dígito del Cuerpo
  for (i = 1; i <= cuerpo.length; i++) {
    // Obtener su Producto con el Múltiplo Correspondiente
    index = multiplo * valor.charAt(cuerpo.length - i);

    // Sumar al Contador General
    suma = suma + index;

    // Consolidar Múltiplo dentro del rango [2,7]
    if (multiplo < 7) {
      multiplo = multiplo + 1;
    } else {
      multiplo = 2;
    }
  }

  // Calcular Dígito Verificador en base al Módulo 11
  dvEsperado = 11 - (suma % 11);

  // Casos Especiales (0 y K)
  dv = dv == "K" ? 10 : dv;
  dv = dv == 0 ? 11 : dv;

  // Validar que el Cuerpo coincide con su Dígito Verificador
  if (dvEsperado != dv) {
    rut.setCustomValidity("RUT Inválido");

    alerta.classList.remove('alert-info', 'alert-success');
    alerta.classList.add('alert-danger');
    alert('El RUT ingresado: ' + rut.value + ' Es <strong>INCORRECTO</strong>.');

    return false;
  } else {
    rut.setCustomValidity("RUT Válido");

    alerta.classList.remove('d-none', 'alert-danger');
    alerta.classList.add('alert-success');
    alert('El RUT ingresado: ' + rut.value + ' Es <strong>CORRECTO</strong>.');
    return true;
  }
}

function format (rut) {
  rut = clean(rut)

  var result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1)
  for (var i = 4; i < rut.length; i += 3) {
    result = rut.slice(-3 - i, -i) + '.' + result
  }

  return result
}

function clean (rut) {
  return typeof rut === 'string'
    ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
    : ''
}


