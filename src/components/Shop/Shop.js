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
            const oldItemEntry = cart[itemIndex];
            const quantity = oldItemEntry.quantity + item.quantity;
            newCart[itemIndex] = {
                ...oldItemEntry,
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

    const updateItemQuantity = (item, event) => {
        const itemIndex = cart.findIndex(element => element.id === item.id);
        const newQuantity = Number(event.target.value);
        if (itemIndex === -1) return;
        if (newQuantity <= 0) {
            removeFromCart(item);
        } else {
            const newCart = [...cart];
            const oldItemEntry = cart[itemIndex];
            const quantity = newQuantity;
            newCart[itemIndex] = {
                ...oldItemEntry,
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
                        key={product.getId()}
                        onAddToCart={addToCart}
                        product={product}
                    />
                ))
            }
            <Cart
                cart={cart}
                clearCart={clearCart}
                onRemoveFromCart={removeFromCart}
                onUpdateQuantity={updateItemQuantity}
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
