import { Routes, Route } from 'react-router'
import { useState , useEffect } from 'react'
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage.jsx'
import { OrdersPage } from './pages/orders/OrdersPage.jsx'
import { TrackingPage } from './pages/tracking.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'
import axios from 'axios'
import './App.css';

function App() {

    const [cart, setCart] = useState([])

    useEffect(
        () => {
            const fetchAppDate = async () => {
                const response = await axios.get('/api/cart-items?expand=product')
                setCart(response.data)
            }
            fetchAppDate()
        },
        []
    )

    return (
        <>
            <Routes>
                <Route index element={<HomePage cart={cart} />} />
                <Route path="checkout" element={<CheckoutPage cart={cart} />} />
                <Route path="orders" element={<OrdersPage cart={cart} />} />
                <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
                <Route path='*' element={<NotFoundPage cart={cart} />}></Route>
            </Routes>
        </>
    );
}

export default App;
