import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Cart from './Cart';
import Product from './Product';

import './Shop.scss';

const Shop = ({ products }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        if (item.quantity <= 0) return;
        const itemIndex = cart.findIndex(element => element.id === item.id);
        if (itemIndex === -1) {
            setCart([...cart, item]);
        } else {
            const newCart = [...cart];
            const oldItem = cart[itemIndex];
            const quantity = oldItem.quantity + item.quantity;
            newCart[itemIndex] = {
                ...oldItem,
                quantity
            };
            setCart(newCart);
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const removeFromCart = (item) => {
        const itemIndex = cart.findIndex(element => element.id === item.id);
        if (itemIndex !== -1) {
            const newCart = [...cart];
            newCart.splice(itemIndex, 1);
            setCart(newCart);
        }
    };

    const updateQuantity = (item, event) => {
        const itemIndex = cart.findIndex(element => element.id === item.id);
        if (itemIndex === -1) return;
        const newQuantity = Number(event.target.value);
        if (newQuantity <= 0) {
            removeFromCart(item);
        } else {
            const newCart = [...cart];
            const oldItem = cart[itemIndex];
            const quantity = newQuantity;
            newCart[itemIndex] = {
                ...oldItem,
                quantity
            };
            setCart(newCart);
        }
    };

    return (
        <div className="c-shop">
            {
                products && products.map(product => (
                    <Product
                        onAddToCart={addToCart}
                        product={product}
                    />
                ))
            }
            <Cart
                cart={cart}
                onClearCart={clearCart}
                onRemoveFromCart={removeFromCart}
                onUpdateQuantity={updateQuantity}
            />
        </div>
    );
};

Shop.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape())
};

Shop.defaultProps = {
    products: []
};

export default Shop;
