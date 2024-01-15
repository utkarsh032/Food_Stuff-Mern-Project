import React, { useContext } from 'react'
import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from '../context/AuthProvider';
import LoadingAnimation from '../components/LoadingAnimation';

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <div><LoadingAnimation /></div>
    )
  }
  if (user) {
    return <>
      {children};
    </>
  }
  return <Navigate to="/login" state={{ from: location }} replace />
}

export default PrivateRouter