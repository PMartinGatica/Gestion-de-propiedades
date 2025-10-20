// IMPORTANTE: Google Apps Script tiene limitaciones CORS
// Usamos fetch con mode: 'no-cors' para desarrollo local
const API_URL = import.meta.env.VITE_API_URL || 'YOUR_GOOGLE_APPS_SCRIPT_URL';

/**
 * Función auxiliar para hacer peticiones GET a Google Apps Script
 */
const fetchGoogleScript = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en fetchGoogleScript:', error);
    throw error;
  }
};

/**
 * Función auxiliar para hacer peticiones POST a Google Apps Script
 */
const postGoogleScript = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      redirect: 'follow'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en postGoogleScript:', error);
    throw error;
  }
};

/**
 * Servicio de API para comunicarse con Google Apps Script
 */
const movementsService = {
  /**
   * Obtener todos los movimientos
   */
  getAll: async () => {
    try {
      const url = `${API_URL}?action=getAll`;
      return await fetchGoogleScript(url);
    } catch (error) {
      console.error('Error al obtener movimientos:', error);
      throw error;
    }
  },

  /**
   * Crear un nuevo movimiento
   * @param {Object} movement - Datos del movimiento
   */
  create: async (movement) => {
    try {
      const url = `${API_URL}?action=create`;
      return await postGoogleScript(url, movement);
    } catch (error) {
      console.error('Error al crear movimiento:', error);
      throw error;
    }
  },

  /**
   * Actualizar un movimiento existente
   * @param {number} id - ID del movimiento (número de fila)
   * @param {Object} movement - Datos actualizados
   */
  update: async (id, movement) => {
    try {
      const url = `${API_URL}?action=update&id=${id}`;
      return await postGoogleScript(url, movement);
    } catch (error) {
      console.error('Error al actualizar movimiento:', error);
      throw error;
    }
  },

  /**
   * Eliminar un movimiento
   * @param {number} id - ID del movimiento (número de fila)
   */
  delete: async (id) => {
    try {
      const url = `${API_URL}?action=delete&id=${id}`;
      return await fetchGoogleScript(url);
    } catch (error) {
      console.error('Error al eliminar movimiento:', error);
      throw error;
    }
  }
};

export default movementsService;
