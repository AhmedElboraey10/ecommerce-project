import axios from 'axios'
import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';

export function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([])

    useEffect(
        () => {
            const getHomeDate = async () => {
                const response = await axios.get("/api/products")
                setProducts(response.data)
            }
            getHomeDate()
        },
        []
    )

    return (
        <>
            <link rel="icon" type="image/png" href="/images/home.png" />
            <Header cart={cart} />
            <title>Ecommerce Project</title>
            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </>
    );
}