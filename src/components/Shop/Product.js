import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-bootstrap';

import './Product.scss';

const Product = ({
    onAddToCart, product
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
                        className="c-product__image"
                        src={imgUrl}
                    />
                </Col>
                <Col md="8">
                    <div className="c-product-details">
                        <h2 className="c-product-details__title">
                            {`${name} - ${price} €`}
                        </h2>
                        <div className="c-product-details_text">
                            {description}
                        </div>
                    </div>
                    <form className="c-product-controls">
                        <input
                            aria-label="Anzahl"
                            className="c-product-controls__quantity-input"
                            id={`product-quantity-${id}`}
                            onChange={onQuantityChange}
                            type="number"
                            value={quantity}
                            min="1"
                        />

                        <button
                            className="c-product-controls__button c-button c-button-light"
                            onClick={() => onAddToCart({ ...product, quantity })}
                            type="button"
                        >
                    In den Warenkorb
                        </button>
                    </form>
                </Col>
            </Row>
        </div>
    );
};

Product.propTypes = {
    onAddToCart: PropTypes.func.isRequired,
    product: PropTypes.shape().isRequired,
};

export default Product;
