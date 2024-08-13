---
title: Configuración
---

El archivo de configuración se encuentra en la raíz del proyecto con el nombre **\_config.yml**

## Idioma

Datos sobre la internacionalización

```
locale: "es-CO"
language: es
```

## Url base

Prefijo de la url del sitio, normalmente es la sigla del producto para los manuales

```
baseurl: /[urlbase]
```

## Sección del portal

Este indica en que sección del portal está alojado el documento y permite ir a la pagina inicial de la sección particular

```
section: [valor]
```

| valor   | nombre          | url                                    |
| ------- | --------------- | -------------------------------------- |
| (vacío) | Manuales        | https://docs.arandasoft.com            |
| notes   | Notas Release   | https://docs.arandasoft.com/notes.html |
| ts      | Troubleshooting | https://docs.arandasoft.com/ts.html    |
| api     | APIs            | https://docs.arandasoft.com/apis.html  |
