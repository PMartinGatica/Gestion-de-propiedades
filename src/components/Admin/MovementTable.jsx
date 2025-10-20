import { formatCurrency, formatDate } from '../../utils/calculations';

const MovementTable = ({ movements, onEdit, onDelete, isAdmin = false }) => {
  const handleDelete = (id, checkIn) => {
    if (window.confirm(`¿Estás seguro de eliminar el movimiento del ${formatDate(checkIn)}?`)) {
      onDelete(id);
    }
  };

  if (!movements || movements.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No hay movimientos registrados</p>
      </div>
    );
  }

  return (
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
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider bg-blue-50">
              Precio Pesos Booking
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Precio USD
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Comisión Booking
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ganancia Real
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Precio Pesos
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Para Ricardo
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Para Fernanda
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pagado
            </th>
            {isAdmin && (
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {movements.map((movement) => (
            <tr key={movement.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(movement.checkIn)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(movement.checkOut)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-bold bg-blue-50 text-blue-900">
                {formatCurrency(movement.precioPesosBooking, 'ARS')}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                {formatCurrency(movement.precioDolar, 'USD')}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 text-right">
                {formatCurrency(movement.comisionBooking, 'USD')}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                {formatCurrency(movement.gananciaReal, 'USD')}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                {formatCurrency(movement.precioPesos, 'ARS')}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-green-700 text-right font-semibold">
                {formatCurrency(movement.pelado, 'ARS')}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-green-700 text-right font-semibold">
                {formatCurrency(movement.fernanda, 'ARS')}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-center">
                {movement.salio ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Sí
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    No
                  </span>
                )}
              </td>
              {isAdmin && (
                <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                    onClick={() => onEdit(movement)}
                    className="text-primary-600 hover:text-primary-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(movement.id, movement.checkIn)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovementTable;
