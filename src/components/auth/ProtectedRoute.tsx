
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: ('honDNM' | 'admin' | 'teamMember')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  allowedRoles
}) => {
  const { isAuthenticated, userRole } = useAuth();
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  // If role restriction is specified and user's role is not allowed
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  
  // If authenticated and authorized, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
