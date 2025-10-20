import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Lista de usuarios del sistema
const USERS = [
  { id: 1, name: 'pablo', displayName: 'Pablo', role: 'admin' },
  { id: 2, name: 'ricardo', displayName: 'Ricardo', role: 'owner' },
  { id: 3, name: 'fernanda', displayName: 'Fernanda', role: 'owner' }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login simple por nombre
  const login = (username) => {
    const foundUser = USERS.find(
      u => u.name.toLowerCase() === username.toLowerCase()
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Verificar si es administrador
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    login,
    logout,
    isAdmin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};
