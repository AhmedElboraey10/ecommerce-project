import { Link  } from 'react-router';
import checkoutLockIcon from '../../assets/images/icons/checkout-lock-icon.png'
import './CheckoutHeader.css'

export function CheckoutHeader() {
    return (
        <div className="checkout-header">
            <div className="header-content">
                <div className="checkout-header-left-section">
                    <Link to="/">
                        <span className="checkout-brand-name">E-commerce</span>
                    </Link>
                </div>

                <div className="checkout-header-middle-section">
                    Checkout (<Link className="return-to-home-link"
                        to="/">3 items</Link>)
                </div>

                <div className="checkout-header-right-section">
                    <img src={checkoutLockIcon} />
                </div>
            </div>
        </div>
    );
}
