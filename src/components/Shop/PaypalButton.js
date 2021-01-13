import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PayPalButton } from 'react-paypal-button-v2';

const { REACT_APP_PAYPAL_CLIENT_ID } = process.env;

const PaypalButton = ({
    cart,
    currency,
    delivery,
    total,
    subTotal,
    onSuccess,
    onError,
    shippingCosts
}) => {
    const cartItems = cart.map((item) => {
        const {
            name, price, quantity
        } = item;
        return ({
            name,
            unit_amount: {
                currency_code: currency,
                value: price
            },
            quantity
        });
    });
    const onCreateOrder = (data, actions, items) => actions.order.create({
        purchase_units: [{
            amount: {
                currency_code: currency,
                value: total,
                breakdown: {
                    item_total: {
                        currency_code: currency,
                        value: subTotal
                    },
                    shipping: {
                        currency_code: currency,
                        value: shippingCosts
                    }
                }
            },
            items
        }],
        application_context: {
            shipping_preference: (delivery === 'shipping' ? 'GET_FROM_FILE' : 'NO_SHIPPING')
        }
    });
    return (
        <PayPalButton
            createOrder={(data, actions) => onCreateOrder(data, actions, cartItems)}
            onError={error => onError(error)}
            onSuccess={details => onSuccess(details)}
            options={{
                clientId: REACT_APP_PAYPAL_CLIENT_ID,
                currency
            }}
        />
    );
};

PaypalButton.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    currency: PropTypes.string.isRequired,
    delivery: PropTypes.string.isRequired,
    onError: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
    shippingCosts: PropTypes.number.isRequired,
    subTotal: PropTypes.number.isRequired,
};

export default PaypalButton;
