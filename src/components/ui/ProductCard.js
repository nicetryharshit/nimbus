import React from 'react';
import '../../styles/product_card.css';

export default function ProductCard({ props })
{
    const { author } = props;
    console.log(props);
    return (
        <div className="product-card">
            {/* <img src={imagePath} alt={`Image for the book: ${title}`} /> */}
            {/* <h2>{title}</h2> */}
            <button>ADD TO CART</button>
        </div>
    );
}