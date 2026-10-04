import React, { useContext, useEffect, useState } from 'react'
import { Await, useNavigate, useParams } from 'react-router-dom';
import { apiServices } from '../services/api';
import { diffDays } from '../helps/helps';
import { authContext } from '../context/authContext';
import ReviewHotel from './ReviewHotel';
import LoadingScreen from '../Components/LoadingScreen';

export default function ViewHotell() {
  const { hotelId } = useParams();

    const [hotel , setHotel] = useState({})
    const [loading , setLoading] = useState(false)
    const [hotelLoad , setHotelLoad] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const [alreadyBooked, setAlreadyBooked] = useState(false);
    const {userToken , userData} = useContext(authContext)

      const navigate = useNavigate()
    

     async function loadHotel() {

        

        try {
            setHotelLoad(true)
        const res = await apiServices.getHotel(hotelId);

        await setHotel(res.results)


    } catch (error) {
        console.log(error);
    }finally {
        setHotelLoad(false)
    }
            
        }



    async function handleClick(e) {
        
       e.preventDefault();
        if(!userToken){
            navigate("/login")
        }

             setLoading(true);
             setErrorMessage("");

            try {
                const res = await apiServices.getSessionId(hotelId);

                 window.location.href = res.url;

                } catch (error) {

                setErrorMessage(error.response?.data?.message || "Something went wrong");
                
                } finally{
                setLoading(false);

                }
        
     }  


     



    useEffect(()=>{
        loadHotel()

    },[hotelId])


    useEffect(()=>{
        if(userToken)
        {
            apiServices.isAlreadyBooking(hotelId).then((res) => {
                if(res.result){
                    setAlreadyBooked(res.result);

                }
                
            })
        }

    },[hotelId, userToken])

const isOwner = userData?._id && hotel.postedBy?._id && String(userData._id) === String(hotel.postedBy._id);



  return (
    <>

    {hotelLoad ? <LoadingScreen /> : (

        <div>

                <div className='container-fluid p-5 text-center bg-light'>
      <h2>{hotel.title} <span className=' text-info'>${hotel.price}</span></h2>
    </div>

             <div className='container-fluid'>
        <div className='row mt-4'>
            <div className='col-md-6'>
                <img src={hotel.image?.url} alt={hotel.title} className="img-fluid"/>

            </div>
            <div className='col-md-6'>
                <p>{hotel.content}</p>
                <p className='alert alert-info mt-3'>{hotel.price}</p>
                <p className='card-text'><span className='text-primary'>For {diffDays(hotel.fromDate , hotel.toDate)}{" "}{diffDays(hotel.fromDate , hotel.toDate) <= 1 ? "day" : "days"}</span></p>
                <p className='card-text '>From <br/> {new Date(hotel.fromDate).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                         hour12: true,
                 })}</p>
                <p className='card-text '>To <br/> {new Date(hotel.toDate).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                         hour12: true,
                 })}</p>


                 <p>Posted By {hotel.postedBy && hotel.postedBy.name}  {isOwner && (
                    <span className="badge bg-success ms-2">
                    <i className="bi bi-check-circle me-1"></i>
                    You are the owner
                     </span>
                    )}</p>


                 {errorMessage && (
                        <div className="alert alert-danger mt-3">
                            {errorMessage}
                        </div>
                    )}

                 <button disabled={loading || alreadyBooked || isOwner} onClick={handleClick} className="btn btn-block btn-lg btn-primary mt-3">
                 {loading ? (
                      <>
                         <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Processing...
                         </>
                         ) : isOwner ? (
                             "You are the owner"
                         ) : alreadyBooked ? (
                         "Already Booked"
                         ) : (
                         "Booking Now"
                             )}
                            </button>

            </div>
        </div>

    </div>
    
    <ReviewHotel hotelId={hotelId} />


        </div>

    )}


   

    </>
  )
}
