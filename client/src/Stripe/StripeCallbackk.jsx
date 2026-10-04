import React from 'react'
import { useContext } from 'react'
import { authContext } from '../context/authContext'
import { useEffect } from 'react'
import { apiServices } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function StripeCallbackk() {

    const {userData} = useContext(authContext)
    const navigate = useNavigate()

    async function accountStatus(){
        try {

            const res = await apiServices.getAccountStatus();
            navigate("/dashboard")
            
        } catch (error) {
            console.log();
                  
        }
    }

    useEffect(()=>{

        if(userData){
            accountStatus()
        }

    },[userData])

  return (
<div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} >
      </div>
    </div>
      )
}
[]