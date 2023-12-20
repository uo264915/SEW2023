
class Pais {

    constructor(nombre, capital, poblacion){
        this.nombre = nombre;
        this.capital = capital;
        this.poblacion = poblacion;
        this.apikey = "f04d165da28c683ba094a06754d48a46";
        this.codigoPais = "ID";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.nombre + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.correcto = "¡Todo correcto! JSON recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>"
    }

    rellenaDatosSecundarios(){
        this.gobierno = 'República';
        this.coordenadas = [120][-5];
        this.religion = 'Islam';
    }

    muestraDatosPrincipales(){
        document.write("<p> Nombre: "+this.nombre+"</p>");
        document.write("<p> Capital: "+this.capital+"</p>");
    }

    muestraDatosSecundarios(){
        document.write("<ul><li> Gobierno: "+this.gobierno+"</li>");
        document.write("<li> Población: "+this.poblacion+"</li>");
        document.write("<li> Religión: "+this.religion+"</li></ul>");
    }

    muestraCoordenadas(){
        document.write("<p>Coordenadas: longitud=" +this.coordenadas[0] + ", latitud=" +this.coordenadas[1] +"</p>")
    }

    cargarDatos(){
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos){
                $("pre").text(JSON.stringify(datos, null, 2)); //muestra el json en un elemento pre
                    var stringDatos = "<ul><li>Temperatura máxima: " + datos.main.temp_max + " grados Celsius</li>";
                        stringDatos += "<li>Temperatura mínima: " + datos.main.temp_min + " grados Celsius</li>";
                        stringDatos += "<li>Humedad: " + datos.main.humidity + " %</li>";
                        stringDatos += "<li>Nubosidad: " + datos.clouds.all + " %</li></ul>";            
                    $("ul").after(stringDatos);
                    if (datos.main.temp_max <= 5){
                        var imagen = "<img src=\"multimedia/nieve.png\"  alt=\"Nieve\">";
                        $("h2").after(imagen);
                    }
                    else if (datos.main.temp_min > 5 && datos.main.temp_max <= 15){
                        var imagen = "<img src=\"multimedia/solPeqNube.png\"  alt=\"PocoSolNube\">";
                        $("h2").after(imagen);
                    }
                    else if (datos.main.temp_max >= 25){
                        var imagen = "<img src=\"multimedia/sol.png\"  alt=\"Sol\">";
                        $("h2").after(imagen);
                    }
                    else if (datos.main.humidity > 50){
                        var imagen = "<img src=\"multimedia/lluvia.png\"  alt=\"Lluvia\">";
                        $("h2").after(imagen);
                    }
                    else if (datos.main.clouds > 50){
                        var imagen = "<img src=\"multimedia/nube.png\"  alt=\"Nube\">";
                        $("h2").after(imagen);
                    }
                    else{
                        var imagen = "<img src=\"multimedia/solGrandenube.png\"  alt=\"MuchoSolNube\">";
                        $("h2").after(imagen);
                    }
                },
        });
    }
    crearElemento(tipoElemento, texto, insertarAntesDe){
        // Crea un nuevo elemento modificando el árbol DOM
        // El elemnto creado es de 'tipoElemento' con un 'texto' 
        // El elemnto se coloca antes del elemnto 'insertarAntesDe'
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(insertarAntesDe).before(elemento);
    }

    verJSON(){
        this.cargarDatos();
        $("button").attr("disabled","disabled");
    }
}
var indonesia = new Pais('Indonesia', 'Yakarta', 274000000);
indonesia.rellenaDatosSecundarios();