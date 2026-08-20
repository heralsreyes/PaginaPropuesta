# 🏢 ENFOCO — Plataforma de Propuestas Comerciales B2B & Design Studio

Plataforma web interactiva desarrollada para **ENFOCO, S.R.L.** para la generación, personalización y firma digital de propuestas comerciales ejecutivas B2B (Desarrollo Web, Mobile Apps e Integración Dynamics CRM & SIFI).

---

## 🛠️ Arquitectura Modular del Sistema

El proyecto sigue una arquitectura **Clean Component Architecture** organizada en capas independientes:

```text
PaginaPropuesta/
├── app/                      # Orquestador principal Next.js (App Router)
│   ├── page.tsx              # Punto de entrada de renderizado (~53 líneas)
│   └── globals.css           # Design Tokens, variables CSS y Tailwind Layers
├── components/
│   ├── sections/             # Componentes modulares independientes por sección (01 a 12)
│   ├── customizer/tabs/      # Pestañas modulares del Admin Drawer
│   ├── studio/               # Editor interactivo Canva/Figma Design Studio
│   │   ├── sidebar/          # Pestañas laterales de herramientas
│   │   └── canvas/           # Elementos interactivos del lienzo (Buttons, Cards, Mockups)
│   ├── modal/                # Modal de aceptación & Lienzo HTML5 de firma digital
│   ├── nav/                  # Barra superior corporativa & Puntos de navegación
│   ├── ui/                   # Componentes atómicos editables (EditableField)
│   ├── charts/               # Gráficos SVG animados memoizados (DynamicDonutChart)
│   └── CustomSectionRenderer # Despachador centralizado de secciones
├── context/                  # Proveedor de estado global (ProposalContext)
├── hooks/                    # Hooks personalizados (useCanvasDrawing, useLocalStorage)
├── lib/                      # Reductores puros, utilidades financieras y constantes
│   ├── constants.ts          # Tasa DOP/USD, paletas de marca y claves de almacenamiento
│   ├── financial.ts          # Cálculos de rendimientos e interés compuesto
│   ├── proposalReducer.ts    # Reductor de estado inmutable (17 acciones)
│   └── actionDispatcher.ts   # Ejecutor de acciones inter-elementos
└── types/                    # Interfaces estricta TypeScript (proposal.ts, studio.ts, theme.ts)
```

---

## 🚀 Tecnologías Principales

- **Framework**: Next.js 14 (App Router, TypeScript Estricto).
- **Estilos**: Tailwind CSS + Custom CSS Variables + Design System HSL.
- **Animaciones**: Framer Motion (Transiciones fluidas & Micro-interacciones).
- **Estado**: Zustand (Studio Store) + React Context / Reducer (Proposal State).
- **Iconografía**: Lucide React.
- **Notificaciones**: Sonner Toasts.

---

## 📜 Guía para Desarrolladores: Añadir una Nueva Sección

1. Crear el nuevo componente en `components/sections/NuevaSeccion.tsx`.
2. Registrar la ID y tipo en `types/studio.ts`.
3. Agregar la regla de dispatching en `components/CustomSectionRenderer.tsx`.
