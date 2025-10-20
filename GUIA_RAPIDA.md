# 🚀 Guía Rápida de Configuración

## ⚡ Setup en 5 pasos

### 1️⃣ Google Sheet (2 minutos)

1. Abre tu Google Sheet existente
2. Copia el ID de la URL: `https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit`
3. Asegúrate que tienes una hoja llamada "Movimientos"

### 2️⃣ Apps Script (5 minutos)

1. En tu Google Sheet: **Extensiones → Apps Script**
2. Copia todo el código de `backend/Code.gs`
3. Pégalo en el editor
4. **Línea 8**: Cambia `TU_SPREADSHEET_ID_AQUI` por tu ID real
5. Si es hoja nueva:
   - Selecciona función `setupSheet` arriba
   - Clic en ▶️ Ejecutar
   - Autoriza permisos
6. **Implementar → Nueva implementación**
   - Tipo: Aplicación web
   - Ejecutar como: Yo
   - Acceso: Cualquier persona
   - Clic en **Implementar**
7. **COPIA LA URL** que te da (la necesitas en el paso 4)

### 3️⃣ Instalar Frontend (1 minuto)

```bash
cd property-management
npm install
```

### 4️⃣ Configurar URL del Backend (30 segundos)

1. Copia el archivo de ejemplo:
```bash
cp .env.example .env
```

2. Abre `.env` y pega tu URL de Apps Script:
```env
VITE_API_URL=https://script.google.com/macros/s/ABC123XYZ/exec
```

### 5️⃣ Iniciar la App (10 segundos)

```bash
npm run dev
```

## ✅ Probar que Funciona

1. Abre `http://localhost:3000`
2. Login con: **pablo**
3. Haz clic en: **+ Agregar Nuevo Movimiento**
4. Llena el formulario:
   - Check-in: cualquier fecha
   - Check-out: fecha posterior
   - Precio Dólar: **100**
   - Precio Pesos Booking: **150000**
   - Limpieza: **5000**
5. Verás los cálculos automáticos abajo
6. Haz clic en **Guardar Movimiento**
7. Ve a tu Google Sheet - ¡debe aparecer la fila!

## 🎯 Usuarios de Prueba

| Usuario   | Rol           |
|-----------|---------------|
| pablo     | Administrador |
| ricardo   | Propietario   |
| fernanda  | Propietario   |

## 🔧 Si algo no funciona

### Error de CORS
➡️ Verifica que desplegaste como "Aplicación web" con acceso "Cualquier persona"

### No guarda en Sheets
1. Abre la consola del navegador (F12)
2. Ve a Network → busca la petición fallida
3. Verifica que la URL en `.env` sea correcta

### Cálculos incorrectos
➡️ Verifica que `Precio_Pesos_booking` y `Precio dolar` tengan valores

## 📱 Despliegue Rápido a Vercel

```bash
npm install -g vercel
vercel
```

Luego en vercel.com:
- Settings → Environment Variables
- Agrega: `VITE_API_URL` = tu URL de Apps Script

## 💡 Tips

- **Ricardo** ve su columna "Pelado"
- **Fernanda** ve su columna "Fernanda"
- **Pablo** puede crear, editar y eliminar
- El checkbox **"Salió"** marca si ya se pagó
- Todos los cálculos son automáticos 🎉

## 📞 ¿Necesitas ayuda?

1. Lee el README.md completo
2. Revisa la sección "Solución de Problemas"
3. Verifica los logs en Apps Script (Ejecuciones)
