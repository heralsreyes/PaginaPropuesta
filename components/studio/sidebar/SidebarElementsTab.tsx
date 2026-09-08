"use client";

import React, { useState, useRef, useMemo } from "react";
import { useStudioStore } from "@/store/useStudioStore";
import { CanvasElement } from "@/types/studio";
import {
  Sparkles,
  Layers,
  Cpu,
  Users,
  Building2,
  MessageSquare,
  BarChart2,
  TrendingUp,
  Award,
  Globe,
  Upload,
  Image as ImageIcon,
  Plus,
  Table,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Smartphone,
  CreditCard,
  Sliders,
  DollarSign,
  GripHorizontal,
  Search,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Star,
  Activity,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Lock,
  Database,
  Server,
  Cloud,
  Code,
  Terminal,
  Wifi,
  Coins,
  Receipt,
  Wallet,
  Scale,
  Percent,
  FileText,
  Monitor,
  Zap,
  Bot,
  Check,
  User,
  Heart,
  Bell,
  Clock,
  Calendar,
  Filter,
  AlertTriangle,
  HelpCircle,
  Phone,
  Mail,
  Maximize2,
  SlidersHorizontal,
  Quote,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { ICON_REGISTRY } from "@/components/studio/canvas/UIComponentCanvasElement";

export const SidebarElementsTab: React.FC = () => {
  const { addCanvasElement } = useStudioStore();
  const [activeSubCategory, setActiveSubCategory] = useState<
    "formas" | "iconos" | "modulos" | "tarjetas" | "botones" | "imagenes"
  >("formas");

  // Filter state for Shapes
  const [shapeCategoryFilter, setShapeCategoryFilter] = useState<
    "todas" | "basicas" | "poligonos" | "flechas" | "lineas" | "ui"
  >("todas");

  // Icon Search & Style States
  const [iconSearchQuery, setIconSearchQuery] = useState("");
  const [iconCategoryFilter, setIconCategoryFilter] = useState<
    "todos" | "finanzas" | "tecnologia" | "acciones"
  >("todos");
  const [selectedIconStyle, setSelectedIconStyle] = useState<
    "plain" | "circle_badge" | "square_badge" | "glass_badge"
  >("circle_badge");

  const [uploadedImages, setUploadedImages] = useState<{ id: string; name: string; url: string }[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleDragStart = (
    e: React.DragEvent,
    elementData: Parameters<typeof addCanvasElement>[0]
  ) => {
    e.dataTransfer.setData("application/json", JSON.stringify(elementData));
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`'${file.name}' no es un archivo de imagen válido.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          const imgObj = {
            id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            name: file.name,
            url: dataUrl,
          };
          setUploadedImages((prev) => [imgObj, ...prev]);

          addCanvasElement({
            type: "image",
            imageUrl: dataUrl,
            sectionId: "hero",
            title: file.name,
            width: 320,
            height: 200,
          });
          toast.success(`Imagen '${file.name}' insertada.`);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // ==========================================
  // FORMAS GEOMÉTRICAS DATA
  // ==========================================
  const allShapes = [
    // Básicas
    { id: "sh-circle", title: "Círculo", cat: "basicas", shapeType: "circle" as const, width: 90, height: 90, bg: "var(--secondary-accent, #F08D17)", border: "var(--theme-h1, #FFFFFF)", desc: "Círculo vectorial con relleno." },
    { id: "sh-ellipse", title: "Elipse", cat: "basicas", shapeType: "ellipse" as const, width: 130, height: 80, bg: "var(--bg-main, #004F54)", border: "var(--secondary-accent, #F08D17)", desc: "Elipse horizontal." },
    { id: "sh-square", title: "Cuadrado", cat: "basicas", shapeType: "square" as const, width: 90, height: 90, bg: "var(--card-bg, #003B3F)", border: "var(--card-border, #F08D17)", desc: "Cuadrado con esquinas rectas." },
    { id: "sh-rounded-rect", title: "Rectángulo Redondeado", cat: "basicas", shapeType: "rounded_rect" as const, width: 140, height: 80, bg: "var(--card-bg, rgba(0, 79, 84, 0.9))", border: "var(--card-border, #F08D17)", desc: "Caja con esquinas suaves." },
    { id: "sh-tri-up", title: "Triángulo Arriba", cat: "basicas", shapeType: "triangle_up" as const, width: 90, height: 90, bg: "var(--secondary-accent, #F08D17)", border: "var(--theme-h1, #FFFFFF)", desc: "Triángulo apuntando arriba." },
    { id: "sh-tri-down", title: "Triángulo Abajo", cat: "basicas", shapeType: "triangle_down" as const, width: 90, height: 90, bg: "var(--secondary-accent, #F08D17)", border: "var(--theme-h1, #FFFFFF)", desc: "Triángulo apuntando abajo." },
    { id: "sh-tri-right", title: "Triángulo Derecha", cat: "basicas", shapeType: "triangle_right" as const, width: 90, height: 90, bg: "var(--bg-main, #004F54)", border: "var(--card-border, #F08D17)", desc: "Triángulo apuntando derecha." },
    { id: "sh-tri-left", title: "Triángulo Izquierda", cat: "basicas", shapeType: "triangle_left" as const, width: 90, height: 90, bg: "var(--bg-main, #004F54)", border: "var(--card-border, #F08D17)", desc: "Triángulo apuntando izquierda." },

    // Polígonos
    { id: "sh-diamond", title: "Rombo / Diamante", cat: "poligonos", shapeType: "diamond" as const, width: 90, height: 90, bg: "var(--secondary-accent, #F08D17)", border: "var(--theme-h1, #FFFFFF)", desc: "Rombo de 4 lados." },
    { id: "sh-pentagon", title: "Pentágono", cat: "poligonos", shapeType: "pentagon" as const, width: 90, height: 90, bg: "var(--bg-main, #004F54)", border: "var(--card-border, #F08D17)", desc: "Polígono de 5 lados." },
    { id: "sh-hexagon", title: "Hexágono", cat: "poligonos", shapeType: "hexagon" as const, width: 90, height: 90, bg: "var(--card-bg, #003B3F)", border: "var(--card-border, #F08D17)", desc: "Polígono de 6 lados." },
    { id: "sh-octagon", title: "Octágono", cat: "poligonos", shapeType: "octagon" as const, width: 90, height: 90, bg: "var(--secondary-accent, #F08D17)", border: "var(--theme-h1, #FFFFFF)", desc: "Polígono de 8 lados." },
    { id: "sh-trapezoid", title: "Trapecio", cat: "poligonos", shapeType: "trapezoid" as const, width: 120, height: 80, bg: "var(--bg-main, #004F54)", border: "var(--card-border, #F08D17)", desc: "Trapecio simétrico." },
    { id: "sh-parallelogram", title: "Paralelogramo", cat: "poligonos", shapeType: "parallelogram" as const, width: 130, height: 75, bg: "var(--card-bg, #003B3F)", border: "var(--card-border, #F08D17)", desc: "Paralelogramo inclinado." },
    { id: "sh-star4", title: "Estrella 4 Puntas", cat: "poligonos", shapeType: "star_4" as const, width: 90, height: 90, bg: "var(--secondary-accent, #F08D17)", border: "var(--theme-h1, #FFFFFF)", desc: "Estrella de destello." },
    { id: "sh-star5", title: "Estrella 5 Puntas", cat: "poligonos", shapeType: "star_5" as const, width: 90, height: 90, bg: "var(--secondary-accent, #F08D17)", border: "var(--theme-h1, #FFFFFF)", desc: "Estrella clásica." },
    { id: "sh-star6", title: "Estrella 6 Puntas", cat: "poligonos", shapeType: "star_6" as const, width: 90, height: 90, bg: "var(--bg-main, #004F54)", border: "var(--card-border, #F08D17)", desc: "Sello o estrella múltiple." },
    { id: "sh-cross", title: "Cruz / Plus", cat: "poligonos", shapeType: "cross" as const, width: 80, height: 80, bg: "var(--secondary-accent, #F08D17)", border: "var(--theme-h1, #FFFFFF)", desc: "Cruz o símbolo de adición." },

    // Flechas
    { id: "sh-arr-right", title: "Flecha Derecha", cat: "flechas", shapeType: "arrow_right" as const, width: 140, height: 40, bg: "var(--secondary-accent, #F08D17)", border: "transparent", desc: "Flecha lineal derecha." },
    { id: "sh-arr-left", title: "Flecha Izquierda", cat: "flechas", shapeType: "arrow_left" as const, width: 140, height: 40, bg: "var(--secondary-accent, #F08D17)", border: "transparent", desc: "Flecha lineal izquierda." },
    { id: "sh-arr-up", title: "Flecha Arriba", cat: "flechas", shapeType: "arrow_up" as const, width: 40, height: 140, bg: "var(--secondary-accent, #F08D17)", border: "transparent", desc: "Flecha lineal arriba." },
    { id: "sh-arr-down", title: "Flecha Abajo", cat: "flechas", shapeType: "arrow_down" as const, width: 40, height: 140, bg: "var(--secondary-accent, #F08D17)", border: "transparent", desc: "Flecha lineal abajo." },
    { id: "sh-arr-blk-r", title: "Flecha Bloque Derecha", cat: "flechas", shapeType: "arrow_block_right" as const, width: 130, height: 60, bg: "var(--bg-main, #004F54)", border: "var(--secondary-accent, #F08D17)", desc: "Flecha gruesa rellena." },
    { id: "sh-arr-blk-l", title: "Flecha Bloque Izquierda", cat: "flechas", shapeType: "arrow_block_left" as const, width: 130, height: 60, bg: "var(--bg-main, #004F54)", border: "var(--secondary-accent, #F08D17)", desc: "Flecha gruesa izquierda." },
    { id: "sh-arr-curved", title: "Flecha Curva Conector", cat: "flechas", shapeType: "arrow_curved" as const, width: 100, height: 100, bg: "var(--secondary-accent, #F08D17)", border: "transparent", desc: "Flecha curva para pasos de flujo." },
    { id: "sh-arr-dbl-h", title: "Flecha Bidireccional H", cat: "flechas", shapeType: "arrow_double_h" as const, width: 150, height: 40, bg: "var(--bg-main, #004F54)", border: "transparent", desc: "Flecha de doble sentido." },
    { id: "sh-arr-dbl-v", title: "Flecha Bidireccional V", cat: "flechas", shapeType: "arrow_double_v" as const, width: 40, height: 150, bg: "var(--bg-main, #004F54)", border: "transparent", desc: "Flecha de doble sentido vertical." },
    { id: "sh-chevron-r", title: "Chevron Puntero", cat: "flechas", shapeType: "chevron_right" as const, width: 50, height: 80, bg: "var(--secondary-accent, #F08D17)", border: "transparent", desc: "Puntero chevron." },

    // Líneas
    { id: "sh-line-solid", title: "Línea Divisoria Sólida", cat: "lineas", shapeType: "line_solid" as const, width: 280, height: 16, bg: "var(--secondary-accent, #F08D17)", border: "transparent", desc: "Línea separadora simple." },
    { id: "sh-line-dashed", title: "Línea Punteada (Dashed)", cat: "lineas", shapeType: "line_dashed" as const, width: 280, height: 16, bg: "var(--bg-main, #004F54)", border: "transparent", desc: "Línea discontinua punteada." },
    { id: "sh-line-neon", title: "Línea Neón con Nodo", cat: "lineas", shapeType: "line_neon" as const, width: 320, height: 24, bg: "var(--secondary-accent, #F08D17)", border: "transparent", desc: "Línea degradada con rombo central." },
    { id: "sh-line-vert", title: "Línea Vertical", cat: "lineas", shapeType: "line_vertical" as const, width: 16, height: 200, bg: "var(--secondary-accent, #F08D17)", border: "transparent", desc: "Separador vertical." },

    // UI & Contenedores
    { id: "sh-pill-badge", title: "Píldora / Badge Oficial", cat: "ui", shapeType: "pill_badge" as const, width: 180, height: 38, bg: "var(--secondary-accent, #F08D17)", border: "var(--theme-h1, #FFFFFF)", desc: "Píldora para etiquetas o estados." },
    { id: "sh-speech", title: "Burbuja de Diálogo", cat: "ui", shapeType: "speech_bubble" as const, width: 220, height: 90, bg: "var(--card-bg, #003B3F)", border: "var(--card-border, #F08D17)", desc: "Globo de mensaje con colita." },
    { id: "sh-glass", title: "Contenedor Glassmorphism", cat: "ui", shapeType: "glass_container" as const, width: 260, height: 140, bg: "var(--card-bg, rgba(255,255,255,0.06))", border: "var(--card-border, rgba(255,255,255,0.2))", desc: "Tarjeta translúcida con blur." },
    { id: "sh-scroll-dots", title: "Indicador Scroll Vertical", cat: "ui", shapeType: "line_solid" as const, width: 44, height: 260, bg: "rgba(0,0,0,0.6)", border: "rgba(255,255,255,0.2)", desc: "Barra de navegación vertical con bolitas." },
    { id: "sh-sprint-bar", title: "Barra de Progreso Sprint", cat: "ui", shapeType: "line_solid" as const, width: 340, height: 80, bg: "var(--card-bg, #002224)", border: "#059669", desc: "Indicador de avance de entregables." },
  ];

  const filteredShapes = useMemo(() => {
    if (shapeCategoryFilter === "todas") return allShapes;
    return allShapes.filter((s) => s.cat === shapeCategoryFilter);
  }, [shapeCategoryFilter]);

  // ==========================================
  // ICONOTECA / ICONS DATA
  // ==========================================
  const allIcons = [
    // Finanzas
    { name: "dollar", label: "Dólar / Dinero", cat: "finanzas", keywords: "dolar dinero precio costo inversor capital cash" },
    { name: "trending_up", label: "Crecimiento / ROI", cat: "finanzas", keywords: "rendimiento retorno finanzas mercado subida alcista ganancia" },
    { name: "shield", label: "Seguridad / Blindaje", cat: "finanzas", keywords: "seguridad proteccion iso certificado simv auditoria" },
    { name: "pie_chart", label: "Gráfico de Torta", cat: "finanzas", keywords: "portafolio distribucion grafico torta activos" },
    { name: "briefcase", label: "Maletín / Portafolio", cat: "finanzas", keywords: "negocios cartera portafolio comercial" },
    { name: "landmark", label: "Banco / Institución", cat: "finanzas", keywords: "banco institucion puesto bolsa safi gobierno" },
    { name: "credit_card", label: "Tarjeta de Crédito", cat: "finanzas", keywords: "tarjeta pago pasarela transaccion cobro" },
    { name: "building", label: "Empresa / Corporativo", cat: "finanzas", keywords: "edificio empresa corporativo sede cliente" },
    { name: "coins", label: "Monedas / Divisas", cat: "finanzas", keywords: "monedas dop usd divisas fondos cuotas" },
    { name: "receipt", label: "Recibo / Comprobante", cat: "finanzas", keywords: "ticket recibo factura comprobante trade" },
    { name: "wallet", label: "Billetera / Wallet", cat: "finanzas", keywords: "wallet billetera saldo fondos cuenta" },
    { name: "scale", label: "Balanza / Legal", cat: "finanzas", keywords: "ley regulacion simv cumplimiento legal norma" },
    { name: "percent", label: "Porcentaje / Descuento", cat: "finanzas", keywords: "tasa porcentaje itbis interes descuento" },
    { name: "file_text", label: "Documento / PDF", cat: "finanzas", keywords: "pdf contrato estado cuenta reporte" },

    // Tecnología
    { name: "smartphone", label: "App Móvil / Celular", cat: "tecnologia", keywords: "celular app movil ios android pantalla" },
    { name: "monitor", label: "Portal Web / PC", cat: "tecnologia", keywords: "computadora web portal pantalla escritorio" },
    { name: "zap", label: "Rayo / Velocidad", cat: "tecnologia", keywords: "rapido instantaneo rendimiento velocidad energia" },
    { name: "bot", label: "Bot / Inteligencia Artificial", cat: "tecnologia", keywords: "ia robot asistente chatbot automatizacion" },
    { name: "database", label: "Base de Datos", cat: "tecnologia", keywords: "db sql datos servidor core storage sifi" },
    { name: "server", label: "Servidor / Infraestructura", cat: "tecnologia", keywords: "server hosting nube cloud backend" },
    { name: "lock", label: "Candado / Cifrado", cat: "tecnologia", keywords: "clave password token autenticacion aes256" },
    { name: "cpu", label: "Procesador / Motor", cat: "tecnologia", keywords: "algoritmo microprocesador arquitectura tecnologia" },
    { name: "cloud", label: "Nube / Cloud", cat: "tecnologia", keywords: "azure aws nube sinc sync sincronizacion" },
    { name: "code", label: "Código / Desarrollo", cat: "tecnologia", keywords: "programacion api react nextjs endpoint" },
    { name: "terminal", label: "Terminal / Consola", cat: "tecnologia", keywords: "comandos sistema cli consola logs" },
    { name: "globe", label: "Internet / Global", cat: "tecnologia", keywords: "red internet web global paises" },
    { name: "wifi", label: "Conexión / Red", cat: "tecnologia", keywords: "wifi online conectado transmision" },
    { name: "layers", label: "Capas / Módulos", cat: "tecnologia", keywords: "modulos arquitectura capas componentes" },
    { name: "activity", label: "Monitoreo / Actividad", cat: "tecnologia", keywords: "uptime latencia sla ping status live" },

    // Acciones & Señalética
    { name: "check_circle", label: "Check Círculo", cat: "acciones", keywords: "listo aprobado ok validado completado" },
    { name: "check", label: "Check Simple", cat: "acciones", keywords: "verificado correcto seleccionado dod" },
    { name: "arrow_right", label: "Flecha Derecha", cat: "acciones", keywords: "siguiente avanzar explorar continuar cta" },
    { name: "arrow_left", label: "Flecha Izquierda", cat: "acciones", keywords: "anterior volver regresar" },
    { name: "arrow_up", label: "Flecha Arriba", cat: "acciones", keywords: "subir arriba cima" },
    { name: "arrow_down", label: "Flecha Abajo", cat: "acciones", keywords: "bajar abajo descargar" },
    { name: "star", label: "Estrella / Favorito", cat: "acciones", keywords: "estrella valor destacado calidad" },
    { name: "sparkles", label: "Brillo / IA", cat: "acciones", keywords: "nuevo magia ia innovacion premium" },
    { name: "user", label: "Usuario / Titular", cat: "acciones", keywords: "persona cliente titular usuario perfil" },
    { name: "users", label: "Equipo / Grupo", cat: "acciones", keywords: "equipo grupo colaboradores comite" },
    { name: "heart", label: "Corazón / Favorito", cat: "acciones", keywords: "favorito me gusta satisfaccion lealtad" },
    { name: "search", label: "Buscar / Lupa", cat: "acciones", keywords: "buscar consulta filtro explorador" },
    { name: "bell", label: "Notificación / Campana", cat: "acciones", keywords: "alerta campana aviso push email" },
    { name: "clock", label: "Reloj / Horario", cat: "acciones", keywords: "tiempo 24/7 horas plazo minutos" },
    { name: "calendar", label: "Calendario / Fechas", cat: "acciones", keywords: "fecha cronograma sprints meses dias" },
    { name: "award", label: "Premio / Certificación", cat: "acciones", keywords: "premio reconocimiento liderazgo excelencia" },
    { name: "filter", label: "Filtro", cat: "acciones", keywords: "filtrar periodos criterios ordenar" },
    { name: "alert", label: "Alerta / Precaución", cat: "acciones", keywords: "aviso alerta riesgo advertencia" },
    { name: "help", label: "Ayuda / Soporte", cat: "acciones", keywords: "faq preguntas ayuda soporte guia" },
    { name: "phone", label: "Teléfono / Llamada", cat: "acciones", keywords: "contacto telefono llamada whatsapp" },
    { name: "mail", label: "Email / Correo", cat: "acciones", keywords: "correo contacto email mensaje" },
    { name: "sliders", label: "Controles / Sliders", cat: "acciones", keywords: "ajustes parametros simulador filtros" },
  ];

  const filteredIcons = useMemo(() => {
    return allIcons.filter((icon) => {
      const matchesCat = iconCategoryFilter === "todos" || icon.cat === iconCategoryFilter;
      const q = iconSearchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        icon.label.toLowerCase().includes(q) ||
        icon.name.toLowerCase().includes(q) ||
        icon.keywords.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [iconCategoryFilter, iconSearchQuery]);

  // ==========================================
  // TARJETAS CON DISEÑOS ESTRUCTURALES DISTINTOS
  // ==========================================
  const distinctCards = [
    {
      id: "card-glass",
      title: "Translúcida Frosted Glass",
      variant: "glass_translucent" as const,
      width: 320,
      height: 180,
      badgeText: "GLASS PRO",
      desc: "Vidrio esmerilado con desenfoque de fondo y reflejo ambiental.",
      previewType: "glass",
    },
    {
      id: "card-dotted",
      title: "Dotted Blueprint Técnico",
      variant: "dotted_blueprint" as const,
      width: 320,
      height: 180,
      desc: "Bordes discontinuos punteados con cuadrícula técnica y marcas +.",
      previewType: "dotted",
    },
    {
      id: "card-chamfer",
      title: "Cyber Chamfer Biselado",
      variant: "cyber_chamfer" as const,
      width: 320,
      height: 180,
      desc: "Esquinas cortadas en ángulo geométrico estilo fintech trading.",
      previewType: "chamfer",
    },
    {
      id: "card-neon",
      title: "Neón Glow Resplandor",
      variant: "neon_glow" as const,
      width: 320,
      height: 180,
      desc: "Aura luminosa exterior con alto contraste y borde oro/esmeralda.",
      previewType: "neon",
    },
    {
      id: "card-split",
      title: "Split Acento Lateral",
      variant: "split_accent" as const,
      width: 340,
      height: 160,
      desc: "Columna izquierda con icono destacado y panel de información derecho.",
      previewType: "split",
    },
    {
      id: "card-pill",
      title: "Cápsula Ultra-Soft Bento",
      variant: "pill_capsule" as const,
      width: 320,
      height: 180,
      desc: "Bordes envolventes ultra suaves estilo Bento moderno.",
      previewType: "pill",
    },
    {
      id: "card-kpi",
      title: "Métrica KPI con Tendencia",
      variant: "metric_kpi" as const,
      width: 300,
      height: 180,
      desc: "Número gigante mono, badge porcentual (+24%) y barra de progreso.",
      previewType: "kpi",
    },
    {
      id: "card-quote",
      title: "Cita Ejecutiva / Testimonio",
      variant: "testimonial_quote" as const,
      width: 340,
      height: 200,
      desc: "Comilla tipográfica gigante, declaración en cursiva y avatar titular.",
      previewType: "quote",
    },
    {
      id: "card-checklist",
      title: "Checklist de Criterios DoD",
      variant: "checklist_feature" as const,
      width: 320,
      height: 200,
      desc: "Icono superior con 3 viñetas de verificación interactiva ✔.",
      previewType: "checklist",
    },
    {
      id: "card-pricing",
      title: "Cotización con CTA Embebido",
      variant: "pricing_cta" as const,
      width: 300,
      height: 220,
      desc: "Badge de recomendación, precio en USD y botón de acción incluido.",
      previewType: "pricing",
    },
    {
      id: "card-multitab-pro",
      title: "Tarjeta Multi-Pestañas Pro",
      variant: "glass_translucent" as const,
      isMultiTab: true,
      hideTabPills: true,
      width: 360,
      height: 220,
      desc: "Tarjeta multi-vistas limpia sin botones internos, conmutable vinculando cualquier botón.",
      previewType: "multitab",
      tabs: [
        { id: "tab-1", label: "Fase 1: SIMV", title: "Arquitectura & Core", subtitle: "Definición de modelos de datos e integración SIFI Fondos." },
        { id: "tab-2", label: "Fase 2: App", title: "App Móvil & Trade Ticket", subtitle: "Autenticación biométrica FaceID y firma digital fehaciente." },
        { id: "tab-3", label: "Fase 3: CRM", title: "Dynamics CRM & QA", subtitle: "Sincronización bidireccional y pruebas de carga SIMV." },
      ],
    },
  ];

  // ==========================================
  // BOTONES CON DISEÑOS ESTRUCTURALES DISTINTOS
  // ==========================================
  const distinctButtons = [
    {
      id: "btn-neon-glow",
      title: "Aceptar & Firmar Propuesta",
      variant: "neon_glow_cta" as const,
      width: 220,
      height: 48,
      desc: "Fondo degradado con resplandor luminoso exterior y flecha.",
      previewStyle: "bg-[#F08D17] text-white shadow-[0_0_15px_rgba(240,141,23,0.5)] rounded-2xl",
    },
    {
      id: "btn-glass",
      title: "Botón Translúcido Glass",
      variant: "glass_translucent" as const,
      width: 200,
      height: 46,
      desc: "Vidrio esmerilado translúcido con brillo e icono de destello.",
      previewStyle: "bg-white/10 border border-white/30 text-white backdrop-blur-md rounded-2xl",
    },
    {
      id: "btn-dotted",
      title: "Botón Dotted Blueprint",
      variant: "dotted_blueprint" as const,
      width: 190,
      height: 44,
      desc: "Borde discontinuo punteado con prefijo técnico [+].",
      previewStyle: "bg-[#002224] border-2 border-dashed border-[#F08D17] text-[#F08D17] rounded-xl font-mono",
    },
    {
      id: "btn-chamfer",
      title: "CYBER BUTTON ➔",
      variant: "cyber_chamfer" as const,
      width: 190,
      height: 46,
      desc: "Esquinas cortadas en bisel geométrico para trading terminal.",
      previewStyle: "bg-[#003B3F] border-2 border-[#F08D17] text-white font-mono",
    },
    {
      id: "btn-pill-icon",
      title: "Explorar Entregables",
      variant: "pill_floating_icon" as const,
      width: 210,
      height: 46,
      desc: "Cápsula con círculo independiente a la izquierda y flecha derecha.",
      previewStyle: "bg-[#004F54] border border-[#F08D17] text-white rounded-full",
    },
    {
      id: "btn-two-line",
      title: "Ficha Técnica SIMV",
      variant: "two_line_tech" as const,
      width: 220,
      height: 56,
      desc: "Dos líneas con subtítulo técnico en mayúsculas e icono de descarga.",
      previewStyle: "bg-[#002B2E] border border-white/20 text-white rounded-2xl",
    },
    {
      id: "btn-live-pulse",
      title: "● SISTEMA ONLINE 99.9%",
      variant: "live_pulse_badge" as const,
      width: 210,
      height: 38,
      desc: "Punto de pulso verde en vivo con texto de disponibilidad SLA.",
      previewStyle: "bg-[#002224] border border-emerald-500 text-white rounded-full font-mono",
    },
    {
      id: "btn-circular-fab",
      title: "Acción Rápida",
      variant: "circular_fab" as const,
      width: 54,
      height: 54,
      desc: "Botón circular flotante con flecha de acción rápida.",
      previewStyle: "bg-[#F08D17] border-2 border-white text-white rounded-full w-12 h-12 flex items-center justify-center",
    },
  ];

  // Modulos Pro
  const moduleTemplates = [
    {
      id: "mod-template-scope",
      templateType: "scope_master",
      title: "Módulo Base Alcance (Inspector Maestro-Detalle)",
      desc: "Menú izquierdo de módulos y panel derecho de entregables técnicos.",
      icon: Cpu,
      width: 540,
      height: 320,
    },
    {
      id: "mod-template-team",
      templateType: "team_master",
      title: "Módulo Base Equipo Especialista",
      desc: "Visor de equipo con avatar, roles y asignación de responsabilidades.",
      icon: Users,
      width: 480,
      height: 300,
    },
    {
      id: "mod-template-company",
      templateType: "company_master",
      title: "Módulo Base Sobre ENFOCO (Empresa)",
      desc: "Visor corporativo con mockup de interfaz macOS e ISO 27002.",
      icon: Building2,
      width: 480,
      height: 300,
    },
    {
      id: "mod-template-whatsapp-sim",
      templateType: "whatsapp_sim",
      title: "Simulador Chat WhatsApp Oficial (Interactive Bot)",
      desc: "Burbujas de chat con respuestas automáticas y estado en línea.",
      icon: MessageSquare,
      width: 340,
      height: 380,
    },
    {
      id: "mod-template-kpi-card",
      templateType: "kpi_card",
      title: "Métrica KPI Pro (Indicador con Tendencia)",
      desc: "Tarjeta de estadísticas con número gigante e indicador.",
      icon: BarChart2,
      width: 300,
      height: 180,
    },
    {
      id: "mod-template-investment-calc",
      templateType: "investment_calc",
      title: "Calculadora de Rendimiento & Mutuos",
      desc: "Simulador interactivo financiero con sliders y cálculo de intereses.",
      icon: DollarSign,
      width: 400,
      height: 260,
    },
    {
      id: "mod-template-pricing-block",
      templateType: "pricing_block",
      title: "Bloque de Propuesta Económica & Fases",
      desc: "Desglose de inversión sincronizado con términos de pago.",
      icon: CreditCard,
      width: 480,
      height: 240,
    },
    {
      id: "mod-template-feature-grid",
      templateType: "feature_grid",
      title: "Grid de 7 Épicas SIMV",
      desc: "Matriz interactiva de funcionalidades por fases del proyecto.",
      icon: Layers,
      width: 520,
      height: 280,
    },
  ];

  return (
    <div className="space-y-3 text-xs p-3">
      {/* Main Subtabs Navigation */}
      <div className="grid grid-cols-6 gap-0.5 p-1 bg-zinc-200/60 rounded-xl border border-zinc-200/80 text-[9.5px]">
        {(
          [
            { id: "formas", label: "Formas" },
            { id: "iconos", label: "Iconos" },
            { id: "tarjetas", label: "Tarjetas" },
            { id: "botones", label: "Botones" },
            { id: "modulos", label: "Módulos" },
            { id: "imagenes", label: "Media" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubCategory(tab.id)}
            className={`py-1.5 rounded-lg font-bold text-center transition-all cursor-pointer truncate px-0.5 ${
              activeSubCategory === tab.id
                ? "bg-white text-[#2563EB] shadow-xs"
                : "text-[#71717A] hover:text-zinc-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <p className="text-[10.5px] text-zinc-500 italic">
        💡 Arrastra cualquier elemento al lienzo o haz clic para insertarlo.
      </p>

      {/* ========================================== */}
      {/* 1. SECCIÓN FORMAS & RAYAS                  */}
      {/* ========================================== */}
      {activeSubCategory === "formas" && (
        <div className="space-y-2.5">
          {/* Categorías de formas */}
          <div className="flex flex-wrap gap-1 p-1 bg-zinc-200/60 rounded-lg text-[9.5px] font-bold">
            {(
              [
                { id: "todas", label: "Todas" },
                { id: "basicas", label: "Básicas" },
                { id: "poligonos", label: "Polígonos" },
                { id: "flechas", label: "Flechas" },
                { id: "lineas", label: "Líneas" },
                { id: "ui", label: "UI & Badges" },
              ] as const
            ).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setShapeCategoryFilter(cat.id)}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                  shapeCategoryFilter === cat.id
                    ? "bg-[#2563EB] text-white shadow-2xs"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid de Formas */}
          <div className="grid grid-cols-2 gap-2 pr-0.5">
            {filteredShapes.map((shape) => {
              const elementData: Parameters<typeof addCanvasElement>[0] = {
                type: shape.cat === "lineas" ? "line" : "shape",
                shapeType: shape.shapeType,
                title: shape.title,
                width: shape.width,
                height: shape.height,
                customBg: shape.bg,
                customBorder: shape.border,
                sectionId: "hero",
              };

              return (
                <div
                  key={shape.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, elementData)}
                  onClick={() => addCanvasElement(elementData)}
                  className="p-2.5 rounded-xl border border-zinc-200/80 bg-white hover:border-[#2563EB] cursor-grab active:cursor-grabbing transition-all flex flex-col items-center justify-between gap-1 shadow-2xs group text-center"
                >
                  {/* Visual Preview */}
                  <div className="w-14 h-11 flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform">
                    {shape.shapeType === "circle" && (
                      <svg className="w-8 h-8" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="44" fill="#F08D17" stroke="#FFFFFF" strokeWidth="4" />
                      </svg>
                    )}
                    {shape.shapeType === "ellipse" && (
                      <svg className="w-11 h-7" viewBox="0 0 100 60">
                        <ellipse cx="50" cy="30" rx="44" ry="24" fill="#004F54" stroke="#F08D17" strokeWidth="4" />
                      </svg>
                    )}
                    {shape.shapeType === "square" && (
                      <svg className="w-8 h-8" viewBox="0 0 100 100">
                        <rect x="8" y="8" width="84" height="84" fill="#003B3F" stroke="#F08D17" strokeWidth="6" />
                      </svg>
                    )}
                    {shape.shapeType === "rounded_rect" && (
                      <svg className="w-11 h-7" viewBox="0 0 100 65">
                        <rect x="6" y="6" width="88" height="53" rx="14" fill="#004F54" stroke="#F08D17" strokeWidth="5" />
                      </svg>
                    )}
                    {shape.shapeType === "triangle_up" && (
                      <svg className="w-8 h-8" viewBox="0 0 100 100">
                        <polygon points="50,6 94,94 6,94" fill="#F08D17" stroke="#FFFFFF" strokeWidth="4" strokeLinejoin="round" />
                      </svg>
                    )}
                    {shape.shapeType === "triangle_down" && (
                      <svg className="w-8 h-8" viewBox="0 0 100 100">
                        <polygon points="6,6 94,6 50,94" fill="#F08D17" stroke="#FFFFFF" strokeWidth="4" strokeLinejoin="round" />
                      </svg>
                    )}
                    {shape.shapeType === "triangle_right" && (
                      <svg className="w-8 h-8" viewBox="0 0 100 100">
                        <polygon points="6,6 94,50 6,94" fill="#004F54" stroke="#F08D17" strokeWidth="4" strokeLinejoin="round" />
                      </svg>
                    )}
                    {shape.shapeType === "triangle_left" && (
                      <svg className="w-8 h-8" viewBox="0 0 100 100">
                        <polygon points="94,6 6,50 94,94" fill="#004F54" stroke="#F08D17" strokeWidth="4" strokeLinejoin="round" />
                      </svg>
                    )}
                    {shape.shapeType === "diamond" && (
                      <svg className="w-8 h-8" viewBox="0 0 100 100">
                        <polygon points="50,4 96,50 50,96 4,50" fill="#F08D17" stroke="#FFFFFF" strokeWidth="4" strokeLinejoin="round" />
                      </svg>
                    )}
                    {shape.shapeType === "pentagon" && (
                      <svg className="w-8 h-8" viewBox="0 0 100 100">
                        <polygon points="50,4 96,38 78,94 22,94 4,38" fill="#004F54" stroke="#F08D17" strokeWidth="4" strokeLinejoin="round" />
                      </svg>
                    )}
                    {shape.shapeType === "hexagon" && (
                      <svg className="w-9 h-8" viewBox="0 0 100 100">
                        <polygon points="25,6 75,6 96,50 75,94 25,94 4,50" fill="#003B3F" stroke="#F08D17" strokeWidth="5" strokeLinejoin="round" />
                      </svg>
                    )}
                    {shape.shapeType === "octagon" && (
                      <svg className="w-8 h-8" viewBox="0 0 100 100">
                        <polygon points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30" fill="#F08D17" stroke="#FFFFFF" strokeWidth="4" strokeLinejoin="round" />
                      </svg>
                    )}
                    {shape.shapeType === "trapezoid" && (
                      <svg className="w-10 h-7" viewBox="0 0 100 80">
                        <polygon points="22,6 78,6 96,74 4,74" fill="#004F54" stroke="#F08D17" strokeWidth="5" strokeLinejoin="round" />
                      </svg>
                    )}
                    {shape.shapeType === "parallelogram" && (
                      <svg className="w-11 h-7" viewBox="0 0 100 70">
                        <polygon points="26,6 96,6 74,64 4,64" fill="#003B3F" stroke="#F08D17" strokeWidth="5" strokeLinejoin="round" />
                      </svg>
                    )}
                    {shape.shapeType === "star_4" && (
                      <svg className="w-8 h-8" viewBox="0 0 100 100">
                        <polygon points="50,4 62,38 96,50 62,62 50,96 38,62 4,50 38,38" fill="#F08D17" stroke="#FFFFFF" strokeWidth="4" strokeLinejoin="round" />
                      </svg>
                    )}
                    {shape.shapeType === "star_5" && (
                      <svg className="w-8 h-8" viewBox="0 0 100 100">
                        <polygon points="50,4 63,35 97,37 70,58 80,92 50,72 20,92 30,58 3,37 37,35" fill="#F08D17" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
                      </svg>
                    )}
                    {shape.shapeType === "star_6" && (
                      <svg className="w-8 h-8" viewBox="0 0 100 100">
                        <polygon points="50,2 62,26 88,14 78,38 98,50 78,62 88,86 62,74 50,98 38,74 12,86 22,62 2,50 22,38 12,14 38,26" fill="#F08D17" stroke="#004F54" strokeWidth="3" strokeLinejoin="round" />
                      </svg>
                    )}
                    {shape.shapeType === "cross" && (
                      <svg className="w-8 h-8" viewBox="0 0 100 100">
                        <polygon points="36,4 64,4 64,36 96,36 96,64 64,64 64,96 36,96 36,64 4,64 4,36 36,36" fill="#F08D17" stroke="#FFFFFF" strokeWidth="4" strokeLinejoin="round" />
                      </svg>
                    )}
                    {shape.shapeType === "arrow_right" && (
                      <svg className="w-10 h-5" viewBox="0 0 100 40">
                        <line x1="6" y1="20" x2="84" y2="20" stroke="#F08D17" strokeWidth="10" strokeLinecap="round" />
                        <polygon points="76,6 98,20 76,34" fill="#F08D17" />
                      </svg>
                    )}
                    {shape.shapeType === "arrow_left" && (
                      <svg className="w-10 h-5" viewBox="0 0 100 40">
                        <line x1="94" y1="20" x2="16" y2="20" stroke="#F08D17" strokeWidth="10" strokeLinecap="round" />
                        <polygon points="24,6 2,20 24,34" fill="#F08D17" />
                      </svg>
                    )}
                    {shape.shapeType === "arrow_up" && (
                      <svg className="w-5 h-8" viewBox="0 0 40 100">
                        <line x1="20" y1="94" x2="20" y2="16" stroke="#F08D17" strokeWidth="10" strokeLinecap="round" />
                        <polygon points="6,24 20,2 34,24" fill="#F08D17" />
                      </svg>
                    )}
                    {shape.shapeType === "arrow_down" && (
                      <svg className="w-5 h-8" viewBox="0 0 40 100">
                        <line x1="20" y1="6" x2="20" y2="84" stroke="#F08D17" strokeWidth="10" strokeLinecap="round" />
                        <polygon points="6,76 20,98 34,76" fill="#F08D17" />
                      </svg>
                    )}
                    {shape.shapeType === "arrow_block_right" && (
                      <svg className="w-11 h-6" viewBox="0 0 100 60">
                        <polygon points="4,20 58,20 58,6 96,30 58,54 58,40 4,40" fill="#004F54" stroke="#F08D17" strokeWidth="4" strokeLinejoin="round" />
                      </svg>
                    )}
                    {shape.shapeType === "arrow_block_left" && (
                      <svg className="w-11 h-6" viewBox="0 0 100 60">
                        <polygon points="96,20 42,20 42,6 4,30 42,54 42,40 96,40" fill="#004F54" stroke="#F08D17" strokeWidth="4" strokeLinejoin="round" />
                      </svg>
                    )}
                    {shape.shapeType === "arrow_curved" && (
                      <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none">
                        <path d="M14,24 C60,24 80,44 80,72" stroke="#F08D17" strokeWidth="10" strokeLinecap="round" />
                        <polygon points="66,66 80,92 94,66" fill="#F08D17" />
                      </svg>
                    )}
                    {shape.shapeType === "arrow_double_h" && (
                      <svg className="w-11 h-5" viewBox="0 0 100 40">
                        <line x1="16" y1="20" x2="84" y2="20" stroke="#004F54" strokeWidth="8" strokeLinecap="round" />
                        <polygon points="20,8 2,20 20,32" fill="#004F54" />
                        <polygon points="80,8 98,20 80,32" fill="#004F54" />
                      </svg>
                    )}
                    {shape.shapeType === "arrow_double_v" && (
                      <svg className="w-5 h-8" viewBox="0 0 40 100">
                        <line x1="20" y1="16" x2="20" y2="84" stroke="#004F54" strokeWidth="8" strokeLinecap="round" />
                        <polygon points="8,20 20,2 32,20" fill="#004F54" />
                        <polygon points="8,80 20,98 32,80" fill="#004F54" />
                      </svg>
                    )}
                    {shape.shapeType === "chevron_right" && (
                      <svg className="w-6 h-8" viewBox="0 0 60 100">
                        <polyline points="12,12 48,50 12,88" fill="none" stroke="#F08D17" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {shape.id === "sh-scroll-dots" && (
                      <div className="flex flex-col items-center justify-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#F08D17]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                      </div>
                    )}
                    {shape.id === "sh-sprint-bar" && (
                      <div className="w-11 h-2.5 bg-[#002224] rounded-full overflow-hidden p-0.5 border border-emerald-500/50">
                        <div className="w-2/3 h-full bg-emerald-400 rounded-full" />
                      </div>
                    )}
                    {shape.shapeType === "line_solid" && shape.id !== "sh-scroll-dots" && shape.id !== "sh-sprint-bar" && (
                      <div className="w-11 h-1.5 bg-[#F08D17] rounded-full shadow-xs" />
                    )}
                    {shape.shapeType === "line_dashed" && (
                      <div className="w-11 border-b-2 border-dashed border-[#004F54]" />
                    )}
                    {shape.shapeType === "line_neon" && (
                      <div className="w-11 h-0.5 bg-gradient-to-r from-transparent via-[#F08D17] to-transparent relative flex items-center justify-center">
                        <div className="w-2 h-2 rotate-45 bg-[#F08D17]" />
                      </div>
                    )}
                    {shape.shapeType === "line_vertical" && (
                      <div className="w-1.5 h-8 bg-[#F08D17] rounded-full shadow-xs" />
                    )}
                    {shape.shapeType === "pill_badge" && (
                      <div className="px-2.5 py-0.5 rounded-full bg-[#F08D17] text-white text-[8px] font-bold tracking-wider font-mono shadow-xs border border-white">
                        BADGE
                      </div>
                    )}
                    {shape.shapeType === "speech_bubble" && (
                      <svg className="w-8 h-8" viewBox="0 0 100 100">
                        <path d="M10,20 Q10,10 20,10 L80,10 Q90,10 90,20 L90,60 Q90,70 80,70 L30,70 L14,88 L18,70 L20,70 Q10,70 10,60 Z" fill="#003B3F" stroke="#F08D17" strokeWidth="4" strokeLinejoin="round" />
                      </svg>
                    )}
                    {shape.shapeType === "glass_container" && (
                      <div className="w-11 h-7 rounded-lg bg-zinc-300/40 border border-zinc-400/60 shadow-inner backdrop-blur-xs flex items-center justify-center">
                        <span className="text-[7px] font-mono text-zinc-600 font-bold">GLASS</span>
                      </div>
                    )}
                  </div>

                  <div className="text-center w-full">
                    <span className="font-extrabold text-[#111111] text-[11px] block truncate">
                      {shape.title}
                    </span>
                    <span className="text-[9px] text-zinc-500 block truncate">
                      {shape.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Design Tip to eliminate dead empty whitespace */}
          <div className="pt-2 space-y-2 select-none">
            {shapeCategoryFilter !== "todas" && (
              <button
                onClick={() => setShapeCategoryFilter("todas")}
                className="w-full py-1.5 text-center text-[10px] font-bold text-[#2563EB] hover:text-blue-800 bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200/80 rounded-lg transition-colors cursor-pointer"
              >
                Mostrar todas las formas ({allShapes.length})
              </button>
            )}
            <div className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100/80 text-[10px] text-zinc-600 flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
              <p className="leading-tight">
                <strong className="text-zinc-800 font-bold">Arrastra</strong> al lienzo para colocar libremente o haz <strong className="text-zinc-800 font-bold">clic</strong> para insertar en el centro.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 2. SECCIÓN ICONOTECA / ICONS               */}
      {/* ========================================== */}
      {activeSubCategory === "iconos" && (
        <div className="space-y-2.5">
          {/* Buscador */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar icono..."
              value={iconSearchQuery}
              onChange={(e) => setIconSearchQuery(e.target.value)}
              className="w-full pl-7 pr-3 py-1.5 rounded-xl border border-zinc-200/80 bg-white text-xs outline-none focus:border-[#2563EB] shadow-2xs"
            />
          </div>

          {/* Categorías de Iconos */}
          <div className="flex flex-wrap gap-1 p-1 bg-zinc-200/60 rounded-lg text-[9.5px] font-bold">
            {(
              [
                { id: "todos", label: "Todos" },
                { id: "finanzas", label: "Finanzas" },
                { id: "tecnologia", label: "Tecnología" },
                { id: "acciones", label: "Acciones" },
              ] as const
            ).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setIconCategoryFilter(cat.id)}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                  iconCategoryFilter === cat.id
                    ? "bg-[#2563EB] text-white shadow-2xs"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid de Iconos Puros Vectoriales */}
          <div className="grid grid-cols-3 gap-1.5 pr-0.5">
            {filteredIcons.map((ic) => {
              const IconComp = ICON_REGISTRY[ic.name] || Sparkles;
              const elementData: Parameters<typeof addCanvasElement>[0] = {
                type: "icon",
                iconName: ic.name,
                title: ic.label,
                width: 48,
                height: 48,
                customText: "#F08D17",
                sectionId: "hero",
              };

              return (
                <div
                  key={ic.name}
                  draggable
                  onDragStart={(e) => handleDragStart(e, elementData)}
                  onClick={() => addCanvasElement(elementData)}
                  className="p-2 rounded-xl border border-zinc-200/80 bg-white hover:border-[#2563EB] cursor-grab active:cursor-grabbing transition-all flex flex-col items-center justify-center gap-1.5 shadow-2xs group text-center"
                >
                  <div className="w-8 h-8 flex items-center justify-center text-[#F08D17] group-hover:scale-120 transition-transform">
                    <IconComp className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="font-extrabold text-[#111111] text-[9.5px] truncate w-full block">
                    {ic.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 3. SECCIÓN TARJETAS (DISEÑOS DISTINTOS)    */}
      {/* ========================================== */}
      {activeSubCategory === "tarjetas" && (
        <div className="space-y-2.5 pr-0.5">
          {distinctCards.map((c) => {
            const elementData: Parameters<typeof addCanvasElement>[0] = {
              type: "card",
              cardVariant: c.variant,
              title: c.title,
              subtitle: c.desc,
              badgeText: c.badgeText,
              isMultiTab: "isMultiTab" in c ? (c.isMultiTab as boolean) : undefined,
              hideTabPills: "hideTabPills" in c ? (c.hideTabPills as boolean) : undefined,
              tabs: "tabs" in c ? (c.tabs as any) : undefined,
              activeTabId: "tabs" in c && (c as any).tabs?.[0] ? (c as any).tabs[0].id : undefined,
              width: c.width,
              height: c.height,
              sectionId: "hero",
            };

            return (
              <div
                key={c.id}
                draggable
                onDragStart={(e) => handleDragStart(e, elementData)}
                onClick={() => addCanvasElement(elementData)}
                className="p-3 rounded-xl border text-left transition-all cursor-grab active:cursor-grabbing space-y-2 bg-white border-zinc-200/80 hover:border-[#2563EB] shadow-2xs group"
              >
                {/* Visual Thumbnail Preview */}
                <div className="w-full h-16 rounded-xl flex items-center justify-between p-3 relative overflow-hidden bg-[#002224] text-white">
                  {c.previewType === "glass" && (
                    <div className="w-full h-full rounded-lg bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-between px-3">
                      <span className="text-[10px] font-bold text-[#F08D17]">✨ Glass Preview</span>
                      <span className="text-[8px] font-mono bg-[#F08D17]/20 text-[#F08D17] px-1.5 py-0.5 rounded">BLUR</span>
                    </div>
                  )}
                  {c.previewType === "dotted" && (
                    <div className="w-full h-full rounded-lg border-2 border-dashed border-[#F08D17] flex items-center justify-between px-3 font-mono text-[10px]">
                      <span className="text-[#F08D17] font-bold">+ Dotted Spec +</span>
                      <span className="text-emerald-400 text-[8px]">● GRID</span>
                    </div>
                  )}
                  {c.previewType === "chamfer" && (
                    <div
                      style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
                      className="w-full h-full bg-[#003B3F] border border-[#F08D17] flex items-center justify-between px-3"
                    >
                      <span className="text-[10px] font-mono font-bold text-white">CYBER ANGLED</span>
                      <div className="w-2 h-2 rounded-full bg-[#F08D17]" />
                    </div>
                  )}
                  {c.previewType === "neon" && (
                    <div className="w-full h-full rounded-lg bg-[#001B1E] border border-[#F08D17] shadow-[0_0_12px_rgba(240,141,23,0.5)] flex items-center justify-between px-3">
                      <span className="text-[10px] font-bold text-[#F08D17] flex items-center gap-1">
                        <Zap className="w-3 h-3" /> NEÓN GLOW
                      </span>
                    </div>
                  )}
                  {c.previewType === "split" && (
                    <div className="w-full h-full rounded-lg border border-white/20 flex overflow-hidden">
                      <div className="w-1/3 bg-[#F08D17] flex items-center justify-center text-white">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="w-2/3 bg-[#002B2E] p-2 flex items-center text-[9px] font-bold">
                        Split Accent
                      </div>
                    </div>
                  )}
                  {c.previewType === "pill" && (
                    <div className="w-full h-full rounded-full bg-[#BFDAD1] text-[#135A34] border border-[#A6C5BB] flex items-center justify-between px-4 font-bold text-[10px]">
                      <span>● ENFOCO Sage Bento</span>
                    </div>
                  )}
                  {c.previewType === "kpi" && (
                    <div className="w-full h-full rounded-lg bg-[#003B3F] border border-white/20 flex items-center justify-between px-3">
                      <div>
                        <span className="text-[12px] font-mono font-black text-white">$1.45M</span>
                        <span className="text-[8px] text-zinc-400 block font-mono">KPI Transacciones</span>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">
                        +24.8% ↑
                      </span>
                    </div>
                  )}
                  {c.previewType === "quote" && (
                    <div className="w-full h-full rounded-lg bg-[#002224] border border-[#F08D17] flex items-center gap-2 px-3 text-[9px] italic text-slate-300">
                      <Quote className="w-4 h-4 text-[#F08D17] shrink-0" />
                      <span className="truncate">"Satisfacción total..."</span>
                    </div>
                  )}
                  {c.previewType === "checklist" && (
                    <div className="w-full h-full rounded-lg bg-[#003B3F] border border-white/20 flex items-center justify-between px-3 text-[9px]">
                      <span className="font-bold text-white">Checklist DoD</span>
                      <div className="flex gap-1 text-[#F08D17]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}
                  {c.previewType === "pricing" && (
                    <div className="w-full h-full rounded-lg bg-[#002B2E] border border-[#F08D17] flex items-center justify-between px-3">
                      <div>
                        <span className="text-[11px] font-mono font-black text-white">$18,500</span>
                        <span className="text-[8px] text-zinc-400 block font-mono">USD</span>
                      </div>
                      <span className="text-[8px] font-bold bg-[#F08D17] text-white px-2 py-0.5 rounded-full">
                        CTA PLAN
                      </span>
                    </div>
                  )}
                  {c.previewType === "multitab" && (
                    <div className="w-full h-full rounded-lg bg-[#002224] border border-white/20 p-2 flex flex-col justify-between">
                      <div className="flex gap-1">
                        <span className="px-1.5 py-0.5 rounded-md bg-[#F08D17] text-white text-[8px] font-bold">Fase 1</span>
                        <span className="px-1.5 py-0.5 rounded-md bg-white/10 text-white/70 text-[8px] font-bold">Fase 2</span>
                        <span className="px-1.5 py-0.5 rounded-md bg-white/10 text-white/70 text-[8px] font-bold">Fase 3</span>
                      </div>
                      <span className="text-[9px] font-bold text-white truncate">Arquitectura & Core</span>
                    </div>
                  )}
                </div>

                <div>
                  <span className="font-extrabold text-[#111111] text-xs block group-hover:text-[#2563EB] transition-colors">
                    {c.title}
                  </span>
                  <p className="text-[10px] text-[#71717A] leading-relaxed">{c.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================== */}
      {/* 4. SECCIÓN BOTONES (DISEÑOS DISTINTOS)     */}
      {/* ========================================== */}
      {activeSubCategory === "botones" && (
        <div className="space-y-2.5 pr-0.5">
          {distinctButtons.map((btn) => {
            const elementData: Parameters<typeof addCanvasElement>[0] = {
              type: "button",
              buttonVariant: btn.variant,
              title: btn.title,
              width: btn.width,
              height: btn.height,
              sectionId: "hero",
            };

            return (
              <div
                key={btn.id}
                draggable
                onDragStart={(e) => handleDragStart(e, elementData)}
                onClick={() => addCanvasElement(elementData)}
                className="p-3 rounded-xl border border-zinc-200/80 bg-white hover:border-[#2563EB] cursor-grab active:cursor-grabbing transition-all space-y-2 shadow-2xs group"
              >
                {/* Visual Button Rendering */}
                <div className="w-full flex items-center justify-center p-2 bg-[#002224] rounded-xl">
                  {btn.variant === "neon_glow_cta" && (
                    <div className="px-4 py-2 rounded-2xl bg-[#F08D17] text-white font-black text-xs shadow-[0_0_15px_rgba(240,141,23,0.5)] flex items-center gap-1.5">
                      <span>{btn.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                  {btn.variant === "glass_translucent" && (
                    <div className="px-4 py-2 rounded-2xl bg-white/10 border border-white/30 text-white font-bold text-xs backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-[#F08D17]" />
                      <span>{btn.title}</span>
                    </div>
                  )}
                  {btn.variant === "dotted_blueprint" && (
                    <div className="px-4 py-2 rounded-xl bg-[#002224] border-2 border-dashed border-[#F08D17] text-[#F08D17] font-mono font-bold text-xs flex items-center gap-1.5">
                      <span>[+] {btn.title}</span>
                    </div>
                  )}
                  {btn.variant === "cyber_chamfer" && (
                    <div
                      style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
                      className="px-4 py-2 bg-[#003B3F] border-2 border-[#F08D17] text-white font-mono font-black text-xs"
                    >
                      {btn.title}
                    </div>
                  )}
                  {btn.variant === "pill_floating_icon" && (
                    <div className="p-1 pr-3 rounded-full bg-[#004F54] border border-[#F08D17] text-white font-bold text-xs flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#F08D17] flex items-center justify-center">
                        <Zap className="w-3 h-3 text-white" />
                      </div>
                      <span className="truncate">{btn.title}</span>
                      <ArrowRight className="w-3 h-3 text-[#F08D17]" />
                    </div>
                  )}
                  {btn.variant === "two_line_tech" && (
                    <div className="p-2 px-3 rounded-2xl bg-[#002B2E] border border-white/20 text-white flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[8px] font-mono text-[#F08D17] font-extrabold uppercase block">
                          DESCARGA
                        </span>
                        <span className="font-extrabold text-[11px] text-white block truncate">
                          {btn.title}
                        </span>
                      </div>
                      <Download className="w-3.5 h-3.5 text-[#F08D17]" />
                    </div>
                  )}
                  {btn.variant === "live_pulse_badge" && (
                    <div className="px-3 py-1.5 rounded-full bg-[#002224] border border-emerald-500 text-white font-mono font-bold text-[10px] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>{btn.title}</span>
                    </div>
                  )}
                  {btn.variant === "circular_fab" && (
                    <div className="w-10 h-10 rounded-full bg-[#F08D17] border-2 border-white flex items-center justify-center text-white shadow-lg">
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div>
                  <span className="font-extrabold text-[#111111] text-xs block group-hover:text-[#2563EB] transition-colors">
                    {btn.title}
                  </span>
                  <p className="text-[10px] text-[#71717A] leading-relaxed">{btn.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================== */}
      {/* 5. SECCIÓN MÓDULOS PRO                     */}
      {/* ========================================== */}
      {activeSubCategory === "modulos" && (
        <div className="space-y-2.5 pr-0.5">
          {moduleTemplates.map((tmpl) => {
            const Icon = tmpl.icon;
            const elementData: Parameters<typeof addCanvasElement>[0] = {
              type: "module_template",
              templateType: tmpl.templateType as CanvasElement["templateType"],
              title: tmpl.title,
              width: tmpl.width,
              height: tmpl.height,
              sectionId: "hero",
            };

            return (
              <div
                key={tmpl.id}
                draggable
                onDragStart={(e) => handleDragStart(e, elementData)}
                onClick={() => addCanvasElement(elementData)}
                className="p-3 rounded-xl border border-zinc-200/80 bg-white hover:border-[#2563EB] cursor-grab active:cursor-grabbing transition-all space-y-1.5 shadow-2xs group"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-[#111111]">{tmpl.title}</span>
                </div>
                <p className="text-[11px] text-[#71717A] leading-relaxed">{tmpl.desc}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================== */}
      {/* 6. SECCIÓN IMÁGENES & MEDIA                */}
      {/* ========================================== */}
      {activeSubCategory === "imagenes" && (
        <div className="space-y-4">
          <input
            type="file"
            ref={imageInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            multiple
            className="hidden"
          />

          <button
            onClick={() => imageInputRef.current?.click()}
            className="w-full py-3.5 px-4 rounded-2xl border-2 border-dashed border-[#2563EB]/40 bg-[#2563EB]/5 hover:bg-[#2563EB]/10 text-[#2563EB] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Subir Imágenes Locales</span>
          </button>

          {uploadedImages.length > 0 && (
            <div className="space-y-2">
              <span className="font-bold text-[11px] text-zinc-700 block">Imágenes Subidas:</span>
              <div className="grid grid-cols-2 gap-2">
                {uploadedImages.map((img) => (
                  <div
                    key={img.id}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, {
                        type: "image",
                        imageUrl: img.url,
                        title: img.name,
                        width: 300,
                        height: 200,
                        sectionId: "hero",
                      })
                    }
                    onClick={() =>
                      addCanvasElement({
                        type: "image",
                        imageUrl: img.url,
                        title: img.name,
                        width: 300,
                        height: 200,
                        sectionId: "hero",
                      })
                    }
                    className="p-1.5 rounded-xl border border-zinc-200 bg-white hover:border-[#2563EB] cursor-grab active:cursor-grabbing transition-all space-y-1"
                  >
                    <img src={img.url} alt={img.name} className="w-full h-20 object-cover rounded-lg" />
                    <span className="text-[10px] text-zinc-600 block truncate text-center font-mono">
                      {img.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
