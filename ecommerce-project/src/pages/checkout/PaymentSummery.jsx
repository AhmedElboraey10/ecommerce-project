import { formatMony } from "../../utils/mony";

export function PaymentSummary({paymentSummary}) {
    return (
        <div className="payment-summary">
            {paymentSummary && (
                <>
                    <div className="payment-summary-title">
                        Payment Summary
                    </div>
                    <div className="payment-summary-row">
                        <div>Items ({paymentSummary.totalItems}):</div>
                        <div className="payment-summary-money">
                            {formatMony(paymentSummary.productCostCents)}
                        </div>
                    </div>
                    <div className="payment-summary-row">
                        <div>Shipping &amp; handling:</div>
                        <div className="payment-summary-money">
                            {formatMony(paymentSummary.shippingCostCents)}
                        </div>
                    </div>
                    <div className="payment-summary-row subtotal-row">
                        <div>Total before tax:</div>
                        <div className="payment-summary-money">
                            {formatMony(paymentSummary.totalCostBeforeTaxCents)}
                        </div>
                    </div>
                    <div className="payment-summary-row">
                        <div>Estimated tax (10%):</div>
                        <div className="payment-summary-money">
                            {formatMony(paymentSummary.taxCents)}
                        </div>
                    </div>
                    <div className="payment-summary-row total-row">
                        <div>Order total:</div>
                        <div className="payment-summary-money">
                            {formatMony(paymentSummary.totalCostCents)}
                        </div>
                    </div>
                    <button className="place-order-button button-primary">
                        Place your order
                    </button>
                </>
            )}
        </div>
    );
}