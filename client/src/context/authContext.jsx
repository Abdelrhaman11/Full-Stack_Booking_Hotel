import { createContext, useEffect, useState } from "react";
import { apiServices } from "../services/api.js";



export const authContext = createContext(0)

export default function AuthContextProvider({children}){


  const [userData , setUserData] = useState(false)
  const [userToken , setUserToken] = useState(localStorage.getItem("token"))
  

  async function getLoggedUserData(){
    
    try{

      const data = await apiServices.getLoggedUserData()
      setUserData (data.user)

    console.log(data);
    
    }catch (error) {
        if(error.status == 401){
            localStorage.removeItem("token")
            setUserData(null)

        }
    }
    
  }

  useEffect(()=>{
    if(userToken != null){
      
        apiServices.setToken(userToken)        
        getLoggedUserData()

    }
  },[userToken])




    return <authContext.Provider value={{userToken , setUserToken , setUserData  , userData }}>
        {children}
    </authContext.Provider>


}