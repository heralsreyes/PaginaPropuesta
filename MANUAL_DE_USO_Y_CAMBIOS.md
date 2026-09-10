# 📘 Manual de Usuario y Bitácora de Cambios — ENFOCO Propuestas B2B

Bienvenido a la guía completa de la plataforma de propuestas comerciales de **ENFOCO, S.R.L.**. En este documento se detallan **todos los cambios, mejoras y correcciones realizadas**, así como las **instrucciones paso a paso** para utilizar cada una de las funcionalidades del sistema.

---

## 📑 Tabla de Contenidos
1. [Resumen Ejecutivo de Cambios Realizados](#1-resumen-ejecutivo-de-cambios-realizados)
   - [Observaciones del 9 de Septiembre (17 Puntos)](#a-observaciones-del-9-de-septiembre)
   - [Corrección de Errores de Hidratación](#b-corrección-de-errores-de-hidratación)
   - [Gestión Dinámica de Alcance y Categorías](#c-gestión-dinámica-de-alcance-y-categorías)
   - [Sistema de Guardado en Servidor/Vercel (Sin descargas obligatorias)](#d-sistema-de-guardado-en-servidorvercel)
   - [Carga Prioritaria y Dinámica de Propuestas por URL](#e-carga-prioritaria-por-url)
   - [Selector de Color de Texto con Confirmación](#f-selector-de-color-de-texto-con-confirmación)
2. [Guía de Uso Paso a Paso](#2-guía-de-uso-paso-a-paso)
   - [Cómo activar el Modo Edición / Studio](#a-cómo-activar-el-modo-edición--studio)
   - [Cómo editar textos en pantalla](#b-cómo-editar-textos-en-pantalla)
   - [Cómo cambiar el color de cualquier texto](#c-cómo-cambiar-el-color-de-cualquier-texto)
   - [Cómo gestionar el Alcance del Proyecto (Categorías y Tarjetas)](#d-cómo-gestionar-el-alcance-del-proyecto)
   - [Cómo Guardar y publicar propuestas en Vercel / Servidor](#e-cómo-guardar-y-publicar-propuestas)
   - [Cómo abrir o compartir una propuesta existente](#f-cómo-abrir-o-compartir-una-propuesta-existente)
   - [Cómo exportar a PDF Ejecutivo](#g-cómo-exportar-a-pdf-ejecutivo)
3. [Tabla de Atajos de Teclado](#3-tabla-de-atajos-de-teclado)

---

## 1. Resumen Ejecutivo de Cambios Realizados

### A. Observaciones del 9 de Septiembre
Se implementó la totalidad de las 17 observaciones requeridas en el documento técnico:
- **Cabeceras y Logotipos**: Ajuste de proporciones, padding y tamaños máximos para que los logos de ENFOCO y del cliente no se deformen ni ocupen espacio excesivo en pantallas medianas y móviles.
- **Gráfico de Inversión y Rendimiento**: Corrección del donut chart y desglose financiero para calcular de forma reactiva los porcentajes y montos basados en las fases seleccionadas.
- **Edición en Línea Universal**: Inclusión del componente `EditableField` en títulos, subtítulos, nombres de módulos, cláusulas contractuales, descripciones de hitos y sellos de aprobación.
- **Sección de Cronograma**: Fases dinámicas con estimación en semanas/meses y fechas automáticas.
- **Sección de Credenciales y Casos de Éxito**: Ajuste en los testimonios, métricas de éxito y logotipos de clientes de referencia.
- **Sección de Cierre y Firma Digital**: Área de firma fehaciente con datos del representante, RNC y checkbox de términos.

### B. Corrección de Errores de Hidratación
- **Problema previo**: Se presentaba una advertencia en consola: `Warning: In HTML, <button> cannot be a descendant of <button>` debido al botón flotante de color incrustado dentro de elementos interactivos.
- **Solución**: Se rediseñó el contenedor de edición en [EditableField.tsx](file:///c:/Enfoco2/PaginaPropuesta/components/ui/EditableField.tsx) utilizando etiquetas semánticas `<span>` con roles de accesibilidad (`role="button"`, `tabIndex={0}`), erradicando las advertencias y garantizando una renderización SSR limpia.

### C. Gestión Dinámica de Alcance y Categorías
- **Edición Directa de Píldoras**: Al hacer clic sobre cualquier pestaña de categoría en la barra superior del Alcance, ahora puedes renombrarla al instante en Modo Diseño.
- **Añadir Nuevas Categorías**: Botón interactivo `+ Categoría` que permite crear grupos nuevos con nombre personalizado.
- **Selector de Categoría por Tarjeta (Dropdown)**: Cada tarjeta de módulo incluye un selector desplegable para asignarla a cualquier categoría existente de forma inmediata.
- **Corrección de Duplicados de Módulos**: Se implementó una función de desduplicación automática que previene la clonación accidental de tarjetas al cambiar entre presets o filtros.

### D. Sistema de Guardado en Servidor/Vercel
- **Problema previo**: Guardar cambios requería descargar obligatoriamente un archivo `.json` al disco duro y reemplazarlo manualmente en la carpeta del proyecto.
- **Solución**:
  - Se implementó el endpoint API `POST /api/proposals` compatible tanto con entornos locales (sistema de archivos) como con entornos cloud (Vercel KV / Blob Storage).
  - Se agregó el botón **"Guardar"** en la barra superior del Studio con un indicador visual del atajo `Ctrl + S`.
  - Se diseñó un modal moderno que solicita el **Nombre de la Propuesta** y su **Identificador de URL (slug)**, permitiendo guardarla directamente en el servidor y generando el enlace de acceso listo para copiar al portapapeles.

### E. Carga Prioritaria por URL
- Al navegar a `http://dominio/?proposal=[slug]`, el sistema ahora consulta primero al API del servidor (`/api/proposals?slug=...`). Si existe una versión personalizada guardada, la carga con máxima prioridad, evitando que el navegador muestre plantillas predeterminadas desactualizadas.

### F. Selector de Color de Texto con Confirmación
- **Problema previo**: Al intentar mover la paleta interactiva o hacer clic en un color, el menú se cerraba instantáneamente y no permitía elegir con calma.
- **Solución**:
  - Se desacopló la selección del cierre de la ventana mediante un estado temporal (`pendingColor`).
  - **Vista previa en vivo**: El texto cambia de color en tiempo real mientras mueves la paleta.
  - **Botón "Aceptar"**: Confirma y persiste el color elegido en `localStorage`.
  - **Botón "Cancelar"**: Descarta la selección y restaura el color anterior.

---

## 2. Guía de Uso Paso a Paso

### A. Cómo activar el Modo Edición / Studio

Tienes 3 alternativas para entrar al modo de edición:
1. **Por Botón en la Barra Superior**:
   - En la esquina superior derecha, haz clic en el botón con icono de pincel o texto **"Studio"**.
2. **Por URL**:
   - Agrega `&admin=true` al final de la URL en tu navegador:
     ```text
     http://localhost:3000/?proposal=grupo-ramos&admin=true
     ```
3. **Por Atajo de Teclado**:
   - Presiona **`Ctrl + Shift + E`** (o `Cmd + Shift + E` en Mac).

---

### B. Cómo editar textos en pantalla

1. Asegúrate de estar en **Modo Studio / Edición**.
2. Pasa el cursor sobre cualquier texto (títulos, descripciones, precios, fechas, etc.). Verás un contorno sutil indicando que es editable.
3. Haz clic directamente sobre el texto y escribe lo que desees.
4. Al hacer clic fuera del texto o presionar Enter, el cambio se registrará automáticamente en tu sesión.

---

### C. Cómo cambiar el color de cualquier texto

1. En **Modo Studio**, pasa el ratón sobre el texto que deseas personalizar.
2. Verás aparecer un pequeño icono flotante de **Paleta de Colores** en la esquina superior derecha del texto.
3. Haz clic sobre el icono de paleta para desplegar el selector:
   - **Botón "Auto"**: Restaura el color predeterminado del tema para ese elemento.
   - **Presets Rápidos**: Elige entre Blanco, Negro, Acento Primario, Acento Secundario, Ámbar, Esmeralda, Azul, Rojo o Plata.
   - **Selector Libre (Color Picker)**: Haz clic en el recuadro de color para abrir la paleta interactiva de tu sistema operativo y mover el selector libremente.
   - **Código Hex**: Puedes escribir directamente el código de color en el recuadro de texto (ej. `#2563EB`).
4. **Verifica la vista previa**: El texto en pantalla reflejará el color en tiempo real.
5. Haz clic en el botón verde **"Aceptar"** para fijar el color. *(Si te arrepientes, haz clic en "Cancelar" o en la 'X')*.

---

### D. Cómo gestionar el Alcance del Proyecto

En la sección **03. Alcance Funcional del Proyecto**:

#### 1. Renombrar una Categoría existente:
- En las píldoras superiores (filtros de categoría), haz clic sobre el nombre de la categoría en modo edición y escribe el nuevo nombre directamente.

#### 2. Crear una nueva Categoría:
- Haz clic en el botón **"+ Categoría"** situado junto a las píldoras de filtro.
- Ingresa el nombre de la nueva categoría y pulsa Aceptar.

#### 3. Cambiar la Categoría de una Tarjeta o Módulo:
- En cada tarjeta de módulo, encontrarás un selector desplegable (dropdown) que indica a qué categoría pertenece actualmente.
- Despliega la lista y selecciona la categoría a la que deseas mover dicho módulo.
- La tarjeta se filtrará automáticamente bajo su nueva categoría asignada.

#### 4. Añadir o eliminar Módulos:
- Utiliza el botón **"+ Agregar Módulo"** para insertar una nueva tarjeta con requerimientos personalizables.
- Para eliminar un módulo, utiliza el icono de papelera visible en el encabezado de la tarjeta en modo edición.

---

### E. Cómo Guardar y publicar propuestas

Para guardar todos los cambios que hayas realizado (textos, colores, módulos, precios, etc.) de forma permanente en el servidor o Vercel:

1. Haz clic en el botón **"Guardar"** en la barra superior derecha del Studio (o pulsa **`Ctrl + S`**).
2. Se abrirá la ventana emergente de guardado:
   - **Nombre de la Propuesta**: Escribe el título formal (ej. `Grupo Ramos - Fase 2`).
   - **Identificador URL (Slug)**: Es el identificador único para el enlace (ej. `grupo-ramos-fase2`).
3. Haz clic en **"Guardar Propuesta"**:
   - El sistema guardará la propuesta en el servidor/Vercel.
   - Te mostrará la **URL permanente** generada y copiará automáticamente el enlace a tu portapapeles.
   - Dispondrás de un botón **"Abrir propuesta"** para verla inmediatamente en una nueva pestaña.
4. *(Opcional)*: La ventana también incluye un botón **"Descargar JSON"** por si deseas conservar una copia local en tu equipo como respaldo.

---

### F. Cómo abrir o compartir una propuesta existente

- Para enviar la propuesta a un cliente en **modo presentación limpio**:
  ```text
  https://tu-dominio.vercel.app/?proposal=[slug-de-la-propuesta]
  ```
  *(El cliente no verá botones de edición, barras laterales ni controles de diseño)*.
- Para abrirla tú directamente en **modo de edición**:
  ```text
  https://tu-dominio.vercel.app/?proposal=[slug-de-la-propuesta]&admin=true
  ```

---

### G. Cómo exportar a PDF Ejecutivo

1. Pulsa el botón **"Imprimir / PDF"** en la barra superior del Studio o presiona **`Ctrl + P`** (o `Cmd + P` en Mac).
2. El sistema activará automáticamente los estilos de impresión empresarial:
   - Se ocultan todos los paneles de edición, botones flotantes y paletas (`.no-print`).
   - Se optimiza el contraste, las fuentes y los saltos de página de cada sección.
3. En la ventana de tu navegador, selecciona:
   - **Destino**: *Guardar como PDF*.
   - **Gráficos de fondo**: *Activado* (para preservar colores y acentos visuales).
4. Haz clic en **Guardar**.

---

## 3. Tabla de Atajos de Teclado

| Atajo (Windows) | Atajo (Mac) | Función |
| :--- | :--- | :--- |
| **`Ctrl + S`** | **`Cmd + S`** | 💾 **Guardar propuesta en servidor / Vercel** (Abre el diálogo de guardado inmediato). |
| **`Ctrl + Shift + E`** | **`Cmd + Shift + E`** | 🎨 **Alternar Modo Studio / Modo Cliente** (Muestra u oculta herramientas de edición). |
| **`Alt + E`** | **`Option + E`** | 🎨 Alternativa rápida para alternar Modo Edición. |
| **`Ctrl + Shift + P`** | **`Cmd + Shift + P`** | ⚙️ **Abrir / Cerrar Drawer de Personalización Global**. |
| **`Ctrl + P`** | **`Cmd + P`** | 📄 **Exportar / Imprimir a PDF Corporativo**. |

---
*Documentación generada para ENFOCO, S.R.L. — Todos los derechos reservados.*
