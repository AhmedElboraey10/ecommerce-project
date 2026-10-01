import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import axios from 'axios';
import { OrdersGrid } from './OrdersGrid';
import './OrdersPage.css';

export function OrdersPage({ cart, loadCart }) {
    const [orders, setOrders] = useState([]);

    useEffect(
        () => {
            const fetchOrdersData = async () => {
                const response = await axios.get('/api/orders?expand=products')
                setOrders(response.data);
            }
            fetchOrdersData()
        },
        []
    );

    return (
        <>
            <link rel="icon" type="image/png" href="/images/orders.png" />
            <Header cart={cart} />
            <title>Orders</title>
            <div className="orders-page">
                <div className="page-title">Your Orders</div>
                <OrdersGrid orders={orders} loadCart={loadCart} />
            </div>
        </>
    );
}