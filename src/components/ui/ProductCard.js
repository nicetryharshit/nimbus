import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/product_card.css';
import bookCover from '../../images/book-cover.png';
import { AuthContext, UserContext } from '../contexts/GlobalContexts';
import { API_ENDPOINTS } from '../../constants';

export default function ProductCard({ props })
{
    const { isLoggedIn } = useContext(AuthContext);
    const { cartData, updateCartData } = useContext(UserContext);

    const { _id, author, title, price, inStock, rating, imagePath } = props;
    const navigate = useNavigate();

    const addToCart = async () =>
    {
        console.log(props);

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
                console.log(data);
                updateCartData(data);

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
                console.log(data);
                updateCartData(data);

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
            console.log("Add to cart");
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
            console.log("Add to Wishlist");
        else
            navigate(`/login`);
    };
    return (
        <div className="product-card" onClick={handleCardClick}>
            <div className="product-card-image">
                <img src={bookCover} alt={`book: ${title}`} />
                {/* <i>{rating}</i> */}
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