import React, { useContext, useEffect, useState } from "react";
import { Card, Avatar, Badge } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { authContext } from "../context/authContext";
import { apiServices } from "../services/api";
import { currencyFormatter } from "../helps/helps";
import { SettingOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

dayjs.extend(relativeTime);

const {Ribbon} = Badge;

export default function ConnectNav() {
  const { userData } = useContext(authContext);
  const [balance , setBalance] = useState(null)
  const [loading , setLoading] = useState(false)



  async function handlerPayoutSettings(){
    setLoading(true)

    try {
        const res = await apiServices.payoutSetting();
        console.log("RES FOR PAYOUT SETTING LINK",res.loginLink.url);
        window.location.href = res.loginLink.url
      
    } catch (error) {

      console.log(error);
      toast.error("Unable To Access Settings. Try Again");
      
      
    }finally{
          setLoading(false)

    }

  }
  
    useEffect(()=>{
        apiServices.getAccountBalance().then(res => {
          console.log(res);
          setBalance(res.balance)
          
        })
    },[])

  return (
    <div className="d-flex justify-content-around pt-4">
      <div className="card mb-5 shadow-sm">
        <div className="card-body d-flex align-items-center">
    
          <div className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center me-3"
      style={{ width: "35px", height: "35px" }}
    >
      {userData?.name?.[0]?.toUpperCase()}
    </div>

    <div>
      <h5 className="card-title mb-1">
        {userData?.name}
      </h5>

      <p className="card-text text-muted mb-0">
        {userData?.createdAt
          ? `Joined ${dayjs(userData.createdAt).fromNow()}`
          : ""}
      </p>
    </div>

  </div>
</div>

      {userData && userData.stripe_seller && userData.stripe_seller.charges_enabled &&  
        <>

        <Ribbon text="Avaliable" color="grey">
          <Card className="bg=light pt-1">
            {balance && balance.pending && balance.pending.map((bp,i) => (
              <span key={i} className="lead">{currencyFormatter(bp)}</span>
            ))}
            
          </Card>
        </Ribbon>


        
        <Ribbon text="Payouts" color="silver">
          <Card onClick={handlerPayoutSettings} className="bg-light" style={{ cursor: "pointer" }}
>
            <SettingOutlined className="h5 pt-2"/>
          </Card>
        </Ribbon>
        </>
      }



    </div>
  );
}