import { Fragment } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link } from 'react-router';

export function OrderDetailsGrid({ order, loadCart }) {
    return (
        <div className="order-details-grid">
            {
                order.products.map(
                    (orderProduct) => {
                        const addToCart = async () => {
                            await axios.post('/api/cart-items', {
                                productId: orderProduct.productId,
                                quantity: 1
                            });
                            await loadCart();
                        };

                        return (
                            <Fragment key={orderProduct.productId}>
                                <div className="product-image-container">
                                    <img src={orderProduct.product.image} />
                                </div>
                                <div className="product-details">
                                    <div className="product-name">
                                        {orderProduct.product.name}
                                    </div>
                                    <div className="product-delivery-date">
                                        Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                                    </div>
                                    <div className="product-quantity">
                                        Quantity: {orderProduct.quantity}
                                    </div>
                                    <button className="buy-again-button button-primary"
                                        onClick={addToCart}>
                                        <img className="buy-again-icon" src="images/icons/buy-again.png" />
                                        <span className="buy-again-message">Add to Cart</span>
                                    </button>
                                </div>
                                <div className="product-actions">
                                    <Link
                                        className="track-package-button button-secondary"
                                        to={`/tracking/${order.id}/${orderProduct.productId}`}
                                    >
                                        Track package
                                    </Link>
                                </div>
                            </Fragment>
                        );
                    }
                )
            }
        </div>
    );
}
