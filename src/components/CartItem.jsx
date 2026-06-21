import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // Calculate Grand total cost accumulation
    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => total + (item.cost * item.quantity), 0);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item.id));
        }
    };

    const handleRemove = (id) => {
        dispatch(removeItem(id));
    };

    const handleCheckout = () => {
        alert('Checkout Functionality Coming Soon!');
    };

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem', background: '#fff', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Your Shopping Cart</h2>
            
            {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p>Your cart is empty.</p>
                    <button onClick={onContinueShopping} style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>Shop Now</button>
                </div>
            ) : (
                <div>
                    <h3 style={{ marginBottom: '1rem', color: '#1e3f20' }}>Total Cart Amount: ${calculateTotalAmount()}</h3>
                    <div>
                        {cartItems.map(item => (
                            <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '1rem 0' }}>
                                <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                                <div style={{ flex: 1, paddingLeft: '1.5rem' }}>
                                    <h4>{item.name}</h4>
                                    <p style={{ color: '#666' }}>Unit Price: ${item.cost}</p>
                                    <p style={{ fontWeight: '600' }}>Subtotal: ${item.cost * item.quantity}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <button onClick={() => handleDecrement(item)} style={{ padding: '0.25rem 0.5rem', cursor: 'pointer' }}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleIncrement(item)} style={{ padding: '0.25rem 0.5rem', cursor: 'pointer' }}>+</button>
                                    <button onClick={() => handleRemove(item.id)} style={{ padding: '0.25rem 0.5rem', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '1rem' }}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                        <button onClick={onContinueShopping} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#7f8c8d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>Continue Shopping</button>
                        <button onClick={handleCheckout} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartItem;
