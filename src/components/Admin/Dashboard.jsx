import { useState, useEffect } from 'react';
import movementsService from '../../services/api';
import MovementForm from './MovementForm';
import MovementTable from './MovementTable';
import { formatCurrency } from '../../utils/calculations';

const Dashboard = () => {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMovement, setEditingMovement] = useState(null);
  const [error, setError] = useState(null);

  // Cargar movimientos al montar el componente
  useEffect(() => {
    loadMovements();
  }, []);

  const loadMovements = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await movementsService.getAll();

      // Asegurar que data sea un array
      if (Array.isArray(data)) {
        // Filtrar movimientos que NO están pagados (salio = false)
        const unpaidMovements = data.filter(mov => !mov.salio);

        // Ordenar por fecha de check-in: más cercano a hoy primero
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalizar a medianoche

        const sortedMovements = unpaidMovements.sort((a, b) => {
          const dateA = new Date(a.checkIn);
          const dateB = new Date(b.checkIn);

          // Calcular diferencia absoluta con la fecha de hoy
          const diffA = Math.abs(dateA - today);
          const diffB = Math.abs(dateB - today);

          return diffA - diffB; // Ascendente (más cercano primero)
        });

        setMovements(sortedMovements);
      } else {
        setMovements([]);
      }
    } catch (err) {
      setError('Error al cargar los movimientos. Verifica la conexión con Google Sheets.');
      console.error(err);
      setMovements([]); // Asegurar que movements sea un array incluso si hay error
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (movementData) => {
    try {
      await movementsService.create(movementData);
      await loadMovements();
      setShowForm(false);
      alert('Movimiento creado exitosamente');
    } catch (err) {
      alert('Error al crear el movimiento');
      console.error(err);
    }
  };

  const handleUpdate = async (movementData) => {
    try {
      await movementsService.update(editingMovement.id, movementData);
      await loadMovements();
      setShowForm(false);
      setEditingMovement(null);
      alert('Movimiento actualizado exitosamente');
    } catch (err) {
      alert('Error al actualizar el movimiento');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await movementsService.delete(id);
      await loadMovements();
      alert('Movimiento eliminado exitosamente');
    } catch (err) {
      alert('Error al eliminar el movimiento');
      console.error(err);
    }
  };

  const handleEdit = (movement) => {
    setEditingMovement(movement);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingMovement(null);
  };

  // Calcular totales
  const totals = movements.reduce((acc, mov) => ({
    totalUSD: acc.totalUSD + (parseFloat(mov.precioDolar) || 0),
    totalRicardo: acc.totalRicardo + (parseFloat(mov.pelado) || 0),
    totalFernanda: acc.totalFernanda + (parseFloat(mov.fernanda) || 0),
    totalComisionPablo: acc.totalComisionPablo + (parseFloat(mov.comisionPablo) || 0),
    totalLimpieza: acc.totalLimpieza + (parseFloat(mov.limpieza) || 0)
  }), { totalUSD: 0, totalRicardo: 0, totalFernanda: 0, totalComisionPablo: 0, totalLimpieza: 0 });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando movimientos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="mt-2 text-gray-600">Gestión de movimientos y propiedades</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Total Ingresos USD</p>
            <p className="text-2xl font-bold text-primary-600">
              {formatCurrency(totals.totalUSD, 'USD')}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-2">Total para Ricardo</p>
            <p className="text-2xl font-bold text-green-600 mb-3">
              {formatCurrency(totals.totalRicardo, 'ARS')}
            </p>
            <div className="text-xs text-gray-500 space-y-1 border-t pt-2">
              <p>Comisión Pablo: {formatCurrency(totals.totalComisionPablo, 'ARS')}</p>
              <p>Limpieza: {formatCurrency(totals.totalLimpieza, 'ARS')}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-2">Total para Fernanda</p>
            <p className="text-2xl font-bold text-green-600 mb-3">
              {formatCurrency(totals.totalFernanda, 'ARS')}
            </p>
            <div className="text-xs text-gray-500 space-y-1 border-t pt-2">
              <p>Comisión Pablo: {formatCurrency(totals.totalComisionPablo, 'ARS')}</p>
              <p>Limpieza: {formatCurrency(totals.totalLimpieza, 'ARS')}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Gastos Totales</p>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(totals.totalComisionPablo + totals.totalLimpieza, 'ARS')}
            </p>
            <div className="text-xs text-gray-500 space-y-1 border-t pt-2 mt-3">
              <p>Comisión Pablo: {formatCurrency(totals.totalComisionPablo, 'ARS')}</p>
              <p>Limpieza: {formatCurrency(totals.totalLimpieza, 'ARS')}</p>
            </div>
          </div>
        </div>

        {/* Botón para agregar */}
        {!showForm && (
          <div className="mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              + Agregar Nuevo Movimiento
            </button>
          </div>
        )}

        {/* Formulario */}
        {showForm && (
          <div className="card mb-8">
            <h2 className="text-xl font-semibold mb-6">
              {editingMovement ? 'Editar Movimiento' : 'Nuevo Movimiento'}
            </h2>
            <MovementForm
              onSubmit={editingMovement ? handleUpdate : handleCreate}
              onCancel={handleCancelForm}
              initialData={editingMovement}
              isEditing={!!editingMovement}
            />
          </div>
        )}

        {/* Tabla */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Movimientos Registrados</h2>
          <MovementTable
            movements={movements}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isAdmin={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
