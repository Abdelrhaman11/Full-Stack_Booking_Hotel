import axios from "axios"



class ApiServices{

    #token = localStorage.getItem("token")
      setToken(token){
        this.#token = token
    }


    async signup(registerData) {
         const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/signup`, registerData)
         return data
   
    }

    async login(loginData) {
        const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, loginData)
        return data

}


    async getLoggedUserData(){
        const token = `${import.meta.env.VITE_BEARER_KEY}${this.#token}`;
                console.log(token);
        const {data} =await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/profile`, {
            headers:{
                token:`${import.meta.env.VITE_BEARER_KEY} ${this.#token}`

            }
        })

     return data

    }


        async createConnectAccount() {
         const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/stripe/create-connect-account`, {},{
            headers:{
                token:`${import.meta.env.VITE_BEARER_KEY} ${this.#token}`
            }
         })
         return data 
    }

        async getAccountStatus(){

            const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/stripe/get-account-status`,{},{
                headers:{
                    token:`${import.meta.env.VITE_BEARER_KEY} ${this.#token}`
                }
            })
             return data 

        }


        async getAccountBalance(){
            const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/stripe/get-account-balance`,{},{
                headers:{
                    token:`${import.meta.env.VITE_BEARER_KEY} ${this.#token}`
                }
            })
             return data 
        }

        async payoutSetting(){
            const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/stripe/payout-setting`,{},{
                headers:{
                    token:`${import.meta.env.VITE_BEARER_KEY} ${this.#token}`
                }
            })
            return data
        }

        async createHotel(formData){
            const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/hotel/createHotel`,formData,{
                headers:{
                    token:`${import.meta.env.VITE_BEARER_KEY} ${this.#token}`

                }
            })
              return data;

        }

        async allHotels(){
            const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/hotel/hotels`)
            return data
        }

        async sellerHotels(){
            const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/hotel/seller_hotels`,{
                headers:{
                    token:`${import.meta.env.VITE_BEARER_KEY} ${this.#token}`

                }
            })
            return data
        }

        async deleteHotels(hotelId){
            const {data} = await axios.delete(`${import.meta.env.VITE_BASE_URL}/hotel/delete_hotel/${hotelId}`,{
                headers:{
                    token:`${import.meta.env.VITE_BEARER_KEY} ${this.#token}`

                }
            })
            return data
        }

        async getHotel(hotelId){
            const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/hotel/${hotelId}`)
            return data
        }

          async updateHotel(hotelId , formData){
            const {data} = await axios.patch(`${import.meta.env.VITE_BASE_URL}/hotel/update_hotel/${hotelId}`,formData,{
                headers:{
                    token:`${import.meta.env.VITE_BEARER_KEY} ${this.#token}`

                }
            })
            return data
        }

        async getSessionId(hotelId){

            const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/stripe/stripe-session-id`,{hotelId},{
                headers:{
                        token:`${import.meta.env.VITE_BEARER_KEY} ${this.#token}`

                }
            })

            return data

        } 

        async userBookingHotel(){

            const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/hotel/user-hotel-booking`,{
                headers:{
                        token:`${import.meta.env.VITE_BEARER_KEY} ${this.#token}`

                }
            })

            return data

        } 


        async isAlreadyBooking(hotelId){

            const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/hotel/is-already-booked/${hotelId}`,{
                headers:{
                        token:`${import.meta.env.VITE_BEARER_KEY} ${this.#token}`

                }
            })

            return data

        } 


        async searchListings(query){

            const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/hotel/search-listings`,query)

            return data

        } 

        async addReview(hotelId, reviewData) {

         const { data } = await axios.post(
                 `${import.meta.env.VITE_BASE_URL}/review/${hotelId}`, reviewData,
             {
            headers: {
                token: `${import.meta.env.VITE_BEARER_KEY} ${this.#token}`
                  }
                 }
              );

    return data;
}


        async getHotelReviews(hotelId){

            const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/review/${hotelId}`)

            return data

        } 

   




}

export const apiServices = new ApiServices()