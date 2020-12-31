import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserCart, emptyUserCart, saveUserAddress, applyCoupon, createCashOrderForUser } from "../functions/user";
import { Input, Button } from 'antd';


const Checkout = ({ history }) => {
    const { TextArea } = Input;

    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("");
    const [addressSaved, setAddressSaved] = useState(false);
    const [coupon, setCoupon] = useState('')
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
    const [discountError, setDiscountError] = useState('')

    const dispatch = useDispatch();
    const { user, COD } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        getUserCart(user.token).then((res) => {
            console.log("user cart res", JSON.stringify(res.data, null, 4));
            setProducts(res.data.products);
            setTotal(res.data.cartTotal);
        });
    }, []);

    const emptyCart = () => {
        // remove from local storage
        if (typeof window !== "undefined") {
            localStorage.removeItem("cart");
        }
        // remove from redux
        dispatch({
            type: "ADD_TO_CART",
            payload: [],
        });
        // remove from backend
        emptyUserCart(user.token).then((res) => {
            setProducts([]);
            setTotal(0);
            setTotalAfterDiscount(0)
            setCoupon('')
            toast.success("Cart is empty. Contniue shopping");
        });
    };

    const saveAddressToDb = () => {
        // console.log(address);
        saveUserAddress(user.token, address).then((res) => {
            if (res.data.ok) {
                setAddressSaved(true);
                toast.success("Address saved");
            }
        });
    };

    const applyDiscountCoupon = () => {
        console.log('send coupon to backend', coupon)
        applyCoupon(user.token, coupon)
            .then(res => {
                console.log('RES ON COUPON APPLIED', res.data)
                if (res.data) {
                    setTotalAfterDiscount(res.data)
                    dispatch({
                        type: 'COUPON_APPLIED',
                        payload: true
                    })
                }
                if (res.data.err) {
                    setDiscountError(res.data.err)
                    dispatch({
                        type: 'COUPON_APPLIED',
                        payload: false
                    })
                }
            })
    }

    const showAddress = () =>
    (
        <>
            {/* <ReactQuill theme="snow" value={address} onChange={setAddress} /> */}
            <TextArea
                type='text'
                placeholder='Enter address'
                value={address}
                required
                onChange={e => { setAddress(e.target.value) }}
            />
            <Button type="primary" className="text-center btn btn-primary btn-raised mt-4" onClick={saveAddressToDb}>
                Save
        </Button>
            <br />
        </>
    )


    const showProductSummary = () => (
        <>
            {products.map((p, i) => (
                <div key={i}>
                    <p>
                        {p.product.title} ({p.color}) x {p.count} ={" "}
                        {p.product.price * p.count}
                    </p>
                </div>
            ))}
        </>
    )

    {
        products.map((p, i) => (
            <div key={i}>
                <p>
                    {p.product.title} ({p.color}) x {p.count} ={" "}
                    {p.product.price * p.count}
                </p>
            </div>
        ))
    }

    const showApplyCoupon = () => (
        <>
            <Input
                onChange={e => {
                    setCoupon(e.target.value)
                    setDiscountError('')
                }}
                value={coupon}
                type='text'
                placeholder='Enter coupon'
            />
            <Button onClick={applyDiscountCoupon} className='text-center btn btn-primary btn-raised mt-4'>Apply</Button>
        </>
    )

    const createCashOrder = () => {
        createCashOrderForUser(user.token).then(res => {
            console.log('USER CASH ORDER CREATED RES ', res)
        })
    }

    return (
        <div className="row">
            <div className="col-md-5 ml-4">
                <br />
                <h4>Delivery Address</h4>
                {showAddress()}
                <br />
                <br />
                <h4>Got Coupon?</h4>
                {showApplyCoupon()}
                <br />
                {discountError && <p className='bg-danger p-2'>{discountError}</p>}
            </div>

            <div className="col-md-5 ml-5">
                <br />
                <h4>Order Summary</h4>
                <hr />
                <p>Products {products.length}</p>
                <hr />
                {showProductSummary()}
                <hr />
                <p>Cart Total: {total}</p>
                {totalAfterDiscount > 0 && (
                    <p className='bg-success p-2'>Discount Applied: Total Payable: ${totalAfterDiscount}</p>
                )}
                <div className="row">
                    <div className="col-md-3 mt-3">
                        {COD ? (
                            <Button
                                className='text-center btn btn-primary btn-raised'
                                disabled={!addressSaved || !products.length}
                                onClick={createCashOrder}
                            >
                                Place Order
                            </Button>
                        ) : (
                                <Button
                                    className='text-center btn btn-primary btn-raised'
                                    disabled={!addressSaved || !products.length}
                                    onClick={() => history.push('/payment')}
                                >
                                    Place Order
                                </Button>
                            )}
                    </div>

                    <div className="col-md-6 mt-3">
                        <Button
                            disabled={!products.length}
                            onClick={emptyCart}
                            className='text-center btn btn-primary btn-raised'
                        >
                            Empty Cart
            </Button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Checkout;
