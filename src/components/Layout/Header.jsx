import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Gestión de Propiedades
            </h1>
            <p className="text-sm text-gray-600">
              {user?.role === 'admin' ? 'Administrador' : 'Propietario'}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {user?.displayName}
              </p>
              <p className="text-xs text-gray-500">
                {user?.role === 'admin' ? 'Administrador' : 'Propietario'}
              </p>
            </div>
            <button
              onClick={logout}
              className="btn-secondary text-sm"
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
