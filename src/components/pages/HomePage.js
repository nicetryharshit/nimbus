import React, { useEffect } from 'react';
import NavBar from '../ui/NavBar';
import '../../styles/home_page.css';
import { useState } from 'react';
import { API_ENDPOINTS } from '../../constants';
import bookCover from '../../images/book-cover.png';
import { useNavigate } from 'react-router-dom';

export default function Home()
{
    const navigate = useNavigate();
    const [allProducts, setAllProducts] = useState([]);
    const handleProductClick = (id) =>
    {
        navigate(`/product/${id}`);
    }
    const handleExploreStore = () =>
    {
        navigate(`/store`);
    }
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

    const getRandomProducts = (number) => 
    {
        const shuffled = allProducts.slice();
        let currentIndex = shuffled.length;
        let temporaryValue, randomIndex;

        while (currentIndex !== 0)
        {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = shuffled[currentIndex];
            shuffled[currentIndex] = shuffled[randomIndex];
            shuffled[randomIndex] = temporaryValue;
        }

        return shuffled.slice(0, number);
    }
    return (
        <div>
            <NavBar />
            <div className="home-container">
                {/* <h2 style={{ paddingTop: "2rem" }}>Home</h2> */}
                <div className="home-content">
                    <button onClick={handleExploreStore} style={
                        {
                            backgroundColor: "var(--col-3)",
                            marginTop: "0.5rem",
                            width: "100%",
                            height: "60vh",
                            display: "flex",
                            alignItems: "stretch",
                            border: "20px solid white",
                            borderColor: "white"
                        }}>
                        <p style={{ fontSize: "5vw", color: "pink", margin: "auto", width: "100%" }}>Explore our store</p>
                    </button>
                    <div>
                        <h1>Today's specials</h1>
                    </div>
                    <div className="home-random-products">
                        {getRandomProducts(3).map((element) =>
                        {
                            return (
                                <button
                                    onClick={() => handleProductClick(element._id)}
                                    style={
                                        {
                                            backgroundColor: "var(--col-4)",
                                            width: "33vw",
                                            height: "25vh",
                                            display: "flex",
                                            alignItems: "stretch",
                                            border: "20px solid white",
                                            borderColor: "white"
                                        }}>
                                    <p style={{ fontSize: "2vw", color: "pink", margin: "auto", width: "100%" }}>{element.title}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div >
    );
}