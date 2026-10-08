import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import dayjs from 'dayjs';
import { Header } from '../components/Header';
import './tracking.css'
import { imageUrl } from '../utils/imageUrl';

export function TrackingPage({ cart }) {
    const { orderId, productId } = useParams();
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        let isCurrentRequest = true;

        axios.get(`/api/orders/${orderId}?expand=products`)
            .then((response) => {
                if (isCurrentRequest) {
                    setOrderData({ orderId, order: response.data });
                }
            });

        return () => {
            isCurrentRequest = false;
        };
    }, [orderId]);

    const order = orderData?.orderId === orderId ? orderData.order : null;

    if (!order) {
        return null;
    }

    const orderProduct = order.products.find(
        (item) => item.productId === productId
    );

    if (!orderProduct) {
        return null;
    }

    if (!orderProduct.product) {
        return (
            <>
                <Header cart={cart} />
                <div className="tracking-page">
                    <div className="order-tracking">
                        <Link className="back-to-orders-link link-primary" to="/orders">
                            View all orders
                        </Link>
                        <div className="product-info">This product is no longer available.</div>
                    </div>
                </div>
            </>
        );
    }

    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
    const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
    const deliveryPercent = Math.min(
        (timePassedMs / totalDeliveryTimeMs) * 100,
        100
    );
    const isPreparing = deliveryPercent < 33;
    const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
    const isDelivered = deliveryPercent === 100;

    return (
        <>

        <link rel="icon" type="image/png" href="/images/tracking.png" />
        
        <Header cart={cart} />

        <title>Tracking</title>

            <div className="tracking-page" data-order-id={orderId} data-product-id={productId}>
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        {isDelivered ? 'Delivered on' : 'Arriving on'}{' '}
                        {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>

                    <div className="product-info">
                        {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {orderProduct.quantity}
                    </div>

                    <img className="product-image" src={imageUrl(orderProduct.product.image)} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${isPreparing ? 'current-status' : ''}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${isShipped ? 'current-status' : ''}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${isDelivered ? 'current-status' : ''}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${deliveryPercent}%` }}></div>
                    </div>
                </div>
            </div>
        </>
    );
}
