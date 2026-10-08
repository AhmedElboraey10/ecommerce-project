import { Fragment } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link } from 'react-router';
import { imageUrl } from '../../utils/imageUrl';
import buyAgainIcon from '../../assets/images/icons/buy-again.png';

export function OrderDetailsGrid({ order, loadCart }) {
    return (
        <div className="order-details-grid">
            {
                (order.products ?? []).map(
                    (orderProduct) => {
                        const product = orderProduct.product;
                        const addToCart = async () => {
                            if (!product) return;
                            await axios.post('/api/cart-items', {
                                productId: orderProduct.productId,
                                quantity: 1
                            });
                            await loadCart();
                        };

                        return (
                            <Fragment key={orderProduct.productId}>
                                <div className="product-image-container">
                                    {product && <img src={imageUrl(product.image)} alt={product.name} />}
                                </div>
                                <div className="product-details">
                                    <div className="product-name">
                                        {product?.name ?? 'This product is no longer available'}
                                    </div>
                                    <div className="product-delivery-date">
                                        Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                                    </div>
                                    <div className="product-quantity">
                                        Quantity: {orderProduct.quantity}
                                    </div>
                                    {product && (
                                        <button className="buy-again-button button-primary"
                                            onClick={addToCart}>
                                            <img className="buy-again-icon" src={buyAgainIcon} alt="" />
                                            <span className="buy-again-message">Add to Cart</span>
                                        </button>
                                    )}
                                </div>
                                <div className="product-actions">
                                    <Link
                                        className="track-package-button button-secondary"
                                        to={`/tracking/${order.id}/${orderProduct.productId}`}
                                    >Track package</Link>
                                </div>
                            </Fragment>
                        );
                    }
                )
            }
        </div>
    );
}
