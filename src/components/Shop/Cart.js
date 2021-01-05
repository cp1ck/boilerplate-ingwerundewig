import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';

import PaypalButton from './PaypalButton';

import './Cart.scss';

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

const Cart = ({
    cart, onRemoveFromCart, onUpdateQuantity, paypalClientId
}) => {
    const [delivery, setDelivery] = useState('pickup');
    const [oldEnough, setOldEnough] = useState(false);

    const onCheckboxChange = (event) => {
        const { checked } = event.target;
        setOldEnough(checked);
    };

    if (cart && cart.length > 0) {
        const subTotal = cart.reduce((acc, item) => item.price * item.quantity, 0);
        const shippingCosts = delivery === 'shipping' ? 5.9 : 0;
        const total = subTotal + shippingCosts;
        return (
            <div className="c-cart">
                <h2>Warenkorb</h2>
                { isMobile
                    ? (
                        <table className="c-cart-table--mobile">
                            {cart.map(item => (
                                <>
                                    <tr>
                                        <th>Artikel</th>
                                        <td>{item.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Einzelpreis</th>
                                        <td>{`${item.price} €`}</td>
                                    </tr>
                                    <tr>
                                        <th>Menge</th>
                                        <td>
                                            <label htmlFor="quantity">
                                                <input
                                                    className="c-cart__input-quantity"
                                                    type="number"
                                                    id={`cart-quantity-${item.id}`}
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={event => onUpdateQuantity(item, event)}
                                                />
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Gesamtpreis</th>
                                        <td>{`${item.price * item.quantity} €`}</td>
                                    </tr>
                                    <tr>
                                        <button
                                            className="c-cart__remove-button"
                                            type="button"
                                            onClick={() => onRemoveFromCart(item)}
                                        >
Entfernen
                                        </button>
                                    </tr>
                                </>
                            ))}
                        </table>
                    )
                    : (
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
                                                className="c-cart__input-quantity"
                                                type="number"
                                                id={`cart-quantity-${item.id}`}
                                                min="1"
                                                value={item.quantity}
                                                onChange={event => onUpdateQuantity(item, event)}
                                            />
                                        </label>
                                    </td>
                                    <td>{`${item.price * item.quantity} €`}</td>
                                    <td>
                                        <button
                                            className="c-cart__remove-button"
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
                    )

                }

                <hr />
                <table className={isMobile ? 'c-cart-table--mobile' : 'c-cart-table'}>
                    <tr>
                        <th>Zwischensumme</th>
                        <td>{`${subTotal} €`}</td>
                    </tr>
                    <tr>
                        <th>Lieferung</th>
                        <td>
                            {shippingOptions && shippingOptions.map(item => (
                                <div className="c-cart-shipping-options">
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
                <div className="c-cart-validations">
                    <lable>
                        <input type="checkbox" checked={oldEnough} onClick={event => onCheckboxChange(event)} />
Ich bin über 18 Jahre alt.
                    </lable>
                </div>
                {oldEnough
                && (
                    <PaypalButton
                        cart={cart}
                        currency="EUR"
                        paypalClientId={paypalClientId}
                        subTotal={subTotal}
                        total={total}
                        shippingCosts={shippingCosts}
                    />
                )
                }
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
