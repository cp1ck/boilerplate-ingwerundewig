/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';

import PaypalButton from './PaypalButton';

import './Cart.scss';

const shippingOptions = [
    {
        id: 0,
        name: 'pickup',
        label: 'Selbstabholung in Lübeck'
    },
    {
        id: 1,
        name: 'shipping',
        label: 'Versand: 6€'
    }
];

const Cart = ({
    cart, clearCart, contactService, onRemoveFromCart, onUpdateQuantity
}) => {
    const [delivery, setDelivery] = useState('pickup');
    const [oldEnough, setOldEnough] = useState(false);
    const [mailError, setMailError] = useState(false);
    const [shoppingSuccess, setShoppingSuccess] = useState(false);
    const [paypalError, setPaypalError] = useState(false);

    const onCheckboxChange = (event) => {
        const { checked } = event.target;
        setOldEnough(checked);
    };

    const handlePaypalError = (error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        setPaypalError(true);
    };

    const handlePaymentSuccess = async (details) => {
        clearCart();
        const response = await contactService.sendPurchaseNotification(details, delivery);
        setShoppingSuccess(true);
        if (!response) {
            setMailError(true);
        }
    };

    if (cart && cart.length > 0) {
        if (shoppingSuccess) setShoppingSuccess(false);
        if (mailError) setMailError(false);
        const subTotal = cart.reduce((acc, item) => item.price * item.quantity, 0);
        const shippingCosts = delivery === 'shipping' ? 6 : 0;
        const total = subTotal + shippingCosts;
        return (
            <div className="c-cart">
                <h2>Warenkorb</h2>
                {isMobile
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
                                            <label htmlFor={`cart-quantity-${item.id}`}>
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
                            <thead>
                                <tr>
                                    <th>Artikel</th>
                                    <th>Einzelpreis</th>
                                    <th>Menge</th>
                                    <th>Gesamtpreis</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{`${item.price} €`}</td>
                                        <td>
                                            <label htmlFor={`cart-quantity-${item.id}`}>
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
                            </tbody>
                        </table>
                    )

                }

                <hr />
                <table className={isMobile ? 'c-cart-table--mobile' : 'c-cart-table'}>
                    <tbody>
                        <tr>
                            <th>Zwischensumme</th>
                            <td>{`${subTotal} €`}</td>
                        </tr>
                        <tr>
                            <th>Lieferung</th>
                            <td>
                                {shippingOptions && shippingOptions.map(item => (
                                    <div className="c-cart-shipping-options" key={item.id}>
                                        <label htmlFor={item.name}>
                                            <input
                                                type="radio"
                                                id={item.name}
                                                value={item.name}
                                                checked={delivery === item.name}
                                                onChange={() => setDelivery(item.name)}
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
                    </tbody>
                </table>
                <div className="c-cart-validations">
                    <label htmlFor="age-verification">
                        <input
                            checked={oldEnough}
                            id="age-verification"
                            onChange={event => onCheckboxChange(event)}
                            type="checkbox"
                        />
                        Ich bin über 18 Jahre alt.
                    </label>
                </div>
                {oldEnough
                    && (
                        <PaypalButton
                            cart={cart}
                            currency="EUR"
                            delivery={delivery}
                            onError={handlePaypalError}
                            onSuccess={handlePaymentSuccess}
                            subTotal={subTotal}
                            total={total}
                            shippingCosts={shippingCosts}
                        />
                    )
                }
            </div>
        );
    }
    if (paypalError || shoppingSuccess) {
        return (
            <div className="c-shop-feedback">
                {
                    paypalError
                    && (
                        <div className="c-shop-feedback__error-paypal">
                            <h2>Fehler bei Paypal.</h2>
                            <div>Irgendetwas ist schiefgegangen. Bitte versuche es erneut.</div>
                        </div>
                    )
                }
                {
                    shoppingSuccess && (
                        <div className="c-shop-feedback__success">
                            <h2>Danke für deinen Einkauf bei Ingwer&Ewig!</h2>
                            {mailError
                                ? (
                                    <div>
                                        Fehler beim Senden der Bestellbestätigung. Bitte schreib uns eine Email an
                                        <a href="mailto: shop@ingwerundewig.de"> shop@ingwerundewig.de</a>
                                    </div>
                                )
                                : <div>Du bekommst in Kürze eine Bestellbestätigung per Email.</div>
                            }

                        </div>
                    )
                }
            </div>
        );
    }

    return null;
};

Cart.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    clearCart: PropTypes.func.isRequired,
    contactService: PropTypes.func.isRequired,
    onRemoveFromCart: PropTypes.func.isRequired,
    onUpdateQuantity: PropTypes.func.isRequired,
};


export default Cart;
