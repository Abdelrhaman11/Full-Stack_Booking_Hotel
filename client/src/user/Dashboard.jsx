import React, { useEffect, useState } from 'react'
import DashboardNav from '../Components/DashboardNav.jsx'
import ConnectNav from '../Components/ConnectNav.jsx'
import { Link } from 'react-router-dom'
import { apiServices } from '../services/api.js'
import BookingCard from "../Components/cards/BookingCard.jsx"
import LoadingScreen from '../Components/LoadingScreen.jsx'
export default function Dashboard() {
  const [booking , setBooking] = useState([])
  const [isLoading, setIsLoading] = useState(true);  
  
  
 async function loaduserBooking() {

   try {
    setIsLoading(true);

    const res = await apiServices.userBookingHotel();

    setBooking(res.result);

  } catch (error) {
    console.log(error);

  } finally {
    setIsLoading(false);
  }
    
  }

  useEffect(()=>{
    loaduserBooking()
  },[])


  return (
    <>

    <div className='container-fluid bg-secondary'>
      <ConnectNav/>
    </div>

    <div className='container-fluid p-4'>
        {<DashboardNav/>}
    </div>


    <div className='container-fluid'>
      <div className="row">
        <div className='col-md-10'>
            <h2>Your Booking</h2>
        </div>
        <div className='col-md-2'>
            <Link to={"/"} className="btn btn-primary">Browse Hotels</Link>
        </div>
      </div>
    </div>

    

  <div className="container-fluid">
  <div className="row">

    {isLoading ? <LoadingScreen /> : (
          booking.length > 0 ? (
      booking.map((b) => {

      const paymentInfo = b.user?.stripeSession?.find(
      (item) =>
        item.bookingId?.toString() === b._id.toString()
    );

    return(
        <BookingCard key={b._id} hotel={b.hotel} status={b.status} session={paymentInfo?.session} orderBy={b.user?.name}/>

    )
      })
    ) : (
      <div className="d-flex flex-column align-items-center justify-content-center text-center"
        style={{ minHeight: "300px" }}
      >
        <i className="bi bi-calendar-x text-secondary display-3 mb-3"></i>

        <h3 className="fw-semibold text-secondary"> No Bookings Found</h3>

        <p className="text-muted"> You don't have any bookings yet.</p>


      </div>
    )
    )}

  </div>
</div>




    </>
  )
}
