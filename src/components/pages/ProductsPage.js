import React from 'react';
import NavBar from '../ui/NavBar';
import '../../styles/products_page.css';
import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../constants';
import ProductCard from '../ui/ProductCard';

export default function Products()
{
    const [allProducts, setAllProducts] = useState([]);
    const [category, setCategory] = useState("All");
    const [maxPrice, setMaxPrice] = useState(20);
    const [minRating, setMinRating] = useState(0);
    const [sorting, setSorting] = useState("None");
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
        return allProducts
            .filter((element) => category === "All" ? true : element.categoryName === category)
            .filter((element) =>
            {
                const finalPrice = element.discountPercentage > 0 ? (element.price * (element.discountPercentage * 0.01)).toFixed(2) : element.price;
                return finalPrice <= maxPrice ? element : null;
            })
            .filter((element) => element.rating > minRating);
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