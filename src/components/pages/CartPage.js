import React, { useContext } from 'react';
import NavBar from '../ui/NavBar';
import '../../styles/cart_page.css';
import { UserContext } from '../contexts/GlobalContexts';
import bookCover from '../../images/book-cover.png';
import { API_ENDPOINTS } from '../../constants';

export default function Cart()
{
    const { cartData, updateCartData, updateWishlistData } = useContext(UserContext);

    const removeFromCart = async (id) =>
    {
        try
        {
            const res = await fetch(API_ENDPOINTS.CART_PRODUCT(id),
                {
                    method: 'DELETE',
                    headers: {
                        'authorization': localStorage.getItem("token"), 'Content-Type': 'application/json'
                    },
                });
            const data = await res.json();
            updateCartData(data.cart);
        } catch (error)
        {
            console.log(error);
        }
    };

    const moveToWishlist = async (id) =>
    {
        const props = cartData.find((element) => element._id === id);
        try
        {
            const res = await fetch(API_ENDPOINTS.WISHLIST,
                {
                    method: 'POST',
                    headers: {
                        'authorization': localStorage.getItem("token"), 'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ product: props })
                });
            const data = await res.json();
            updateWishlistData(data.wishlist);

        } catch (error)
        {
            console.log(error);
        }
    };

    const handleMoveToWishlist = (id) =>
    {
        moveToWishlist(id);
        removeFromCart(id);
    };

    const handleRemoveFromCart = (id) =>
    {
        removeFromCart(id);
    };


    return (
        <div>
            <NavBar />
            <div className="cart-container">
                <h2 style={{ paddingTop: "2rem" }}>Cart</h2>
                <div className="cart-content">
                    {cartData.map((element) => (<div className="cart-product-card">
                        <div className="cart-product-card-image">
                            <img src={bookCover} alt={`book: ${element.title}`} />
                            <p>{element.rating.toFixed(1)}</p>
                        </div>
                        <div className="cart-product-card-desc">
                            <b>{element.title}</b>
                            <p>{element.author}</p>
                        </div>
                        <div className="cart-product-card-price">
                            <p>${element.price}</p>
                        </div>
                        <div className="cart-product-card-buttons-container">
                            <div className="cart-product-card-buttons">
                                {<button id="cart-wishlist-button" onClick={() => handleMoveToWishlist(element._id)}>Move to wishlist</button>}
                                {<button id="cart-cart-button" onClick={() => handleRemoveFromCart(element._id)}>Remove from cart</button>}
                            </div>
                        </div >
                    </div>))}
                </div>
                {cartData.length > 0 ?
                    <div>
                        <h2>Total Price: ${cartData.reduce((acc, curr) => acc + curr.price, 0)}</h2>
                        <button id="cart-checkout-button">Checkout</button>
                    </div>
                    :
                    <div>
                        <h2>Cart empty</h2>
                    </div>}
            </div>
        </div >
    );
}