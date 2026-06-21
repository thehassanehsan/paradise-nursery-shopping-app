import React, { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import AboutUs from './components/AboutUs';

function App() {
    const [showProductList, setShowProductList] = useState(false);

    return (
        <div className="app-container">
            {!showProductList ? (
                <div className="landing-page">
                    <h1 className="landing-title">Paradise Nursery</h1>
                    <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Where Greenery Finds a Home</p>
                    <button className="get-started-btn" onClick={() => setShowProductList(true)}>
                        Get Started
                    </button>
                    <AboutUs />
                </div>
            ) : (
                <ProductList varGoBack={() => setShowProductList(false)} />
            )}
        </div>
    );
}

export default App;
