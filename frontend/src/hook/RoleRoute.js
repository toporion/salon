import React from 'react';
import UseAuth from './UseAuth';
import { Navigate } from 'react-router-dom';

const RoleRoute = ({children,allowedRoles}) => {
    const {user,loading,isAuthenticated}=UseAuth()

    if(loading){return <div>Loading.....</div>}
    if(!isAuthenticated){return <Navigate to='/login' replace={true}/>}
    if(!user|| !allowedRoles.includes(user?.role)){
        return <Navigate to='forbiden' replace/>
    }
    return children
};

export default RoleRoute;