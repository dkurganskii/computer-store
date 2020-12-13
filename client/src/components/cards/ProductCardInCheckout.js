import React from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import ModalImage from 'react-modal-image'
import laptop from "../../images/laptop.png";

const ProductCardInCheckout = ({ p }) => {
    const colors = ["Black", "Brown", "Silver", "White", "Blue"]
    const dispatch = useDispatch()

    const handleColorChange = (e) => {
        let cart = []
        if (typeof window !== undefined) {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.map((product, i) => {
                if (product._id === p._id) {
                    cart[i].color = e.target.value
                }
            })
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart
            })
        }
    }

    const handleQuantityChange = (e) => {
        let count = e.target.value < 1 ? 1 : e.target.value
        let cart = []
        if (count > p.quantity) {
            toast.error(`Max available quantity: ${p.quantity}`)
            return
        }
        if (typeof window !== undefined) {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.map((product, i) => {
                if (product._id === p._id) {
                    cart[i].count = count
                }
            })
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart
            })
        }
    }

    return (
        <tbody>
            <tr>
                <td>
                    <div style={{ width: '100px', height: 'auto' }}>
                        {p.images.length ?
                            (<ModalImage small={p.images[0].url} large={p.images[0].url} />) :
                            (<ModalImage small={laptop} large={laptop} />)}
                    </div>
                </td>
                <td>{p.title}</td>
                <td>${p.price}</td>
                <td>{p.brand}</td>
                <td>
                    <select onChange={handleColorChange} name='color' className='form-control'>
                        {p.color ?
                            <option value={p.color}>{p.color} </option> :
                            <option>Select</option >}
                        {colors.filter((c) => c !== p.color).map((c) =>
                            <option key={c} value={c}> {c}</option>)}
                    </select>
                </td>
                <td className='text-center'>
                    <input
                        type='number'
                        className='form-control'
                        value={p.count}
                        onChange={handleQuantityChange}></input>
                </td>
                <td>Shipping icon</td>
                <td>Delete icon</td>
            </tr>

        </tbody >
    )
}

export default ProductCardInCheckout
