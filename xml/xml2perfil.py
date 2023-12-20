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
    
    svg = ET.Element('svg', attrib={'xmlns': 'http://www.w3.org/2000/svg'})

    linea = ET.SubElement(svg, 'polyline')
    puntos = f"{10},{500},"
    posRuta = f"{50}"
    for hijo in raiz.findall('ruta'):
        for c in hijo.findall('coordenadas'):
            altitud = c.get('altitud')
            alt = float(altitud)
            alt = 500-alt/2
            altitud = str(alt)
            puntos += f"{posRuta},{altitud},"

    posHito1 = f"{100}"
    posHito2 = f"{150}"
    posHito3 = f"{200}"
    cont = 0
    for hijo in raiz.findall('ruta'):
        for c in hijo.findall('hitos'):
            for c1 in c.findall('hito'):
                for c2 in c1.findall('coordenadasHito'):
                    altitudHitos = c2.get('altitud')
                    alt = float(altitudHitos)
                    alt = 500-alt/2
                    altitudHitos = str(alt)
                    if (cont == 0):
                        puntos += f"{posHito1},{altitudHitos},"
                    elif (cont == 1):
                        puntos += f"{posHito2},{altitudHitos},"
                    elif (cont == 2):
                        puntos += f"{posHito3},{altitudHitos},"
                    cont += 1

    puntos += f"{250},{500},{10},{500}"
    linea.attrib['points'] = puntos
    linea.attrib['style'] = "fill:write;stroke:red;stroke-width:2"

    
    inicio = ET.SubElement(svg, 'text')
    inicio.text = "Inicio"
    inicio.attrib['x'] = f"{10}"
    inicio.attrib['y'] = "520"
    inicio.attrib['style'] = "writing-mode: tb; glyph-orientation-vertical: 0;"

    nombreX = f"{50}"
    for hijo in raiz.findall('ruta'):
        texto = ET.SubElement(svg, 'text')
        texto.text = hijo.find('nombre').text
        texto.attrib['x'] = nombreX
        nombreX += f"{nombreX}"
        texto.attrib['y'] = "520"
        texto.attrib['style'] = "writing-mode: tb; glyph-orientation-vertical: 0;"

    posNomHito1 = f"{100}"
    posNomHito2 = f"{150}"
    posNomHito3 = f"{200}"
    cont = 0
    for hijo in raiz.findall('ruta'):
        for c in hijo.findall('hitos'):
            for c1 in c.findall('hito'):
                texto = ET.SubElement(svg, 'text')
                texto.text = c1.find('nombreHito').text
                if (cont == 0):
                    texto.attrib['x'] = posNomHito1
                elif (cont == 1):
                    texto.attrib['x'] = posNomHito2
                elif (cont == 2):
                    texto.attrib['x'] = posNomHito3
                texto.attrib['y'] = "520"
                texto.attrib['style'] = "writing-mode: tb; glyph-orientation-vertical: 0;"
                cont += 1


    fin = ET.SubElement(svg, 'text')
    fin.text = "Fin"
    fin.attrib['x'] = f"{250}"
    fin.attrib['y'] = "520"
    fin.attrib['style'] = "writing-mode: tb; glyph-orientation-vertical: 0;"

    # Guarda el archivo SVG
    svg_tree = ET.ElementTree(svg)
    svg_file = 'planimetria2.svg'
    svg_tree.write(svg_file, encoding='utf-8', xml_declaration=True)
    print(f'Archivo KML creado en {svg_file}')


def main():
    """Prueba de la función verXPath()"""

    print(verXPath.__doc__)

    miArchivoXML = input('Introduzca un archivo XML = ')
    verXPath(miArchivoXML)

if __name__ == "__main__":
    main()
