import axios from 'axios';
import { useNavigate } from 'react-router';
import { formatMoney } from '../../utils/money';

export function PaymentSummary({ paymentSummary, loadCart }) {
    const navigate = useNavigate();

    const createOrder = async () => {
        await axios.post('/api/orders');
        await loadCart();
        navigate('/orders');
    };

    return (
        <div className="payment-summary">
            {paymentSummary && (
                <>
                    <div className="payment-summary-title">Payment Summary</div>
                    <div className="payment-summary-row" data-testid="product-cost-row">
                        <div>Items ({paymentSummary.totalItems}):</div>
                        <div className="payment-summary-money">
                            {formatMoney(paymentSummary.productCostCents)}
                        </div>
                    </div>
                    <div className="payment-summary-row" data-testid="shipping-cost-row">
                        <div>Shipping &amp; handling:</div>
                        <div className="payment-summary-money">
                            {formatMoney(paymentSummary.shippingCostCents)}
                        </div>
                    </div>
                    <div className="payment-summary-row subtotal-row" data-testid="total-before-tax-row">
                        <div>Total before tax:</div>
                        <div className="payment-summary-money">
                            {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
                        </div>
                    </div>
                    <div className="payment-summary-row" data-testid="tax-row">
                        <div>Estimated tax (10%):</div>
                        <div className="payment-summary-money">
                            {formatMoney(paymentSummary.taxCents)}
                        </div>
                    </div>
                    <div className="payment-summary-row total-row" data-testid="total-cost-row">
                        <div>Order total:</div>
                        <div className="payment-summary-money">
                            {formatMoney(paymentSummary.totalCostCents)}
                        </div>
                    </div>
                    <button className="place-order-button button-primary" onClick={createOrder}>
                        Place your order
                    </button>
                </>
            )}
        </div>
    );
}
