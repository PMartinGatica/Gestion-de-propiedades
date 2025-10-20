# Datos de Ejemplo para Pruebas

## 📝 Movimientos de Ejemplo

Usa estos datos para probar la aplicación:

### Ejemplo 1: Reserva Estándar
```
Check-in: 2024-01-15
Check-out: 2024-01-20
Precio Dólar: 100
Precio Pesos Booking: 150,000
Limpieza: 5,000
Salió: No

Cálculos esperados:
- Comisión Booking: $15.00 USD
- Ganancia Real: $85.00 USD
- Precio Pesos: $127,500.00 ARS
- Comisión Pablo: $15,000.00 ARS
- Para Ricardo: $51,250.00 ARS
- Para Fernanda: $51,250.00 ARS
```

### Ejemplo 2: Reserva Grande
```
Check-in: 2024-02-01
Check-out: 2024-02-10
Precio Dólar: 500
Precio Pesos Booking: 750,000
Limpieza: 8,000
Salió: Sí

Cálculos esperados:
- Comisión Booking: $75.00 USD
- Ganancia Real: $425.00 USD
- Precio Pesos: $637,500.00 ARS
- Comisión Pablo: $75,000.00 ARS
- Para Ricardo: $273,250.00 ARS
- Para Fernanda: $273,250.00 ARS
```

### Ejemplo 3: Reserva Pequeña
```
Check-in: 2024-03-05
Check-out: 2024-03-07
Precio Dólar: 50
Precio Pesos Booking: 75,000
Limpieza: 3,000
Salió: No

Cálculos esperados:
- Comisión Booking: $7.50 USD
- Ganancia Real: $42.50 USD
- Precio Pesos: $63,750.00 ARS
- Comisión Pablo: $7,500.00 ARS
- Para Ricardo: $25,125.00 ARS
- Para Fernanda: $25,125.00 ARS
```

## 🧮 Verificación de Cálculos

### Fórmula 1: Comisión Booking
```
Precio Dólar × 0.15 = Comisión Booking
100 × 0.15 = 15
```

### Fórmula 2: Ganancia Real
```
Precio Dólar - Comisión Booking = Ganancia Real
100 - 15 = 85
```

### Fórmula 3: Precio Pesos
```
(Precio Pesos Booking ÷ Precio Dólar) × Ganancia Real = Precio Pesos
(150,000 ÷ 100) × 85 = 127,500
```

### Fórmula 4: Comisión Pablo
```
Precio Pesos Booking × 0.10 = Comisión Pablo
150,000 × 0.10 = 15,000
```

### Fórmula 5: Para Ricardo (Pelado)
```
((Precio Pesos - Comisión Pablo) ÷ 2) - Limpieza = Para Ricardo
((127,500 - 15,000) ÷ 2) - 5,000 = 51,250
```

### Fórmula 6: Para Fernanda
```
((Precio Pesos - Comisión Pablo) ÷ 2) - Limpieza = Para Fernanda
((127,500 - 15,000) ÷ 2) - 5,000 = 51,250
```

## 📊 Importar Datos Masivos a Google Sheets

Si quieres cargar varios registros de prueba:

1. **Copia esta tabla:**

| check-in | checkout | Precio dolar | Comisión Booking | GanaciaReal | Precio_Pesos | Precio_Pesos_booking | Pelado | Fernanda | Comisión _Pablo | Limpieza | Salio |
|----------|----------|--------------|------------------|-------------|--------------|---------------------|--------|----------|----------------|----------|-------|
| 2024-01-15 | 2024-01-20 | 100 | 15 | 85 | 127500 | 150000 | 51250 | 51250 | 15000 | 5000 | FALSE |
| 2024-02-01 | 2024-02-10 | 500 | 75 | 425 | 637500 | 750000 | 273250 | 273250 | 75000 | 8000 | TRUE |
| 2024-03-05 | 2024-03-07 | 50 | 7.5 | 42.5 | 63750 | 75000 | 25125 | 25125 | 7500 | 3000 | FALSE |
| 2024-03-15 | 2024-03-22 | 200 | 30 | 170 | 255000 | 300000 | 116250 | 116250 | 30000 | 6000 | TRUE |
| 2024-04-10 | 2024-04-15 | 150 | 22.5 | 127.5 | 191250 | 225000 | 83125 | 83125 | 22500 | 5500 | FALSE |

2. **En tu Google Sheet:**
   - Selecciona la celda A2
   - Pega (Ctrl+V)
   - Los datos se copiarán automáticamente

## 🎯 Casos de Prueba

### ✅ Caso 1: Crear movimiento
1. Login como **pablo**
2. Clic en "Agregar Nuevo Movimiento"
3. Llenar con Ejemplo 1
4. Verificar que los cálculos coincidan
5. Guardar
6. Verificar que aparece en la tabla

### ✅ Caso 2: Editar movimiento
1. Login como **pablo**
2. Hacer clic en "Editar" en un movimiento
3. Cambiar "Precio Dólar" a 200
4. Verificar que los cálculos se actualizan
5. Guardar
6. Verificar cambios en la tabla

### ✅ Caso 3: Eliminar movimiento
1. Login como **pablo**
2. Hacer clic en "Eliminar" en un movimiento
3. Confirmar
4. Verificar que desaparece de la tabla

### ✅ Caso 4: Vista propietario
1. Login como **ricardo**
2. Verificar que NO hay botones de editar/eliminar
3. Verificar que se ve la columna "Para Ricardo"
4. Filtrar por año
5. Verificar totales

### ✅ Caso 5: Marcar como pagado
1. Login como **pablo**
2. Editar un movimiento
3. Marcar "Salió (Pagado)"
4. Guardar
5. Verificar badge verde "Sí"

## 🔍 Validaciones a Probar

### ❌ Debe fallar: Campos vacíos
- Intentar guardar sin check-in
- Intentar guardar sin check-out
- Intentar guardar sin precio dólar

### ❌ Debe fallar: Valores negativos
- Precio dólar: -100
- Limpieza: -5000

### ✅ Debe funcionar: Casos especiales
- Limpieza = 0
- Precio muy alto (10,000 USD)
- Fechas iguales (check-in = check-out)

## 📈 Datos de Producción Reales

Cuando uses datos reales:

1. **Verifica el tipo de cambio**
   - El cálculo usa: `(Precio_Pesos_booking / Precio_Dolar)`
   - Ejemplo: Si el dólar está a $1,500 ARS
   - Precio Booking en pesos: $150,000
   - Precio en dólares: 100
   - Tipo de cambio implícito: 1,500

2. **Costos de limpieza**
   - Mantén un registro de costos históricos
   - Ajusta según temporada

3. **Backup regular**
   - Google Sheets tiene historial de versiones
   - Archivo → Historial de versiones
   - O copia la hoja periódicamente

## 💡 Tips

- Usa datos consistentes para pruebas
- Verifica cálculos manualmente la primera vez
- Prueba con diferentes usuarios
- Revisa que los totales coincidan con Google Sheets
