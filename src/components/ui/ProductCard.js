import React from 'react';
import '../../styles/product_card.css';

export default function ProductCard({ props })
{
    // console.log(props);
    const { author, title, price, inStock, rating } = props;
    return (
        <div className="product-card">
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
                {inStock === true ? <button>Add to cart</button> : <button>Out of stock</button>}
            </div>
        </div>
    );
}