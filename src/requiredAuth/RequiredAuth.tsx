import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/app/hooks';

const RequiredAuth: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const { email } = useAppSelector((state) => state.auth);
  return email ? (
    children
  ) : (
    <Navigate to={'/login'} state={{ from: pathname }} replace />
  );
};

export default RequiredAuth;
