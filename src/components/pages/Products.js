import React from 'react';
import NavBar from '../ui/NavBar';
import '../../styles/products.css';

export default function Products()
{
    return (
        <div>
            <NavBar />
            <div className="body-container">
                <div className="filters-container">
                    <div className="filters-content">
                        filters
                    </div>
                </div>

                <div className="products-container">
                    <div className="products-content">
                        products
                    </div>
                </div>
            </div>
        </div>
    );
}