import axios from 'axios';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummery } from './OrderSummery';
import { PaymentSummary } from './PaymentSummery';
import './CheckoutPage.css';

export function CheckoutPage({ cart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(
        () => {
            axios.get('/api/delivery-options?expand=estimated-delivery-time')
                .then(
                    (res) => {
                        setDeliveryOptions(res.data);
                    }
                );

            axios.get('/api/payment-summary')
                .then(
                    (res) => {
                        setPaymentSummary(res.data);
                    }
                );
        },
        []
    );

    return (
        <>
            <link rel="icon" type="image/png" href="/images/cart.png" />
            <title>Checkout</title>
            <CheckoutHeader />
            <div className="checkout-page">
                <div className="page-title">Review your order</div>
                <div className="checkout-grid">
                    <OrderSummery cart={cart} deliveryOptions={deliveryOptions} />
                    <PaymentSummary paymentSummary={paymentSummary} />
                </div>
            </div>
        </>
    );
}