import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../styles/product_card.css';

export default function ProductCard({ props })
{
    // console.log(props);
    const { _id, author, title, price, inStock, rating } = props;
    const navigate = useNavigate();
    const handleCardClick = () =>
    {
        console.log("SENDING ID:" + _id);
        navigate(`/product/${_id}`);
    };
    const handleAddToCartClick = (event) =>
    {
        event.stopPropagation();
        console.log("Add to cart");
    };
    return (
        <div className="product-card" onClick={handleCardClick}>
            {/* <img src={imagePath} alt={`Image for the book: ${title}`} /> */}
            <div className="product-card-header">
                <i>{rating}</i>
                <i>W</i>
            </div>
            <div className="product-card-image">
            </div>
            <div className="product-card-title">
                <p>{title}</p>
                <p>{author}</p>
            </div>
            <div className="product-card-footer">
                <p>{price}</p>
            </div>
            <div>
                {inStock === true ? <button id="cart-button" onClick={handleAddToCartClick}>Add to cart</button> : <button>Out of stock</button>}
            </div>
        </div >
    );
}