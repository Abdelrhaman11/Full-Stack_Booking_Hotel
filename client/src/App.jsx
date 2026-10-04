import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./auth/Login"
import Register from "./auth/Register"
import Home from "./booking/Home"
import AuthLayout from "./Layouts/AuthLayout"
import MainLayout from "./Layouts/MainLayout"
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./context/authContext.jsx"
import ProtectedAuthRoute from "./ProtectedRoutes/ProtectedAuthRoute.jsx"
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes.jsx"
import NotFound from "./booking/NotFound.jsx"
import Dashboard from "./user/Dashboard.jsx"
import DashboardSeller from "./user/DashboardSeller.jsx"
import AddHotels from "./hotels/AddHotels.jsx"
import StripeCallbackk from "./Stripe/StripeCallbackk.jsx"
import EditHotel from "./hotels/EditHotel.jsx"
import ViewHotell from "./hotels/ViewHotell.jsx"
import StripeSuccess from "./Stripe/StripeSuccess.jsx"
import StripeCancel from "./Stripe/StripeCancel.jsx"
import SearchResult from "./hotels/SearchResult.jsx"
import ViewProfile from "./Components/ViewProfile.jsx"


function App() {

  let router = createBrowserRouter([{path:"" , element:<MainLayout/> , children:[
    {index:true , element:<ProtectedRoutes><Home/></ProtectedRoutes> },
    {path:"/dashboard" , element:<ProtectedRoutes><Dashboard/></ProtectedRoutes>},
    {path:"/viewProfile" , element:<ProtectedRoutes><ViewProfile/></ProtectedRoutes>},
    {path:"/dashboard/seller" , element:<ProtectedRoutes><DashboardSeller/></ProtectedRoutes>},
    {path:"/hotels/new" , element:<ProtectedRoutes><AddHotels/></ProtectedRoutes>},
    {path:"/stripe/callback" , element:<ProtectedRoutes><StripeCallbackk/></ProtectedRoutes>},
    {path:"/hotel/edit/:hotelId" , element:<ProtectedRoutes><EditHotel/></ProtectedRoutes>},
    {path:"/hotel/:hotelId" , element:<ProtectedRoutes><ViewHotell/></ProtectedRoutes>},
    {path:"/stripe/success/:hotelId" , element:<ProtectedRoutes><StripeSuccess/></ProtectedRoutes>},
    {path:"/stripe/cancel" , element:<ProtectedRoutes><StripeCancel/></ProtectedRoutes>},
    {path:"/search-result" , element:<ProtectedRoutes><SearchResult/></ProtectedRoutes>},

    {path:"*",element:<NotFound/>},

    
  ]},
  {path:"" , element:<AuthLayout/> , children:[
    {path:"/login" , element: <ProtectedAuthRoute> <Login/> </ProtectedAuthRoute>  },
    {path:"/register" , element:  <ProtectedAuthRoute> <Register/> </ProtectedAuthRoute>   },
  ]}
])

  return (
    <>
    {/* <Provider store={store}> */}
      <AuthContextProvider>

          {/* <HeroUIProvider> */}
          <Toaster position="top-right" reverseOrder={false} toastOptions={{duration: 4000,}}/>

           <RouterProvider router={router}/>
        {/* </HeroUIProvider> */}

      </AuthContextProvider>
    {/* </Provider> */}
    </>
  )
}

export default App
