import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import { useSelector } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/order/Invoice";
import { Link } from 'react-router-dom'

const History = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadUserOrders();
        // eslint-disable-next-line
    }, []);

    const loadUserOrders = () =>
        getUserOrders(user.token).then((res) => {
            // console.log(JSON.stringify(res.data, null, 4));
            setOrders(res.data);
        });

    const showOrderInTable = (order) => (
        <>
        <div className="table-responsive">
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Color</th>
                    <th scope="col">Count</th>
                    <th scope="col">Shipping</th>
                </tr>
            </thead>

            <tbody>
                {order.products.map((p, i) => (
                    <tr key={i}>
                        <td>
                            <b>{p.product.title}</b>
                        </td>
                        <td>${(p.product.price).toFixed(2)}</td>
                        <td>{p.product.brand}</td>
                        <td>{p.color}</td>
                        <td>{p.count}</td>
                        <td>
                            {p.product.shipping === "Yes" ? (
                                <CheckCircleOutlined style={{ color: "green" }} />
                            ) : (
                                    <CloseCircleOutlined style={{ color: "red" }} />
                                )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        </>
    );

    const showDownloadLink = (order) => (
        <PDFDownloadLink
            document={<Invoice order={order} />}
             fileName= {`invoice ${new Date().toLocaleString()}`}
            className="text-center btn btn-primary btn-raised"
        >
            Download PDF
        </PDFDownloadLink>
    );

    const showEachOrder = () =>
        orders.reverse().map((order, i) => (
            <div key={i} className="m-5 p-3 card">
                <ShowPaymentInfo order={order} />
                {showOrderInTable(order)}
                <div className="row">
                    <div className="col">{showDownloadLink(order)}</div>
                </div>
            </div>
        ));

    return (
        <div className="container-fluid pt-3">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col text-center col-md-9">
                    <h4>
                        My Orders
                    </h4>
                    <br/>
                    {!orders.length && <p>No Orders. <Link to="/shop">Continue Shopping</Link></p>}
                    {showEachOrder()}
                </div>
            </div>
        </div>
    );
};

export default History;