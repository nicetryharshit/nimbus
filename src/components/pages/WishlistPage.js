import React, { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/GlobalContexts';
import NavBar from '../ui/NavBar';
import bookCover from '../../images/book-cover.png';
import { API_ENDPOINTS } from '../../constants';

export default function Wishlist()
{
    const { cartData, updateCartData, wishlistData, updateWishlistData } = useContext(UserContext);

    const moveToCart = async (id) =>
    {
        //if product already in cart, increment
        if (cartData.find((element) => element._id === id))
        {
            try
            {
                const requestBody = {
                    action: {
                        type: "increment"
                    }
                };
                const res = await fetch(API_ENDPOINTS.CART_PRODUCT(id),
                    {
                        method: 'POST',
                        headers: {
                            'authorization': localStorage.getItem("token"), 'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                    });
                const data = await res.json();
                updateCartData(data);

            } catch (error)
            {
                console.log(error);
            }
        }
        else
        {
            const props = wishlistData.find((element) => element._id === id);
            try
            {
                const res = await fetch(API_ENDPOINTS.CART,
                    {
                        method: 'POST',
                        headers: {
                            'authorization': localStorage.getItem("token"), 'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ product: props })
                    });
                const data = await res.json();
                updateCartData(data);
                console.log("MOVED TO CART:" + data);

            } catch (error)
            {
                console.log(error);
            }
        }
    };

    const removeFromWishlist = async (id) =>
    {
        try
        {
            const res = await fetch(API_ENDPOINTS.WISHLIST_PRODUCT(id),
                {
                    method: 'DELETE',
                    headers: {
                        'authorization': localStorage.getItem("token"), 'Content-Type': 'application/json'
                    },
                });
            const data = await res.json();
            console.log(data);
            updateWishlistData(data);
            console.log("DELETED: " + data);
        } catch (error)
        {
            console.log(error);
        }
    };

    const handleMoveToCart = (id) =>
    {
        moveToCart(id);
        removeFromWishlist(id);
    };

    const handleRemoveFromWishlist = (id) =>
    {
        removeFromWishlist();
    };

    console.log(wishlistData);
    return (
        <div>
            <NavBar />
            <div className="wishlist-container">
                <b>Wishlist</b>
                <div>
                    {wishlistData.map(element => (<div>
                        <div className="wishlist-product-card">
                            <div className="wishlist-product-card-image">
                                <img src={bookCover} alt={`book: ${element.title}`} />
                                {/* <i>{rating}</i> */}
                            </div>
                            <div className="wishlist-product-card-desc">
                                <b>{element.title}</b>
                                <p>{element.title}</p>
                            </div>
                            <div className="wishlist-product-card-price">
                                <p>${element.title}</p>
                            </div>
                            <div className="wishlist-product-card-buttons-container">
                                <div className="wishlist-product-card-buttons">
                                    {<button id="wishlist-wishlist-button" onClick={() => handleRemoveFromWishlist(element._id)}>Remove from wishlist</button>}
                                    {<button id="wishlist-cart-button" onClick={() => handleMoveToCart(element._id)}>Move to cart</button>}
                                </div>
                            </div >
                        </div >
                    </div>))}
                </div>
            </div>
        </div>
    );
}

const WishlistProductCard = (props) =>
{
    return
}