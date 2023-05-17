import React from 'react';
import NavBar from '../ui/NavBar';
import '../../styles/products_page.css';
import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../constants';
import ProductCard from '../ui/ProductCard';

export default function Products()
{
    const [allProducts, setAllProducts] = useState([]);

    const fetchAllProducts = async () =>
    {
        try
        {
            const res = await fetch(API_ENDPOINTS.PRODUCTS);
            const data = await res.json();
            setAllProducts(data.products);
        }
        catch (error)
        {
            console.log(error);
        }
    };

    useEffect(() =>
    {
        fetchAllProducts();
    }, []);

    const productsToDisplay = () =>
    {
        return allProducts;
    };

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
                        {productsToDisplay().map((element) => <ProductCard props={element} />)}
                    </div>
                </div>
            </div>
        </div>
    );
}