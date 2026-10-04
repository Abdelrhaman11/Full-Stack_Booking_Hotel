import { Modal } from 'antd'
import React, { useState } from 'react'

export default function OrderModel({session , orderBy  , setShowModels , status , showModels}) {


  return (
    <>
    <Modal open={showModels} title="Order Payment Info" footer={null} onCancel={()=> setShowModels(!showModels)}>
        <div>
        <p>
          <strong>Payment Intent:</strong>{" "}
          {session?.payment_intent || "Not available"}
        </p>

        <p>
          <strong>Payment Status:</strong>{" "}
          {status || "Unknown"}
        </p>

        <p>
          <strong>Amount Total:</strong>{" "}
          {session?.currency?.toUpperCase()}{" "}
          {(session?.amount_total ?? 0) / 100}
        </p>


        <p>
          <strong>Customer:</strong>{" "}
          {orderBy || "Unknown"}
        </p>
      </div>
    </Modal>

    </>
  )
}
