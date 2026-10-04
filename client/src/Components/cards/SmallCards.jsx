import React from 'react'
import { currencyFormatter, diffDays } from '../../helps/helps'
import { Link } from 'react-router-dom'


export default function SmallCards({h , handleHotelDelete , isLoading , owner = false , showViewMoreButton = true}) {
  return (
    <>
        <div className='card mb-3'>
            <div className='row'>
                <div className='col-md-4'>
                    <img className='card-image img-fluid' src={h.image.url} alt={h.title} />

                </div>

                <div className='col-md-8'>
                    <div className='card-body'>
                        <h3 className='card-title'>{h.title}{" "} <span className='float-right text-primary'>
                                {currencyFormatter({
                                    amount : h.price * 100,
                                    currency: "usd",
                                })}
                        </span>{" "}</h3>
                        <p className='alert alert-info'>{h.location}</p>
                        <p className='card-text'>{`${h.content.substring(0,200)}...`}</p>
                        <p className='card-text'><span className='text-primary'>For {diffDays(h.fromDate , h.toDate)}{" "}{diffDays(h.fromDate , h.toDate) <= 1 ? "day" : "days"}</span></p>
                        <p className='card-text'>Available {h.bed} bed</p>
                        <p className='card-text text-primary'>Available From {new Date(h.fromDate).toLocaleDateString()}</p>

                        <div className='d-flex justify-content-between fs-4 mt-3'>

                            {showViewMoreButton && (
                                <>
                                     <Link className='btn btn-primary' to={`/hotel/${h._id}`}>Show more</Link>
                                </>
                            )}


                            {owner &&(
                                <>

                                    <Link to={`/hotel/edit/${h._id}`}>
                                         <i className="bi bi-pencil-fill text-warning"></i>
                                    </Link>
                            
                                {isLoading ? (
                                            <span className="spinner-border spinner-border-sm text-danger" role="status"></span>
                                            ) : (
                                            <i onClick={() => handleHotelDelete(h._id)} className="bi bi-trash-fill text-danger"style={{ cursor: "pointer" }}></i>)}                                
                                 </>

                            )}
                            
                        </div>

                    </div>
                </div>

            </div>

        </div>

    </>
  )
}
