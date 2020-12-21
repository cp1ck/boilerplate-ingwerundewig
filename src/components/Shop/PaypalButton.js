import React, { useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';

const { REACT_APP_PAYPAL_CLIENT_ID } = process.env;

const PaypalButton = ({
    total,
    currency,
    onSuccess,
    onError,
    onCancel,
}) => {
    console.log(total);
    console.log(currency);
    return (
        <PayPalButton
            amount={total}
            onSuccess={(details, data) => {
                alert(`Transaction completed by ${details.payer.name.given_name}`);
            }}
            options={{
                clientId: REACT_APP_PAYPAL_CLIENT_ID,
                currency: 'EUR'
            }}
        />
    );
};

export default PaypalButton;
