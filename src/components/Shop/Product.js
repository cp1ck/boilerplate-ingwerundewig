import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-bootstrap';

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
                            <input
                                type="number"
                                id={`product-quantity-${id}`}
                                value={quantity}
                                onChange={onQuantityChange}
                            />
                        </label>

                        <button
                            onClick={() => onAddToCart({ ...product, quantity })}
                            type="button"
                        >
                    In den Warenkorb
                        </button>
                    </div>
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
