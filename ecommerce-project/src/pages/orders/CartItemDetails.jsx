import axios from 'axios';
import { formatMony } from '../../utils/mony';

export function CartItemDetails({ cartItem, loadCart }) {
    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
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
                        Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                    </span>
                    <span className="update-quantity-link link-primary">
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