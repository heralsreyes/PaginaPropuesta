# 📘 Manual de Uso y Registro de Mejoras — Propuesta Web ENFOCO

Este documento detalla todas las mejoras implementadas, los problemas resueltos y la guía paso a paso para utilizar las nuevas capacidades de la plataforma.

---

## 📋 Parte 1: Resumen de lo Resuelto

### 1. Corrección de Textos Superpuestos en Cabecera
- **Problema previo**: El texto de la marca y cliente en la esquina superior izquierda colisionaba o quedaba superpuesto con la barra lateral o elementos del diseño, y no adoptaba los colores de la paleta.
- **Solución implementada**:
  - Se rediseñó el componente `NavBrandHeader.tsx` con posicionamiento inteligente:
    - En **Modo Diseño**: se ubica respetando la barra superior y el panel lateral (`left-[396px]` con panel abierto, `left-[88px]` con panel cerrado).
    - En **Modo Vista Ejecutiva**: se coloca de forma flotante y centrada (`fixed top-4 left-4 right-4`).
  - Muestra dinámicamente el nombre del proveedor (`ENFOCO`) y del cliente actual en tipografía legible y de alto contraste.
  - El botón derecho **"Aceptar Propuesta"** y el badge del header están 100% integrados con las variables CSS de la paleta institucional (`var(--nav-bg)`, `var(--secondary-accent)`, `var(--card-border)`).

### 2. Píldoras de Entregables con Tamaño Personalizado 2D
- **Problema previo**: Se requería estirar las tarjetas/píldoras de los entregables individuales arrastrando sus bordes tanto horizontal como verticalmente, sin que los botones de borrar interfirieran con los controles de arrastre.
- **Solución implementada en `ScopeSection.tsx`**:
  - Se añadieron 3 tiradores interactivos de arrastre:
    1. **Borde derecho (`cursor-ew-resize`)**: Estira el ancho horizontal de la píldora (160px a 1400px).
    2. **Borde inferior (`cursor-ns-resize`)**: Estira la altura vertical de la píldora (42px a 600px).
    3. **Esquina sureste (`cursor-se-resize`)**: Estira simultáneamente ancho y alto con precisión milimétrica.
  - Se reubicaron los botones de acción (cambiar color, maximizar y borrar) en una zona segura a la derecha del contenido para evitar clics accidentales mientras se arrastra.
  - Se agregó soporte para restablecer las dimensiones originales con **doble clic** o mediante el botón de restaurar.

### 3. Íconos de Cotejo Removibles y Alternables
- En cada píldora de entregable, el ícono de cotejo (check circular) ahora es interactivo en Modo Diseño:
  - Al hacer clic sobre el ícono de cotejo, se oculta inmediatamente.
  - Aparece un botón punteado sutil que permite volver a colocar el ícono cuando sea necesario.
  - En la sección de historias de usuario (`ResponsibilitiesSection.tsx`), también se pueden alternar o retirar cotejos de forma individual o grupal.

### 4. Modo Vista Ejecutiva 100% Limpio
- **Problema previo**: Los tiradores de arrastre, botones de borrado, controles de paleta y etiquetas numéricas de dimensiones no debían verse en la presentación para el cliente o evaluador directivo.
- **Solución implementada**:
  - Todos los tiradores de redimensionamiento, etiquetas de medidas (`380w × 55h`), botones de paleta, maximizar y borrar están estrictamente condicionados al Modo Diseño (`isDesignMode`).
  - En **Modo Vista Ejecutiva**, el documento luce impecable, con tipografía editorial nítida y las dimensiones personalizadas conservadas sin ningún artefacto de edición.

### 5. Compatibilidad Universal en Cualquier Propuesta
- **Problema previo**: Los cambios debían aplicarse y recordarse independientemente en cualquier propuesta que se esté editando (`ars-primera`, `excel-puesto-de-bolsa`, `bhd`, `cepm`, `claro`, `grupo-ramos`, o propuestas importadas vía JSON).
- **Solución implementada (`ProposalContext.tsx`)**:
  - **Aislamiento por Slug**: Las medidas 2D, entregables estirados, cotejos ocultos y variantes se guardan con prefijo de slug (`scope_pill_custom_sizes_${currentSlug}`).
  - **Persistencia en Servidor y JSON**: `saveProposalToServer` y `exportJson` ahora incluyen `scopePillsConfig`. Al guardar en el servidor o descargar el JSON, las dimensiones y ajustes de entregables quedan guardados dentro del archivo.
  - **Auto-Selección de Módulos**: Al cambiar a una propuesta con diferentes módulos, el sistema selecciona automáticamente el primer módulo válido para evitar vistas en blanco.
  - **Paleta por Propuesta**: Al cargar cualquier propuesta, se extrae y aplica automáticamente su paleta corporativa característica.

---

## 🚀 Parte 2: Guía de Uso Paso a Paso

### 1. Alternar entre Modo Diseño y Modo Vista Ejecutiva
Para alternar entre el modo de edición y la vista limpia para el cliente:
- **Atajo de Teclado**: Presiona **`Ctrl + E`** (o **`Ctrl + Shift + E`** / **`Alt + E`**).
- **Desde la Barra Superior**: Haz clic en el botón con ícono de ojo / pincel en la parte superior derecha.
- **Comportamiento**:
  - 🎨 **Modo Diseño**: Muestra los tiradores de arrastre en las píldoras, selectores de color, botones de edición y la barra lateral de configuración.
  - 👔 **Modo Vista Ejecutiva**: Oculta todos los controles de edición y presenta el documento final con sus proporciones personalizadas.

---

### 2. Cómo Estirar y Redimensionar las Píldoras de Entregables
1. Entra en **Modo Diseño** (`Ctrl + E`).
2. Desplázate a la sección **Alcance & Funcionalidades Requeridas** (`#alcance`).
3. Selecciona un módulo en la lista izquierda.
4. En el panel derecho de entregables:
   - **Para estirar horizontalmente**: Pasa el cursor sobre el **borde derecho** de la píldora (aparece una barra de acento con cursor `↔`) y arrastra hacia la derecha o izquierda.
   - **Para estirar verticalmente**: Pasa el cursor sobre el **borde inferior** de la píldora (aparece una barra horizontal con cursor `↕`) y arrastra hacia abajo.
   - **Para estirar ambas dimensiones a la vez**: Arrastra el **círculo ubicado en la esquina inferior derecha** (cursor `⤡`).
   - Durante el arrastre, una etiqueta mostrará las medidas en tiempo real (ej. `450w × 70h`).
5. **Para volver al tamaño normal**: Haz **doble clic** sobre la píldora o presiona el botón de minimizar en la parte derecha de la píldora.

---

### 3. Cómo Quitar o Restaurar los Íconos de Cotejo
1. Asegúrate de estar en **Modo Diseño** (`Ctrl + E`).
2. Pasa el cursor sobre el ícono de cotejo (check circular) del entregable.
3. Notarás que cambia a un ícono de ojo tachado (`EyeOff`); haz clic sobre él para retirarlo.
4. Para restaurarlo, haz clic sobre el botón circular punteado con el signo `+`.

---

### 4. Cómo Cambiar el Estilo Cromático de una Píldora
Cada entregable puede tener un estilo visual independiente:
- En Modo Diseño, pulsa el ícono de **Paleta (`Palette`)** en la píldora para rotar entre tres estilos:
  - **Primaria**: Color de acento principal corporativo.
  - **Secundaria**: Color de acento dorado/secundario.
  - **Sutil**: Fondo neutro de tarjeta con borde fino.

---

### 5. Cómo Ajustar la Paleta de Colores Institucional
Existen dos formas rápidas de ajustar los colores:
- **Desde el Badge del Header**:
  - En la esquina superior izquierda, haz clic en el ícono de paleta junto al nombre del cliente para cambiar el color de fondo del badge (`navBg`).
  - Junto al botón **"Aceptar Propuesta"**, haz clic en el ícono de paleta para cambiar el color del botón (`secondaryAccent`).
- **Desde la Barra Lateral del Studio**:
  - Abre el panel lateral del Studio y ve a la pestaña **Plantillas / Identidad y Tema**.
  - Podrás modificar con vista previa en tiempo real (120 fps):
    - Color Principal (Fondo)
    - Titulares Principales (H1)
    - Subtítulos (H2)
    - Color de Acento Principal
    - Color de Acento Secundario
    - Fondo de Cabecera / Badge (Header) (`navBg`)
    - Fondo y Bordes de Tarjetas

---

### 6. Cómo Cambiar o Cargar Otra Propuesta
- **Desde la Barra Lateral del Studio (Pestaña JSON / Archivo)**:
  - En la sección **Carga Rápida de Propuestas**, haz clic en cualquiera de las plantillas oficiales:
    - 🏥 **ARS Primera**
    - 📈 **Excel Puesto de Bolsa**
    - 🏦 **Banco BHD**
    - ⚡ **CEPM**
    - 📱 **Claro**
    - 🛒 **Grupo Ramos**
  - El sistema cargará los datos, su paleta de colores institucional y la configuración de entregables correspondiente.
- **Mediante URL**:
  - Agrega el parámetro `?p=` o `?proposal=` en el navegador:
    - `https://tu-dominio.vercel.app/?p=ars-primera`
    - `https://tu-dominio.vercel.app/?p=bhd`
    - `https://tu-dominio.vercel.app/?p=claro`

---

### 7. Cómo Guardar Cambios en Servidor o Exportar
En la pestaña **Archivo / JSON** de la barra lateral:
1. **Guardar en Servidor / Vercel**:
   - Ingresa el nombre del archivo (ej. `mi-propuesta`).
   - Presiona **"💾 Guardar Propuesta en Servidor"**. Los cambios (incluyendo los tamaños 2D de las píldoras) se guardan directamente en `/public/proposals/[nombre].json`.
2. **Descargar .json**:
   - Pulsa **"Descargar .json"** para guardar una copia de respaldo en tu computadora con todos los módulos, temas y dimensiones de entregables.
3. **Cargar .json**:
   - Pulsa **"Cargar .json"** para restaurar una propuesta guardada anteriormente.
4. **Imprimir / Exportar a PDF**:
   - Pulsa **"Imprimir o Guardar como PDF Oficial"** para generar la versión impresa ejecutiva.

---

## 🌐 Parte 3: Despliegue en Vercel

El repositorio está vinculado al proyecto en Vercel con integración continua (`CI/CD`).
- Cada vez que se hace `git push` a la rama `main` en GitHub, Vercel detecta automáticamente el commit, ejecuta la compilación de producción de Next.js (`npm run build`) y despliega la nueva versión en la URL pública en menos de 2 minutos.
