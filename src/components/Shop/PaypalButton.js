import React, { useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';

const { REACT_APP_PAYPAL_CLIENT_ID } = process.env;

const currency_code = 'EUR';

const PaypalButton = ({
    cart,
    total,
    subTotal,
    currency,
    onSuccess,
    onError,
    onCancel,
    paypalClientId,
    shippingCosts
}) => {
    const items = cart.map((item) => {
        const {
            name, price, quantity
        } = item;
        return ({
            name,
            unit_amount: {
                currency_code,
                value: price
            },
            quantity
        });
    });
    return (
        <PayPalButton
            createOrder={(data, actions) => actions.order.create({
                purchase_units: [{
                    amount: {
                        currency_code,
                        value: total,
                        breakdown: {
                            item_total: {
                                currency_code,
                                value: subTotal
                            },
                            shipping: {
                                currency_code,
                                value: shippingCosts
                            }
                        }
                    },
                    items
                }],
            // application_context: {
            //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
            // }
            })}
            onSuccess={(details, data) => {
                alert(`Transaction completed by ${details.payer.name.given_name}`);
                console.log(cart);
            }}
            options={{
                clientId: paypalClientId,
                currency: 'EUR'
            }}
        />
    );
};

export default PaypalButton;
