Pautas de Contribución
======================

Estas son las pautas que usaremos al momento de contribuir.

Arbol de directorios
--------------------

```
[root]-+ Archivos de configuración y el README
       |
       +-[.vscode] Archivos de configuración de VS Code
       +-[site]-+ Archivos del sitio
                |
                +-[bin] Archivos binarios del servidor
                +-[controllers] Controladores
                +-[public]-+ Archivos públicos del servidor
                |          |
                |          +-[css] Hojas de estilo del sitio
                |          +-[img] Imágenes del sitio
                |
                +-[routes] Enrutadores
                +-[src]-+ Archivos fuente del proyecto
                |       |
                |       +-[data] Archivos de datos
                |
                +-[views]-+ Archivos de vistas
                          |
                          +-[partials]-+ Archivos partials para usar en las vistas
                                       |
                                       +-[home] Partials del home
```

Pautas para los commits
-----------------------

Los commits tienen que muy atomizados y funcionales. El resumen debe explicar en
no más de 50 caracteres los cambios realizados. El resúmen debería tener el
siguiente formato:

```
<Zona trabajada>: <Resumen de los cambios>
```

Y deberían contar con una descripción con el siguiente formato:

```
Resumen del comportamiento actual

Resumen de los problemas que trae el comportamiento actual, o resumen de los cambios
discutidos

Resumen y explicacion de los cambios
```

> NOTA: Los cambios deberían ser manejados en ramas independientes y no commitear
directamente en `master`.
