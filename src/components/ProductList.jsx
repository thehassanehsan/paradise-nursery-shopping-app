import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const ProductList = ({ varGoBack }) => {
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    // Calculate total dynamic item counts for the navbar badge
    const totalCartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const plantDataset = [
        {
            category: "Air Purifying Plants",
            plants: [
                { id: 1, name: "Snake Plant", cost: 15, image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400" },
                { id: 2, name: "Spider Plant", cost: 12, image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=400" },
                { id: 3, name: "Peace Lily", cost: 18, image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?w=400" },
                { id: 4, name: "Boston Fern", cost: 14, image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=400" },
                { id: 5, name: "Aloe Vera", cost: 10, image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400" },
                { id: 6, name: "English Ivy", cost: 13, image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=400" }
            ]
        },
        {
            category: "Low Light Tolerant",
            plants: [
                { id: 7, name: "ZZ Plant", cost: 22, image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400" },
                { id: 8, name: "Cast Iron Plant", cost: 25, image: "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=400" },
                { id: 9, name: "Pothos", cost: 11, image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=400" },
                { id: 10, name: "Chinese Evergreen", cost: 19, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400" },
                { id: 11, name: "Parlor Palm", cost: 24, image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400" },
                { id: 12, name: "Rubber Plant", cost: 20, image: "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?w=400" }
            ]
        },
        {
            category: "Succulents & Cacti",
            plants: [
                { id: 13, name: "Jade Plant", cost: 15, image: "https://images.unsplash.com/photo-1597055181300-e3633a207518?w=400" },
                { id: 14, name: "Echeveria", cost: 8, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400" },
                { id: 15, name: "Zebra Cactus", cost: 9, image: "https://images.unsplash.com/photo-1517030330234-94c4fa948ebc?w=400" },
                { id: 16, name: "Burro's Tail", cost: 14, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400" },
                { id: 17, name: "String of Pearls", cost: 16, image: "https://images.unsplash.com/photo-1584589254885-4550de67f240?w=400" },
                { id: 18, name: "Christmas Cactus", cost: 12, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400" }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    return (
        <div>
            {/* Task 6: Persistent Navigation Bar across views */}
            <nav className="navbar">
                <div onClick={varGoBack} style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '1.25rem' }}>Paradise Nursery</div>
                <ul className="nav-links">
                    <li><a onClick={() => setShowCart(false)}>Plants</a></li>
                    <li>
                        <div className="cart-icon-container" onClick={() => setShowCart(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                            <span className="cart-badge">{totalCartItemsCount}</span>
                        </div>
                    </li>
                </ul>
            </nav>

            {!showCart ? (
                <div className="product-grid">
                    {plantDataset.map((catGroup, idx) => (
                        <div key={idx} className="category-section">
                            <h2 className="category-title">{catGroup.category}</h2>
                            <div className="plants-container">
                                {catGroup.plants.map(plant => {
                                    const isAdded = cartItems.some(item => item.id === plant.id);
                                    return (
                                        <div key={plant.id} className="plant-card">
                                            <img src={plant.image} alt={plant.name} className="plant-img" />
                                            <h3>{plant.name}</h3>
                                            <p style={{ fontWeight: '600', margin: '0.5rem 0' }}>${plant.cost}</p>
                                            <button 
                                                className="add-to-cart-btn"
                                                disabled={isAdded}
                                                onClick={() => handleAddToCart(plant)}
                                            >
                                                {isAdded ? "Added to Cart" : "Add to Cart"}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            )}
        </div>
    );
};

export default ProductList;
