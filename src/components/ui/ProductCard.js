import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/product_card.css';
import bookCover from '../../images/book-cover.png';
import { AuthContext, UserContext, ToastContext } from '../contexts/GlobalContexts';
import { API_ENDPOINTS } from '../../constants';

export default function ProductCard({ props })
{
    const { isLoggedIn } = useContext(AuthContext);
    const { showToast } = useContext(ToastContext);

    const { cartData, updateCartData, wishlistData, updateWishlistData } = useContext(UserContext);

    const { _id, author, title, price, inStock, rating } = props;
    const navigate = useNavigate();

    const addToWishlist = async () =>
    {
        //if product already in cart, don't add
        if (wishlistData.find((element) => element._id === _id))
        {
            // console.log(wishlistData);
            showToast("Already in wishlist");
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
                        body: JSON.stringify({ product: props })
                    });
                const data = await res.json();
                updateWishlistData(data.wishlist);
                showToast("Added to wishlist");

            } catch (error)
            {
                console.log(error);
            }
        }
    }
    const addToCart = async () =>
    {
        //if product already in cart, increment
        if (cartData.find((element) => element._id === _id))
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
                showToast("Added to cart");

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
                        body: JSON.stringify({ product: props })
                    });
                const data = await res.json();
                // console.log(data);
                updateCartData(data.cart);
                showToast("Added to cart");

            } catch (error)
            {
                console.log(error);
            }
        }
    };

    const handleCardClick = () =>
    {
        navigate(`/product/${_id}`);
    };
    const handleAddToCartClick = (event) =>
    {
        event.stopPropagation();
        if (isLoggedIn)
        {
            if (inStock)
                addToCart();
        }
        else
            navigate(`/login`);
    };

    const handleWishlistClick = (event) =>
    {
        event.stopPropagation();
        if (isLoggedIn)
        {
            if (inStock)
            {
                addToWishlist();
            }
        }
        else
            navigate(`/login`);
    };
    return (
        <div className="product-card" onClick={handleCardClick}>
            <div className="product-card-image">
                <img src={bookCover} alt={`book: ${title}`} />
                <p>{rating.toFixed(1)}</p>
            </div>
            <div className="product-card-desc">
                <b>{title}</b>
                <p>{author}</p>
            </div>
            <div className="product-card-price">
                <p>${price}</p>
            </div>
            <div className="product-card-buttons-container">
                <div className="product-card-buttons">
                    {inStock === true ? <button id="wishlist-button" onClick={handleWishlistClick}>Wishlist</button> : <button id="wishlist-button">Wishlist</button>}
                    {inStock === true ? <button id="cart-button" onClick={handleAddToCartClick}>Add to cart</button> : <button id="outOfStock-button">Out of stock</button>}
                </div>
            </div >
        </div >
    );
}