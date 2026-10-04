import React, { useContext, useEffect, useState } from 'react'
import DashboardNav from '../Components/DashboardNav'
import ConnectNav from '../Components/ConnectNav'
import { Link } from 'react-router-dom'
import { authContext } from '../context/authContext'
import { HomeOutlined, TruckFilled } from "@ant-design/icons";
import toast from "react-hot-toast";
import { apiServices } from '../services/api'
import SmallCards from '../Components/cards/SmallCards'
import Swal from "sweetalert2";
import LoadingScreen from '../Components/LoadingScreen'

export default function DashboardSeller() {

  const { userData, setUserData } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const [hotelsLoading , setHotelsLoading ] = useState(false);
  const [hotels, setIHotels] = useState([]);


  async function loadSellerHotels(params) {
    try {
      setHotelsLoading(true)
      const res = await apiServices.sellerHotels()
      setIHotels(res.results)
      
    } catch (error) {

      console.log("Error loading seller hotels:", error);
      
    }finally{
      setHotelsLoading(false)
    }

  

    
  }

  async function loadAccountStatus() {
  try {
    const res = await apiServices.getAccountStatus();

    setUserData(res.updateUser);
  } catch (error) {
    console.log("Account status error:", error);
  }
}


useEffect(() => {
  loadAccountStatus();
  loadSellerHotels();
}, []);


   async function handleClick(){
      setIsLoading(true);
      try{

          const response = await apiServices.createConnectAccount()
          window.location.href = response.link
          

      }catch(err){
        toast.error("Stripe Connect Faild, Try again")
        
      }finally{
      setIsLoading(false);

      }

    
  }

  async function handleHotelDelete(hotelId){

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
      setIsLoading(true)
      
      const res = await apiServices.deleteHotels(hotelId)
      
      await loadSellerHotels()
      toast.success(res.message)
      
    } catch (error) {
     toast.error(
    error.response?.data?.validationError ||
    error.response?.data?.message ||
    error.message ||
    "Something went wrong"
  ) 
    
    }finally{
      setIsLoading(false)
    }

  }

  function connected() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          <h2>Your Hotels</h2>
        </div>

        <div className="col-md-2">
          <Link to="/hotels/new" className="btn btn-primary">+ Add New</Link>
        </div>
      </div>

      {hotelsLoading ? <LoadingScreen /> : (
      <div className='row'>
          {hotels.map((h)=> <SmallCards key={h._id} h={h} isLoading={isLoading} handleHotelDelete={handleHotelDelete} showViewMoreButton={false} owner={true}/>)}
      </div>
      )}

  

    </div>
  );
}


  function notconnected(){

    return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <div className="p-5">
            <HomeOutlined className="h1"/>
            <h4>SetUp payouts to post hotem room</h4>
              <p className='lead'>MERN partners with stripe with transfer earnings to you bank account</p>
              <button disabled={isLoading} onClick={handleClick} className='btn btn-primary mb-3'>{isLoading ? 
    
                <>  <span className="spinner-border spinner-border-sm me-2"></span> Processing... </> : "SetUp payouts"}
            </button>
              <p className='text-muted'><span>You 'll be redirected to Stripe complete the onloading process</span></p>
          </div>
        </div>
      </div>
    </div>
  );
  }



  return (
    <>
       <div className='container-fluid bg-secondary'>

          <ConnectNav/>
            
        </div>
    
        <div className='container-fluid p-4'>
            {<DashboardNav/>}
        </div>

      {userData?.stripe_seller?.charges_enabled? connected(): notconnected()}

    </>
  )
}
