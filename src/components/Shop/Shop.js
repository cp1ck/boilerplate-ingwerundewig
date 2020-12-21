import React, { useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { Container, Row, Col } from 'react-bootstrap';


import Button from '../Button/Button';
import PaypalButton from './PaypalButton';

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

const Product = ({
    onClick, product
}) => {
    const {
        name, price, imgUrl, description, id
    } = product;
    const [quantity, setQuantity] = useState(1);

    const onQuantityChange = (event) => {
        setQuantity(Number(event.target.value));
    };

    return (
        <div className="c-product">
            <Row>
                <Col md="4">
                    <img
                        alt="Eine Flasche Ingwer&Ewig"
                        src={imgUrl}
                    />
                </Col>
                <Col md="8">
                    <h2>{name}</h2>
                    <div>
                        {`${price} €`}
                    </div>
                    <div>{description}</div>
                    <div>
                        <label htmlFor="quantity">
Anzahl
                            <input type="number" id="quantity" value={quantity} onChange={onQuantityChange} />
                        </label>

                        <button
                            onClick={() => onClick({ ...product, quantity })}
                            type="button"
                        >
                    In Warenkorb
                        </button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

const Cart = ({ cart }) => {
    console.log(cart);
    return (
        <div className="c-shop-cart">
            <PaypalButton
                currency="EUR"
                total="100"
            />
        </div>
    );
};


const Shop = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        const itemIndex = cart.findIndex(element => element.id === item.id);
        if (itemIndex === -1) {
            setCart([...cart, item]);
            return;
        }
        const newCart = [...cart];
        const oldItem = cart[itemIndex];
        newCart[itemIndex] = {
            ...oldItem,
            quantity: (oldItem.quantity + item.quantity)
        };
        setCart(newCart);
    };

    return (
        <>
            <h1>Welcome to my shop!</h1>
            {
                products && products.map(product => (
                    <Product
                        onClick={item => addToCart(item)}
                        product={product}
                    />
                ))
            }
            <Cart cart={cart} />
        </>
    );
};

export default Shop;
