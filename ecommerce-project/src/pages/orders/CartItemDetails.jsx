import axios from 'axios';
import { useState } from 'react';
import { formatMony } from '../../utils/mony';

export function CartItemDetails({ cartItem, loadCart }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);

    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    };

    const updateQuantity = async () => {
        if (isUpdating) {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: Number(quantity)
            });
            await loadCart();
            setIsUpdating(false);
        } else {
            setIsUpdating(true);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            updateQuantity();
        } else if (event.key === 'Escape') {
            setQuantity(cartItem.quantity);
            setIsUpdating(false);
        }
    };

    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} />
            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMony(cartItem.product.priceCents * cartItem.quantity)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity: {isUpdating ? (
                            <input type="text"
                                className="quantity-input"
                                value={quantity}
                                onChange={(event) => {
                                    setQuantity(event.target.value);
                                }}
                                onKeyDown={handleKeyDown} />
                        ) : (
                            <span className="quantity-label">{cartItem.quantity}</span>
                        )}
                    </span>
                    <span className="update-quantity-link link-primary"
                        onClick={updateQuantity}>
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary"
                        onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div>
        </>
    );
}