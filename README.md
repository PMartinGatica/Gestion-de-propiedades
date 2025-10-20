# Sistema de Gestión de Propiedades Booking

Aplicación web para administrar propiedades de alquiler con Booking.com. Permite gestionar movimientos, calcular comisiones automáticamente y visualizar ganancias de los propietarios.

## 📋 Características

### Para Administradores (Pablo)
- ✅ Crear, editar y eliminar movimientos
- ✅ Formulario con cálculos automáticos en tiempo real
- ✅ Vista completa de todos los movimientos
- ✅ Dashboard con resúmenes y totales

### Para Propietarios (Ricardo, Fernanda)
- ✅ Vista de solo lectura de todos los movimientos
- ✅ Filtros por año
- ✅ Resumen de ingresos totales, pagados y pendientes
- ✅ Vista personalizada de sus ganancias

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + Vite + Tailwind CSS 3
- **Backend**: Google Apps Script
- **Base de datos**: Google Sheets
- **Routing**: React Router v6
- **HTTP Client**: Axios

## 📐 Estructura del Proyecto

```
property-management/
├── backend/
│   ├── Code.gs              # Google Apps Script (Backend)
│   └── appsscript.json      # Configuración de Apps Script
├── src/
│   ├── components/
│   │   ├── Admin/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── MovementForm.jsx
│   │   │   └── MovementTable.jsx
│   │   ├── Auth/
│   │   │   └── Login.jsx
│   │   ├── Layout/
│   │   │   └── Header.jsx
│   │   └── Owner/
│   │       └── OwnerView.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── calculations.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🚀 Instalación y Configuración

### Paso 1: Configurar Google Sheets

1. **Crear o abrir tu Google Sheet existente**
   - Si es una hoja nueva, crea una hoja llamada "Movimientos"
   - Si ya existe, asegúrate que el nombre sea correcto

2. **Configurar encabezados** (si es nueva)
   Los encabezados deben ser (en este orden):
   ```
   check-in | checkout | Precio dolar | Comisión Booking | GanaciaReal |
   Precio_Pesos | Precio_Pesos_booking | Pelado | Fernanda |
   Comisión _Pablo | Limpieza | Salio
   ```

3. **Obtener el ID de la hoja**
   - La URL de tu Google Sheet tiene este formato:
     `https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`
   - Copia el `SPREADSHEET_ID`

### Paso 2: Configurar Google Apps Script

1. **Abrir el editor de Apps Script**
   - En tu Google Sheet, ve a: Extensiones → Apps Script

2. **Copiar el código**
   - Borra el código por defecto
   - Copia todo el contenido de `backend/Code.gs`
   - Pégalo en el editor

3. **Configurar el ID de la hoja**
   - En la línea 8, reemplaza:
     ```javascript
     const SPREADSHEET_ID = 'TU_SPREADSHEET_ID_AQUI';
     ```
   - Con tu ID real:
     ```javascript
     const SPREADSHEET_ID = '1abc123xyz...';
     ```

4. **Verificar el nombre de la hoja**
   - En la línea 9, asegúrate que coincida con el nombre de tu hoja:
     ```javascript
     const SHEET_NAME = 'Movimientos';
     ```

5. **Ejecutar setupSheet (solo la primera vez si es hoja nueva)**
   - En el menú superior, selecciona la función `setupSheet`
   - Haz clic en "Ejecutar" (▶️)
   - Autoriza los permisos cuando se soliciten
   - Esto creará los encabezados automáticamente

6. **Implementar como Web App**
   - Haz clic en "Implementar" → "Nueva implementación"
   - Selecciona el tipo: "Aplicación web"
   - Configuración:
     - **Descripción**: "API de Gestión de Propiedades v1"
     - **Ejecutar como**: "Yo (tu email)"
     - **Quién tiene acceso**: "Cualquier persona"
   - Haz clic en "Implementar"
   - **IMPORTANTE**: Copia la URL de la Web App (la necesitarás en el paso 3)
   - Formato: `https://script.google.com/macros/s/XXXXXX/exec`

### Paso 3: Configurar el Frontend

1. **Instalar dependencias**
   ```bash
   cd property-management
   npm install
   ```

2. **Configurar variables de entorno**
   - Crea un archivo `.env` en la raíz del proyecto:
     ```bash
     cp .env.example .env
     ```
   - Abre `.env` y reemplaza con tu URL de Apps Script:
     ```env
     VITE_API_URL=https://script.google.com/macros/s/TU_SCRIPT_ID_AQUI/exec
     ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   - La aplicación se abrirá automáticamente en `http://localhost:3000`
   - Si no, ábrelo manualmente

### Paso 4: Probar la aplicación

1. **Login**
   - Usuarios válidos: `pablo`, `ricardo`, `fernanda`
   - Pablo: acceso de administrador
   - Ricardo/Fernanda: acceso de propietario

2. **Crear un movimiento de prueba (como Pablo)**
   - Check-in: cualquier fecha
   - Check-out: fecha posterior
   - Precio Dólar: 100
   - Precio Pesos Booking: 150000
   - Limpieza: 5000
   - Verás los cálculos automáticos

3. **Verificar en Google Sheets**
   - Los datos deben aparecer en tu hoja
   - Todos los campos calculados deben estar completos

## 📊 Fórmulas de Cálculo

El sistema calcula automáticamente:

1. **Comisión Booking** = Precio_Dolar × 0.15
2. **Ganancia Real** = Precio_Dolar - Comisión_Booking
3. **Precio_Pesos** = (Precio_Pesos_booking ÷ Precio_Dolar) × Ganancia_Real
4. **Comisión_Pablo** = Precio_Pesos_booking × 0.10
5. **Pelado (Ricardo)** = ((Precio_Pesos - Comisión_Pablo) ÷ 2) - Limpieza
6. **Fernanda** = ((Precio_Pesos - Comisión_Pablo) ÷ 2) - Limpieza

## 👥 Usuarios del Sistema

| Usuario  | Contraseña | Rol           | Permisos                    |
|----------|------------|---------------|----------------------------|
| pablo    | -          | Administrador | CRUD completo              |
| ricardo  | -          | Propietario   | Solo lectura               |
| fernanda | -          | Propietario   | Solo lectura               |

*Nota: El sistema usa autenticación simple por nombre, sin contraseña.*

## 🔧 Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo

# Producción
npm run build        # Crear build de producción
npm run preview      # Previsualizar build de producción
```

## 📱 Despliegue a Producción

### Opción 1: Vercel (Recomendado)

1. **Instalar Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Desplegar**
   ```bash
   vercel
   ```

3. **Configurar variables de entorno en Vercel**
   - Ve a tu proyecto en vercel.com
   - Settings → Environment Variables
   - Agrega `VITE_API_URL` con tu URL de Apps Script

### Opción 2: Netlify

1. **Instalar Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build y deploy**
   ```bash
   npm run build
   netlify deploy --prod
   ```

### Opción 3: GitHub Pages

1. **Agregar configuración de base en vite.config.js**
   ```javascript
   export default defineConfig({
     base: '/property-management/',
     // ... resto de la configuración
   })
   ```

2. **Build y desplegar**
   ```bash
   npm run build
   # Subir carpeta dist/ a GitHub Pages
   ```

## 🐛 Solución de Problemas

### Error: "CORS policy blocked"
- Asegúrate de haber desplegado el Apps Script como "Aplicación web"
- Verifica que "Quién tiene acceso" esté en "Cualquier persona"

### Error: "Hoja no encontrada"
- Verifica que `SHEET_NAME` en Code.gs coincida con el nombre de tu hoja
- Revisa que `SPREADSHEET_ID` sea correcto

### Los cálculos no aparecen
- Verifica que estés ingresando valores numéricos
- Revisa la consola del navegador para errores (F12)

### No se guardan los datos
- Verifica que la URL de `VITE_API_URL` sea correcta
- Asegúrate de haber dado permisos al Apps Script
- Revisa los logs en Apps Script: Ejecuciones

## 🔄 Actualizaciones del Backend

Cuando modifiques el código de Apps Script:

1. Guarda los cambios en el editor
2. **Implementar → Administrar implementaciones**
3. Haz clic en el ícono de editar (✏️) de tu implementación
4. **Versión → Nueva versión**
5. Guarda

## 📝 Notas Importantes

- El sistema usa Google Sheets como base de datos, ideal para proyectos pequeños
- No hay límite de usuarios que pueden ver, pero Google Sheets tiene límites de API calls
- Los cálculos se hacen en el frontend para mostrar previews en tiempo real
- Los datos se guardan con todos los campos calculados en Sheets
- La autenticación es simple (sin contraseña) - NO usar para datos sensibles

## 🤝 Soporte

Si tienes problemas:
1. Revisa la sección de Solución de Problemas
2. Verifica los logs de Apps Script
3. Revisa la consola del navegador (F12)

## 📄 Licencia

Proyecto privado para gestión de propiedades.
#   G e s t i o n - d e - p r o p i e d a d e s  
 