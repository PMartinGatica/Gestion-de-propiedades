import { formatCurrency } from '../../utils/calculations';

const WeeklyEarningsChart = ({ movements }) => {
  // Filtrar solo movimientos pagados
  const paidMovements = movements.filter(mov => mov.salio);

  // Agrupar por semana
  const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return `${d.getFullYear()}-S${weekNo}`;
  };

  const getWeekLabel = (weekKey) => {
    const [year, week] = weekKey.split('-S');
    return `Semana ${week} (${year})`;
  };

  // Agrupar ganancias por semana
  const weeklyData = paidMovements.reduce((acc, mov) => {
    const weekKey = getWeekNumber(mov.checkIn);

    if (!acc[weekKey]) {
      acc[weekKey] = {
        totalRicardo: 0,
        totalFernanda: 0,
        totalUSD: 0,
        count: 0
      };
    }

    acc[weekKey].totalRicardo += parseFloat(mov.pelado) || 0;
    acc[weekKey].totalFernanda += parseFloat(mov.fernanda) || 0;
    acc[weekKey].totalUSD += parseFloat(mov.precioDolar) || 0;
    acc[weekKey].count += 1;

    return acc;
  }, {});

  // Convertir a array y ordenar por semana
  const weeklyArray = Object.entries(weeklyData)
    .map(([week, data]) => ({
      week,
      label: getWeekLabel(week),
      ...data,
      total: data.totalRicardo + data.totalFernanda
    }))
    .sort((a, b) => a.week.localeCompare(b.week));

  if (weeklyArray.length === 0) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold mb-6">Ganancias por Semana (Solo Pagados)</h2>
        <div className="text-center py-12">
          <p className="text-gray-500">No hay movimientos pagados para mostrar</p>
        </div>
      </div>
    );
  }

  // Encontrar el valor máximo para escalar las barras
  const maxValue = Math.max(...weeklyArray.map(w => w.total));

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-6">Ganancias por Semana (Solo Pagados)</h2>

      <div className="space-y-6">
        {weeklyArray.map((week) => {
          const ricardoPercentage = (week.totalRicardo / maxValue) * 100;
          const fernandaPercentage = (week.totalFernanda / maxValue) * 100;
          const totalPercentage = (week.total / maxValue) * 100;

          return (
            <div key={week.week} className="border-b pb-4 last:border-b-0">
              {/* Etiqueta de la semana */}
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{week.label}</h3>
                  <p className="text-xs text-gray-500">{week.count} reserva{week.count > 1 ? 's' : ''}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">
                    Total: {formatCurrency(week.total, 'ARS')}
                  </p>
                  <p className="text-xs text-gray-500">
                    USD {formatCurrency(week.totalUSD, 'USD')}
                  </p>
                </div>
              </div>

              {/* Barra de progreso combinada */}
              <div className="relative h-12 bg-gray-100 rounded-lg overflow-hidden">
                {/* Barra de Ricardo */}
                <div
                  className="absolute top-0 left-0 h-6 bg-green-500 transition-all duration-500 flex items-center justify-end pr-2"
                  style={{ width: `${ricardoPercentage}%` }}
                >
                  {ricardoPercentage > 15 && (
                    <span className="text-xs font-semibold text-white">
                      Ricardo: {formatCurrency(week.totalRicardo, 'ARS')}
                    </span>
                  )}
                </div>

                {/* Barra de Fernanda */}
                <div
                  className="absolute bottom-0 left-0 h-6 bg-blue-500 transition-all duration-500 flex items-center justify-end pr-2"
                  style={{ width: `${fernandaPercentage}%` }}
                >
                  {fernandaPercentage > 15 && (
                    <span className="text-xs font-semibold text-white">
                      Fernanda: {formatCurrency(week.totalFernanda, 'ARS')}
                    </span>
                  )}
                </div>
              </div>

              {/* Leyenda de montos (si las barras son muy pequeñas) */}
              {(ricardoPercentage <= 15 || fernandaPercentage <= 15) && (
                <div className="flex justify-between mt-2 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                    <span className="text-gray-600">
                      Ricardo: {formatCurrency(week.totalRicardo, 'ARS')}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                    <span className="text-gray-600">
                      Fernanda: {formatCurrency(week.totalFernanda, 'ARS')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Resumen total */}
      <div className="mt-6 pt-6 border-t">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Total Ricardo</p>
            <p className="text-lg font-bold text-green-600">
              {formatCurrency(weeklyArray.reduce((sum, w) => sum + w.totalRicardo, 0), 'ARS')}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Total Fernanda</p>
            <p className="text-lg font-bold text-blue-600">
              {formatCurrency(weeklyArray.reduce((sum, w) => sum + w.totalFernanda, 0), 'ARS')}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Total General</p>
            <p className="text-lg font-bold text-gray-900">
              {formatCurrency(weeklyArray.reduce((sum, w) => sum + w.total, 0), 'ARS')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyEarningsChart;
