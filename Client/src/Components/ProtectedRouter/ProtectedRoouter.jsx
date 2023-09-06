import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
//Tenemos como children el componente que rodea ProtectedRouter si pasa por las validaciones se accede al componente que rodea protectedRouter
function ProtectedRoouter({isAllowed,children, redirectTo}) { //Las Props nos sirven para que el componente sea reutilizable en cuanquier otro contexto
    if (!isAllowed) {
        return <Navigate to={redirectTo}/>
    }
  return children? children : <Outlet/> //si ProtRout rodea varios componentes utiliza Outlet(+1) pero si solo contiene un children(1) valida en base a ese children  
}

export default ProtectedRoouter