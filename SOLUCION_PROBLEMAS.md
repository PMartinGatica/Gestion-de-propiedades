# 🔧 Solución de Problemas Comunes

## 🚨 Problemas al Instalar

### Error: "npm: command not found"
**Causa**: Node.js no está instalado

**Solución**:
1. Descarga Node.js desde: https://nodejs.org/
2. Instala la versión LTS
3. Reinicia la terminal
4. Verifica: `node --version` y `npm --version`

### Error: "Cannot find module 'vite'"
**Causa**: Dependencias no instaladas

**Solución**:
```bash
cd property-management
npm install
```

---

## 🌐 Problemas de Conexión con Backend

### Error: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Causa más común**: El Apps Script no está desplegado correctamente

**Solución Paso a Paso**:

1. **Verificar despliegue**:
   - Ve a Apps Script
   - Clic en **Implementar → Administrar implementaciones**
   - Debe haber al menos 1 implementación activa
   - Tipo: "Aplicación web"

2. **Si no hay implementación**:
   - **Implementar → Nueva implementación**
   - Tipo: **Aplicación web**
   - Ejecutar como: **Yo**
   - Acceso: **Cualquier persona**
   - Clic en **Implementar**

3. **Copia la URL exacta**:
   ```
   https://script.google.com/macros/s/ABC123XYZ/exec
   ```

4. **Actualiza tu .env**:
   ```env
   VITE_API_URL=https://script.google.com/macros/s/ABC123XYZ/exec
   ```

5. **IMPORTANTE**: Reinicia el servidor de desarrollo:
   - Presiona Ctrl+C en la terminal
   - `npm run dev` nuevamente

### Error: "Network Error" o timeout

**Causas posibles**:
1. URL incorrecta en .env
2. Apps Script pausado
3. Sin conexión a internet

**Solución**:

1. **Verifica la URL**:
   - Abre `.env`
   - Copia la URL
   - Pégala en el navegador
   - Deberías ver algo como: `{"error":"Acción no válida"}`
   - Si ves eso, la URL es correcta

2. **Si da error 404**:
   - La URL está mal
   - Ve a Apps Script
   - Implementar → Administrar implementaciones
   - Copia la URL correcta

3. **Prueba manualmente**:
   ```
   https://TU_URL_AQUI/exec?action=getAll
   ```
   - Deberías ver un array JSON (aunque esté vacío: `[]`)

---

## 📊 Problemas con Google Sheets

### Error: "Hoja no encontrada: Movimientos"

**Causa**: El nombre de la hoja no coincide

**Solución**:

1. **Verifica el nombre en Google Sheets**:
   - Mira la pestaña inferior
   - Anota el nombre exacto (ej: "Movimientos", "Hoja1", etc.)

2. **Actualiza Code.gs**:
   ```javascript
   const SHEET_NAME = 'TU_NOMBRE_EXACTO_AQUI';
   ```

3. **Guarda y redesplega**:
   - Guarda el código (Ctrl+S)
   - Implementar → Administrar implementaciones
   - Clic en ✏️ (editar)
   - Versión → Nueva versión
   - Guardar

### Error: "Exception: Service Spreadsheets failed"

**Causa**: ID de spreadsheet incorrecto

**Solución**:

1. **Obtén el ID correcto**:
   - URL de tu Sheet:
     `https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit`
   - Copia solo la parte del ID

2. **Actualiza Code.gs línea 8**:
   ```javascript
   const SPREADSHEET_ID = '1a2b3c4d5e6f...';
   ```

3. **Guarda y redesplega** (ver pasos arriba)

### Los datos no aparecen en Sheets

**Diagnóstico**:

1. **Abre Apps Script → Ver → Ejecuciones**
2. Busca errores en rojo
3. Haz clic para ver detalles

**Soluciones comunes**:

- **Error de permisos**: Vuelve a ejecutar `setupSheet` manualmente
- **Error de formato**: Verifica que los encabezados sean exactos
- **Fila 1 corrupta**: Borra fila 1 y ejecuta `setupSheet`

---

## 🧮 Problemas con Cálculos

### Los cálculos dan 0 o NaN

**Causa**: Valores vacíos o no numéricos

**Solución**:

1. **Verifica que ingresas números**:
   - Precio Dólar: `100` ✅ (no: `$100` ❌)
   - Limpieza: `5000` ✅ (no: `5.000` ❌)

2. **Verifica en el formulario**:
   - Abre consola del navegador (F12)
   - Ve a Console
   - Busca errores como `NaN` o `undefined`

3. **Revisa calculations.js**:
   - Debería tener `parseFloat()` en todas las operaciones
   - Verifica que no haya errores de sintaxis

### Los cálculos no coinciden con Google Sheets

**Solución**:

1. **Verifica las fórmulas manualmente**:
   ```
   Comisión Booking = 100 × 0.15 = 15 ✓
   Ganancia Real = 100 - 15 = 85 ✓
   Precio Pesos = (150000 / 100) × 85 = 127500 ✓
   ```

2. **Compara con DATOS_EJEMPLO.md**:
   - Usa los ejemplos exactos
   - Deberías obtener los mismos resultados

3. **Si difieren**:
   - Revisa `src/utils/calculations.js`
   - Compara con las fórmulas en el README

---

## 🔐 Problemas de Autenticación

### No puedo hacer login

**Causa**: Nombre de usuario incorrecto

**Solución**:
- Usuarios válidos: **pablo**, **ricardo**, **fernanda**
- Todo en minúsculas
- Sin espacios

### Me redirige mal después del login

**Causa**: Rol mal configurado

**Solución**:

1. **Abre AuthContext.jsx**
2. **Verifica el array USERS**:
   ```javascript
   const USERS = [
     { id: 1, name: 'pablo', displayName: 'Pablo', role: 'admin' },
     { id: 2, name: 'ricardo', displayName: 'Ricardo', role: 'owner' },
     { id: 3, name: 'fernanda', displayName: 'Fernanda', role: 'owner' }
   ];
   ```

3. **Limpia localStorage**:
   - F12 → Application → Local Storage
   - Borra `user`
   - Refresca la página

### Quedé atrapado en un loop de login

**Solución**:

```javascript
// En la consola del navegador (F12):
localStorage.clear()
// Luego refresca la página
```

---

## 🎨 Problemas de Interfaz

### Los estilos no se cargan (todo blanco)

**Causa**: Tailwind no compilado

**Solución**:

1. **Verifica que index.css tenga**:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

2. **Reinstala dependencias**:
   ```bash
   rm -rf node_modules
   npm install
   npm run dev
   ```

### El formulario se ve roto en móvil

**Causa**: Clases responsive faltantes

**Solución**: Ya están configuradas con `md:grid-cols-2`, debería funcionar.

Si no:
```javascript
// En MovementForm.jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
```

---

## 🚀 Problemas al Desplegar

### Error en Vercel: "Command failed"

**Causa**: Build fallido

**Solución**:

1. **Prueba el build localmente**:
   ```bash
   npm run build
   ```

2. **Si falla**:
   - Lee el error
   - Usualmente es un import faltante
   - O una variable de entorno

3. **Configura variables en Vercel**:
   - Settings → Environment Variables
   - Agrega: `VITE_API_URL` = tu URL de Apps Script

### La app funciona local pero no en producción

**Causa más común**: Falta configurar `VITE_API_URL`

**Solución**:

1. **En tu plataforma de hosting**:
   - Ve a configuración / environment variables
   - Agrega:
     ```
     VITE_API_URL=https://script.google.com/macros/s/ABC/exec
     ```

2. **Redesplega**

---

## 🐛 Debugging Avanzado

### Ver qué se está enviando al backend

```javascript
// En src/services/api.js, agrega:
console.log('Sending to API:', data);
```

### Ver respuesta del backend

```javascript
// En src/services/api.js:
const response = await api.post(...);
console.log('Response:', response.data);
return response.data;
```

### Ver logs de Apps Script

1. Ve al editor de Apps Script
2. **Ver → Ejecuciones**
3. Busca tu petición reciente
4. Haz clic para ver logs
5. Si hay error, aparecerá en rojo

### Agregar logs en Apps Script

```javascript
// En Code.gs:
function create(e) {
  Logger.log('Data recibida: ' + e.postData.contents);
  const data = JSON.parse(e.postData.contents);
  Logger.log('Data parseada: ' + JSON.stringify(data));
  // ... resto del código
}
```

---

## 📱 Problemas Específicos por Navegador

### Chrome: CORS error persistente

**Solución temporal para desarrollo**:

1. Cierra Chrome completamente
2. Abre con flag:
   ```bash
   # Windows
   chrome.exe --disable-web-security --user-data-dir="C:\temp"

   # Mac
   open -na Google\ Chrome --args --disable-web-security --user-data-dir="/tmp/chrome"

   # Linux
   google-chrome --disable-web-security --user-data-dir="/tmp/chrome"
   ```

**IMPORTANTE**: Solo para desarrollo, nunca en producción.

### Firefox: No guarda en localStorage

**Solución**:
- Settings → Privacy & Security
- Desactiva "Delete cookies and site data when Firefox is closed"

### Safari: Fechas no funcionan

**Causa**: Safari parsea fechas diferente

**Solución**: Ya está manejado con `new Date()`, debería funcionar.

---

## 💡 Preguntas Frecuentes

### ¿Puedo agregar más usuarios?

Sí, edita `src/context/AuthContext.jsx`:

```javascript
const USERS = [
  { id: 1, name: 'pablo', displayName: 'Pablo', role: 'admin' },
  { id: 2, name: 'ricardo', displayName: 'Ricardo', role: 'owner' },
  { id: 3, name: 'fernanda', displayName: 'Fernanda', role: 'owner' },
  { id: 4, name: 'nuevo', displayName: 'Nuevo Usuario', role: 'owner' }
];
```

### ¿Puedo cambiar los porcentajes de comisión?

Sí, edita `src/utils/calculations.js`:

```javascript
// Cambiar comisión Booking de 15% a 20%:
const comisionBooking = precioDolar * 0.20; // era 0.15

// Cambiar comisión Pablo de 10% a 12%:
const comisionPablo = precioPesosBooking * 0.12; // era 0.10
```

### ¿Puedo agregar más campos?

Sí, pero requiere cambios en:
1. Google Sheets (agregar columna)
2. Code.gs (agregar al array)
3. MovementForm.jsx (agregar input)
4. MovementTable.jsx (agregar columna)
5. calculations.js (si es calculado)

---

## 🆘 Último Recurso

Si nada funciona:

1. **Descarga todo de nuevo desde GitHub**
2. **Borra node_modules**: `rm -rf node_modules`
3. **Reinstala**: `npm install`
4. **Verifica TODOS los pasos de GUIA_RAPIDA.md**
5. **Crea un nuevo Apps Script desde cero**

---

## 📞 Checklist de Diagnóstico

Antes de pedir ayuda, verifica:

- [ ] Node.js instalado (`node --version`)
- [ ] Dependencias instaladas (`ls node_modules`)
- [ ] Archivo `.env` existe y tiene la URL correcta
- [ ] Apps Script desplegado como "Aplicación web"
- [ ] Permisos otorgados en Apps Script
- [ ] `SPREADSHEET_ID` correcto en Code.gs
- [ ] `SHEET_NAME` correcto en Code.gs
- [ ] Hoja tiene los encabezados correctos
- [ ] URL del backend responde (prueba en navegador)
- [ ] No hay errores en consola del navegador (F12)
- [ ] No hay errores en Ejecuciones de Apps Script

Si todo está ✅ y aún no funciona, revisa los logs detalladamente.
