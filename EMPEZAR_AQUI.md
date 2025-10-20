# 👋 ¡EMPIEZA AQUÍ!

## 🎯 Bienvenido a tu Sistema de Gestión de Propiedades

Esta aplicación te permite administrar las reservas de Booking con cálculos automáticos de comisiones y ganancias.

---

## ⚡ 3 Cosas que Debes Hacer AHORA

### 1️⃣ Lee esto primero (2 minutos)
📖 **Abre: `RESUMEN_PROYECTO.md`**
- Entenderás qué hace la app
- Verás el flujo de datos
- Conocerás las pantallas

### 2️⃣ Instala siguiendo estos pasos (10 minutos)
🚀 **Abre: `GUIA_RAPIDA.md`**
- 5 pasos simples
- Con comandos exactos
- Sin complicaciones

### 3️⃣ Si algo falla (cuando lo necesites)
🔧 **Abre: `SOLUCION_PROBLEMAS.md`**
- Problemas comunes resueltos
- Paso a paso
- Con capturas de pantalla explicadas

---

## 📚 Otros Archivos Útiles

| Archivo | Cuándo leerlo |
|---------|---------------|
| `README.md` | Cuando quieras la guía completa y detallada |
| `DATOS_EJEMPLO.md` | Para tener datos de prueba |
| `ARCHIVOS_CREADOS.md` | Para ver qué archivo hace qué |
| `backend/README.md` | Para entender el backend de Apps Script |

---

## 🎬 Flujo de Trabajo Sugerido

```
┌─────────────────────────────────────────────┐
│ 1. Lee RESUMEN_PROYECTO.md (2 min)        │
│    ↓                                        │
│ 2. Sigue GUIA_RAPIDA.md (10 min)          │
│    ↓                                        │
│ 3. Configura Google Sheet + Apps Script   │
│    ↓                                        │
│ 4. npm install + npm run dev               │
│    ↓                                        │
│ 5. Prueba con DATOS_EJEMPLO.md             │
│    ↓                                        │
│ 6. ¡Usa tu app en producción! 🎉          │
└─────────────────────────────────────────────┘
```

---

## ⚙️ Comandos Esenciales

```bash
# 1. Entra a la carpeta
cd property-management

# 2. Instala dependencias
npm install

# 3. Crea tu archivo .env
cp .env.example .env
# (Luego edita .env con tu URL de Apps Script)

# 4. Inicia el servidor
npm run dev

# 5. Abre en el navegador
# http://localhost:3000
```

---

## 🚦 Checklist de Inicio

Marca lo que ya hiciste:

**Setup Inicial:**
- [ ] Leí `RESUMEN_PROYECTO.md`
- [ ] Node.js instalado (`node --version`)
- [ ] Abrí mi Google Sheet existente
- [ ] Copié el ID de mi Sheet
- [ ] Configuré Google Apps Script
- [ ] Copié la URL del Web App desplegado

**Instalación Frontend:**
- [ ] `npm install` ejecutado
- [ ] Archivo `.env` creado
- [ ] URL del backend configurada en `.env`
- [ ] `npm run dev` ejecutado
- [ ] Navegador abierto en `localhost:3000`

**Pruebas:**
- [ ] Login con "pablo" funciona
- [ ] Creé un movimiento de prueba
- [ ] Los cálculos se muestran correctamente
- [ ] Los datos se guardaron en Google Sheets
- [ ] Login con "ricardo" o "fernanda" funciona
- [ ] Vista de propietarios muestra solo lectura

**¿Todo ✅?**
→ **¡Felicitaciones! Ya puedes usar la app 🎉**

**¿Algo ❌?**
→ **Ve a `SOLUCION_PROBLEMAS.md`**

---

## 🎯 Usuarios de Prueba

| Usuario | Contraseña | Rol | Acceso |
|---------|------------|-----|--------|
| pablo | (ninguna) | Admin | CRUD completo |
| ricardo | (ninguna) | Owner | Solo lectura |
| fernanda | (ninguna) | Owner | Solo lectura |

---

## 📊 Ejemplo Rápido de Uso

### Como Administrador (Pablo):

1. **Login** → ingresa: `pablo`
2. **Clic** en "Agregar Nuevo Movimiento"
3. **Llena el formulario**:
   - Check-in: `2024-01-15`
   - Check-out: `2024-01-20`
   - Precio Dólar: `100`
   - Precio Pesos Booking: `150000`
   - Limpieza: `5000`
4. **Observa** los cálculos automáticos abajo
5. **Guarda** → Verás el movimiento en la tabla
6. **Ve a Google Sheets** → ¡Está guardado!

### Como Propietario (Ricardo/Fernanda):

1. **Login** → ingresa: `ricardo` o `fernanda`
2. **Ve todos los movimientos** (solo lectura)
3. **Filtra por año** si quieres
4. **Revisa tus ganancias** en los resúmenes

---

## 🆘 ¿Necesitas Ayuda?

### Problema Común #1: Error de CORS
**Solución**: Ve a `SOLUCION_PROBLEMAS.md` → Sección "CORS"

### Problema Común #2: No se guardan datos
**Solución**: Verifica que:
1. El `SPREADSHEET_ID` en `Code.gs` sea correcto
2. La URL en `.env` sea la del Web App desplegado
3. Hayas dado permisos en Apps Script

### Problema Común #3: Cálculos incorrectos
**Solución**: Compara con `DATOS_EJEMPLO.md`

---

## 💡 Tip Pro

Abre estos 3 archivos en pestañas de tu navegador:

1. Tu app: `http://localhost:3000`
2. Tu Google Sheet
3. Apps Script → Ejecuciones (para ver logs)

Así puedes ver todo en tiempo real.

---

## 🎓 Siguiente Nivel

Cuando todo funcione, puedes:

1. **Personalizar**:
   - Cambiar colores en `tailwind.config.js`
   - Agregar más usuarios en `AuthContext.jsx`
   - Modificar porcentajes en `calculations.js`

2. **Desplegar a producción**:
   - Lee sección "Despliegue" en `README.md`
   - Usa Vercel (gratis y fácil)

3. **Mejorar**:
   - Agregar gráficos
   - Exportar a Excel
   - Notificaciones

---

## 🚀 ¡Listo!

**Ahora ve a `GUIA_RAPIDA.md` y empieza la instalación.**

**¿Preguntas?** → Lee `README.md` (guía completa)

**¿Problemas?** → Lee `SOLUCION_PROBLEMAS.md`

**¡Éxito! 🎉**
