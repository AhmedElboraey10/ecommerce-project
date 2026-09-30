import axios from 'axios';
import { formatMony } from "../../utils/mony";
import dayjs from "dayjs";

export function DeliveryOptions({ cartItem, deliveryOptions, loadCart }) {
    return (
        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>
            {
                deliveryOptions.map(
                    (deliveryOption) => {
                        const updateDeliveryOption = async () => {
                            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                                deliveryOptionId: deliveryOption.id
                            });
                            await loadCart();
                        };

                        let priceString = 'FREE Shipping';
                        if (deliveryOption.priceCents > 0) {
                            priceString = `${formatMony(deliveryOption.priceCents)} - Shipping`;
                        }

                        return (
                            <div
                                className="delivery-option"
                                key={deliveryOption.id}
                                onClick={updateDeliveryOption}
                            >
                                <input type="radio"
                                    className="delivery-option-input"
                                    name={`delivery-option-${cartItem.productId}`}
                                    checked={deliveryOption.id === cartItem.deliveryOptionId}
                                    onChange={() => {}} />
                                <div>
                                    <div className="delivery-option-date">
                                        {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                    </div>
                                    <div className="delivery-option-price">
                                        {priceString}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                )
            }
        </div>
    );
}