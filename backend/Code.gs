/**
 * Google Apps Script para gestión de propiedades Booking
 * Este script actúa como backend REST API usando Google Sheets como base de datos
 */

// CONFIGURACIÓN - Cambia esto según tu hoja de cálculo
const SPREADSHEET_ID = '1eJpVwwrGPytm6R5DPs4ulILwWfNwt6yC5Gr0JY2wXVM'; // ID de tu Google Sheet
const SHEET_NAME = 'Hoja 1'; // Nombre de la hoja (sin espacio al final)

/**
 * Función principal que maneja todas las peticiones HTTP GET
 */
function doGet(e) {
  return handleRequest(e);
}

/**
 * Función principal que maneja todas las peticiones HTTP POST
 */
function doPost(e) {
  return handleRequest(e);
}

/**
 * Función para manejar peticiones OPTIONS (CORS preflight)
 */
function doOptions(e) {
  return createCORSResponse();
}

/**
 * Manejador de peticiones
 */
function handleRequest(e) {
  try {
    const action = e.parameter.action;

    switch(action) {
      case 'getAll':
        return getAll();
      case 'create':
        return create(e);
      case 'update':
        return update(e);
      case 'delete':
        return deleteRow(e);
      default:
        return createResponse({ error: 'Acción no válida' }, 400);
    }
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return createResponse({ error: error.toString() }, 500);
  }
}

/**
 * Obtener todos los movimientos
 */
function getAll() {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();

  // La primera fila son los encabezados
  const headers = data[0];
  const rows = data.slice(1);

  // Convertir filas a objetos
  const movements = rows.map((row, index) => {
    return {
      id: index + 2, // +2 porque el índice empieza en 0 y la fila 1 son headers
      checkIn: row[0] ? formatDateToISO(row[0]) : '',
      checkOut: row[1] ? formatDateToISO(row[1]) : '',
      precioDolar: parseFloat(row[2]) || 0,
      comisionBooking: parseFloat(row[3]) || 0,
      gananciaReal: parseFloat(row[4]) || 0,
      precioPesos: parseFloat(row[5]) || 0,
      precioPesosBooking: parseFloat(row[6]) || 0,
      pelado: parseFloat(row[7]) || 0,
      fernanda: parseFloat(row[8]) || 0,
      comisionPablo: parseFloat(row[9]) || 0,
      limpieza: parseFloat(row[10]) || 0,
      salio: row[11] === true || row[11] === 'TRUE' || row[11] === 'Sí'
    };
  });

  return createResponse(movements);
}

/**
 * Crear un nuevo movimiento
 */
function create(e) {
  const sheet = getSheet();
  const data = JSON.parse(e.postData.contents);

  // Preparar la nueva fila
  const newRow = [
    parseDate(data.checkIn),
    parseDate(data.checkOut),
    parseFloat(data.precioDolar) || 0,
    parseFloat(data.comisionBooking) || 0,
    parseFloat(data.gananciaReal) || 0,
    parseFloat(data.precioPesos) || 0,
    parseFloat(data.precioPesosBooking) || 0,
    parseFloat(data.pelado) || 0,
    parseFloat(data.fernanda) || 0,
    parseFloat(data.comisionPablo) || 0,
    parseFloat(data.limpieza) || 0,
    data.salio || false
  ];

  // Agregar la fila al final
  sheet.appendRow(newRow);

  return createResponse({ success: true, message: 'Movimiento creado exitosamente' });
}

/**
 * Actualizar un movimiento existente
 */
function update(e) {
  const sheet = getSheet();
  const rowId = parseInt(e.parameter.id);
  const data = JSON.parse(e.postData.contents);

  if (!rowId || rowId < 2) {
    throw new Error('ID de fila no válido');
  }

  // Preparar los datos actualizados
  const updatedRow = [
    parseDate(data.checkIn),
    parseDate(data.checkOut),
    parseFloat(data.precioDolar) || 0,
    parseFloat(data.comisionBooking) || 0,
    parseFloat(data.gananciaReal) || 0,
    parseFloat(data.precioPesos) || 0,
    parseFloat(data.precioPesosBooking) || 0,
    parseFloat(data.pelado) || 0,
    parseFloat(data.fernanda) || 0,
    parseFloat(data.comisionPablo) || 0,
    parseFloat(data.limpieza) || 0,
    data.salio || false
  ];

  // Actualizar la fila
  const range = sheet.getRange(rowId, 1, 1, updatedRow.length);
  range.setValues([updatedRow]);

  return createResponse({ success: true, message: 'Movimiento actualizado exitosamente' });
}

/**
 * Eliminar un movimiento
 */
function deleteRow(e) {
  const sheet = getSheet();
  const rowId = parseInt(e.parameter.id);

  if (!rowId || rowId < 2) {
    throw new Error('ID de fila no válido');
  }

  // Eliminar la fila
  sheet.deleteRow(rowId);

  return createResponse({ success: true, message: 'Movimiento eliminado exitosamente' });
}

/**
 * Obtener la hoja de cálculo
 */
function getSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error('Hoja no encontrada: ' + SHEET_NAME);
  }

  return sheet;
}

/**
 * Crear respuesta HTTP con soporte CORS
 */
function createResponse(data, statusCode = 200) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);

  return output;
}

/**
 * Crear respuesta CORS para peticiones OPTIONS
 */
function createCORSResponse() {
  const output = ContentService.createTextOutput('');
  output.setMimeType(ContentService.MimeType.JSON);

  return output;
}

/**
 * Formatear fecha de Google Sheets a ISO string
 * Usamos Utilities.formatDate para mantener la fecha exacta de la hoja
 */
function formatDateToISO(dateValue) {
  if (!dateValue) return '';

  // Usar formatDate de Google Apps Script para evitar problemas de zona horaria
  return Utilities.formatDate(new Date(dateValue), Session.getScriptTimeZone(), 'yyyy-MM-dd');
}

/**
 * Parsear fecha ISO a Date object para Google Sheets
 * Solución al problema de zona horaria: parseamos la fecha en zona horaria local
 */
function parseDate(dateString) {
  if (!dateString) return '';

  // Si viene en formato ISO (YYYY-MM-DD), parseamos manualmente
  // para evitar el problema de zona horaria
  const parts = dateString.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // Los meses en JavaScript van de 0-11
    const day = parseInt(parts[2]);

    // Crear fecha en zona horaria local de Google Apps Script
    return new Date(year, month, day);
  }

  // Fallback al comportamiento anterior por si acaso
  return new Date(dateString);
}

/**
 * Función para inicializar la hoja con encabezados (ejecutar una sola vez)
 */
function setupSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  // Si la hoja no existe, crearla
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  // Establecer los encabezados
  const headers = [
    'check-in',
    'checkout',
    'Precio dolar',
    'Comisión Booking',
    'GanaciaReal',
    'Precio_Pesos',
    'Precio_Pesos_booking',
    'Pelado',
    'Fernanda',
    'Comisión _Pablo',
    'Limpieza',
    'Salio'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Formatear encabezados
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.getRange(1, 1, 1, headers.length).setBackground('#4285f4');
  sheet.getRange(1, 1, 1, headers.length).setFontColor('#ffffff');

  Logger.log('Hoja configurada exitosamente');
}
