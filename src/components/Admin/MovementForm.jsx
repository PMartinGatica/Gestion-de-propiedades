import { useState, useEffect } from 'react';
import { calculateFields, formatCurrency } from '../../utils/calculations';

const MovementForm = ({ onSubmit, onCancel, initialData = null, isEditing = false }) => {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    precioDolar: '',
    precioPesosBooking: '',
    limpieza: '',
    salio: false
  });

  const [calculatedFields, setCalculatedFields] = useState({
    comisionBooking: 0,
    gananciaReal: 0,
    precioPesos: 0,
    comisionPablo: 0,
    pelado: 0,
    fernanda: 0
  });

  // Si estamos editando, cargar los datos iniciales
  useEffect(() => {
    if (initialData) {
      setFormData({
        checkIn: initialData.checkIn || '',
        checkOut: initialData.checkOut || '',
        precioDolar: initialData.precioDolar || '',
        precioPesosBooking: initialData.precioPesosBooking || '',
        limpieza: initialData.limpieza || '',
        salio: initialData.salio || false
      });
    }
  }, [initialData]);

  // Recalcular campos automáticamente cuando cambian los valores
  useEffect(() => {
    const calculated = calculateFields(formData);
    setCalculatedFields(calculated);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.checkIn || !formData.checkOut) {
      alert('Las fechas de check-in y check-out son obligatorias');
      return;
    }

    if (!formData.precioDolar || parseFloat(formData.precioDolar) <= 0) {
      alert('El precio en dólares debe ser mayor a 0');
      return;
    }

    if (!formData.precioPesosBooking || parseFloat(formData.precioPesosBooking) <= 0) {
      alert('El precio en pesos de Booking debe ser mayor a 0');
      return;
    }

    // Combinar datos del formulario con campos calculados
    const completeData = {
      ...formData,
      ...calculatedFields
    };

    onSubmit(completeData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campos de entrada */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-In *
          </label>
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-Out *
          </label>
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Precio Dólar *
          </label>
          <input
            type="number"
            name="precioDolar"
            value={formData.precioDolar}
            onChange={handleChange}
            className="input-field"
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Precio Pesos Booking *
          </label>
          <input
            type="number"
            name="precioPesosBooking"
            value={formData.precioPesosBooking}
            onChange={handleChange}
            className="input-field"
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Limpieza
          </label>
          <input
            type="number"
            name="limpieza"
            value={formData.limpieza}
            onChange={handleChange}
            className="input-field"
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pagado
          </label>
          <select
            name="salio"
            value={formData.salio ? 'si' : 'no'}
            onChange={(e) => {
              const value = e.target.value === 'si';
              setFormData(prev => ({ ...prev, salio: value }));
            }}
            className="input-field"
          >
            <option value="no">No</option>
            <option value="si">Sí</option>
          </select>
        </div>
      </div>

      {/* Campos calculados (solo lectura) */}
      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Campos Calculados Automáticamente</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Comisión Booking (15%)</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(calculatedFields.comisionBooking, 'USD')}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Ganancia Real</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(calculatedFields.gananciaReal, 'USD')}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Precio Pesos</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(calculatedFields.precioPesos, 'ARS')}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Comisión Pablo (10%)</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(calculatedFields.comisionPablo, 'ARS')}
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-xs text-green-700 mb-1">Para Pelado</p>
            <p className="text-lg font-semibold text-green-900">
              {formatCurrency(calculatedFields.pelado, 'ARS')}
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-xs text-green-700 mb-1">Para Fernanda</p>
            <p className="text-lg font-semibold text-green-900">
              {formatCurrency(calculatedFields.fernanda, 'ARS')}
            </p>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          {isEditing ? 'Actualizar' : 'Guardar'} Movimiento
        </button>
      </div>
    </form>
  );
};

export default MovementForm;
