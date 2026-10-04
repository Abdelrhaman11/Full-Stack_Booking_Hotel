import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiServices } from '../services/api';
import { useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { updateHotelSchema } from '../validation/schema';
import LocationInput from '../Components/location/LocationInput.jsx';
import toast from 'react-hot-toast';

export default function EditHotel() {

        const { hotelId } = useParams();
        const [imagePreview, setImagePreview] = useState(null);
        const [isLoading, setIsLoading] = useState(false);
        const navigate = useNavigate()


        
        const {handleSubmit , register , control , reset , formState:{errors}} = useForm({
                  resolver:zodResolver(updateHotelSchema),
              })


              async function updateHotel(hotelData) {
              
                setIsLoading(true);
              
              
                const formData = new FormData();
              
                if (hotelData.image?.[0]) {
                 formData.append("image", hotelData.image[0]);
                }   

                formData.append("title", hotelData.title);
                formData.append("content", hotelData.content);
                formData.append("location",hotelData.location.address);
                formData.append("price", hotelData.price);
                formData.append("bed", hotelData.bed);
                formData.append("fromDate", hotelData.fromDate);
                formData.append("toDate", hotelData.toDate);
              
                console.log(formData);
                
              
                try {
                  const res = await apiServices.updateHotel(hotelId,formData);
              
                  console.log("UPDATE CREATED:", res);
                  toast.success(res.message);
                  reset();
                  setImagePreview(null)
                   setTimeout(() => {
                        navigate("/dashboard/seller");
                      }, 500);
              
              
              
                } catch (error) {
                toast.error(
                  error.response?.data?.validationError ||
                  error.response?.data?.message ||
                  error.message ||
                  "Something went wrong"
                )}
                finally{
                  setIsLoading(false);
              
                }
              }
              
              
                function handleImageChange(e) {
              
                  const file = e.target.files[0];
              
                if (file) {
                    setImagePreview(URL.createObjectURL(file));
                }
              
                  
                }
              
                
                function hotelForm() {
                  return (
                    <form onSubmit={handleSubmit(updateHotel)}>
                      <div className='form-group'>
                
                
                
                      <label className="btn btn-outline-secondary m-2">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Hotel preview" style={{width: "100px", height: "70px", objectFit: "cover",}}/>
                  ) : (
                    "Choose Image"
                  )}
                
                  <input type="file" {...register("image")} onChange={(e) => {
                      register("image").onChange(e);
                      handleImageChange(e);
                    }} accept="image/*" hidden/>
                </label>
                
                           {errors.image && (
                             <div className="text-danger ms-2">{errors.image.message}</div>
                            )}
                
                      <input type='text' {...register("title")} placeholder='Title' className={`form-control m-2 ${errors.title ? "is-invalid" : ""}`} />
                         <div className="invalid-feedback">
                               {errors.title?.message}
                            </div>
                
                      <textarea {...register("content")} placeholder='Content' className={`form-control m-2 ${errors.content ? "is-invalid" : ""}`} />
                         <div className="invalid-feedback">
                               {errors.content?.message}
                            </div>
                
                
                            <Controller name="location" control={control} render={({ field }) => (
                              <LocationInput value={field.value} onChange={field.onChange}/>
                              )}/>
                
                            {errors.location && (
                                 <div className="text-danger ms-2">
                                    {errors.location.message}
                                </div>
                              )}
                
                
                
                
                      <input type='number' {...register("price")} placeholder='Price' className={`form-control m-2 ${errors.price ? "is-invalid" : ""}`} />
                         <div className="invalid-feedback">
                               {errors.price?.message}
                            </div>
                
                            
                
                      <select {...register("bed")} className={`form-select m-2 ${errors.bed ? "is-invalid" : ""}`}>
                          <option value="">Number of beds</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                      </select>
                
                      {errors.bed && (
                        <div className="text-danger ms-2">
                          {errors.bed.message}
                        </div>
                      )}
                
                
                
                      </div>
                
                
                    <input type="date" className={`form-control m-2 ${errors.fromDate ? "is-invalid" : ""}`}
                      {...register("fromDate")}
                    />
                
                    <div className="invalid-feedback">
                      {errors.fromDate?.message}
                    </div>
                
                
                    <input type="date" className={`form-control m-2 ${errors.toDate ? "is-invalid" : ""}`}
                      {...register("toDate")}
                    />
                
                    <div className="invalid-feedback">
                      {errors.toDate?.message}
                    </div>
                
                      <button className='btn btn-outline-primary m-2' disabled={isLoading}>
                
                      {isLoading ? (
                        <>
                        <span  className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Saving
                        </>
                      ):"Save"}
                      </button>
                
                    </form>
                  );
                }


       async function loadHotel() {

        try {
        const res = await apiServices.getHotel(hotelId);

        console.log("HOTEL:", res);

        const hotel = res.results;


        reset({
            title: hotel.title,
            content: hotel.content,
            price: hotel.price,
            bed: String(hotel.bed),
            fromDate: hotel.fromDate.split("T")[0],
            toDate: hotel.toDate.split("T")[0],
            location: {
                address: hotel.location
            }
        });

        setImagePreview(hotel.image?.url || null);

    } catch (error) {
        console.log(error);
    }
            
        }



    useEffect(()=>{
        loadHotel()

    },[hotelId])


  return (
    <>

    <div className='container-fluid p-5 text-center bg-light'>
      <h2>Edit Hotel</h2>
    </div>

        <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-10'>
            <br/>
            {hotelForm()}
        </div>
        <div className='col-md-2'>
          {/* Image */}
        </div>
      </div>
    </div>

    </>
  )
}
