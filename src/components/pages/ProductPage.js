import React, { useState } from 'react';
import NavBar from '../ui/NavBar';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { API_ENDPOINTS } from '../../constants';
import '../../styles/product_page.css';


export default function ProductPage()
{
    const { _id } = useParams();
    const [product, setProduct] = useState();
    const { author, title, price, inStock, rating } = product || {};
    const fetchProductByID = async () =>
    {
        console.log("RECEIVING ID:" + _id);
        try
        {
            const res = await fetch(API_ENDPOINTS.PRODUCT_BY_ID(_id));
            const data = await res.json();
            setProduct(data.product);
        }
        catch (error)
        {
            console.log(error);
        }
    };
    useEffect(() =>
    {
        fetchProductByID();
    }, []);
    return (
        <div>
            <NavBar />
            <div className="product-info-body-container">
                <div className="product-info-card">
                    <p>{author}</p>
                    <p>{title}</p>
                    <p>{price}</p>
                </div>
            </div>
        </div>
    );
}