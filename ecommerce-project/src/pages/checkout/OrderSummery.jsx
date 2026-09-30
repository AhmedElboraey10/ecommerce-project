import { CartItemDetails } from '../orders/CartItemDetails';
import { DeliveryDate } from '../orders/DeliveryDate';
import { DeliveryOptions } from './DeliveryOptions';

export function OrderSummery({ cart, deliveryOptions }) {
    return (
        <div className="order-summary">
            {
                cart.map(
                    (cartItem) => {
                        return (
                            <div key={cartItem.productId} className="cart-item-container">
                                <DeliveryDate
                                    cartItem={cartItem}
                                    deliveryOptions={deliveryOptions}
                                />
                                <div className="cart-item-details-grid">
                                    <CartItemDetails cartItem={cartItem} />
                                    <DeliveryOptions
                                        cartItem={cartItem}
                                        deliveryOptions={deliveryOptions}
                                    />
                                </div>
                            </div>
                        );
                    }
                )
            }
        </div>
    );
}
