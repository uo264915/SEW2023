"use script";

function loader()
{
var canvas = document.querySelector("canvas[title='rect']");
var canvas1 = canvas.getContext('2d');


canvas1.fillStyle = "rgba(10, 90, 2, 1)";
canvas1.fillRect(30, 30, 800, 300);
}


class ApiFile {
    constructor() {
        const header = $('header');
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            header.append("<h2>Este navegador soporta el API File </h2>");
        } else {
            const body = $('body');
            body.empty();
            header.append("<h2>Este navegador soporta el API File </h2>");
        }
        this.files = [];
    }

    processFiles() {
        this.files = $("[title='files']")[0].files;
        $("[title='codigo']").empty();
        this.showNumberFiles();
        this.calculateSize();
        this.showListFiles();
    }

    showNumberFiles() {
        $("[title='codigo']").append("<p>Ficheros seleccionados: " + this.files.length + "</p>");
    }

    calculateSize() {
        let nBytes = 0;
        for (let i = 0; i < this.files.length; i++) {
            nBytes += this.files[i].size;
        }
        $("[title='codigo']").append("<p>Tamaño total: " + nBytes + " bytes </p>");
    }

    showListFiles() {
        let content = '';
        content += "<h3>Ficheros seleccionados</h3>";
        content += "<ul id='listFile'>";
        for (let i = 0; i < this.files.length; i++) {
            this.showContentFile(this.files[i]);
        }
        content += "</ul>";
        $("[title='codigo']").append(content)
    }

    showContentFile(file) {
        const reader = new FileReader();
        reader.onload = () => {
            this.showDetailsFile(file, reader.result);
        };
        reader.readAsText(file, "UTF-8");
    }

    showDetailsFile(file, content) {
        content = this.convertXML(content);
        let details = "<li>" + file.name;
        details += "<ul>";
        details += "<li>Tamaño: " + file.size + " bytes</li>";
        details += "<li>Tipo: " + file.type + "</li>";
        details += "<li>Ultima modificacion: " + file.lastModifiedDate + "</li>";
        details += "<li>Contenido:<pre>" + content + "</pre></li>";
        details += "</ul>";
        details += "</li>";
        $("[title='codigo']").append(details);
    }

    convertXML(content) {
        content = String(content).replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
        return content;
    }
}

var apiFile = new ApiFile();

"use strict";
class Meteo {

    constructor(){
       this.apikey = "47b790fd0fc41878c80c57c9846132cb";
       this.ciudad = "Madrid";
       this.codigoPais = "ES";
       this.unidades = "&units=metric";
       this.idioma = "&lang=es";
       this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
       this.correcto = "¡Todo correcto! JSON recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>"
    }

    cargarDatos(){

        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos){
                $("pre").text(JSON.stringify(datos, null, 2)); //muestra el json en un elemento pre
                    var stringDatos = "<ul><li>Ciudad: " + datos.name + "</li>";
                        stringDatos += "<li>País: " + datos.sys.country + "</li>";
                        stringDatos += "<li>Latitud: " + datos.coord.lat + " grados</li>";
                        stringDatos += "<li>Longitud: " + datos.coord.lon + " grados</li>";
                        stringDatos += "<li>Temperatura: " + datos.main.temp + " grados Celsius</li>";
                        stringDatos += "<li>Temperatura máxima: " + datos.main.temp_max + " grados Celsius</li>";
                        stringDatos += "<li>Temperatura mínima: " + datos.main.temp_min + " grados Celsius</li>";
                        stringDatos += "<li>Presión: " + datos.main.pressure + " milibares</li>";
                        stringDatos += "<li>Humedad: " + datos.main.humidity + " %</li>";
                        stringDatos += "<li>Amanece a las: " + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "</li>";
                        stringDatos += "<li>Oscurece a las: " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "</li>";
                        stringDatos += "<li>Dirección del viento: " + datos.wind.deg + " grados</li>";
                        stringDatos += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>";
                        stringDatos += "<li>Hora de la medida: " + new Date(datos.dt *1000).toLocaleTimeString() + "</li>";
                        stringDatos += "<li>Fecha de la medida: " + new Date(datos.dt *1000).toLocaleDateString() + "</li>";
                        stringDatos += "<li>Descripción: " + datos.weather[0].description + "</li>";
                        stringDatos += "<li>Visibilidad: " + datos.visibility + " metros</li>";
                        stringDatos += "<li>Nubosidad: " + datos.clouds.all + " %</li></ul>";               

                        $("[title='datos']").append(stringDatos);
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
var meteo = new Meteo();