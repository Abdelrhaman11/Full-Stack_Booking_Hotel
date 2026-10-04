import React, { useEffect, useState } from 'react'
import { apiServices } from '../services/api'
import SmallCards from '../Components/cards/SmallCards';
import Search from "../Components/forms/Search"
import LoadingScreen from '../Components/LoadingScreen';

export default function Home() {

  const [hotels , setHotels] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  async function loadHotels() {
    try {

      setIsLoading(true);
    const res = await apiServices.allHotels()
    console.log(res.results);
    setHotels(res.results) 
      
    } catch (error) {
      console.log(error);
      
    }finally {
      setIsLoading(false);
    }

  }

  async function handleHotelDelete(hotelId) {

     const result = await Swal.fire({
        title: "Are you sure?",
        text: "This hotel will be permanently deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel",
        reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
        setIsLoading(true);

        const res = await apiServices.deleteHotels(hotelId);
        await loadHotels();

        toast.success(res.message);
    } catch (error) {
        console.log(error);
        toast.error(
          error.response?.data?.message ||
           error.message ||
            "Something went wrong"
        );
    } finally {
        setIsLoading(false);
    }



  }

  useEffect(()=>{
    loadHotels()
  },[])




  return (
    <>
    

        <div className='container-fluid bg-secondary p-5 text-center'>
          <h1>All Hotels</h1>
        </div>

            <div className='col mt-3'>
          <Search/>
        </div>

        {isLoading ? <LoadingScreen /> :(
          <div className='container-fluid'>
          {hotels.map((h)=>{
             return <SmallCards key={h._id} h={h} handleHotelDelete={handleHotelDelete} isLoading={isLoading}/>
          })}
        </div>
        )}

  


    
    </>
  
  )
}
