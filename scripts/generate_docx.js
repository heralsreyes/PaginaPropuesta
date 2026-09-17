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

// Corporate Palette
const COLOR_PRIMARY = "004F54";      // Deep Teal Enfoco
const COLOR_SECONDARY = "F08D17";    // Gold / Amber
const COLOR_DARK = "0F172A";         // Dark Slate
const COLOR_MUTED = "475569";        // Soft Slate
const COLOR_CARD_BG = "F8FAFC";      // Very light gray
const COLOR_BORDER = "E2E8F0";       // Border gray
const COLOR_WHITE = "FFFFFF";
const COLOR_EMERALD = "059669";      // Green highlight
const COLOR_AMBER = "D97706";

function createHeaderPara(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({
    heading: level,
    spacing: { before: 280, after: 120 },
    children: [
      new TextRun({
        text,
        bold: true,
        font: "Segoe UI",
        size: level === HeadingLevel.HEADING_1 ? 30 : 24,
        color: COLOR_PRIMARY,
      }),
    ],
  });
}

function createSubheaderPara(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 80 },
    children: [
      new TextRun({
        text,
        bold: true,
        font: "Segoe UI",
        size: 22,
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
    spacing: { before: 60, after: 80, line: 280 },
    children,
  });
}

function createCalloutBox(title, text, color = COLOR_EMERALD, bg = "F0FDF4") {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: bg, type: ShadingType.CLEAR },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              left: { style: BorderStyle.SINGLE, size: 24, color: color },
            },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            children: [
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({
                    text: title,
                    bold: true,
                    font: "Segoe UI",
                    size: 22,
                    color: color,
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
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "ENFOCO · Guía Clara de Cambios y Uso",
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
          // TÍTULO DE PORTADA
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 60 },
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
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: "EXPLICACIÓN SENCILLA: QUÉ TENÍA, QUÉ SE HIZO Y CÓMO USARLO",
                bold: true,
                font: "Segoe UI",
                size: 32,
                color: COLOR_PRIMARY,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "Guía práctica en palabras llanas para entender y manejar la plataforma de propuestas web",
                font: "Segoe UI",
                size: 21,
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
                  createTableCell("Versión: Actualizada en Producción (GitHub y Vercel)", false, true),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Objetivo: Explicación sin tecnicismos", false, false),
                  createTableCell("Estado: Todo funcionando y probado", false, false),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 200 } }),

          // PARTE 1: QUÉ TENÍA
          createHeaderPara("1. ¿Qué problemas tenía la página? (Qué tenía)"),
          createBodyPara(
            "Antes de los cambios, al usar la página para preparar o presentar una propuesta a un cliente, se presentaban 5 problemas incómodos:"
          ),

          createBodyPara(
            "En la parte superior izquierda había una cajita con el nombre de ENFOCO y el cliente que se quedaba tapada cuando abrías el menú de edición, o se montaba encima de otros textos. Además, sus colores eran fijos y no combinaban cuando cambiabas los colores de la empresa.",
            "1. El texto de arriba a la izquierda se tapaba o se montaba encima:",
            true
          ),

          createBodyPara(
            "Las cajitas o 'píldoras' de los entregables tenían un tamaño duro. Si querías hacer una cajita más ancha, tenías que darle a un botón que la estiraba de golpe ocupando toda la pantalla sin dejarte elegir el ancho exacto. Y lo peor: no había forma de hacerla más alta si el texto era largo.",
            "2. Las tarjetas de entregables no se podían estirar a tu gusto:",
            true
          ),

          createBodyPara(
            "Cuando intentabas agarrar el borde de la tarjeta para estirarla, el botón rojo de borrar estaba puesto justo encima. Al hacer clic para estirar, terminabas borrando la tarjeta por error.",
            "3. El botón de borrar estaba montado sobre el borde:",
            true
          ),

          createBodyPara(
            "Todos los entregables tenían obligatoriamente un circulito verde con un cotejo (check). Si un punto no necesitaba cotejo, no había ninguna forma de quitárselo.",
            "4. Los cotejos (checks) estaban fijos y no se podían quitar:",
            true
          ),

          createBodyPara(
            "Al mostrarle la propuesta al cliente, en la pantalla se veían los botones de borrar, los bordes de arrastrar y unos cartelitos con números de medidas (como '380w × 55h'). Eso hacía que la propuesta pareciera un borrador sin terminar y no una presentación formal.",
            "5. Se veían botones y números feos frente al cliente:",
            true
          ),

          createBodyPara(
            "Si ajustabas el tamaño de las tarjetas en la propuesta de ARS Primera y luego abrías la de Banco BHD o Claro, los tamaños se cruzaban o se borraban.",
            "6. Los cambios de un cliente se mezclaban con los de otro:",
            true
          ),

          new Paragraph({ spacing: { before: 180 } }),

          // PARTE 2: QUÉ SE HIZO
          createHeaderPara("2. ¿Qué se hizo para resolverlo? (Solución en palabras llanas)"),
          createBodyPara(
            "Se rediseñó la interacción para que sea súper fácil de usar y se vea profesional en todo momento:"
          ),

          createSubheaderPara("A. El texto de arriba ya nunca se monta y cambia de color solo"),
          createBodyPara(
            "Ahora la cajita superior se mueve automáticamente para no chocar con ningún menú. Si estás editando se acomoda sola a la derecha del menú, y si estás en modo cliente se queda centrada. Además, toma de forma automática el nombre del cliente y los colores oficiales de su marca."
          ),

          createSubheaderPara("B. Ahora puedes estirar las tarjetas libremente como una ventana"),
          createBodyPara(
            "A cada tarjeta le pusimos 3 zonas de agarre con el ratón:",
            "Libertad total de tamaño:"
          ),
          createBodyPara("· Borde derecho: La agarras y la estiras a lo ancho (hacia la derecha o izquierda).", "", true),
          createBodyPara("· Borde de abajo: La agarras y la estiras hacia abajo para hacerla más alta.", "", true),
          createBodyPara("· Puntito de la esquina: La agarras y cambias ancho y alto a la misma vez.", "", true),
          createBodyPara("· Si te pasas o quieres que vuelva a su tamaño original: Le das dos clics rápidos (doble clic) y se reinicia sola.", "", true),
          createBodyPara("· Se alejó el botón de borrar: Ahora los botones de borrar y de color están guardados a la derecha del texto, para que nunca los toques sin querer mientras estiras.", "", true),

          createSubheaderPara("C. Los cotejos ahora se pueden quitar con un solo clic"),
          createBodyPara(
            "Si un entregable no lleva cotejo, simplemente le haces un clic al circulito verde y desaparece. Si luego quieres volver a ponerlo, te aparecerá un botón con un signo '+' para restaurarlo al instante."
          ),

          createSubheaderPara("D. Se creó un Modo 'Vista del Cliente' 100% limpio"),
          createBodyPara(
            "Separamos la pantalla en dos modos muy claros:",
            "Dos modos de pantalla:"
          ),
          createBodyPara("· Modo Edición (para ti): Tienes a la vista los bordes para estirar, los botones de borrar, la paleta de colores y las medidas.", "", true),
          createBodyPara("· Modo Vista Ejecutiva (para el cliente): Al presionar una sola tecla (Ctrl + E), se esconden por arte de magia todos los botones de borrar, los bordes de arrastre y los números. El cliente solo ve el documento impecable, elegante y con el tamaño exacto que tú le diste a las tarjetas.", "", true),

          createSubheaderPara("E. Cada propuesta ahora tiene su propia memoria independiente"),
          createBodyPara(
            "Si trabajas en ARS Primera, sus tarjetas y tamaños se quedan guardados para ARS Primera. Si abres Claro, Banco BHD o Excel, cada una carga sus propios textos, colores y medidas sin mezclarse jamás. Además, al guardar en el servidor o descargar el archivo JSON, las medidas de las tarjetas se van dentro del archivo para que nunca se pierdan."
          ),

          new Paragraph({ spacing: { before: 180 } }),

          // PARTE 3: CÓMO FUNCIONA / CÓMO USARLO
          createHeaderPara("3. ¿Cómo funciona en el día a día? (Guía de uso paso a paso)"),
          createBodyPara(
            "Aquí tienes el manual rápido para usar todas las novedades sin enredos:"
          ),

          createSubheaderPara("Paso 1: Cambiar entre modo edición y modo para mostrar al cliente"),
          createBodyPara(
            "Presiona en tu teclado las teclas Ctrl + E (debes tener la tecla Ctrl pisada y darle a la letra E). También puedes usar el botoncito de ojo / pincel arriba a la derecha.",
            "Cómo cambiar de modo:",
            true
          ),
          createBodyPara(
            "Usa el modo edición mientras estés escribiendo o estirando tarjetas. Antes de llamar al cliente, proyectar la pantalla o imprimir en PDF, presiona Ctrl + E para que quede todo limpio.",
            "Cuándo usar cada uno:",
            true
          ),

          createSubheaderPara("Paso 2: Estirar o achicar una tarjeta de entregable"),
          createBodyPara("1. Asegúrate de estar en Modo Edición (si no lo estás, pulsa Ctrl + E).", "", true),
          createBodyPara("2. Baja a la sección de 'Alcance & Funcionalidades Requeridas' y toca cualquier módulo a la izquierda.", "", true),
          createBodyPara("3. En las cajitas de entregables de la derecha:", "", true),
          createBodyPara("   - Para hacerla más ancha: Pon el ratón sobre el borde derecho (la flechita se pondrá doble ↔) y arrastra.", "", true),
          createBodyPara("   - Para hacerla más alta: Pon el ratón sobre el borde inferior (flechita ↕) y arrastra hacia abajo.", "", true),
          createBodyPara("   - Para agrandar todo junto: Arrastra el circulito de la esquina inferior derecha.", "", true),
          createBodyPara("4. Para devolverla a su tamaño original: Dale doble clic encima a la tarjeta.", "", true),

          createSubheaderPara("Paso 3: Quitar o poner un cotejo (check)"),
          createBodyPara("1. Pon el ratón sobre el circulito del cotejo en la tarjeta (verás que sale un ojo tachado).", "", true),
          createBodyPara("2. Hazle un clic y listo, el cotejo se quita de inmediato.", "", true),
          createBodyPara("3. Si quieres volver a ponerlo, haz clic sobre el circulito punteado con el '+'.", "", true),

          createSubheaderPara("Paso 4: Cambiar el estilo de color de una tarjeta"),
          createBodyPara(
            "En la parte derecha de cada tarjeta verás un ícono de una paletita de pintar. Cada vez que le haces clic va cambiando entre 3 estilos: color corporativo llamativo, color dorado secundario, o fondo suave de tarjeta.",
            "Color individual:"
          ),

          createSubheaderPara("Paso 5: Cambiar los colores de la propuesta"),
          createBodyPara(
            "· Para cambiar el color de la cajita de arriba: Haz clic en la paletita que está en la esquina superior izquierda junto al nombre del cliente.",
            "",
            true
          ),
          createBodyPara(
            "· Para cambiar el color del botón 'Aceptar Propuesta': Haz clic en la paletita que está al lado de ese botón arriba a la derecha.",
            "",
            true
          ),
          createBodyPara(
            "· Para cambiar todos los colores generales: Abre el menú de la izquierda, entra a 'Plantillas / Tema' y podrás cambiar el fondo, textos y bordes viendo los cambios en vivo.",
            "",
            true
          ),

          createSubheaderPara("Paso 6: Cambiar de propuesta o cliente"),
          createBodyPara(
            "Abre el menú de la izquierda, entra en 'Archivo / JSON' y dale clic a cualquiera de las empresas (ARS Primera, Excel, Banco BHD, CEPM, Claro, Grupo Ramos). La página cargará al instante los textos, entregables y colores oficiales de esa empresa.",
            "Desde el menú:"
          ),
          createBodyPara(
            "También puedes escribir en la dirección del navegador ?p=ars-primera o ?p=bhd o ?p=claro.",
            "Desde el link:"
          ),

          createSubheaderPara("Paso 7: Guardar los cambios"),
          createBodyPara(
            "En la pestaña 'Archivo / JSON', dale al botón azul '💾 Guardar Propuesta en Servidor'. Esto guarda todo en la nube incluyendo los tamaños personalizados que le diste a las tarjetas. También puedes darle a 'Descargar .json' para tener un respaldo en tu computadora.",
            "Guardar:"
          ),

          new Paragraph({ spacing: { before: 200 } }),

          // PARTE 4: TABLA COMPARATIVA
          createHeaderPara("4. Resumen: Cómo estaba antes vs. Cómo quedó ahora"),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createTableCell("¿Qué parte?", true),
                  createTableCell("Antes (El problema)", true),
                  createTableCell("Ahora (La solución)", true),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Texto arriba a la izquierda", false, false),
                  createTableCell("Se tapaba con el menú y no combinaba con los colores.", false, false),
                  createTableCell("Se acomoda solo en un lugar visible y toma los colores del cliente automáticamente.", false, false),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Tamaño de las tarjetas", false, true),
                  createTableCell("Eran fijas o se estiraban de golpe ocupando toda la pantalla. No se podía cambiar la altura.", false, true),
                  createTableCell("Las puedes estirar con el ratón a lo ancho, a lo alto o por la esquina con total libertad.", false, true),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Botón de borrar tarjeta", false, false),
                  createTableCell("Estaba pegado al borde y lo tocabas sin querer al querer estirar.", false, false),
                  createTableCell("Se movió a un lado seguro para que nunca lo presiones por error.", false, false),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Cotejos (checks)", false, true),
                  createTableCell("Venían obligatorios y no se podían quitar.", false, true),
                  createTableCell("Con 1 clic se quitan y con 1 clic se vuelven a poner si los necesitas.", false, true),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Vista para el cliente", false, false),
                  createTableCell("Se veían botones de borrar y números de medidas que daban mala impresión.", false, false),
                  createTableCell("Pulsas Ctrl + E y se limpia todo al 100%, mostrando un documento pulcro y elegante.", false, false),
                ],
              }),
              new TableRow({
                children: [
                  createTableCell("Cambiar entre clientes", false, true),
                  createTableCell("Los tamaños se mezclaban o se perdían al abrir otra propuesta.", false, true),
                  createTableCell("Cada cliente guarda sus propios tamaños, textos y colores de forma independiente.", false, true),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 200 } }),
          createCalloutBox(
            "Conclusión",
            "La plataforma ahora te da todo el poder para armar la propuesta a tu medida en Modo Edición, y te permite presentarla al cliente de forma impecable y sin distracciones con solo presionar Ctrl + E.",
            COLOR_PRIMARY,
            "F0FDF4"
          ),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outPath = path.join(__dirname, "..", "Informe_de_Cambios_y_Manual_de_Uso.docx");
  fs.writeFileSync(outPath, buffer);
  console.log("Document successfully updated at:", outPath, "Size:", buffer.length, "bytes");
}

generate().catch(console.error);
