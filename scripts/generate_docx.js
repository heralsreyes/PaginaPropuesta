const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
  Header,
  Footer,
  PageNumber,
} = require("docx");
const fs = require("fs");
const path = require("path");

// Colors
const COLOR_PRIMARY = "004F54";      // Deep Teal Enfoco
const COLOR_SECONDARY = "F08D17";    // Gold / Amber Accent
const COLOR_DARK = "0F172A";         // Slate 900
const COLOR_MUTED = "475569";        // Slate 600
const COLOR_BG_LIGHT = "F8FAFC";     // Slate 50
const COLOR_CARD_BG = "F1F5F9";      // Slate 100
const COLOR_BORDER = "CBD5E1";       // Slate 300
const COLOR_WHITE = "FFFFFF";
const COLOR_EMERALD = "059669";

function createHeaderPara(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({
    heading: level,
    spacing: { before: 280, after: 140 },
    children: [
      new TextRun({
        text,
        bold: true,
        font: "Segoe UI",
        size: level === HeadingLevel.HEADING_1 ? 32 : level === HeadingLevel.HEADING_2 ? 26 : 22,
        color: COLOR_PRIMARY,
      }),
    ],
  });
}

function createSubheaderPara(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 220, after: 100 },
    children: [
      new TextRun({
        text,
        bold: true,
        font: "Segoe UI",
        size: 24,
        color: COLOR_SECONDARY,
      }),
    ],
  });
}

function createBodyPara(text, boldPrefix = "", isBullet = false) {
  const children = [];
  if (boldPrefix) {
    children.push(
      new TextRun({
        text: boldPrefix + " ",
        bold: true,
        font: "Segoe UI",
        size: 21,
        color: COLOR_DARK,
      })
    );
  }
  children.push(
    new TextRun({
      text,
      font: "Segoe UI",
      size: 21,
      color: COLOR_MUTED,
    })
  );

  return new Paragraph({
    bullet: isBullet ? { level: 0 } : undefined,
    spacing: { before: 60, after: 80, line: 276 },
    children,
  });
}

function createCalloutBox(title, text) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: "F0FDF4", type: ShadingType.CLEAR },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              left: { style: BorderStyle.SINGLE, size: 24, color: COLOR_EMERALD },
            },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            children: [
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({
                    text: "💡 " + title,
                    bold: true,
                    font: "Segoe UI",
                    size: 22,
                    color: COLOR_EMERALD,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text,
                    font: "Segoe UI",
                    size: 20,
                    color: COLOR_DARK,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function createTableCell(text, isHeader = false, isAlt = false, colSpan = 1) {
  return new TableCell({
    columnSpan: colSpan,
    shading: {
      fill: isHeader ? COLOR_PRIMARY : isAlt ? COLOR_CARD_BG : COLOR_WHITE,
      type: ShadingType.CLEAR,
    },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
      left: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
      right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
    },
    margins: { top: 100, bottom: 100, left: 120, right: 120 },
    children: [
      new Paragraph({
        alignment: isHeader ? AlignmentType.CENTER : AlignmentType.LEFT,
        children: [
          new TextRun({
            text,
            bold: isHeader,
            font: "Segoe UI",
            size: isHeader ? 20 : 19,
            color: isHeader ? COLOR_WHITE : COLOR_DARK,
          }),
        ],
      }),
    ],
  });
}

async function generate() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: "Segoe UI", color: COLOR_DARK },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }, // 1 inch
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "ENFOCO, S.R.L. · Informe Técnico de Mejoras y Manual de Uso",
                    font: "Segoe UI",
                    size: 16,
                    color: COLOR_MUTED,
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "Página ",
                    font: "Segoe UI",
                    size: 18,
                    color: COLOR_MUTED,
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    font: "Segoe UI",
                    size: 18,
                    bold: true,
                    color: COLOR_PRIMARY,
                  }),
                  new TextRun({
                    text: " de ",
                    font: "Segoe UI",
                    size: 18,
                    color: COLOR_MUTED,
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    font: "Segoe UI",
                    size: 18,
                    color: COLOR_MUTED,
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          // PORTADA / TÍTULO PRINCIPAL
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 80 },
            children: [
              new TextRun({
                text: "ENFOCO, S.R.L.",
                bold: true,
                font: "Segoe UI",
                size: 26,
                color: COLOR_SECONDARY,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: "INFORME TÉCNICO DE MEJORAS & MANUAL DE USO",
                bold: true,
                font: "Segoe UI",
                size: 36,
                color: COLOR_PRIMARY,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 },
            children: [
              new TextRun({
                text: "Plataforma Web de Propuestas Comerciales y Presentaciones Ejecutivas",
                font: "Segoe UI",
                size: 22,
                color: COLOR_MUTED,
                italics: true,
              }),
            ],
          }),

          // Metadata Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createTableCell("Fecha: 17 de Septiembre, 2026", false, true),
                  createTableCell("Versión: 2.5 (Producción & Vercel)", false, true),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Repositorio: heralsreyes/PaginaPropuesta", false, false),
                  createTableCell("Estado: Aprobado, Compilado y Desplegado", false, false),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 240 } }),

          // SECCIÓN 1: RESUMEN EJECUTIVO
          createHeaderPara("1. Resumen Ejecutivo y Alcance del Trabajo"),
          createBodyPara(
            "El presente documento detalla la resolución de todos los requerimientos especificados para la plataforma web de propuestas comerciales de ENFOCO, con especial énfasis en la ergonomía de edición visual, la presentación ejecutiva impecable para clientes y la compatibilidad universal entre diferentes propuestas institucionales."
          ),
          createBodyPara(
            "Superposición de textos en la cabecera / badge superior resuelto, estiramiento 2D interactivo (horizontal y vertical) en las píldoras de entregables, control granular para remover o restaurar íconos de cotejo, ocultamiento estricto de controles en Vista Ejecutiva y persistencia independiente por propuesta.",
            "Aspectos Clave Atendidos:"
          ),

          new Paragraph({ spacing: { before: 120 } }),
          createCalloutBox(
            "Objetivo Logrado",
            "La plataforma ahora ofrece una experiencia de edición rica e intuitiva en Modo Diseño (Design Studio) y, al mismo tiempo, una visualización ejecutiva 100% limpia para clientes institucionales (ARS Primera, Excel, Banco BHD, CEPM, Claro, Grupo Ramos, etc.), conservando siempre las proporciones personalizadas y la paleta corporativa correspondiente."
          ),

          // SECCIÓN 2: DETALLE DE SOLUCIONES IMPLEMENTADAS
          createHeaderPara("2. Detalle de Soluciones Técnicas Implementadas"),

          createSubheaderPara("2.1 Corrección de Superposición en Cabecera e Integración con la Paleta"),
          createBodyPara(
            "El componente NavBrandHeader (badge superior izquierdo) colisionaba con los paneles de herramientas o se superponía con textos largos en ciertas resoluciones de pantalla.",
            "Problema previo:"
          ),
          createBodyPara(
            "Se implementó un posicionamiento inteligente reactivo: en Modo Diseño se ubica respetando la barra superior y el panel lateral izquierdo (left: 396px con panel abierto, 88px con panel cerrado); en Modo Vista Ejecutiva se posiciona flotante centrado de forma sutil.",
            "Solución técnica:"
          ),
          createBodyPara(
            "Tanto el badge como el botón 'Aceptar Propuesta' leen directamente las variables CSS de la paleta corporativa activa (--nav-bg, --secondary-accent, --card-border, --theme-h1). En Modo Diseño cuentan con selectores de color rápidos para ajustes inmediatos a 120 fps.",
            "Reactividad de color:"
          ),

          createSubheaderPara("2.2 Píldoras de Entregables con Redimensionamiento 2D Interactivo"),
          createBodyPara(
            "Se solicitaba que las tarjetas de entregables individuales dentro del módulo de alcance (ScopeSection) pudieran estirarse tanto a lo ancho como a lo alto mediante arrastre con el ratón o tacto, sin que los botones de eliminar o estirar obstruyeran la interacción.",
            "Requerimiento:"
          ),
          createBodyPara(
            "Borde derecho (cursor-ew-resize) para ensanchar de 160px a 1400px.",
            "1. Tirador Horizontal:",
            true
          ),
          createBodyPara(
            "Borde inferior (cursor-ns-resize) para estirar la altura de 42px a 600px.",
            "2. Tirador Vertical:",
            true
          ),
          createBodyPara(
            "Círculo en esquina inferior derecha (cursor-se-resize) para estirar alto y ancho simultáneamente.",
            "3. Tirador Bidimensional (Esquina SE):",
            true
          ),
          createBodyPara(
            "Doble clic sobre la píldora restablece inmediatamente el tamaño predeterminado.",
            "4. Atajo de Restauración:",
            true
          ),
          createBodyPara(
            "Los botones de acción (paleta cromática, maximizar y eliminar) se movieron a un contenedor seguro en el extremo derecho, evitando cualquier conflicto con los tiradores de arrastre.",
            "5. Reubicación de Botones:",
            true
          ),

          createSubheaderPara("2.3 Íconos de Cotejo (Checkmarks) Removibles"),
          createBodyPara(
            "Se habilitó la capacidad de retirar o restaurar individualmente el ícono de cotejo en cada píldora de entregable y en las historias de usuario. En Modo Diseño, un clic sobre el ícono lo oculta y muestra un indicador sutil para restaurarlo. En Vista Ejecutiva solo se muestran los cotejos activos de manera nítida.",
            "Funcionalidad:"
          ),

          createSubheaderPara("2.4 Modo Vista Ejecutiva 100% Limpio"),
          createBodyPara(
            "Todos los controles de edición —barras de arrastre, etiquetas de medidas numéricas (ej. 380w × 55h), botones de eliminar recuadro, botones de paleta y controles de estirar— están estrictamente condicionados a {isDesignMode && ...}. En Vista Ejecutiva el cliente visualiza un documento pulcro con estándares de diseño editorial.",
            "Garantía de Calidad:"
          ),

          createSubheaderPara("2.5 Persistencia Universal y Aislamiento por Propuesta"),
          createBodyPara(
            "Se aisló todo el almacenamiento bajo el slug de la propuesta activa (currentSlug). Propuestas como ARS Primera, Banco BHD o Excel conservan sus propios tamaños de píldoras y configuraciones sin interferir entre sí. Además, al guardar en el servidor (/api/proposals) o exportar en JSON, la configuración scopePillsConfig se almacena dentro del archivo.",
            "Arquitectura Multi-Propuesta:"
          ),

          new Paragraph({ spacing: { before: 200 } }),

          // SECCIÓN 3: MANUAL DE USO PASO A PASO
          createHeaderPara("3. Manual de Uso Paso a Paso"),

          createSubheaderPara("3.1 Alternar entre Modo Diseño y Modo Vista Ejecutiva"),
          createBodyPara(
            "Presione en el teclado Ctrl + E (o Ctrl + Shift + E / Alt + E) para alternar al instante entre el modo de edición y la vista ejecutiva del cliente.",
            "Atajo Rápido:",
            true
          ),
          createBodyPara(
            "Haga clic en el botón con el ícono de ojo / pincel ubicado en la esquina superior derecha de la pantalla.",
            "Botón en Pantalla:",
            true
          ),

          createSubheaderPara("3.2 Cómo Estirar y Redimensionar las Píldoras de Entregables"),
          createBodyPara("1. Ingrese en Modo Diseño (Ctrl + E).", "", true),
          createBodyPara("2. Desplácese a la sección 'Alcance & Funcionalidades Requeridas' (#alcance).", "", true),
          createBodyPara("3. Seleccione un módulo de la lista izquierda para inspeccionarlo.", "", true),
          createBodyPara("4. En el panel de entregables a la derecha:", "", true),
          createBodyPara(
            "Pase el ratón sobre el borde derecho de la píldora (aparece una barra iluminada con cursor ↔) y arrastre hacia la derecha o izquierda.",
            "· Para estirar horizontalmente:",
            true
          ),
          createBodyPara(
            "Pase el ratón sobre el borde inferior (cursor ↕) y arrastre hacia abajo.",
            "· Para estirar verticalmente:",
            true
          ),
          createBodyPara(
            "Arrastre el círculo ubicado en la esquina inferior derecha (cursor ⤡).",
            "· Para estirar ambas dimensiones a la vez:",
            true
          ),
          createBodyPara("5. Para restablecer las medidas originales: Haga doble clic sobre la píldora.", "", true),

          createSubheaderPara("3.3 Cómo Ocultar o Restaurar los Íconos de Cotejo"),
          createBodyPara("1. En Modo Diseño, pase el ratón sobre el ícono de cotejo (verá que cambia a un ícono de ojo tachado).", "", true),
          createBodyPara("2. Haga clic sobre él para retirarlo.", "", true),
          createBodyPara("3. Para volver a colocarlo, haga clic en el botón circular punteado '+'.", "", true),

          createSubheaderPara("3.4 Cómo Cambiar el Estilo Cromático de una Píldora"),
          createBodyPara(
            "En Modo Diseño, haga clic en el botón con el ícono de Paleta ubicado en el extremo derecho de la píldora para rotar entre los 3 estilos disponibles: Primaria (acento corporativo), Secundaria (acento secundario/dorado) o Sutil (fondo neutro de tarjeta).",
            "Instrucción:"
          ),

          createSubheaderPara("3.5 Cómo Ajustar la Paleta de Colores Institucional"),
          createBodyPara(
            "Haga clic en el ícono de paleta junto al nombre del cliente para cambiar el color de fondo del badge (navBg). Junto a 'Aceptar Propuesta', haga clic en el ícono de paleta para cambiar el color del botón (secondaryAccent).",
            "· Desde la Cabecera:",
            true
          ),
          createBodyPara(
            "En la pestaña 'Plantillas / Identidad y Tema', modifique en vivo el fondo principal, titulares H1/H2, colores de acento, bordes y fondo de cabecera.",
            "· Desde el Panel Lateral:",
            true
          ),

          createSubheaderPara("3.6 Cómo Cambiar de Propuesta"),
          createBodyPara(
            "En la barra lateral, abra la pestaña 'Archivo / JSON' y seleccione cualquiera de las plantillas institucionales (ARS Primera, Excel, Banco BHD, CEPM, Claro, Grupo Ramos).",
            "· Desde el Estudio:",
            true
          ),
          createBodyPara(
            "Agregue ?p=nombre-propuesta en la URL del navegador (ej. ?p=ars-primera, ?p=bhd, ?p=claro).",
            "· Mediante URL:",
            true
          ),

          createSubheaderPara("3.7 Cómo Guardar y Exportar la Propuesta"),
          createBodyPara(
            "En la pestaña 'Archivo / JSON', escriba el nombre y pulse '💾 Guardar Propuesta en Servidor'. Todas las medidas 2D y cambios se guardan directamente en el servidor.",
            "· Guardar en Servidor / Vercel:",
            true
          ),
          createBodyPara(
            "Pulse 'Descargar .json' para guardar un archivo de respaldo completo en su computador.",
            "· Descargar Archivo JSON:",
            true
          ),
          createBodyPara(
            "Pulse 'Imprimir o Guardar como PDF Oficial' para generar el documento final listo para enviar o imprimir.",
            "· Exportar a PDF:",
            true
          ),

          new Paragraph({ spacing: { before: 200 } }),

          // SECCIÓN 4: TABLA COMPARATIVA
          createHeaderPara("4. Tabla Comparativa: Antes vs. Después"),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createTableCell("Característica / Funcionalidad", true),
                  createTableCell("Comportamiento Anterior", true),
                  createTableCell("Comportamiento Actual (Optimizado)", true),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Cabecera Superior Izquierda", false, false),
                  createTableCell("Texto montado sobre barra lateral; colores fijos sin conexión a paleta.", false, false),
                  createTableCell("Posicionamiento dinámico responsivo; reacciona a variables CSS corporativas y muestra marcas reales.", false, false),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Tamaño de Entregables (Píldoras)", false, true),
                  createTableCell("Solo ancho fijo de 1 columna o 2 columnas; botón de borrar colisionaba con botón de estirar.", false, true),
                  createTableCell("Estiramiento 2D continuo (horizontal, vertical y esquina); botones reubicados; doble clic para restaurar.", false, true),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Íconos de Cotejo (Checkmarks)", false, false),
                  createTableCell("Fijos y obligatorios en todos los entregables.", false, false),
                  createTableCell("Removibles individualmente en Modo Diseño con 1 clic; restaurables mediante botón punteado '+'.", false, false),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Modo Vista Ejecutiva", false, true),
                  createTableCell("Se mostraban botones de edición, etiquetas numéricas y tiradores molestos.", false, true),
                  createTableCell("100% limpio sin tiradores, etiquetas ni botones de edición; presentación directiva perfecta.", false, true),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Persistencia Multi-Propuesta", false, false),
                  createTableCell("Claves globales que cruzaban medidas entre propuestas distintas; no se guardaban en JSON.", false, false),
                  createTableCell("Aislamiento completo por slug; guardado nativo en servidor /api/proposals y en archivo .json.", false, false),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 240 } }),

          // SECCIÓN 5: DESPLIEGUE EN VERCEL
          createHeaderPara("5. Despliegue y Sincronización"),
          createBodyPara(
            "El repositorio se encuentra alojado en GitHub en la rama principal (main). Cada actualización enviada a este repositorio activa automáticamente el pipeline de compilación e integración continua (CI/CD) de Vercel.",
            "Pipeline Automatizado:"
          ),
          createBodyPara(
            "https://github.com/heralsreyes/PaginaPropuesta.git",
            "· Repositorio GitHub:",
            true
          ),
          createBodyPara(
            "0d74908 (Sincronizado y verificado)",
            "· Commit de Producción:",
            true
          ),
          createBodyPara(
            "Compilación Next.js validada con npx tsc --noEmit (0 errores de tipos).",
            "· Verificación de Tipos:",
            true
          ),

          new Paragraph({ spacing: { before: 180 } }),
          createCalloutBox(
            "Documentación y Soporte",
            "Para cualquier consulta sobre el código fuente, la arquitectura modular o la integración con nuevas plantillas institucionales, consulte el repositorio oficial en GitHub o los archivos de configuración en /context/ProposalContext.tsx y /components/ScopeSection.tsx."
          ),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outPath = path.join(__dirname, "..", "Informe_de_Cambios_y_Manual_de_Uso.docx");
  fs.writeFileSync(outPath, buffer);
  console.log("Document successfully created at:", outPath, "Size:", buffer.length, "bytes");
}

generate().catch(console.error);
