# Backend - Google Apps Script

Este directorio contiene el código del backend que se ejecuta en Google Apps Script.

## 📁 Archivos

- **Code.gs**: Código principal del backend (REST API)
- **appsscript.json**: Configuración del proyecto Apps Script

## 🔧 Configuración

### Método 1: Copiar y Pegar (Recomendado para principiantes)

1. Abre tu Google Sheet
2. Ve a: **Extensiones → Apps Script**
3. Borra el código por defecto
4. Copia todo el contenido de `Code.gs`
5. Pégalo en el editor
6. Cambia la línea 8:
   ```javascript
   const SPREADSHEET_ID = 'TU_ID_AQUI';
   ```
7. Guarda (Ctrl+S o Cmd+S)

### Método 2: Usar clasp (Avanzado)

Si prefieres desarrollar localmente y sincronizar:

```bash
# Instalar clasp
npm install -g @google/clasp

# Login
clasp login

# Crear .clasp.json con el ID de tu script
# (Lo obtienes de: Configuración del proyecto → ID del script)

# Subir código
clasp push

# Descargar cambios
clasp pull
```

## 🚀 Implementación

1. **En el editor de Apps Script**
2. Clic en **Implementar → Nueva implementación**
3. Configuración:
   - **Tipo**: Aplicación web
   - **Descripción**: API de Gestión de Propiedades v1
   - **Ejecutar como**: Yo (tu email)
   - **Quién tiene acceso**: Cualquier persona
4. Clic en **Implementar**
5. **Copia la URL** (formato: `https://script.google.com/macros/s/XXXXX/exec`)
6. Usa esta URL en el archivo `.env` del frontend

## 📡 Endpoints de la API

### GET /exec?action=getAll
Obtiene todos los movimientos

**Respuesta:**
```json
[
  {
    "id": 2,
    "checkIn": "2024-01-15",
    "checkOut": "2024-01-20",
    "precioDolar": 100,
    "comisionBooking": 15,
    "gananciaReal": 85,
    "precioPesos": 127500,
    "precioPesosBooking": 150000,
    "pelado": 56250,
    "fernanda": 56250,
    "comisionPablo": 15000,
    "limpieza": 5000,
    "salio": false
  }
]
```

### POST /exec?action=create
Crea un nuevo movimiento

**Body:**
```json
{
  "checkIn": "2024-01-15",
  "checkOut": "2024-01-20",
  "precioDolar": 100,
  "precioPesosBooking": 150000,
  "limpieza": 5000,
  "salio": false,
  "comisionBooking": 15,
  "gananciaReal": 85,
  "precioPesos": 127500,
  "comisionPablo": 15000,
  "pelado": 56250,
  "fernanda": 56250
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Movimiento creado exitosamente"
}
```

### POST /exec?action=update&id=2
Actualiza un movimiento existente

**Parámetros URL:**
- `id`: Número de fila en la hoja (2, 3, 4...)

**Body:** (igual que create)

**Respuesta:**
```json
{
  "success": true,
  "message": "Movimiento actualizado exitosamente"
}
```

### GET /exec?action=delete&id=2
Elimina un movimiento

**Parámetros URL:**
- `id`: Número de fila en la hoja (2, 3, 4...)

**Respuesta:**
```json
{
  "success": true,
  "message": "Movimiento eliminado exitosamente"
}
```

## 🔒 Seguridad

- El Apps Script se ejecuta con TUS permisos
- Solo tú puedes modificar el código
- La API es pública (cualquiera con la URL puede acceder)
- **IMPORTANTE**: No compartas la URL si tienes datos sensibles

### Mejorar seguridad (Opcional)

Puedes agregar autenticación simple:

```javascript
function handleRequest(e) {
  // Verificar token en headers
  const token = e.parameter.token;
  const VALID_TOKEN = 'tu-token-secreto';

  if (token !== VALID_TOKEN) {
    return createResponse({ error: 'No autorizado' }, 401);
  }

  // ... resto del código
}
```

Luego en el frontend agrega el token a las peticiones.

## 🧪 Probar la API

### Con el navegador (GET requests)

```
https://script.google.com/macros/s/TU_ID/exec?action=getAll
```

### Con Postman o Thunder Client

**GET - Obtener todos:**
```
GET https://script.google.com/macros/s/TU_ID/exec?action=getAll
```

**POST - Crear:**
```
POST https://script.google.com/macros/s/TU_ID/exec?action=create
Content-Type: application/json

{
  "checkIn": "2024-01-15",
  "checkOut": "2024-01-20",
  "precioDolar": 100,
  "precioPesosBooking": 150000,
  "limpieza": 5000,
  "salio": false,
  "comisionBooking": 15,
  "gananciaReal": 85,
  "precioPesos": 127500,
  "comisionPablo": 15000,
  "pelado": 56250,
  "fernanda": 56250
}
```

## 📊 Estructura de la Hoja

La hoja debe tener estos encabezados en el orden exacto:

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| check-in | checkout | Precio dolar | Comisión Booking | GanaciaReal | Precio_Pesos | Precio_Pesos_booking | Pelado | Fernanda | Comisión _Pablo | Limpieza | Salio |

## 🐛 Debugging

### Ver logs
1. En el editor de Apps Script
2. Vista → Registros de ejecución
3. O usa: **Ver → Ejecuciones**

### Agregar logs en el código
```javascript
Logger.log('Valor: ' + miVariable);
console.log('Debugging:', data);
```

### Probar funciones manualmente
1. Selecciona una función en el menú superior
2. Clic en ▶️ Ejecutar
3. Ve los resultados en Registros

## 🔄 Actualizar el código

Cuando hagas cambios:

1. **Guarda** el código (Ctrl+S)
2. **Implementar → Administrar implementaciones**
3. Clic en ✏️ (editar) en tu implementación
4. **Versión → Nueva versión**
5. Guarda

**IMPORTANTE**: La URL no cambia, sigue siendo la misma.

## 💡 Tips

- Los IDs de las filas empiezan en 2 (la fila 1 son headers)
- Al eliminar una fila, los IDs de las siguientes cambian
- Google Sheets tiene límite de 20,000 llamadas/día por script
- Las fechas se guardan como Date objects en Sheets
- Los números con decimales se formatean automáticamente

## ⚠️ Limitaciones

- **Cuota de ejecución**: 6 minutos por ejecución
- **Llamadas diarias**: ~20,000 (scripts gratuitos)
- **Tamaño de respuesta**: Max 50MB
- **Concurrencia**: Múltiples requests pueden causar conflictos

Para proyectos más grandes, considera migrar a:
- Firebase Firestore
- MongoDB Atlas
- PostgreSQL (con backend Node.js)
