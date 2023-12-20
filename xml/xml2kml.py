import xml.etree.ElementTree as ET
from xml.dom.minidom import parseString

def verXPath(archivoXML):
    try:
        arbol = ET.parse(archivoXML)

    except IOError:
        print('No se encuentra el archivo ', archivoXML)
        exit()

    except ET.ParseError:
        print("Error procesando en el archivo XML = ", archivoXML)
        exit()

    raiz = arbol.getroot()
    
    kml = ET.Element('kml')
    document = ET.SubElement(kml, 'Document')

    for hijo in raiz.findall('ruta'):
        placemark = ET.SubElement(document, 'Placemark')

        name = hijo.find('nombre').text
        for c in hijo.findall('coordenadas'):
            longitud = c.get('longitud')
            latitud = c.get('latitud')


        # Crea elementos KML para el Placemark
        ET.SubElement(placemark, 'name').text = name
        point = ET.SubElement(placemark, 'Point')
        ET.SubElement(point, 'coordinates').text = f"{longitud},{latitud},{0.0}"

    for hijo in raiz.findall('ruta'):
        for c in hijo.findall('hitos'):
            for c1 in c.findall('hito'):
                for c2 in c1.findall('coordenadasHito'):
                    placemark = ET.SubElement(document, 'Placemark')
                    longitud = c2.get('longitud')
                    latitud = c2.get('latitud')
                    
                    name = c1.find('nombreHito').text
                    ET.SubElement(placemark, 'name').text = name
                    point = ET.SubElement(placemark, 'Point')
                    ET.SubElement(point, 'coordinates').text = f"{longitud},{latitud},{0.0}"

    kml_data = ET.tostring(kml, encoding='utf-8').decode('utf-8')
    parsed_kml = parseString(kml_data)
    kml_formatted = parsed_kml.toprettyxml()

    # Guarda el archivo KML
    kml_file = 'rutas.kml'
    with open(kml_file, 'w') as f:
        f.write(kml_formatted)

    print(f'Archivo KML creado en {kml_file}')



def main():
    """Prueba de la función verXPath()"""

    print(verXPath.__doc__)

    miArchivoXML = input('Introduzca un archivo XML = ')
    verXPath(miArchivoXML)

if __name__ == "__main__":
    main()





    