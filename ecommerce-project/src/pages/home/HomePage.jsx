import axios from 'axios'
import { useEffect , useState } from 'react'
import { Header } from '../../components/Header'
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';

export function HomePage( { cart } ) {
    const [ products , setProducts ] = useState([])

    useEffect(
        () => {
            axios.get("/api/products")
            .then(
                (res) => {
                    setProducts(res.data)
                }
            )
        } ,
        []
    )

    return (
        <>

            <link rel="icon" type="image/png" href="/images/home.png" />


            <Header cart={cart} />

            <title>Ecommerce Project</title>
            <div className="home-page">
                <ProductsGrid products={products} />
            </div>
        </>
    );
}
