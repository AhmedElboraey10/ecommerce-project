import { NavLink, useNavigate, useSearchParams } from 'react-router'
import { useState } from 'react'
import logoWhite from '../assets/logo-white.png'
import mobileLogoWhite from '../assets/mobile-logo-white.png'
import searchIcon from '../assets/images/icons/search-icon.png'
import cartIcon from '../assets/images/icons/cart-icon.png'
import './Header.css'

export function Header({ cart = [] }) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
    const [searchText, setSearchText] = useState(search ? search : '');

    let totalQuantity = 0;
    cart.forEach(
        (cartItem) => {
            totalQuantity += cartItem.quantity;
        }
    )

    return (
        <>
            <div className="header">
                <div className="left-section">
                    <NavLink to="/" className="header-link">
                        <img className="logo" src={logoWhite} />
                        <img className="mobile-logo" src={mobileLogoWhite} />
                    </NavLink>
                </div>
                <div className="middle-section">
                    <input className="search-bar" type="text" placeholder="Search"
                        value={searchText}
                        onChange={(event) => {
                            setSearchText(event.target.value);
                        }} />
                    <button className="search-button"
                        onClick={() => {
                            navigate(`/?search=${searchText}`);
                        }}>
                        <img className="search-icon" src={searchIcon} />
                    </button>
                </div>
                <div className="right-section">
                    <NavLink className="orders-link header-link" to="/orders">
                        <span className="orders-text">Orders</span>
                    </NavLink>
                    <NavLink className="cart-link header-link" to="/checkout">
                        <img className="cart-icon" src={cartIcon} />
                        <div className="cart-quantity">{totalQuantity}</div>
                        <div className="cart-text">Cart</div>
                    </NavLink>
                </div>
            </div>
        </>
    );
}