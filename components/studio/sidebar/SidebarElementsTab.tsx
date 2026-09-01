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
    { id: "sh-circle", title: "Círculo", cat: "basicas", shapeType: "circle" as const, width: 90, height: 90, bg: "#F08D17", border: "#FFFFFF", desc: "Círculo vectorial con relleno." },
    { id: "sh-ellipse", title: "Elipse", cat: "basicas", shapeType: "ellipse" as const, width: 130, height: 80, bg: "#004F54", border: "#F08D17", desc: "Elipse horizontal." },
    { id: "sh-square", title: "Cuadrado", cat: "basicas", shapeType: "square" as const, width: 90, height: 90, bg: "#003B3F", border: "#F08D17", desc: "Cuadrado con esquinas rectas." },
    { id: "sh-rounded-rect", title: "Rectángulo Redondeado", cat: "basicas", shapeType: "rounded_rect" as const, width: 140, height: 80, bg: "rgba(0, 79, 84, 0.9)", border: "#F08D17", desc: "Caja con esquinas suaves." },
    { id: "sh-tri-up", title: "Triángulo Arriba", cat: "basicas", shapeType: "triangle_up" as const, width: 90, height: 90, bg: "#F08D17", border: "#FFFFFF", desc: "Triángulo apuntando arriba." },
    { id: "sh-tri-down", title: "Triángulo Abajo", cat: "basicas", shapeType: "triangle_down" as const, width: 90, height: 90, bg: "#F08D17", border: "#FFFFFF", desc: "Triángulo apuntando abajo." },
    { id: "sh-tri-right", title: "Triángulo Derecha", cat: "basicas", shapeType: "triangle_right" as const, width: 90, height: 90, bg: "#004F54", border: "#F08D17", desc: "Triángulo apuntando derecha." },
    { id: "sh-tri-left", title: "Triángulo Izquierda", cat: "basicas", shapeType: "triangle_left" as const, width: 90, height: 90, bg: "#004F54", border: "#F08D17", desc: "Triángulo apuntando izquierda." },

    // Polígonos
    { id: "sh-diamond", title: "Rombo / Diamante", cat: "poligonos", shapeType: "diamond" as const, width: 90, height: 90, bg: "#F08D17", border: "#FFFFFF", desc: "Rombo de 4 lados." },
    { id: "sh-pentagon", title: "Pentágono", cat: "poligonos", shapeType: "pentagon" as const, width: 90, height: 90, bg: "#004F54", border: "#F08D17", desc: "Polígono de 5 lados." },
    { id: "sh-hexagon", title: "Hexágono", cat: "poligonos", shapeType: "hexagon" as const, width: 90, height: 90, bg: "#003B3F", border: "#F08D17", desc: "Polígono de 6 lados." },
    { id: "sh-octagon", title: "Octágono", cat: "poligonos", shapeType: "octagon" as const, width: 90, height: 90, bg: "#F08D17", border: "#FFFFFF", desc: "Polígono de 8 lados." },
    { id: "sh-trapezoid", title: "Trapecio", cat: "poligonos", shapeType: "trapezoid" as const, width: 120, height: 80, bg: "#004F54", border: "#F08D17", desc: "Trapecio simétrico." },
    { id: "sh-parallelogram", title: "Paralelogramo", cat: "poligonos", shapeType: "parallelogram" as const, width: 130, height: 75, bg: "#003B3F", border: "#F08D17", desc: "Paralelogramo inclinado." },
    { id: "sh-star4", title: "Estrella 4 Puntas", cat: "poligonos", shapeType: "star_4" as const, width: 90, height: 90, bg: "#F08D17", border: "#FFFFFF", desc: "Estrella de destello." },
    { id: "sh-star5", title: "Estrella 5 Puntas", cat: "poligonos", shapeType: "star_5" as const, width: 90, height: 90, bg: "#F08D17", border: "#FFFFFF", desc: "Estrella clásica." },
    { id: "sh-star6", title: "Estrella 6 Puntas", cat: "poligonos", shapeType: "star_6" as const, width: 90, height: 90, bg: "#004F54", border: "#F08D17", desc: "Sello o estrella múltiple." },
    { id: "sh-cross", title: "Cruz / Plus", cat: "poligonos", shapeType: "cross" as const, width: 80, height: 80, bg: "#F08D17", border: "#FFFFFF", desc: "Cruz o símbolo de adición." },

    // Flechas
    { id: "sh-arr-right", title: "Flecha Derecha", cat: "flechas", shapeType: "arrow_right" as const, width: 140, height: 40, bg: "#F08D17", border: "transparent", desc: "Flecha lineal derecha." },
    { id: "sh-arr-left", title: "Flecha Izquierda", cat: "flechas", shapeType: "arrow_left" as const, width: 140, height: 40, bg: "#F08D17", border: "transparent", desc: "Flecha lineal izquierda." },
    { id: "sh-arr-up", title: "Flecha Arriba", cat: "flechas", shapeType: "arrow_up" as const, width: 40, height: 140, bg: "#F08D17", border: "transparent", desc: "Flecha lineal arriba." },
    { id: "sh-arr-down", title: "Flecha Abajo", cat: "flechas", shapeType: "arrow_down" as const, width: 40, height: 140, bg: "#F08D17", border: "transparent", desc: "Flecha lineal abajo." },
    { id: "sh-arr-blk-r", title: "Flecha Bloque Derecha", cat: "flechas", shapeType: "arrow_block_right" as const, width: 130, height: 60, bg: "#004F54", border: "#F08D17", desc: "Flecha gruesa rellena." },
    { id: "sh-arr-blk-l", title: "Flecha Bloque Izquierda", cat: "flechas", shapeType: "arrow_block_left" as const, width: 130, height: 60, bg: "#004F54", border: "#F08D17", desc: "Flecha gruesa izquierda." },
    { id: "sh-arr-curved", title: "Flecha Curva Conector", cat: "flechas", shapeType: "arrow_curved" as const, width: 100, height: 100, bg: "#F08D17", border: "transparent", desc: "Flecha curva para pasos de flujo." },
    { id: "sh-arr-dbl-h", title: "Flecha Bidireccional H", cat: "flechas", shapeType: "arrow_double_h" as const, width: 150, height: 40, bg: "#004F54", border: "transparent", desc: "Flecha de doble sentido." },
    { id: "sh-arr-dbl-v", title: "Flecha Bidireccional V", cat: "flechas", shapeType: "arrow_double_v" as const, width: 40, height: 150, bg: "#004F54", border: "transparent", desc: "Flecha de doble sentido vertical." },
    { id: "sh-chevron-r", title: "Chevron Puntero", cat: "flechas", shapeType: "chevron_right" as const, width: 50, height: 80, bg: "#F08D17", border: "transparent", desc: "Puntero chevron." },

    // Líneas
    { id: "sh-line-solid", title: "Línea Divisoria Sólida", cat: "lineas", shapeType: "line_solid" as const, width: 280, height: 16, bg: "#F08D17", border: "transparent", desc: "Línea separadora simple." },
    { id: "sh-line-dashed", title: "Línea Punteada (Dashed)", cat: "lineas", shapeType: "line_dashed" as const, width: 280, height: 16, bg: "#004F54", border: "transparent", desc: "Línea discontinua punteada." },
    { id: "sh-line-neon", title: "Línea Neón con Nodo", cat: "lineas", shapeType: "line_neon" as const, width: 320, height: 24, bg: "#F08D17", border: "transparent", desc: "Línea degradada con rombo central." },
    { id: "sh-line-vert", title: "Línea Vertical", cat: "lineas", shapeType: "line_vertical" as const, width: 16, height: 200, bg: "#F08D17", border: "transparent", desc: "Separador vertical." },

    // UI & Contenedores
    { id: "sh-pill-badge", title: "Píldora / Badge Oficial", cat: "ui", shapeType: "pill_badge" as const, width: 180, height: 38, bg: "#F08D17", border: "#FFFFFF", desc: "Píldora para etiquetas o estados." },
    { id: "sh-speech", title: "Burbuja de Diálogo", cat: "ui", shapeType: "speech_bubble" as const, width: 220, height: 90, bg: "#003B3F", border: "#F08D17", desc: "Globo de mensaje con colita." },
    { id: "sh-glass", title: "Contenedor Glassmorphism", cat: "ui", shapeType: "glass_container" as const, width: 260, height: 140, bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.2)", desc: "Tarjeta translúcida con blur." },
    { id: "sh-scroll-dots", title: "Indicador Scroll Vertical", cat: "ui", shapeType: "line_solid" as const, width: 44, height: 260, bg: "rgba(0,0,0,0.6)", border: "rgba(255,255,255,0.2)", desc: "Barra de navegación vertical con bolitas." },
    { id: "sh-sprint-bar", title: "Barra de Progreso Sprint", cat: "ui", shapeType: "line_solid" as const, width: 340, height: 80, bg: "#002224", border: "#059669", desc: "Indicador de avance de entregables." },
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
    <div className="space-y-4 text-xs p-4">
      {/* Main Subtabs Navigation */}
      <div className="grid grid-cols-6 gap-1 p-1 bg-[#F4F4F5] rounded-xl border border-[#E4E4E7] text-[10px]">
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
            className={`py-1.5 rounded-lg font-bold text-center transition-all cursor-pointer truncate ${
              activeSubCategory === tab.id
                ? "bg-white text-[#2563EB] shadow-xs"
                : "text-[#71717A] hover:text-zinc-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <p className="text-[11px] text-zinc-500 italic">
        💡 Arrastra cualquier elemento directamente al lienzo o haz clic para insertarlo.
      </p>

      {/* ========================================== */}
      {/* 1. SECCIÓN FORMAS & RAYAS                  */}
      {/* ========================================== */}
      {activeSubCategory === "formas" && (
        <div className="space-y-3.5">
          {/* Categorías de formas */}
          <div className="flex flex-wrap gap-1 p-1 bg-zinc-100 rounded-lg text-[10px] font-bold">
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
          <div className="grid grid-cols-2 gap-2.5 max-h-[480px] overflow-y-auto pr-1">
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
                  className="p-3 rounded-2xl border border-[#E4E4E7] bg-[#FAF9F6] hover:bg-white hover:border-[#2563EB] cursor-grab active:cursor-grabbing transition-all flex flex-col items-center justify-between gap-2 shadow-xs group"
                >
                  {/* Visual Preview */}
                  <div className="w-16 h-14 flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform">
                    {shape.shapeType === "circle" && (
                      <div className="w-10 h-10 rounded-full bg-[#F08D17] border-2 border-white shadow-sm" />
                    )}
                    {shape.shapeType === "ellipse" && (
                      <div className="w-12 h-7 rounded-full bg-[#004F54] border-2 border-[#F08D17] shadow-sm" />
                    )}
                    {shape.shapeType === "square" && (
                      <div className="w-9 h-9 bg-[#003B3F] border-2 border-[#F08D17] shadow-sm" />
                    )}
                    {shape.shapeType === "rounded_rect" && (
                      <div className="w-12 h-8 rounded-xl bg-[#004F54] border-2 border-[#F08D17] shadow-sm" />
                    )}
                    {shape.shapeType === "triangle_up" && (
                      <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[32px] border-b-[#F08D17]" />
                    )}
                    {shape.shapeType === "triangle_down" && (
                      <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[32px] border-t-[#F08D17]" />
                    )}
                    {shape.shapeType === "triangle_right" && (
                      <div className="w-0 h-0 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent border-l-[28px] border-l-[#004F54]" />
                    )}
                    {shape.shapeType === "triangle_left" && (
                      <div className="w-0 h-0 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent border-r-[28px] border-r-[#004F54]" />
                    )}
                    {shape.shapeType === "diamond" && (
                      <div className="w-8 h-8 rotate-45 bg-[#F08D17] border-2 border-white shadow-sm" />
                    )}
                    {shape.shapeType === "pentagon" && (
                      <Hexagon className="w-9 h-9 text-[#004F54] fill-[#004F54]" />
                    )}
                    {shape.shapeType === "hexagon" && (
                      <Hexagon className="w-10 h-10 text-[#F08D17] fill-[#003B3F]" />
                    )}
                    {shape.shapeType === "octagon" && (
                      <div className="w-9 h-9 rounded-lg rotate-12 bg-[#F08D17] border-2 border-white" />
                    )}
                    {shape.shapeType === "star_4" && (
                      <Sparkles className="w-9 h-9 text-[#F08D17] fill-[#F08D17]" />
                    )}
                    {shape.shapeType === "star_5" && (
                      <Star className="w-9 h-9 text-[#F08D17] fill-[#F08D17]" />
                    )}
                    {shape.shapeType === "star_6" && (
                      <Award className="w-9 h-9 text-[#004F54] fill-[#F08D17]" />
                    )}
                    {shape.shapeType === "cross" && (
                      <Plus className="w-9 h-9 text-[#F08D17] stroke-[4]" />
                    )}
                    {shape.shapeType === "arrow_right" && (
                      <ArrowRight className="w-10 h-7 text-[#F08D17] stroke-[3]" />
                    )}
                    {shape.shapeType === "arrow_left" && (
                      <ArrowLeft className="w-10 h-7 text-[#F08D17] stroke-[3]" />
                    )}
                    {shape.shapeType === "arrow_up" && (
                      <ArrowUp className="w-7 h-10 text-[#F08D17] stroke-[3]" />
                    )}
                    {shape.shapeType === "arrow_down" && (
                      <ArrowDown className="w-7 h-10 text-[#F08D17] stroke-[3]" />
                    )}
                    {shape.shapeType === "arrow_block_right" && (
                      <div className="flex items-center">
                        <div className="w-6 h-3 bg-[#004F54]" />
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-[#004F54]" />
                      </div>
                    )}
                    {shape.shapeType === "arrow_curved" && (
                      <div className="text-[#F08D17] font-black text-2xl">⤷</div>
                    )}
                    {shape.shapeType === "arrow_double_h" && (
                      <div className="text-[#004F54] font-black text-xl">↔</div>
                    )}
                    {shape.shapeType === "line_solid" && (
                      <div className="w-12 h-1 bg-[#F08D17] rounded-full" />
                    )}
                    {shape.shapeType === "line_dashed" && (
                      <div className="w-12 border-b-2 border-dashed border-[#004F54]" />
                    )}
                    {shape.shapeType === "line_neon" && (
                      <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#F08D17] to-transparent relative flex items-center justify-center">
                        <div className="w-2 h-2 rotate-45 bg-[#F08D17]" />
                      </div>
                    )}
                    {shape.shapeType === "line_vertical" && (
                      <div className="w-1 h-10 bg-[#F08D17] rounded-full" />
                    )}
                    {shape.shapeType === "pill_badge" && (
                      <div className="px-2 py-0.5 rounded-full bg-[#F08D17] text-white text-[8px] font-bold">
                        BADGE
                      </div>
                    )}
                    {shape.shapeType === "speech_bubble" && (
                      <MessageSquare className="w-9 h-9 text-[#003B3F] fill-[#003B3F]" />
                    )}
                    {shape.shapeType === "glass_container" && (
                      <div className="w-12 h-8 rounded-lg bg-zinc-400/30 border border-zinc-500/50 shadow-inner" />
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
        </div>
      )}

      {/* ========================================== */}
      {/* 2. SECCIÓN ICONOTECA / ICONS               */}
      {/* ========================================== */}
      {activeSubCategory === "iconos" && (
        <div className="space-y-3.5">
          {/* Buscador */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar icono (ej: banco, seguridad, dolar, app)..."
              value={iconSearchQuery}
              onChange={(e) => setIconSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-zinc-300 bg-white text-xs outline-none focus:border-[#2563EB] shadow-2xs"
            />
          </div>

          {/* Selector de estilo de icono */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-zinc-600 block">Estilo del Icono:</span>
            <div className="grid grid-cols-4 gap-1 p-1 bg-zinc-100 rounded-lg text-[9px] font-bold">
              {(
                [
                  { id: "circle_badge", label: "Círculo" },
                  { id: "square_badge", label: "Cuadrado" },
                  { id: "glass_badge", label: "Glass" },
                  { id: "plain", label: "Plano" },
                ] as const
              ).map((st) => (
                <button
                  key={st.id}
                  onClick={() => setSelectedIconStyle(st.id)}
                  className={`py-1 rounded-md transition-all cursor-pointer text-center ${
                    selectedIconStyle === st.id
                      ? "bg-[#2563EB] text-white shadow-2xs"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Categorías de Iconos */}
          <div className="flex flex-wrap gap-1 p-1 bg-zinc-100 rounded-lg text-[10px] font-bold">
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

          {/* Grid de Iconos */}
          <div className="grid grid-cols-3 gap-2 max-h-[420px] overflow-y-auto pr-1">
            {filteredIcons.map((ic) => {
              const IconComp = ICON_REGISTRY[ic.name] || Sparkles;
              const elementData: Parameters<typeof addCanvasElement>[0] = {
                type: "icon",
                iconName: ic.name,
                iconStyle: selectedIconStyle,
                title: ic.label,
                width: selectedIconStyle === "plain" ? 48 : 56,
                height: selectedIconStyle === "plain" ? 48 : 56,
                customBg: selectedIconStyle === "circle_badge" ? "rgba(240, 141, 23, 0.15)" : selectedIconStyle === "square_badge" ? "#003B3F" : "rgba(255,255,255,0.08)",
                customBorder: selectedIconStyle === "circle_badge" ? "rgba(240, 141, 23, 0.4)" : selectedIconStyle === "square_badge" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.25)",
                customText: selectedIconStyle === "circle_badge" ? "#F08D17" : "#FFFFFF",
                sectionId: "hero",
              };

              return (
                <div
                  key={ic.name}
                  draggable
                  onDragStart={(e) => handleDragStart(e, elementData)}
                  onClick={() => addCanvasElement(elementData)}
                  className="p-2.5 rounded-2xl border border-[#E4E4E7] bg-[#FAF9F6] hover:bg-white hover:border-[#2563EB] cursor-grab active:cursor-grabbing transition-all flex flex-col items-center justify-center gap-1.5 shadow-xs group text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[#F08D17] group-hover:scale-110 group-hover:bg-[#2563EB]/10 group-hover:text-[#2563EB] transition-transform">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-[#111111] text-[10px] truncate w-full block">
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
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
          {distinctCards.map((c) => {
            const elementData: Parameters<typeof addCanvasElement>[0] = {
              type: "card",
              cardVariant: c.variant,
              title: c.title,
              subtitle: c.desc,
              badgeText: c.badgeText,
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
                className="p-3.5 rounded-2xl border text-left transition-all cursor-grab active:cursor-grabbing space-y-2 bg-[#FAF9F6] border-[#E4E4E7] hover:bg-white hover:border-[#2563EB] shadow-xs group"
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
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
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
                className="p-3.5 rounded-2xl border border-[#E4E4E7] bg-[#FAF9F6] hover:bg-white hover:border-[#2563EB] cursor-grab active:cursor-grabbing transition-all space-y-2 shadow-xs group"
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
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
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
                className="p-3.5 rounded-2xl border border-[#E4E4E7] bg-[#FAF9F6] hover:bg-white hover:border-[#2563EB] cursor-grab active:cursor-grabbing transition-all space-y-1.5 shadow-xs group"
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
