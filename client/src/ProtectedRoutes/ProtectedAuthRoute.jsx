import React, { useContext } from 'react'
import { authContext } from '../context/authContext.jsx'
import { Navigate } from 'react-router-dom'

export default function ProtectedAuthRoute({children}) {

    const {userToken} = useContext(authContext)

    const token = !!userToken
    console.log(token);
    


  return (
    <>
        {token?<Navigate to={'/'}/>: children}
    </>
  )
}
