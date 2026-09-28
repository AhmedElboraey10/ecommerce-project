import { Header } from '../components/Header'

export function NotFoundPage() {
    return (
        <>
            <title>404</title>

            <Header />

            <h1
                style={ { color: 'red' , fontSize: '80px' , width: 'fit-content' , margin: '40vh auto' } }
            >
                Page not found
            </h1>
        </>
    );
}