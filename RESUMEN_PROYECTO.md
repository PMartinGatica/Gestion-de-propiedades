# 📋 Resumen del Proyecto

## 🎯 Qué hace esta aplicación

Sistema web para administrar propiedades de alquiler en Booking.com con:
- ✅ Gestión de movimientos (reservas)
- ✅ Cálculo automático de comisiones y ganancias
- ✅ Roles de usuario (Administrador y Propietarios)
- ✅ Sincronización con Google Sheets

## 👥 Usuarios

| Usuario  | Rol           | Puede hacer                              |
|----------|---------------|------------------------------------------|
| Pablo    | Administrador | ✅ Crear, ✅ Editar, ✅ Eliminar, ✅ Ver |
| Ricardo  | Propietario   | ❌ Crear, ❌ Editar, ❌ Eliminar, ✅ Ver |
| Fernanda | Propietario   | ❌ Crear, ❌ Editar, ❌ Eliminar, ✅ Ver |

## 📊 Flujo de Datos

```
┌─────────────────┐
│   Usuario Web   │
│  (Pablo/Owner)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  React Frontend │
│  (localhost)    │
│  - Formularios  │
│  - Cálculos     │
│  - Tablas       │
└────────┬────────┘
         │ HTTP/HTTPS
         │ (axios)
         ▼
┌─────────────────┐
│ Google Apps     │
│ Script (API)    │
│  - doGet()      │
│  - doPost()     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Google Sheets  │
│   (Base de      │
│    Datos)       │
└─────────────────┘
```

## 🧮 Cálculos Automáticos

Cuando ingresas:
- ✏️ Check-in
- ✏️ Check-out
- ✏️ Precio Dólar: **$100**
- ✏️ Precio Pesos Booking: **$150,000**
- ✏️ Limpieza: **$5,000**

La app calcula automáticamente:
- 🔢 Comisión Booking (15%): **$15**
- 🔢 Ganancia Real: **$85**
- 🔢 Precio Pesos: **$127,500**
- 🔢 Comisión Pablo (10%): **$15,000**
- 💰 Para Ricardo: **$51,250**
- 💰 Para Fernanda: **$51,250**

## 📁 Estructura de Archivos

```
property-management/
│
├── 📄 README.md                 ← Guía completa
├── 📄 GUIA_RAPIDA.md           ← Setup en 5 pasos
├── 📄 DATOS_EJEMPLO.md         ← Datos para pruebas
├── 📄 package.json             ← Dependencias NPM
├── 📄 .env.example             ← Template de configuración
│
├── 📂 src/                     ← Código Frontend
│   ├── 📂 components/
│   │   ├── 📂 Admin/
│   │   │   ├── Dashboard.jsx        (Panel admin)
│   │   │   ├── MovementForm.jsx     (Formulario CRUD)
│   │   │   └── MovementTable.jsx    (Tabla editable)
│   │   ├── 📂 Auth/
│   │   │   └── Login.jsx            (Pantalla login)
│   │   ├── 📂 Layout/
│   │   │   └── Header.jsx           (Barra superior)
│   │   └── 📂 Owner/
│   │       └── OwnerView.jsx        (Vista propietarios)
│   │
│   ├── 📂 context/
│   │   └── AuthContext.jsx     ← Manejo de usuarios
│   │
│   ├── 📂 services/
│   │   └── api.js             ← Conexión con backend
│   │
│   ├── 📂 utils/
│   │   └── calculations.js    ← Fórmulas de cálculo
│   │
│   ├── App.jsx                ← Componente principal
│   ├── main.jsx               ← Punto de entrada
│   └── index.css              ← Estilos Tailwind
│
└── 📂 backend/                ← Código Backend
    ├── Code.gs                (Google Apps Script)
    ├── appsscript.json        (Configuración)
    └── README.md              (Docs del backend)
```

## 🎨 Pantallas de la Aplicación

### 1. Login
```
┌─────────────────────────────┐
│   Gestión de Propiedades    │
│                              │
│   ┌───────────────────┐     │
│   │ Nombre de usuario │     │
│   └───────────────────┘     │
│                              │
│   [     Ingresar     ]       │
│                              │
│   Usuarios: pablo,           │
│   ricardo, fernanda          │
└─────────────────────────────┘
```

### 2. Dashboard Admin (Pablo)
```
┌────────────────────────────────────────┐
│ Gestión de Propiedades     [Pablo] [Salir] │
├────────────────────────────────────────┤
│                                         │
│ [$100,000]  [$500,000]  [$500,000]     │
│  Total USD   Ricardo    Fernanda        │
│                                         │
│ [+ Agregar Nuevo Movimiento]           │
│                                         │
│ ┌────────────────────────────────────┐ │
│ │ Check-in  │ Precio │ Ricardo │ ... │ │
│ ├───────────┼────────┼─────────┼─────┤ │
│ │ 15/01/24  │ $100   │ $51,250 │ ... │ │
│ │ 01/02/24  │ $500   │ $273K   │ ... │ │
│ └────────────────────────────────────┘ │
└────────────────────────────────────────┘
```

### 3. Vista Propietario (Ricardo/Fernanda)
```
┌────────────────────────────────────────┐
│ Mis Movimientos - Ricardo  [Salir]     │
├────────────────────────────────────────┤
│                                         │
│  Filtrar: [2024 ▼]                     │
│                                         │
│ [10]        [$500,000]   [$300,000]    │
│ Reservas    Total        Pendiente     │
│                                         │
│ ┌────────────────────────────────────┐ │
│ │ Check-in  │ Precio │ Mi Ganancia  │ │
│ ├───────────┼────────┼──────────────┤ │
│ │ 15/01/24  │ $100   │ $51,250      │ │
│ │ 01/02/24  │ $500   │ $273,250     │ │
│ └────────────────────────────────────┘ │
└────────────────────────────────────────┘
```

### 4. Formulario de Movimiento
```
┌─────────────────────────────────────────┐
│ Nuevo Movimiento                        │
├─────────────────────────────────────────┤
│                                          │
│ Check-In:    [15/01/2024]               │
│ Check-Out:   [20/01/2024]               │
│                                          │
│ Precio Dólar:          [$100.00]        │
│ Precio Pesos Booking:  [$150,000]       │
│ Limpieza:              [$5,000]         │
│ □ Salió (Pagado)                        │
│                                          │
│ ┌─ Campos Calculados ──────────────┐   │
│ │ Comisión Booking:    $15.00      │   │
│ │ Ganancia Real:       $85.00      │   │
│ │ Precio Pesos:        $127,500    │   │
│ │ Para Ricardo:        $51,250     │   │
│ │ Para Fernanda:       $51,250     │   │
│ └──────────────────────────────────┘   │
│                                          │
│        [Cancelar]  [Guardar Movimiento] │
└─────────────────────────────────────────┘
```

## 🔐 Seguridad

- ✅ Login simple por nombre (sin contraseña)
- ✅ Roles almacenados en localStorage
- ⚠️ No usar para datos extremadamente sensibles
- ✅ Google Apps Script ejecuta con tus permisos
- ✅ Solo tú puedes modificar el backend

## 🚀 Tecnologías Usadas

### Frontend
- **React 18**: Framework UI
- **Vite**: Build tool (súper rápido)
- **Tailwind CSS 3**: Estilos
- **React Router**: Navegación
- **Axios**: HTTP requests
- **date-fns**: Manejo de fechas

### Backend
- **Google Apps Script**: Runtime de JavaScript
- **Google Sheets**: Base de datos

## 📈 Límites y Escalabilidad

| Aspecto | Límite | Recomendación |
|---------|--------|---------------|
| Movimientos | ~5,000 | OK para uso actual |
| Usuarios concurrentes | ~20 | OK para equipo pequeño |
| API calls/día | 20,000 | Más que suficiente |
| Tamaño de Sheets | 5M celdas | No es problema |
| Tiempo de respuesta | 2-5 seg | Aceptable |

## 💰 Costos

| Servicio | Costo Mensual |
|----------|---------------|
| Google Sheets | **GRATIS** |
| Google Apps Script | **GRATIS** |
| Hosting Frontend (Vercel) | **GRATIS** |
| **TOTAL** | **$0** 🎉 |

## 🎓 Cómo Funciona (Técnico)

### 1. Login
```javascript
// Usuario ingresa nombre
login('pablo')
  → Busca en array de usuarios
  → Guarda en localStorage
  → Redirige según rol
```

### 2. Crear Movimiento
```javascript
// Usuario llena formulario
onSubmit(data)
  → Calcula campos (frontend)
  → axios.post(API_URL, completeData)
  → Apps Script recibe
  → sheet.appendRow(newRow)
  → Google Sheets actualiza
  → Frontend recarga datos
```

### 3. Obtener Movimientos
```javascript
// Al cargar la página
loadMovements()
  → axios.get(API_URL + '?action=getAll')
  → Apps Script consulta sheet
  → sheet.getDataRange().getValues()
  → Convierte a JSON
  → Frontend muestra en tabla
```

## 🔄 Ciclo de Actualización

```
Usuario ingresa datos
      ↓
Frontend calcula preview
      ↓
Usuario confirma
      ↓
POST a Apps Script
      ↓
Se guarda en Sheets
      ↓
GET actualiza frontend
      ↓
Usuario ve cambios
```

## 📞 Próximos Pasos

1. ✅ Lee el **README.md** completo
2. ✅ Sigue la **GUIA_RAPIDA.md**
3. ✅ Prueba con **DATOS_EJEMPLO.md**
4. ✅ Personaliza según tus necesidades
5. 🚀 ¡Despliega a producción!

## 🎯 Mantenimiento

- **Diario**: Ninguno (automático)
- **Mensual**: Revisar logs de errores
- **Anual**: Actualizar dependencias NPM

## ⚡ Comandos Rápidos

```bash
# Instalar
npm install

# Desarrollar
npm run dev

# Producción
npm run build
vercel
```

---

**¿Listo para empezar? → Lee GUIA_RAPIDA.md**
