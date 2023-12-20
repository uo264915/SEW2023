
class Geolocalización {
    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    }
    getPosicion(posicion){
        this.mensaje = "Se ha realizado correctamente la petición de geolocalización";
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;       
    }
    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización"
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Información de geolocalización no disponible"
            break;
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalización ha caducado"
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido"
            break;
        }
    }
    getLongitud(){
        return this.longitud;
    }
    getLatitud(){
        return this.latitud;
    }
    getAltitud(){
        return this.altitud;
    }
    verTodo(){
        var ubicacion=document.querySelector('section[title="ubicacion"]');
        var datos='<p>'+ this.mensaje + '</p>'; 
        datos+='<p>Longitud: '+this.longitud +' grados</p>'; 
        datos+='<p>Latitud: '+this.latitud +' grados</p>';
        datos+='<p>Precisión de la longitud y latitud: '+ this.precision +' metros</p>';
        datos+='<p>Altitud: '+ this.altitude +' metros</p>';
        datos+='<p>Precisión de la altitud: '+ this.precisionAltitud +' metros</p>'; 
        datos+='<p>Rumbo: '+ this.rumbo +' grados</p>'; 
        datos+='<p>Velocidad: '+ this.velocidad +' metros/segundo</p>';
        ubicacion.innerHTML = datos;
    }

    getMapaEstatico(){
        var ubicacion=document.querySelector("section[title='estatico']");
        
        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + this.latitud + "," + this.longitud;
        var zoom ="&zoom=15";
        var tamaño= "&size=800x600";
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        var sensor = "&sensor=false"; 
        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        ubicacion.innerHTML += "<img src='"+this.imagenMapa+"' alt='mapa estático google' />";
        $("button[title='estatico']").remove();
    }

    getMapaDinamico(){
        var ubicacion=document.querySelector("section[title='dinamico']");
        this.city = [this.longitud, this.latitud];
        this.apiKey = "pk.eyJ1IjoidW8yNzEyODgiLCJhIjoiY2t3Ynk4bG5hMGZhdjJwbjJzNjZwMHI2OCJ9.4VqHsw5zVVkrOGjQLn3doA";
        this.container = "dinamico";
        this.mapStyle = "mapbox://styles/mapbox/streets-v9";
        this.zoom = 10;

        mapboxgl.accessToken = this.apiKey;
        let map = new mapboxgl.Map({
          container: this.container,
          style: this.mapStyle,
          center: this.city,
          zoom: this.zoom
        });
        let marker1 = new mapboxgl.Marker()
            .setLngLat(this.city)
            .addTo(map);

        $("button[title='dinamico']").remove();
    }

    mostrarXML(files){

        var archivo = files[0];
        var tipoXML = /xml.*/;
        if (archivo.type.match(tipoXML)) {
            var lector = new FileReader();
            lector.onload = function (evento) {
                var texto = lector.result;
                
                
                $('ruta', texto).each(function() {
                    $("[title='unico']").append("<h3> Ruta </h3>");
                    var nombre = $(this).find('nombre').text();
                    var tipoRuta = $(this).find('tipoRuta').text();
                    var transporte = $(this).find('transporte').text();
                    var duracion = $(this).find('duracion').text();
                    var agencia = $(this).find('agencia').text();
                    var descripcion = $(this).find('descripcion').text();
                    var personasAdecuadas = $(this).find('personasAdecuadas').text();
                    var lugarInicio = $(this).find('lugarInicio').text();
                    var direccionInicio = $(this).find('direccionInicio').text();
                    var longitud = $(this).find('coordenadas').attr('longitud');
                    var latitud = $(this).find('coordenadas').attr('latitud');
                    var altitud = $(this).find('coordenadas').attr('altitud');
                    var recomendacion = $(this).find('recomendacion').text();

                    $("[title='unico']").append("<p>Titular: " + nombre + "</p>");
                    $("[title='unico']").append("<p>Tipo de ruta: " + tipoRuta + "</p>");
                    $("[title='unico']").append("<p>Transporte: " + transporte + "</p>");
                    $("[title='unico']").append("<p>Duración: " + duracion + "</p>");
                    $("[title='unico']").append("<p>Agencia: " + agencia + "</p>");
                    $("[title='unico']").append("<p>Descripción: " + descripcion + "</p>");
                    $("[title='unico']").append("<p>Personas adecuadas: " + personasAdecuadas + "</p>");
                    $("[title='unico']").append("<p>Lugar de inicio: " + lugarInicio + "</p>");
                    $("[title='unico']").append("<p>Dirección de inicio: " + direccionInicio + "</p>");
                    $("[title='unico']").append("<p>Longitud: " + longitud + "</p>");
                    $("[title='unico']").append("<p>Latitud: " + latitud + "</p>");
                    $("[title='unico']").append("<p>Longitud: " + altitud + "</p>");
                    $("[title='unico']").append("<p>Recomendación: " + recomendacion + "</p>");
                    
                    $(this).find('referencias', texto).each(function() {
                        var referencias = $(this).find('referencia');
                        for (let i=0; i<3; i++){
                            var referencia = $(referencias[i]).text();
                            $("[title='unico']").append("<a href=\"" + referencia + "\"> Informacion adicional " + (i+1) + " </a>");
                        }
                    });
                    
                    $(this).find('hito', texto).each(function() {
                        $("[title='unico']").append("<h4> Hito </h4>");
                        var nombreHito = $(this).find('nombreHito').text();
                        var descripcionHito = $(this).find('descripcionHito').text();
                        var longitudHito = $(this).find('coordenadasHito').attr('longitud');
                        var latitudHito = $(this).find('coordenadasHito').attr('latitud');
                        var altitudHito = $(this).find('coordenadasHito').attr('altitud');
                        var distanciaAnterior = $(this).find('distanciaAnterior').text();
                        
                        $("[title='unico']").append("<p>Nombre Hito: " + nombreHito + "</p>");
                        $("[title='unico']").append("<p>Descripcion Hito: " + descripcionHito + "</p>");
                        $("[title='unico']").append("<p>Longitud Hito: " + longitudHito + "</p>");
                        $("[title='unico']").append("<p>Latitud Hito: " + latitudHito + "</p>");
                        $("[title='unico']").append("<p>Altitud Hito: " + altitudHito + "</p>");
                        $("[title='unico']").append("<p>Distancia Anterior Hito: " + distanciaAnterior + "</p>");

                        var fotografia = $(this).find('fotografia').attr("src");
                        $("[title='unico']").append("<img src=\"" + fotografia + "\" alt=\""+ nombreHito + "\" >");
                            
                    });
                });
                    
            }      
            lector.readAsText(archivo);
        }
        else {
            errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        }               
    }

    mostrarKML(files) {
 
        var archivos = files;
        var nArchivos = archivos.length;
        
        var ubicacion=document.querySelector("section[title='multiple']");
        this.city = [this.longitud, this.latitud];
        this.apiKey = "pk.eyJ1IjoidW8yNzEyODgiLCJhIjoiY2t3Ynk4bG5hMGZhdjJwbjJzNjZwMHI2OCJ9.4VqHsw5zVVkrOGjQLn3doA";
        this.container = "multiple";
        this.mapStyle = "mapbox://styles/mapbox/streets-v9";
        this.zoom = 10;

        mapboxgl.accessToken = this.apiKey;
        let map = new mapboxgl.Map({
          container: ubicacion,
          style: this.mapStyle,
          center: this.city,
          zoom: this.zoom
        });
        var marcadores = [];
        for (var i=0; i<nArchivos; i++){
            var archivo = files[i];
            var lector = new FileReader();
            lector.onload = function (evento) {
                var kml = lector.result;
                
                var texto = $(kml).find('coordinates', kml).text();
                var punto = texto.split(",");
                var cont = 0;
                for (var j=0; j<punto.length; j++){
                    if (j % cont != 0){
                        var coordenadas = [punto[cont], punto[cont+1]];
                        cont += 2;
                        j++;
                        var marker = new mapboxgl.Marker().setLngLat(coordenadas).addTo(map);
                    }
                    else {
                        cont++;
                    }
                }
            }      
            lector.readAsText(archivo);
        }
      
    }

}
var localizacion = new Geolocalización();