import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/product_card.css';
import bookCover from '../../images/book-cover.png';
import { AuthContext } from '../contexts/GlobalContexts';

export default function ProductCard({ props })
{
    const { isLoggedIn } = useContext(AuthContext);

    const { _id, author, title, price, inStock, rating, imagePath } = props;
    const navigate = useNavigate();
    const handleCardClick = () =>
    {
        navigate(`/product/${_id}`);
    };
    const handleAddToCartClick = (event) =>
    {
        event.stopPropagation();
        if (isLoggedIn)
            console.log("Add to cart");
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
                    {inStock === true ? <button id="wishlist-button" onClick={handleAddToCartClick}>Wishlist</button> : <button id="wishlist-button">Wishlist</button>}
                    {inStock === true ? <button id="cart-button" onClick={handleWishlistClick}>Add to cart</button> : <button id="outOfStock-button">Out of stock</button>}
                </div>
            </div >
        </div >
    );
}