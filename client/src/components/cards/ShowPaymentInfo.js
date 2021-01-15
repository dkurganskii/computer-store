import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => (
    <div className="container">
      <div className='row'>
          <div className='col-md'>
          <span>ID: {order.paymentIntent.id}</span>
          </div>
          {/* <div className='col-md'>
          <span>
                TOTAL:{"  "}
                {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                })}
            </span>
          </div> */}
          <div className='col-md'>
          <span>
                ORDERED ON:{"  "}
                {/* {new Date(order.createdAt).toLocaleString()} */}
                {new Date(order.createdAt).toLocaleDateString()}
                
            </span>
          </div>
          <div className='col-md'>
          <span>
                TOTAL:{"  "}
                {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                })}
            </span>
          </div>
            <div className='col-md'>
            {showStatus && <span className="badge-pill bg-info text-white">
            STATUS: {order.orderStatus}
            </span>}
            </div>
            </div>
    </div>
);

export default ShowPaymentInfo;