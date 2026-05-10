import axios from 'axios';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './checkout-header.css';
import './CheckoutPage.css';

export function CheckoutPage({ cart ,loadCart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setpPaymentSummary] = useState(null);

    useEffect(() => {
        const fetchCheckoutData = async ()=>{
            let response = await axios.get('/api/delivery-options?expand=estimateDeliveryTime')
            setDeliveryOptions(response.data);

            response = await axios.get('/api/payment-summary')
            setpPaymentSummary(response.data);
        }
        

        fetchCheckoutData();
    }, []);

    return (
        <>
            <title>Checkout</title>

            <CheckoutHeader />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart = {cart} deliveryOptions={deliveryOptions} loadCart = {loadCart} />

                    <PaymentSummary paymentSummary={paymentSummary} />
                </div>
            </div>

        </>
    );
}