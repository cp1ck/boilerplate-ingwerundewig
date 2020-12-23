import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PaypalButton from './PaypalButton';

const shippingOptions = [
    {
        name: 'pickup',
        label: 'Abholung in Lübeck'
    },
    {
        name: 'shipping',
        label: 'Versand: 5,90€'
    }
];

const Cart = ({ cart, onRemoveFromCart, onUpdateQuantity }) => {
    const [delivery, setDelivery] = useState('pickup');

    if (cart && cart.length > 0) {
        const subTotal = cart.reduce((acc, item) => item.price * item.quantity, 0);
        const total = delivery === 'shipping' ? subTotal + 5.9 : subTotal;
        return (
            <div className="c-shop-cart">
                <h2>Warenkorb</h2>
                <table>
                    <tr>
                        <th>Artikel</th>
                        <th>Einzelpreis</th>
                        <th>Menge</th>
                        <th>Gesamtpreis</th>
                    </tr>
                    {cart.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{`${item.price} €`}</td>
                            <td>
                                <label htmlFor="quantity">
                                    <input
                                        type="number"
                                        id={`cart-quantity-${item.id}`}
                                        value={item.quantity}
                                        onChange={event => onUpdateQuantity(item, event)}
                                    />
                                </label>
                            </td>
                            <td>{`${item.price * item.quantity} €`}</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => onRemoveFromCart(item)}
                                >
Entfernen
                                </button>

                            </td>
                        </tr>
                    ))
                    }
                </table>
                <hr />
                <table>
                    <tr>
                        <th>Zwischensumme</th>
                        <td>{`${subTotal} €`}</td>
                    </tr>
                    <tr>
                        <th>Lieferung</th>
                        <td>
                            {shippingOptions && shippingOptions.map(item => (
                                <div className="c-shop-cart-shipping-option">
                                    <label htmlFor={item.name}>
                                        <input
                                            type="radio"
                                            id={item.name}
                                            value={item.name}
                                            checked={delivery === item.name}
                                            onClick={() => setDelivery(item.name)}
                                        />
                                        {item.label}
                                    </label>
                                </div>
                            ))
                            }
                        </td>
                    </tr>
                    <tr>
                        <th>Gesamtsumme</th>
                        <td>{`${total} €`}</td>
                    </tr>
                </table>
                <h2>Zahlung</h2>
                <PaypalButton
                    currency="EUR"
                    total={total}
                />
            </div>
        );
    }
    return null;
};

Cart.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onRemoveFromCart: PropTypes.func.isRequired,
    onUpdateQuantity: PropTypes.func.isRequired,
};


export default Cart;
