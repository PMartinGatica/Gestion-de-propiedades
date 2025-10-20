import { useState, useEffect } from 'react';
import movementsService from '../../services/api';
import MovementTable from '../Admin/MovementTable';
import { formatCurrency } from '../../utils/calculations';
import { useAuth } from '../../context/AuthContext';

const OwnerView = () => {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());
  const { user } = useAuth();

  useEffect(() => {
    loadMovements();
  }, []);

  const loadMovements = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await movementsService.getAll();
      // Guardar todos los movimientos sin filtrar
      setMovements(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Error al cargar los movimientos. Verifica la conexión con Google Sheets.');
      console.error(err);
      setMovements([]);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar por año
  const filteredMovements = movements.filter(mov => {
    if (!filterYear) return true;
    const year = new Date(mov.checkIn).getFullYear();
    return year === parseInt(filterYear);
  });

  // Calcular totales según el propietario
  const isRicardo = user?.name === 'ricardo';
  const isFernanda = user?.name === 'fernanda';

  const totals = filteredMovements.reduce((acc, mov) => {
    let ownerTotal = 0;
    if (isRicardo) {
      ownerTotal = parseFloat(mov.pelado) || 0;
    } else if (isFernanda) {
      ownerTotal = parseFloat(mov.fernanda) || 0;
    }

    // Solo sumar gastos si el movimiento está pagado (salio = true)
    const comisionPablo = mov.salio ? (parseFloat(mov.comisionPablo) || 0) : 0;
    const limpieza = mov.salio ? (parseFloat(mov.limpieza) || 0) : 0;

    return {
      totalUSD: acc.totalUSD + (parseFloat(mov.precioDolar) || 0),
      ownerTotal: acc.ownerTotal + ownerTotal,
      paid: mov.salio ? acc.paid + ownerTotal : acc.paid,
      pending: !mov.salio ? acc.pending + ownerTotal : acc.pending,
      totalComisionPablo: acc.totalComisionPablo + comisionPablo,
      totalLimpieza: acc.totalLimpieza + limpieza
    };
  }, { totalUSD: 0, ownerTotal: 0, paid: 0, pending: 0, totalComisionPablo: 0, totalLimpieza: 0 });

  // Obtener años disponibles para el filtro
  const availableYears = [...new Set(movements.map(mov =>
    new Date(mov.checkIn).getFullYear()
  ))].sort((a, b) => b - a);

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
          <h1 className="text-3xl font-bold text-gray-900">
            Mis Movimientos - {user?.displayName}
          </h1>
          <p className="mt-2 text-gray-600">Vista de tus ingresos y pagos</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Filtro por año */}
        <div className="mb-6 card">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filtrar por año
          </label>
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="input-field max-w-xs"
          >
            <option value="">Todos los años</option>
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Total Reservas</p>
            <p className="text-2xl font-bold text-primary-600">
              {filteredMovements.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Mis Ingresos Totales</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(totals.ownerTotal, 'ARS')}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Pagado</p>
            <p className="text-2xl font-bold text-blue-600">
              {formatCurrency(totals.paid, 'ARS')}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Pendiente</p>
            <p className="text-2xl font-bold text-yellow-600">
              {formatCurrency(totals.pending, 'ARS')}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-2">Gastos Totales</p>
            <p className="text-2xl font-bold text-red-600 mb-3">
              {formatCurrency(totals.totalComisionPablo + totals.totalLimpieza, 'ARS')}
            </p>
            <div className="text-xs text-gray-500 space-y-1 border-t pt-2">
              <p>Comisión Pablo: {formatCurrency(totals.totalComisionPablo, 'ARS')}</p>
              <p>Limpieza: {formatCurrency(totals.totalLimpieza, 'ARS')}</p>
            </div>
          </div>
        </div>

        {/* Detalle de Gastos por Huésped - Solo Pagados */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-6">
            Detalle de Gastos por Huésped (Solo Pagados) {filterYear && `- ${filterYear}`}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check-In
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check-Out
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comisión Pablo
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Limpieza
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider bg-red-50">
                    Total Gastos
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMovements.filter(mov => mov.salio).length > 0 ? (
                  filteredMovements.filter(mov => mov.salio).map((movement) => {
                    const totalGastos = (parseFloat(movement.comisionPablo) || 0) + (parseFloat(movement.limpieza) || 0);
                    return (
                      <tr key={movement.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(movement.checkIn).toLocaleDateString('es-AR')}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(movement.checkOut).toLocaleDateString('es-AR')}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                          {formatCurrency(movement.comisionPablo, 'ARS')}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                          {formatCurrency(movement.limpieza, 'ARS')}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-red-700 text-right font-bold bg-red-50">
                          {formatCurrency(totalGastos, 'ARS')}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                      No hay gastos pagados para mostrar
                    </td>
                  </tr>
                )}
              </tbody>
              {filteredMovements.filter(mov => mov.salio).length > 0 && (
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan="2" className="px-4 py-4 text-sm font-bold text-gray-900">
                      TOTALES (Solo Pagados)
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-bold">
                      {formatCurrency(totals.totalComisionPablo, 'ARS')}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-bold">
                      {formatCurrency(totals.totalLimpieza, 'ARS')}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-red-700 text-right font-bold bg-red-50">
                      {formatCurrency(totals.totalComisionPablo + totals.totalLimpieza, 'ARS')}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>

        {/* Tabla completa de movimientos */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">
            Detalle Completo de Movimientos {filterYear && `- ${filterYear}`}
          </h2>
          <MovementTable
            movements={filteredMovements}
            isAdmin={false}
          />
        </div>
      </div>
    </div>
  );
};

export default OwnerView;
