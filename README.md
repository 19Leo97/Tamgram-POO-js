# Tamgram-POO-js

## Explicación de archivos y clases

El codigo de este Tammgram está desarrollado en p5.
Consta de un archivo principal, "Tamgram.js" donde se corre el draw, el setup y están alojadas varias funciones importantes
Tiene 5 clases:
(1. Shape): de la cual 3 clases heredan de la misma: (2.Rect), (3.Triangle) y (4.Paralel)
(5.Segments)

*La clase Term no es usada

Dentro del codigo hay comentarios que explican mas detalladamente la dinamica del programa.


## Información extra del Juego:

1. Las fichas se seleccionan con el mouse, inmediatamente se pueden mover arrastrandolas
2. Al ser seleccionadas se pueden girar con "A" y "D", e invertir con "W"
3. Se pueden escoger problemas a resolver con las teclas "1",...hasta "9", y mas si se crean mas niveles.
4. Se puede ver la solución de un nivel con la tecla "g"
5. Cuando se soluciona el problema las fichas cambia de color a azul
6. Se puede crear un nivel nuevo. Se presiona la tecla g, para cambiar la posicion de las fichas del fondo. Volviendo a presionar "g" podemos cambiar las fichas front.
7. Se puede imprimir un string con JSON,de las propiedades de las fichas con la tecla "k".
8. Para guardar un problema creado, luego de imprimirlo, copiamos de la consola los strings en el codigo, el primer y segundo string en las variables m0 y m1 de algun key=="num"

## Que hace diferente a este juego de los demás?  
1. Las fichas se pegan unas a otras!  
Las fichas ajustan su posicion en funcion de la cercania que tengan a otras figuras. Esto permite una mejor manipulación de las fichas del juego, además de mayor precision al ubicar las fichas. 
2. Permite varias soluciones sin perder agudeza en la evaluación de la solución  
Para evaluar la solucion del problema, nos aseguramos de que todos los segmentos de todas las figuras esten en contacto con las demas figuras(incluimos las del fondo y frente), y que ninguna figura del frente este encima de otra figura del frente. Esta estrategia nos da una segura evaluación de la solución, permitiendo multiples soluciones también

## Cómo abrir el juego?  
Puedes descargar el zip de este repositorio, descomprimirlo, y luego abrir con el navegador de google chrome el archivo llamado "index", que está en la carpeta "Tamgram"





