class Noticias {

    constructor() {
        if (window.File && window.FileReader && window.FileList && window.Blob) 
        {  
            //El navegador soporta el API File
            document.write("<p>Este navegador soporta el API File </p>");
        }
            else document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
    }


    readInputFile(files) {
        var archivo = files[0];
        //$("[title='resultado']").empty();
        this.datos(archivo);
    }

    datos(archivo){
        var tipoTexto = /text.*/;
        if (archivo.type.match(tipoTexto)) {
            var lector = new FileReader();
            lector.onload = function (evento) {
                var texto = lector.result;
                var noticias = texto.split("\n");
                let index = 0;
                for (let i = 0; i < noticias.length; i++) {
                    var n = noticias[i].split('_');
                    var noticia = "<h3>Noticia nueva</h3>";
                    noticia += "<p>Titular: " + n[index] + "</p>";
                    index++;
                    noticia += "<p>Entradilla: " + n[index] + "</p>";
                    index++;
                    noticia += "<p>Descripción: " + n[index] + "</p>";
                    index++;
                    noticia += "<p>Autor: " + n[index] + "</p>";
                    index = 0;
                    $("[title='resultado']").after(noticia);
                    
                }
            }      
            lector.readAsText(archivo);
        }
        else {
            errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        }       
    }


    crearNoticia(){
        var titular = document.querySelector('input[title="titular"]').value;
        var compruebaTit = /[a-zA-Z]/.test(titular);
        var entradilla = document.querySelector('input[title="entradilla"]').value;
        var compruebaEntr = /[a-zA-Z]/.test(entradilla);
        var descripcion = document.querySelector('input[title="descripcion"]').value;
        var compruebaDesc = /[a-zA-Z]/.test(descripcion);
        var autor = document.querySelector('input[title="autor"]').value;
        var compruebaAutor = /[a-zA-Z]/.test(autor);
        if (compruebaTit && compruebaEntr && compruebaDesc && compruebaAutor){
            var noticia = "<h3>Noticia nueva</h3>";
            noticia += "<p>Titular: " + titular + "</p>";
            noticia += "<p>Entradilla: " + entradilla + "</p>";
            noticia += "<p>Descripción: " + descripcion + "</p>";
            noticia += "<p>Autor: " + autor + "</p>";
            $("[title='central']").find("p").last().after(noticia);
        }
        else{
            window.alert("Tiene que rellenar todos los espacios");
        }
    }
    

}