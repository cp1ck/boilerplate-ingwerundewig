import React from 'react';
import { Container } from 'react-bootstrap';

export default class PopUpStoreModule extends React.Component {
    componentDidMount() {
        if (window.initPopupStore) {
            window.initPopupStore(document.getElementById('popup_store_root'));
        }
    }

    render() {
        return (
            <Container>
                <div
                    id="popup_store_root"
                    data-product-type=""
                    data-disable-meta-navigation="true"
                />
            </Container>
        );
    }
}
