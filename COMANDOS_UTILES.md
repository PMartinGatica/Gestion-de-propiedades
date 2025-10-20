# 🔧 Comandos Útiles

Guía rápida de todos los comandos que necesitarás.

---

## 📦 Instalación

```bash
# Instalar todas las dependencias
npm install

# Instalar una dependencia específica
npm install nombre-paquete

# Instalar como dependencia de desarrollo
npm install --save-dev nombre-paquete
```

---

## 🚀 Desarrollo

```bash
# Iniciar servidor de desarrollo (con hot reload)
npm run dev

# El servidor se iniciará en:
# http://localhost:3000

# Para detener el servidor:
# Presiona Ctrl+C
```

---

## 🏗️ Producción

```bash
# Crear build de producción
npm run build

# La carpeta 'dist/' se creará con los archivos optimizados

# Previsualizar build de producción localmente
npm run preview
```

---

## 🧹 Limpieza

```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules
npm install

# En Windows (PowerShell):
Remove-Item -Recurse -Force node_modules
npm install

# Limpiar caché de npm
npm cache clean --force

# Limpiar carpeta de build
rm -rf dist

# En Windows:
Remove-Item -Recurse -Force dist
```

---

## 🔍 Verificación

```bash
# Ver versión de Node.js
node --version
# Debe ser >= 16.x

# Ver versión de npm
npm --version
# Debe ser >= 8.x

# Ver dependencias instaladas
npm list --depth=0

# Verificar si hay actualizaciones
npm outdated

# Auditoría de seguridad
npm audit

# Arreglar vulnerabilidades automáticamente
npm audit fix
```

---

## 🐛 Debugging

```bash
# Ejecutar con más información de errores
npm run dev -- --debug

# Ver variables de entorno
# Windows:
echo %VITE_API_URL%

# Mac/Linux:
echo $VITE_API_URL

# En Node.js (dentro de un archivo .js):
console.log(import.meta.env.VITE_API_URL)
```

---

## 📝 Git (Opcional)

```bash
# Inicializar repositorio
git init

# Ver estado
git status

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Descripción del cambio"

# Ver historial
git log --oneline

# Crear rama nueva
git checkout -b nombre-rama

# Cambiar de rama
git checkout nombre-rama

# Ver todas las ramas
git branch

# Subir a GitHub (primera vez)
git remote add origin https://github.com/usuario/repo.git
git branch -M main
git push -u origin main

# Subir cambios (después)
git push

# Traer cambios
git pull
```

---

## 🌐 Despliegue a Vercel

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login en Vercel
vercel login

# Desplegar (primera vez)
vercel

# Desplegar a producción
vercel --prod

# Ver logs
vercel logs

# Ver lista de deployments
vercel list
```

---

## 🌐 Despliegue a Netlify

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login en Netlify
netlify login

# Desplegar (primera vez)
netlify deploy

# Desplegar a producción
netlify deploy --prod

# Ver logs
netlify logs
```

---

## 🔧 Apps Script (Google)

```bash
# Instalar clasp (para desarrollo local de Apps Script)
npm install -g @google/clasp

# Login
clasp login

# Crear nuevo proyecto
clasp create --title "Property Management API"

# Clonar proyecto existente
clasp clone SCRIPT_ID

# Subir cambios
clasp push

# Descargar cambios
clasp pull

# Abrir en el navegador
clasp open

# Ver versiones
clasp versions

# Desplegar nueva versión
clasp deploy
```

---

## 📊 Herramientas de Análisis

```bash
# Analizar tamaño del bundle
npm run build -- --stats

# Luego visita: https://esbuild.github.io/analyze/

# Ver estructura de dependencias
npm list

# Ver solo dependencias de producción
npm list --prod

# Ver árbol de dependencias de un paquete
npm list axios
```

---

## 🧪 Testing (Si agregas tests)

```bash
# Instalar Vitest
npm install -D vitest

# Agregar a package.json:
# "scripts": {
#   "test": "vitest"
# }

# Ejecutar tests
npm test

# Tests en modo watch
npm test -- --watch

# Tests con coverage
npm test -- --coverage
```

---

## 🎨 Linting y Formateo (Opcional)

```bash
# Instalar ESLint
npm install -D eslint

# Configurar ESLint
npm init @eslint/config

# Ejecutar linter
npx eslint src/

# Arreglar automáticamente
npx eslint src/ --fix

# Instalar Prettier
npm install -D prettier

# Formatear código
npx prettier --write src/

# Formatear todo el proyecto
npx prettier --write .
```

---

## 🔐 Variables de Entorno

```bash
# Crear archivo .env
cp .env.example .env

# En Windows (cmd):
copy .env.example .env

# En Windows (PowerShell):
Copy-Item .env.example .env

# Editar .env
# En Windows:
notepad .env

# En Mac/Linux:
nano .env
# o
vim .env
```

---

## 📱 Tailwind

```bash
# Generar configuración completa de Tailwind
npx tailwindcss init --full

# Agregar plugin de Tailwind
npm install -D @tailwindcss/forms
npm install -D @tailwindcss/typography

# Ver clases de Tailwind disponibles
# Visita: https://tailwindcss.com/docs
```

---

## 🌍 Servidor Local con Puerto Específico

```bash
# Modificar vite.config.js:
# server: {
#   port: 3001
# }

# O ejecutar con flag:
npm run dev -- --port 3001

# Abrir automáticamente en el navegador
npm run dev -- --open
```

---

## 📦 Gestión de Paquetes

```bash
# Ver paquetes globales instalados
npm list -g --depth=0

# Instalar paquete globalmente
npm install -g nombre-paquete

# Desinstalar paquete
npm uninstall nombre-paquete

# Desinstalar paquete global
npm uninstall -g nombre-paquete

# Actualizar paquete específico
npm update nombre-paquete

# Actualizar todos los paquetes
npm update

# Instalar versión específica
npm install nombre-paquete@1.2.3
```

---

## 🔄 Scripts Personalizados

Agrega estos a `package.json` → `scripts`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "clean": "rm -rf node_modules dist",
    "reinstall": "npm run clean && npm install",
    "deploy": "npm run build && vercel --prod",
    "check": "npm outdated && npm audit"
  }
}
```

Luego ejecuta:
```bash
npm run clean
npm run reinstall
npm run deploy
npm run check
```

---

## 🚨 Solución Rápida de Problemas

```bash
# Problema: Módulo no encontrado
rm -rf node_modules package-lock.json
npm install

# Problema: Puerto en uso
# Mata el proceso en puerto 3000:
# Windows:
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Problema: .env no se carga
# Verifica que empiece con VITE_
# Reinicia el servidor (Ctrl+C y npm run dev)

# Problema: Build falla
npm run build -- --debug
```

---

## 📖 Documentación Rápida

```bash
# Ver ayuda de npm
npm help

# Ver ayuda de comando específico
npm help install

# Ver documentación de Vite
npm run dev -- --help

# Abrir documentación online
# React: https://react.dev
# Vite: https://vitejs.dev
# Tailwind: https://tailwindcss.com
# Axios: https://axios-http.com
```

---

## 💡 Tips de Productividad

```bash
# Alias útiles para tu terminal
# Agregar a ~/.bashrc o ~/.zshrc (Mac/Linux):

alias dev="npm run dev"
alias build="npm run build"
alias gi="git init"
alias ga="git add ."
alias gc="git commit -m"
alias gp="git push"

# En Windows, usa scripts de npm o PowerShell aliases
```

---

## 🎯 Comandos del Día a Día

```bash
# Mañana - empezar a trabajar:
cd property-management
npm run dev

# Durante el día - ver cambios:
# El servidor se recarga automáticamente

# Agregar nueva dependencia:
npm install nombre-paquete
# (reinicia el servidor después)

# Tarde - antes de irte:
# Ctrl+C para detener el servidor
git add .
git commit -m "Descripción de cambios"
git push
```

---

## 🔍 Más Recursos

- **npm**: https://docs.npmjs.com/
- **Vite**: https://vitejs.dev/guide/
- **React**: https://react.dev/learn
- **Tailwind**: https://tailwindcss.com/docs
- **Vercel**: https://vercel.com/docs

---

**¿Necesitas más ayuda? Lee `README.md` o `SOLUCION_PROBLEMAS.md`**
