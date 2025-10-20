/**
 * Utilidades para calcular los campos automáticos de los movimientos
 */

/**
 * Calcula todos los campos automáticos basándose en los valores ingresados
 * @param {Object} values - Valores del formulario
 * @returns {Object} - Objeto con todos los campos calculados
 */
export const calculateFields = (values) => {
  const precioDolar = parseFloat(values.precioDolar) || 0;
  const precioPesosBooking = parseFloat(values.precioPesosBooking) || 0;

  // Comisión Booking = Precio_Dolar * 0.15
  const comisionBooking = precioDolar * 0.15;

  // Ganancia Real = Precio_Dolar - Comisión_Booking
  const gananciaReal = precioDolar - comisionBooking;

  // Precio_Pesos = (Precio_Pesos_booking / Precio_Dolar) * Ganancia_Real
  const precioPesos = precioDolar > 0
    ? (precioPesosBooking / precioDolar) * gananciaReal
    : 0;

  // Comisión_Pablo = Precio_Pesos_booking * 0.1
  const comisionPablo = precioPesosBooking * 0.1;

  // Limpieza (valor fijo que puede ser ingresado)
  const limpieza = parseFloat(values.limpieza) || 0;

  // Pelado = ((Precio_Pesos - Comisión_Pablo) / 2) - Limpieza
  const pelado = ((precioPesos - comisionPablo) / 2) - limpieza;

  // Fernanda = ((Precio_Pesos - Comisión_Pablo) / 2) - Limpieza
  const fernanda = ((precioPesos - comisionPablo) / 2) - limpieza;

  return {
    comisionBooking: roundTo2Decimals(comisionBooking),
    gananciaReal: roundTo2Decimals(gananciaReal),
    precioPesos: roundTo2Decimals(precioPesos),
    comisionPablo: roundTo2Decimals(comisionPablo),
    pelado: roundTo2Decimals(pelado),
    fernanda: roundTo2Decimals(fernanda)
  };
};

/**
 * Redondea un número a 2 decimales
 * @param {number} num - Número a redondear
 * @returns {number} - Número redondeado
 */
export const roundTo2Decimals = (num) => {
  return Math.round(num * 100) / 100;
};

/**
 * Formatea un número como moneda
 * @param {number} amount - Cantidad a formatear
 * @param {string} currency - Código de moneda (USD o ARS)
 * @returns {string} - Cantidad formateada
 */
export const formatCurrency = (amount, currency = 'USD') => {
  const locale = currency === 'USD' ? 'en-US' : 'es-AR';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount || 0);
};

/**
 * Formatea una fecha para mostrar
 * @param {string} dateString - Fecha en formato ISO (YYYY-MM-DD)
 * @returns {string} - Fecha formateada (DD/MM/YYYY)
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';

  // Dividir la fecha en partes para evitar problemas de zona horaria
  const [year, month, day] = dateString.split('-');

  // Retornar directamente sin crear objeto Date
  return `${day}/${month}/${year}`;
};

/**
 * Convierte fecha DD/MM/YYYY a formato ISO (YYYY-MM-DD)
 * @param {string} dateString - Fecha en formato DD/MM/YYYY
 * @returns {string} - Fecha en formato ISO
 */
export const parseDate = (dateString) => {
  if (!dateString) return '';
  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
};
