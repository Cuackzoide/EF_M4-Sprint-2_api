# 📥EF-M3 Proyecto Integrador Sprint 1

## Maquetación y Prototipo Visual del "Buscador de Recetas"

### Historias de Usuario a Implementar

#### HU-01: Interfaz Principal de Búsqueda

**Como usuario que visita el sitio:**

- Quiero ver un encabezado claro y un campo de búsqueda prominente,

- Para entender inmediatamente el propósito de la aplicación y cómo empezar a usarla.

**Criterios de Aceptación:**

[x] La página debe tener un título principal, como "Buscador de Recetas".

[x] Debe existir un formulario que contenga un campo de texto (<input>) con un placeholder descriptivo (ej: "Busca por ingrediente...").

[x] El formulario debe incluir un botón (<button>) con un texto claro (ej: "Buscar").

[x] Los elementos deben estar estilizados usando clases de Bootstrap para form y button.

#### HU-02: Visualización de Recetas de Ejemplo

**Como usuario nuevo:**

- Quiero ver una galería con ejemplos de recetas al cargar la página,

- Para tener una idea de cómo se presentarán los resultados y qué tipo de contenido esperar.

**Criterios de Aceptación:**

[x] Se debe mostrar una sección de resultados debajo del buscador.

[x] Esta sección debe contener entre 3 y 6 tarjetas de recetas escritas directamente en el archivo index.html (hard-codeadas).

[x] Cada tarjeta debe utilizar el componente card de Bootstrap.

[x] Cada tarjeta debe incluir obligatoriamente:

- Una imagen (<img class="card-img-top">).

- Un título (<h5 class="card-title">).

- Un botón o enlace (<a href="#" class="btn btn-primary">).

#### HU-03: Experiencia en Dispositivos Móviles

**Como usuario de smartphone:**

- Quiero que la aplicación se adapte fluidamente a mi pantalla,

- Para poder buscar recetas cómodamente desde cualquier lugar.

**Criterios de Aceptación:**

[x] El diseño debe ser completamente responsivo.

[x] En pantallas grandes (desktop), las tarjetas de recetas deben mostrarse en una grilla (ej: 3 columnas).

[x] En pantallas pequeñas (móviles), las tarjetas deben apilarse verticalmente (1 columna).

[x] El sistema de grillas de Bootstrap (row, col-lg-4, col-md-6, etc.) debe ser utilizado para lograr la responsividad.

### Requisitos Técnicos y Entregables

**Estructura del Proyecto:**

- El código debe estar organizado en tres archivos base:

1.  index.html para la estructura
2.  style.css para estilos personalizados
3.  app.js (que permanecerá vacío, preparando el Sprint 2).

- Frameworks y Librerías:

1. Se debe utilizar Bootstrap 5 como framework principal de CSS.
2. Se permite el uso de un style.css adicional para personalizar detalles finos (colores, fuentes, sombras, etc.).

### Entregable:

Un [repositorio público de GitHub](https://github.com/cuackzoide/EF-M3-SPRINT-1-FRONT-END) que contenga la carpeta del proyecto con los tres archivos.
