import React, { useContext } from 'react';
import NavBar from '../ui/NavBar';
import '../../styles/store_page.css';
import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../constants';
import ProductCard from '../ui/ProductCard';
import { SearchContext } from '../contexts/GlobalContexts';

const defaultMaxPrice = 20;
export default function StorePage()
{
    const { searchQuery } = useContext(SearchContext);
    const [allCategories, setAllCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState();
    const [selectedMaxPrice, setSelectedMaxPrice] = useState(defaultMaxPrice);
    const [selectedMinRating, setSelectedMinRating] = useState('1');
    const [sorting, setSorting] = useState("None");
    const ratings = ['1', '2', '3', '4'];

    const handleCategorySelect = (event, categoryId) =>
    {
        if (event.target.checked)
        {
            setSelectedCategories(prevSelectedCategories => [...prevSelectedCategories, categoryId]);
        } else
        {
            setSelectedCategories(prevSelectedCategories =>
                prevSelectedCategories.filter(id => id !== categoryId)
            );
        }
    };

    const handleRatingChange = (event) =>
    {
        setSelectedMinRating(event.target.value);
    };

    const handleMaxPriceChange = (event) =>
    {
        setSelectedMaxPrice(event.target.value);
    };

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
    const fetchCategories = async () =>
    {
        try
        {
            const res = await fetch(API_ENDPOINTS.CATEGORIES);
            const data = await res.json();
            setAllCategories(data.categories);
        }
        catch (error)
        {
            console.log(error);
        }
    };

    const filterProducts = () =>
    {
        const filteredProducts = allProducts
            .filter((element) => selectedCategories.includes(element.categoryName))
            .filter((element) => element.price <= selectedMaxPrice ? element : null)
            .filter((element) => element.rating >= selectedMinRating)
            .filter((element) => searchQuery === "" ? element : (element.title.toLowerCase().includes(searchQuery.toLowerCase()) || element.author.toLowerCase().includes(searchQuery.toLowerCase())))
            .sort((a, b) =>
            {
                return sorting === "HighToLow" ? b.price - a.price : sorting === "LowToHigh" ? a.price - b.price : 0;
            });
        setFilteredProducts(filteredProducts);
    };

    useEffect(() =>
    {
        fetchAllProducts();
        fetchCategories();
    }, []);

    useEffect(() =>
    {
        filterProducts();
    }, [allProducts, searchQuery, selectedMinRating, selectedCategories, selectedMaxPrice]);

    useEffect(() => 
    {
        setSelectedCategories(allCategories.map((element) => element.categoryName));
    }, [allCategories])

    return (
        <div>
            <NavBar />
            <div className="body-container">
                <div className="filters-container">
                    <div className="filters-header">
                        <b>Filters</b>
                        <span>Clear</span>
                    </div>
                    <div className="filters-content">
                        <div className="filter-chunk">
                            <b>Price ({selectedMaxPrice})</b>
                            <div>
                                <span>0</span>
                                <input type="range" id="price" name="price" min="0" max={defaultMaxPrice} onChange={handleMaxPriceChange}>
                                </input>
                                <span>20</span>
                            </div>
                        </div>
                        <div className="filter-chunk">
                            <b>Category</b>
                            <div>
                                {allCategories.map(element => (
                                    <div>
                                        <input
                                            type="checkbox"
                                            id={element.categoryName}
                                            checked={selectedCategories.includes(element.categoryName)}
                                            onChange={event => handleCategorySelect(event, element.categoryName)}
                                        />
                                        <label htmlFor={element.categoryName}>{element.categoryName}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="filter-chunk">
                            <b>Rating</b>
                            <div>
                                {ratings.map((element) => (
                                    <div>
                                        <input
                                            type="radio"
                                            id={`${element}-stars`}
                                            name="rating"
                                            value={element}
                                            checked={selectedMinRating === element}
                                            onChange={handleRatingChange}
                                        />
                                        <label htmlFor={`${element}-stars`}>{`${element} stars and above`}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="products-container">
                    <div className="products-header">
                        <b>Showing {filteredProducts.length} books</b>
                    </div>
                    <div className="products-content">
                        {filteredProducts.map((element) => <ProductCard props={element} />)}
                    </div>
                </div>
            </div>
        </div >
    );
}