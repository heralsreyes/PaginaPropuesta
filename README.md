# 🏢 ENFOCO — Plataforma de Propuestas Comerciales B2B & Design Studio

Plataforma web de última generación desarrollada para **ENFOCO, S.R.L.**, diseñada para la creación, personalización interactiva, presentación ejecutiva y firma digital fehaciente de propuestas comerciales B2B enterprise (Desarrollo Web, Aplicaciones Móviles e Integraciones con Dynamics CRM & SIFI Fondos para el mercado de valores SIMV).

---

## 🎛️ Guía de Acceso: Cómo Entrar a los Distintos Modos

La plataforma cuenta con 3 modos principales diseñados para diferentes audiencias (clientes, diseñadores/comerciales y evaluadores):

### 1. 👔 Modo Cliente / Vista Ejecutiva (Presentación Oficial)
Es el modo predeterminado para entregar al cliente final o inversionistas. Está optimizado para una lectura corporativa impecable, libre de barras de edición, bordes de diseño o botones de depuración.

- **Cómo acceder mediante URL**:
  ```text
  http://localhost:3000/?proposal=excel-puesto-de-bolsa
  ```
  *(O simplemente ingresando a la URL base `http://localhost:3000/`)*.
- **Cómo acceder desde la interfaz**:
  - Si te encuentras en el Studio, haz clic en el botón superior **"Modo Cliente"** o **"Vista Previa"** para ocultar todas las herramientas de edición y verificar la experiencia exacta que verá el cliente.

---

### 2. 🎨 Modo Edición / Visual Design Studio (Administrador & Maquetación)
Activa el motor de edición interactiva tipo Canva / Figma, permitiendo modificar textos in-situ, arrastrar y soltar nuevas formas, botones, tarjetas, subir imágenes locales y vincular acciones interactivas.

- **Cómo acceder mediante URL**:
  ```text
  http://localhost:3000/?proposal=excel-puesto-de-bolsa&admin=true
  ```
  *(El parámetro `&admin=true` habilita de inmediato el panel lateral y el inspector flotante)*.
- **Cómo acceder desde la interfaz**:
  - En la barra superior de navegación, haz clic en el botón **"Studio"** o el icono de **Ajustes / Pincel** para conmutar el modo de diseño en tiempo real sin recargar la página.

---

### 3. 📄 Modo Impresión & Descarga PDF
Diseñado para generar una copia física o exportar un documento PDF de alta fidelidad sin elementos interactivos de la interfaz web.

- **Cómo acceder**:
  - Haz clic en el botón **"Descargar PDF"** situado en la barra superior de navegación.
  - O utiliza el atajo universal del navegador: `Ctrl + P` (Windows) o `Cmd + P` (Mac).
- **Características**:
  - Oculta automáticamente barras de navegación, botones flotantes y herramientas (`.no-print`).
  - Ajusta los saltos de página y colores para impresión ejecutiva limpia.

---

### 4. 🏢 Carga de Propuestas Comerciales Específicas
Puedes cargar propuestas personalizadas para diferentes clientes corporativos utilizando el parámetro `proposal`:

```text
http://localhost:3000/?proposal=excel-puesto-de-bolsa
```

---

## 📑 Las 12 Secciones Modulares Integradas

1. **01. Presentación Ejecutiva Institucional**: Banner de co-branding (ENFOCO & Excel Puesto de Bolsa / ESAFI), propuesta de valor, objetivos estratégicos y accesos rápidos.
2. **02. Arquitectura de Valor & Ecosistema 24/7**: Tarjetas interactivas de autogestión de inversionistas, automatización de procesos y cumplimiento regulatorio SIMV.
3. **03. Alcance Funcional — 7 Épicas SIMV**: Catálogo interactivo de funcionalidades maestras organizadas por fases y entregables técnicos.
4. **04. Simulador Interactivo App Móvil & Trade Ticket**: Mockup de iPhone con navegación en vivo por portafolios, detalle de órdenes y generación de Trade Ticket fehaciente.
5. **05. Calculadora Financiera de Rendimiento & Mutuos**: Simulador interactivo con cálculo de interés simple y compuesto, plazos y tasa estimada en DOP/USD.
6. **06. Integración Dynamics CRM & SIFI Fondos**: Diagrama de flujo de arquitectura, autenticación biométrica FaceID y sincronización bidireccional segura.
7. **07. Dashboards Operativos & Métricas KPI**: Visualizador de métricas en tiempo real con gráficos SVG interactivos y KPIs transaccionales.
8. **08. Equipo Especialista & Cronograma**: Fichas de consultores expertos, asignación de responsabilidades y cronograma de Sprints con criterios de aceptación (DoD).
9. **09. Propuesta Económica & Esquema de Inversión**: Desglose de costos con selector de descuento porcentual (`%`), tasa de ITBIS editable e hitos de pago personalizables.
10. **10. Sobre ENFOCO S.R.L. & Certificaciones**: Perfil corporativo, estándares internacionales ISO 27001 / ISO 27002 y metodología ágil de ingeniería.
11. **11. Experiencia en Proyectos Similares**: Casos de éxito y referencias comprobadas en el sector financiero y bursátil.
12. **12. Cierre, Términos Legales & Firma Digital**: Resumen de acuerdos y modal con lienzo HTML5 para captura de firma manuscrita y hash criptográfico de auditoría.

---

## 🎨 Herramientas del Visual Design Studio

### 📐 Formas Geométricas Vectoriales (25+ Formas)
Organizadas en 5 categorías en la pestaña lateral:
- **Básicas**: Círculo, Elipse, Cuadrado, Rectángulo redondeado, Triángulos (Arriba, Abajo, Derecha, Izquierda).
- **Polígonos & Geometría Avanzada**: Rombo/Diamante, Pentágono, Hexágono, Octágono, Trapecio, Paralelogramo, Estrellas (4, 5 y 6 puntas), Cruz/Plus.
- **Flechas & Conectores**: Flechas lineales (4 direcciones), Flechas en bloque, Flecha curva conectora `⤷`, Flechas bidireccionales `↔`, Chevron.
- **Líneas & Divisores**: Línea sólida, Línea punteada (*dashed*), Línea neón con rombo central, Separador vertical.
- **UI & Badges**: Píldora/Badge oficial, Burbuja de diálogo (*speech bubble*), Contenedor Glassmorphism con blur, Indicadores de progreso.

### ⭐ Iconoteca con Buscador en Vivo (+45 Iconos Vectoriales)
- **Buscador en Tiempo Real**: Filtrado instantáneo por palabras clave (*"dólar", "seguridad", "app", "banco", "gráfico", "usuario"*).
- **Estilos de Icono**:
  - ⭕ **Círculo**: Badge circular translúcido con borde.
  - ⏹️ **Cuadrado**: Contenedor estilo App Icon.
  - 🪟 **Glass**: Fondo translúcido con desenfoque y borde brillante.
  - 📄 **Plano**: Vector SVG puro sin contenedor.
- **Categorías**: Finanzas & Mercado, Tecnología & Infraestructura, Acciones & Señalética.

### 🗂️ 10 Diseños Estructurales de Tarjetas (`cardVariant`)
1. **✨ Translúcida Frosted Glass**: Cristal esmerilado con desenfoque (*backdrop-blur-xl*) y reflejo ambiental.
2. **📐 Dotted Blueprint Técnico**: Borde punteado (`border-dashed`), cuadrícula técnica oscura y marcas `+` en las cuatro esquinas.
3. **🔷 Cyber Chamfer Biselado**: Esquinas cortadas en ángulo (*clip-path* fintech) y estética trading terminal.
4. **⚡ Neón Glow Resplandor**: Fondo negro profundo con aura luminosa exterior resplandeciente.
5. **🔀 Split Acento Lateral**: Columna izquierda en color de contraste con icono + panel derecho de detalles.
6. **💊 Cápsula Ultra-Soft Bento**: Bordes redondeados envolventes (`rounded-[36px]`) en verde Sage ENFOCO.
7. **📊 Métrica KPI con Tendencia**: Cifra gigante mono (*$1.45M*), badge porcentual de incremento (*+24.8% ↑*) y barra de progreso.
8. **💬 Cita Ejecutiva / Testimonio**: Comilla tipográfica en marca de agua, texto en cursiva y ficha del autor con avatar.
9. **✔ Checklist de Criterios DoD**: Icono superior con 3 viñetas de verificación interactiva (`✔`).
10. **💎 Cotización con CTA Embebido**: Badge "RECOMENDADO", monto en USD y botón de selección integrado.

### 🔘 8 Diseños Estructurales de Botones (`buttonVariant`)
1. **🔥 Neón Glow CTA**: Fondo degradado con resplandor luminoso y flecha de acción.
2. **🧊 Translúcido Glass**: Vidrio esmerilado con desenfoque e icono de destello.
3. **📐 Dotted Blueprint**: Borde discontinuo punteado con prefijo técnico `[+]`.
4. **🔷 Cyber Chamfer**: Esquinas biseladas en corte diagonal para terminales financieras.
5. **💊 Píldora Flotante con Icono en Círculo**: Cápsula con círculo independiente a la izquierda y flecha derecha.
6. **📄 Dos Líneas / Subtítulo Técnico**: Subtítulo superior (*"DESCARGA"*) + titular principal (*"Ficha Técnica SIMV"*).
7. **🟢 Estado en Vivo**: Punto de pulso animado en verde con indicador de disponibilidad 99.9%.
8. **⭕ Circular Flotante FAB**: Botón redondo con flecha de acción rápida.

---

## 🕹️ Vinculación de Acciones Interactivas (Button Linking)

Cualquier botón puede vincularse a una tarjeta o sección para crear flujos dinámicos:
1. Selecciona el **Botón** en el lienzo.
2. En la barra superior de herramientas (**Inspector**), dirígete al menú **Acción (🔗)**:
   - **`CHANGE_TAB`**: Conmuta la vista activa de una tarjeta objetivo (ej: cambiar entre *Fase 1*, *Fase 2*, *Alcance*).
   - **`NEXT_TAB`**: Avanza a la siguiente pestaña disponible en un carrusel.
   - **`TOGGLE_VISIBILITY`**: Muestra u oculta un elemento al hacer clic.
   - **`NAVIGATE_SECTION`**: Desplaza la página de forma fluida hacia cualquier sección (`#id`).
   - **`SYSTEM_TRIGGER`**: Dispara modales del sistema (Firma digital, exportar JSON, generar PDF).

---

## 🛠️ Tecnologías Utilizadas

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, TypeScript estricto).
- **Estilos & UI**: [Tailwind CSS](https://tailwindcss.com/) + Variables CSS reactivas + Backdrop Filters.
- **Gestión de Estado**: [Zustand](https://github.com/pmndrs/zustand) con persistencia local (`localStorage`) segura y sincronización post-montaje contra desajustes de hidratación.
- **Iconografía**: [Lucide React](https://lucide.dev/).
- **Notificaciones**: [Sonner](https://sonner.emilkowal.ski/).

---

## 📦 Instalación y Puesta en Marcha

### Requisitos Previos
- [Node.js 18+](https://nodejs.org/) instalado en el sistema.
- Gestor de paquetes `npm` o `pnpm`.

### Pasos de Instalación:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/heralsreyes/PaginaPropuesta.git
   cd PaginaPropuesta
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Acceder a la aplicación**:
   - **Vista Cliente / Ejecutiva**: `http://localhost:3000/?proposal=excel-puesto-de-bolsa`
   - **Modo Edición / Studio**: `http://localhost:3000/?proposal=excel-puesto-de-bolsa&admin=true`

5. **Compilación para Producción**:
   ```bash
   npm run build
   npm start
   ```

---

## 🏛️ Estructura del Proyecto

```text
PaginaPropuesta/
├── app/                              # Rutas principales y layout global Next.js
│   ├── page.tsx                      # Punto de entrada y orquestador de vistas
│   ├── layout.tsx                    # Fuentes tipográficas y envoltorios globales
│   └── globals.css                   # Tokens de diseño, gradientes y capas Tailwind
├── components/
│   ├── sections/                     # 12 Módulos independientes de la propuesta
│   │   ├── ExecutiveSummarySection.tsx
│   │   ├── AppSimulatorSection.tsx
│   │   ├── EconomicProposalSection.tsx
│   │   ├── TeamRoadmapSection.tsx
│   │   └── ...
│   ├── studio/                       # Visual Design Studio (Canva / Figma Engine)
│   │   ├── CanvasElementWrapper.tsx  # Controlador de arrastre, redimensión y selección
│   │   ├── ElementInspectorBar.tsx   # Barra superior flotante de herramientas e inspector
│   │   ├── EditableText.tsx          # Editor de texto tipográfico in-situ
│   │   ├── sidebar/                  # Pestañas laterales (Formas, Iconos, Tarjetas, Botones)
│   │   └── canvas/                   # Renderizadores de componentes vectoriales y cards
│   ├── modal/                        # Modal de aceptación y lienzo de firma manuscrita HTML5
│   ├── nav/                          # Barra superior de marca y menú de secciones
│   └── ui/                           # Componentes base editables (EditableField)
├── lib/                              # Utilidades financieras, almacenamiento y action dispatcher
├── store/                            # Store Zustand con soporte para multi-tab y persistencia
└── types/                            # Tipos estrictos TypeScript (studio.ts, proposal.ts)
```

---

## 📄 Licencia

Desarrollado de manera exclusiva para **ENFOCO, S.R.L.** — Todos los derechos reservados.
