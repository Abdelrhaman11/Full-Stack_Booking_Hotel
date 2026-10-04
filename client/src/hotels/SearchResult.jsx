import React, { useEffect, useState } from 'react'
import queryString from "query-string";
import { apiServices } from '../services/api';
import SmallCards from '../Components/cards/SmallCards';
import Search from '../Components/forms/Search';
import LoadingScreen from '../Components/LoadingScreen';
import { useLocation } from "react-router-dom";

export default function SearchResult() {


const [hotels , setHotels] = useState([])
const [errorMessage, setErrorMessage] = useState("");
const [isLoading, setIsLoading] = useState(false);
const routerLocation = useLocation();

const { location, date, bed } = queryString.parse(routerLocation.search);


async function searchHotels() {
    try {
      setErrorMessage("");
      setIsLoading(true)

      const res = await apiServices.searchListings({location, date, bed});

      setHotels(res.result);

    } catch (error) {
      setHotels([]);

      setErrorMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }finally{
      setIsLoading(false)
    }
  }



    useEffect(()=>{

        searchHotels();

    },[routerLocation.search])


  return (
    <>

    <div className='mt-3'>
        <Search/>
    </div>

    {isLoading ? <LoadingScreen /> : (
    <div className='container'>

              {errorMessage ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
          <h3 className="text-muted">
            {errorMessage}
          </h3>
        </div>
      ) : (
        <div className="row">
                 {
                    hotels.map((h => <SmallCards key={h._id} h={h}/>))
                } 
        </div>
      )}

    
    </div>
    )}


    
    
    </>
    
  )
}
