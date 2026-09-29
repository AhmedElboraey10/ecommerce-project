import { Routes, Route } from 'react-router'
import { useState , useEffect } from 'react'
import axios from 'axios'
import { HomePage } from './pages/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage.jsx'
import { OrdersPage } from './pages/OrdersPage.jsx'
import { TrackingPage } from './pages/tracking.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'
import './App.css';

function App() {

    const [cart, setCart] = useState([])

    useEffect(
        () => {
            axios.get('/api/cart-items?expand=product')
                .then(
                    (res) => {
                        setCart(res.data)
                    }
                )
        },
        []
    )

    return (
        <>
            <Routes>
                <Route index element={<HomePage cart={cart} />} />
                <Route path="checkout" element={<CheckoutPage cart={cart} />} />
                <Route path="orders" element={<OrdersPage cart={cart} />} />
                <Route path="tracking" element={<TrackingPage />} />
                <Route path='*' element={<NotFoundPage />}></Route>
            </Routes>
        </>
    );
}

export default App;