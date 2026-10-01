import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Header } from '../../components/Header'
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';

export function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([])
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');

    useEffect(
        () => {
            const getHomeDate = async () => {
                let url = '/api/products';
                if (search) {
                    url = `/api/products?search=${search}`;
                }
                const response = await axios.get(url)
                setProducts(response.data)
            }
            getHomeDate()
        },
        [search]
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