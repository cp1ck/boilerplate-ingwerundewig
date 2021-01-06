import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PayPalButton } from 'react-paypal-button-v2';

const { REACT_APP_PAYPAL_CLIENT_ID } = process.env;

const PaypalButton = ({
    cart,
    currency,
    total,
    subTotal,
    onSuccess,
    onError,
    onCancel,
    shippingCosts
}) => {
    const items = cart.map((item) => {
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
    return (
        <PayPalButton
            createOrder={(data, actions) => actions.order.create({
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
            // application_context: {
            //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
            // }
            })}
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
    onSuccess: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
    shippingCosts: PropTypes.number.isRequired,
    subTotal: PropTypes.number.isRequired,
};

export default PaypalButton;
