import React, { useState } from 'react'
import { currencyFormatter, diffDays } from '../../helps/helps'
import { Link } from 'react-router-dom'
import OrderModel from '../models/OrderModel'

export default function BookingCard({hotel , session , orderBy , status}) {

    const [showModels , setShowModels] = useState(false)

      if (!hotel) {
    return (
      <div className="alert alert-secondary mb-3">
        This hotel is no longer available.
      </div>
    );
  }


  return (
    <>
        <div className='card mb-3'>
            <div className='row'>
                <div className='col-md-4'>
                    <img className='card-image img-fluid' src={hotel.image.url} alt={hotel.title} />

                </div>

                <div className='col-md-8'>
                    <div className='card-body'>
                        <h3 className='card-title'>{hotel.title}{" "} <span className='float-right text-primary'>
                                {currencyFormatter({
                                    amount : hotel.price * 100,
                                    currency: "usd",
                                })}
                        </span>{" "}</h3>
                        <p className='alert alert-info'>{hotel.location}</p>
                        <p className='card-text'>{`${hotel.content.substring(0,200)}...`}</p>
                        <p className='card-text'><span className='text-primary'>For {diffDays(hotel.fromDate , hotel.toDate)}{" "}{diffDays(hotel.fromDate , hotel.toDate) <= 1 ? "day" : "days"}</span></p>
                        <p className='card-text'>Available {hotel.bed} bed</p>
                        <p className='card-text text-primary'>Available From {new Date(hotel.fromDate).toLocaleDateString()}</p>



                        {showModels && <OrderModel status={status} session={session} orderBy={orderBy} setShowModels={setShowModels} showModels={showModels} />}



                        <div className='d-flex justify-content-between fs-4 mt-3'>

                        
                                <>
                                     <button onClick={()=> setShowModels(!showModels)} className='btn btn-primary'>Show Payment Info</button>
                                </>
                          


                   
                        </div>

                    </div>
                </div>

            </div>

        </div>

    </>
  )
}
