
class Fondo {

    constructor(nombrePais, capitalPais, coordenadasPais){
        this.nombre = nombrePais;
        this.capital = capitalPais;
        this.coordenadas = coordenadasPais;
    }

    llamada(){
        var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON(flickrAPI, 
                {
                    tags: this.nombre + this.capital + this.coordenadas,
                    tagmode: "any",
                    format: "json"
                })
            .done(function(data) {
                    $.each(data.items, function(i,item ) {
                        $("<img />").attr("src", item.media.m).appendTo("section[title=\"sect\"]");
                        if ( i === 20 ) {
                                return false;
                        }
                        $('body').css('background-image', 'url('+item.media.m+')');  
                    }); 
                    $('html').find('img').remove();
        });  
    }

}