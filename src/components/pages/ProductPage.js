import React, { useState } from 'react';
import NavBar from '../ui/NavBar';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import '../../styles/product_page.css';
import bookCover from '../../images/book-cover.png';
import { UserContext, AuthContext } from '../contexts/GlobalContexts';
import { API_ENDPOINTS } from '../../constants';

export default function ProductPage()
{
    const { _id } = useParams();
    const [product, setProduct] = useState();
    const { author, title, price, inStock, rating } = product || {};
    const { cartData, updateCartData, wishlistData, updateWishlistData } = useContext(UserContext);
    const { isLoggedIn } = useContext(AuthContext);

    const navigate = useNavigate();

    const fetchProductByID = async () =>
    {
        try
        {
            const res = await fetch(API_ENDPOINTS.PRODUCT_BY_ID(_id));
            const data = await res.json();
            console.log(data);
            setProduct(data.product);
            // console.log("ID:" + _id);
            // console.log("RECEIVING product:" + data.product);
        }
        catch (error)
        {
            console.log(error);
        }
    };

    const handleAddToCart = () =>
    {
        if (isLoggedIn)
        {
            if (inStock)
            {
                addToCart();
            }
        }
        else
            navigate(`/login`);
    }

    const handleAddToWishlist = () =>
    {
        if (isLoggedIn)
        {
            if (inStock)
            {
                addToWishlist();
            }
        }
        else
            navigate(`/login`);
    }

    const addToCart = async () =>
    {
        //if product already in cart, increment
        if (cartData.find((element) => _id === _id))
        {
            try
            {
                const requestBody = {
                    action: {
                        type: "increment"
                    }
                };
                const res = await fetch(API_ENDPOINTS.CART_PRODUCT(_id),
                    {
                        method: 'POST',
                        headers: {
                            'authorization': localStorage.getItem("token"), 'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                    });
                const data = await res.json();
                updateCartData(data.cart);

            } catch (error)
            {
                console.log(error);
            }
        }
        else
        {
            try
            {
                const res = await fetch(API_ENDPOINTS.CART,
                    {
                        method: 'POST',
                        headers: {
                            'authorization': localStorage.getItem("token"), 'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ product: product })
                    });
                const data = await res.json();
                // console.log(data);
                updateCartData(data.cart);

            } catch (error)
            {
                console.log(error);
            }
        }
    };

    const addToWishlist = async () =>
    {
        //if product already in cart, don't add
        if (wishlistData.find((element) => _id === _id))
        {
            // console.log(wishlistData);
        }
        else
        {
            try
            {
                const res = await fetch(API_ENDPOINTS.WISHLIST,
                    {
                        method: 'POST',
                        headers: {
                            'authorization': localStorage.getItem("token"), 'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ product: product })
                    });
                const data = await res.json();
                updateWishlistData(data.wishlist);

            } catch (error)
            {
                console.log(error);
            }
        }
    }


    useEffect(() =>
    {
        fetchProductByID();
    }, []);
    return (
        <div>
            <NavBar />
            {product &&
                (

                    <div className="product-product-info-body-container">
                        <div className="product-product-card">
                            <div className="product-product-column">
                                <div className="product-product-card-image">
                                    <img src={bookCover} alt={`book: ${title}`} />
                                    <p>{rating.toFixed(1)}</p>
                                </div>
                            </div>
                            <div className="product-product-column">
                                <div className="product-product-card-desc">
                                    <h3>{title}</h3>
                                    <p>{author}</p>
                                    <p>Rating: {rating} stars</p>
                                </div>
                                <div className="product-product-card-price">
                                    <p>${price}</p>
                                </div>
                                <div className="product-product-card-buttons-container">
                                    <div className="product-product-card-buttons">
                                        {wishlistData.find((element) => element._id === _id) ?
                                            <button id="outOfStock-button">Added to wishlist</button> :
                                            <button id="wishlist-button" onClick={handleAddToWishlist}>Add to wishlist</button>}
                                        {cartData.find((element) => element._id === _id) ?
                                            <button id="outOfStock-button">Added to cart</button> :
                                            <button id="cart-button" onClick={handleAddToCart}>Add to cart</button>}
                                    </div>
                                </div >
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
}