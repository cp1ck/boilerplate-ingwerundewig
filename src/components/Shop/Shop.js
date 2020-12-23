import React, { useState } from 'react';

import Cart from './Cart';
import Product from './Product';

import './Shop.scss';

const products = [
    {
        id: 1,
        name: 'Ingwer&Ewig Schnaps',
        price: 15,
        imgUrl: 'https://via.placeholder.com/200',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    }
];

const Shop = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
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
        if (newQuantity === 0) {
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
        <>
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
                onRemoveFromCart={removeFromCart}
                onUpdateQuantity={updateQuantity}
            />
        </>
    );
};

export default Shop;
