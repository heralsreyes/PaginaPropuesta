# 🏢 ENFOCO — Plataforma de Propuestas Comerciales B2B & Design Studio

Plataforma web de última generación desarrollada para **ENFOCO, S.R.L.**, diseñada para la creación, personalización interactiva, presentación ejecutiva y firma digital fehaciente de propuestas comerciales B2B enterprise (Desarrollo Web, Aplicaciones Móviles e Integraciones con Dynamics CRM & SIFI Fondos para el mercado de valores SIMV).

---

## 🎛️ Guía de Acceso: Cómo Entrar a los Distintos Modos

La plataforma cuenta con 3 modos principales diseñados para diferentes audiencias (clientes, diseñadores/comerciales y evaluadores):

### 1. 👔 Modo Cliente / Vista Ejecutiva (Presentación Oficial)
Es el modo predeterminado para entregar al cliente final o inversionistas. Está optimizado para una lectura corporativa impecable, libre de barras de edición, bordes de diseño o botones de depuración.

- **URL Directa**:
  ```text
  http://localhost:3000/?proposal=excel-puesto-de-bolsa
  ```
  *(O simplemente ingresando a la URL base `http://localhost:3000/`)*.
- **Desde la interfaz**:
  - Si te encuentras en el Studio, haz clic en el botón superior **"Modo Cliente"** o **"Vista Previa"** para ocultar todas las herramientas de edición y verificar la experiencia exacta que verá el cliente.

---

### 2. 🎨 Modo Edición / Visual Design Studio (Administrador & Maquetación)
Activa el motor de edición interactiva tipo Canva / Figma, permitiendo modificar textos in-situ, arrastrar y soltar nuevas formas, botones, tarjetas, subir imágenes locales y vincular acciones interactivas.

- **URL Directa**:
  ```text
  http://localhost:3000/?proposal=excel-puesto-de-bolsa&admin=true
  ```
  *(El parámetro `&admin=true` habilita de inmediato el panel lateral y el inspector flotante)*.
- **Desde la interfaz**:
  - En la barra superior de navegación, haz clic en el botón **"Studio"** o el icono de **Ajustes / Pincel** para conmutar el modo de diseño en tiempo real sin recargar la página.

---

### ⌨️ Atajos de Teclado Globales (Hotkeys & Shortcuts)

Puedes conmutar entre los diferentes modos al instante sin tocar el ratón:

| Atajo (Windows / Linux) | Atajo (macOS) | Acción que Ejecuta |
| :--- | :--- | :--- |
| **`Ctrl + Shift + E`** | **`Cmd + Shift + E`** | 🎨 **Conmutar Modo Edición Studio / Vista Cliente** (Abre o cierra el editor lateral y el inspector flotante). |
| **`Alt + E`** | **`Option + E`** | 🎨 Atajo alternativo para conmutar el Modo Edición / Studio. |
| **`Ctrl + Shift + P`** | **`Cmd + Shift + P`** | ⚙️ **Abrir / Cerrar Drawer de Personalización** (Colores, Presupuesto, Alcance y JSON). |
| **`Ctrl + P`** | **`Cmd + P`** | 📄 **Exportar / Imprimir PDF Ejecutivo** (Abre el diálogo nativo de impresión con estilos `.no-print` optimizados). |

---

## 🌐 Comandos de Terminal para Abrir las Vistas Directamente

Puedes lanzar cualquiera de las vistas o secciones directamente desde tu terminal de comandos:

### 🪟 En Windows (PowerShell):
```powershell
# 1. Abrir Vista Cliente / Ejecutiva
Start-Process "http://localhost:3000/?proposal=excel-puesto-de-bolsa"

# 2. Abrir Modo Edición / Visual Studio
Start-Process "http://localhost:3000/?proposal=excel-puesto-de-bolsa&admin=true"

# 3. Abrir directamente en una Sección Específica:
# -> 03. Alcance Funcional 7 Épicas SIMV
Start-Process "http://localhost:3000/?proposal=excel-puesto-de-bolsa#sec-7-epicas-alcance"

# -> 04. Simulador App Móvil & Trade Ticket
Start-Process "http://localhost:3000/?proposal=excel-puesto-de-bolsa#sec-simulador-interactivo-app"

# -> 05. Calculadora de Rendimiento Financiero
Start-Process "http://localhost:3000/?proposal=excel-puesto-de-bolsa#sec-calculadora-inversion"

# -> 06. Integración Dynamics CRM & SIFI Fondos
Start-Process "http://localhost:3000/?proposal=excel-puesto-de-bolsa#sec-integracion-crm-sifi"

# -> 09. Propuesta Económica & Hitos de Inversión
Start-Process "http://localhost:3000/?proposal=excel-puesto-de-bolsa#sec-propuesta-economica"

# -> 12. Cierre & Firma Digital Fehaciente
Start-Process "http://localhost:3000/?proposal=excel-puesto-de-bolsa#sec-cierre-acuerdo"
```

### 🍎 En macOS (Terminal):
```bash
# Vista Cliente / Ejecutiva
open "http://localhost:3000/?proposal=excel-puesto-de-bolsa"

# Modo Edición / Studio
open "http://localhost:3000/?proposal=excel-puesto-de-bolsa&admin=true"

# Sección de Presupuesto & Hitos
open "http://localhost:3000/?proposal=excel-puesto-de-bolsa#sec-propuesta-economica"
```

### 🐧 En Linux (Bash):
```bash
# Vista Cliente / Ejecutiva
xdg-open "http://localhost:3000/?proposal=excel-puesto-de-bolsa"

# Modo Edición / Studio
xdg-open "http://localhost:3000/?proposal=excel-puesto-de-bolsa&admin=true"
```

---

## ⚡ Comandos de Consola JavaScript (DevTools / F12)

Si tienes la consola de desarrollo abierta en el navegador (`F12` / `Ctrl+Shift+I`), puedes ejecutar estos comandos rápidos:

```javascript
// 1. Activar Modo Edición / Studio al instante
window.location.search = '?proposal=excel-puesto-de-bolsa&admin=true';

// 2. Regresar a la Vista Ejecutiva Cliente limpia
window.location.search = '?proposal=excel-puesto-de-bolsa';

// 3. Abrir el Modal de Aceptación & Firma Digital Manuscrita
window.dispatchEvent(new CustomEvent('enfoco-open-accept-modal'));

// 4. Restablecer todos los textos editados a sus valores originales de fábrica
window.dispatchEvent(new CustomEvent('enfoco-reset-all'));

// 5. Desplazarse suavemente a una sección específica
document.getElementById('sec-propuesta-economica')?.scrollIntoView({ behavior: 'smooth' });
```

---

## 💻 Cheat Sheet de Comandos de Terminal

### 🚀 1. Instalación & Inicialización
```bash
# Clonar el repositorio
git clone https://github.com/heralsreyes/PaginaPropuesta.git

# Entrar al directorio
cd PaginaPropuesta

# Instalar todas las dependencias
npm install
```

---

### 🛠️ 2. Servidor de Desarrollo
```bash
# Iniciar servidor de desarrollo en puerto predeterminado (3000)
npm run dev

# Iniciar forzando específicamente el puerto 3000
npx next dev -p 3000
```

---

### 🏗️ 3. Compilación & Producción
```bash
# Validar tipos TypeScript y generar compilación optimizada
npm run build

# Iniciar servidor de producción con la compilación generada
npm start

# Ejecutar el linter para validación de código
npm run lint
```

---

### 🧹 4. Mantenimiento & Solución de Problemas (Troubleshooting)

#### En Windows (PowerShell):
```powershell
# 1. Liberar el puerto 3000 o 3001 si quedó ocupado por otro proceso
Get-NetTCPConnection -LocalPort 3000,3001 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }

# 2. Limpiar la caché de Next.js
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# 3. Reinstalar dependencias limpias desde cero
Remove-Item -Recurse -Force node_modules, package-lock.json -ErrorAction SilentlyContinue
npm install
```

#### En macOS / Linux (Bash / Zsh):
```bash
# 1. Liberar el puerto 3000 si está ocupado
npx kill-port 3000

# 2. Limpiar la caché de compilación
rm -rf .next

# 3. Reinstalar dependencias limpias desde cero
rm -rf node_modules package-lock.json
npm install
```

---

### 🌿 5. Comandos de Git & Despliegue
```bash
# Ver estado de cambios
git status

# Agregar todos los cambios y hacer commit
git add .
git commit -m "feat: descripción de la mejora"

# Subir a la rama de trabajo
git push origin feat/editable

# Sincronizar y fusionar con la rama principal (main)
git checkout main
git merge feat/editable
git push origin main
git checkout feat/editable
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
