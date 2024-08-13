---
title: Barra lateral
---

La barra lateral _sidebar_ se puede configurar en el archivo _\_data/sidebar.yml_

Debe iniciar con el elemento **docs** que es el valor por defecto y contendrá el arreglo de capítulos de la documentación que se está desarrollando.

Cada capitulo o elemento de la lista debe contener las siguientes propiedades:

-   **chapter**: Identificador de capítulo. Este es usado para organizar los elementos de la barra lateral en grupos, este nombre debe ser único en el documento.

-   **title**: Titulo. Es el nombre del capítulo que se muestra en la barra lateral.

-   **pages**: Páginas, Es un arreglo con las páginas que contiene el capitulo, se especifican en el orden que se debe incluir en la barra lateral y la ruta debe usar el carácter **/** como separador de carpetas

-   **children**: Capítulos anidados (opcional).
    Es posible agregar capítulos en niveles anidados, para ello agregar la lista de sub capítulos.

Ejemplo: **\_data/sidebar.yml**

```
docs:
  - chapter: Instalación
      title: Instalación
      pages:
        - docs/instalacion/inicio.md
        - docs/instalacion/instalacion.md
        - docs/instalacion/configuracion.md
      children:
        - chapter: level_2_1
          title: Nivel 2.1
          pages:
            - docs/multilevel/level2.1A.md
          children:
            - chapter: level_2_1_1
              title: Nivel 2.1.1
              pages:
                - docs/multilevel/level2.1.1A.md
```

## Ordenamiento automático (Obsoleto)

Para que la barra lateral se organice de forma _automática_, cada archivo de la documentación debe contener el identificador del capítulo en el cual debe aparecer, esta forma tiene la desventaja que no es posible indicar el orden en el cual aparece dentro del menú, por lo tanto el orden dentro del menu es alfabético

Ejemplo: **docs/uso/inicio.md**

```
---
title: "Introducción"
chapter: "Uso"
---
```
