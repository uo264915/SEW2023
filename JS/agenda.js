
class Agenda {

    constructor() {
        this.apiUrl = "http://ergast.com/api/f1/2023";
        this.last_api_call = null;
        this.last_api_result = null;
    }

    ejecutarEn10Minutos() {
        const currentTime = new Date().getTime(); // Obtener el tiempo actual en milisegundos
    
        // Calcular la diferencia de tiempo en minutos
        const minutesPassed = (currentTime - this.last_api_call) / (1000 * 60);
        
        if (minutesPassed >= 10) {
            this.last_api_call = currentTime;
            return true;
        } else {
            window.alert("Espere 10 minutos para obtener otra vez información");
        }
        return false;
    }
    
    cargarDatos(){
        if (this.ejecutarEn10Minutos()){
            $.ajax({
                dataType: "xml",
                url: this.apiUrl,
                method: 'GET',
                success: function(datos) {
                    
                    var tabla = $('<table>');
                    var cuerpoTabla = $('<tbody>').appendTo(tabla);
                    var filaCabezera = $('<tr>').appendTo(cuerpoTabla);
                    $('<th>').text('Carrera').appendTo(filaCabezera);
                    $('<th>').text('Circuito').appendTo(filaCabezera);
                    $('<th>').text('Longitud').appendTo(filaCabezera);
                    $('<th>').text('Latitud').appendTo(filaCabezera);
                    $('<th>').text('Fecha').appendTo(filaCabezera);
                    $('<th>').text('Hora').appendTo(filaCabezera);
                    $('Race', datos).each(function() {
                        var carrera = $(this).find('RaceName').text();
                        var circuito = $(this).find('CircuitName').text();
                        var latitud = $(this).find('Location').attr('lat');
                        var longitud = $(this).find('Location').attr('long');
                        var fecha = $(this).find('Date').first().text();
                        var hora = $(this).find('Time').first().text();
                        
                        var nuevaFila = $('<tr>').appendTo(tabla);
                            $('<td>').text(carrera).appendTo(nuevaFila);
                            $('<td>').text(circuito).appendTo(nuevaFila);
                            $('<td>').text(longitud).appendTo(nuevaFila);
                            $('<td>').text(latitud).appendTo(nuevaFila);
                            $('<td>').text(fecha).appendTo(nuevaFila);
                            $('<td>').text(hora).appendTo(nuevaFila);
                        
                    });
                    $("button").after(tabla); // Asegúrate de que el elemento 'button' existe en tu HTML
                }
            });
        } else{
            $("button").after(tabla);
        }
    }

    mostrar(){
        this.cargarDatos();
    }

}
var agenda = new Agenda();